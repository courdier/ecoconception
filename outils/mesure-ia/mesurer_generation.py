"""
Mesure réelle du temps et de l'énergie de génération d'images pour l'atelier
« Génération d'images par IA et écoconception ».

Principe
--------
1. Mesure de la puissance de la carte graphique au repos (référence).
2. Pour chaque configuration (A, B, C) : une génération de chauffe non comptée
   (chargement du modèle en mémoire), puis N générations mesurées.
3. Pendant tout ce temps, la puissance électrique totale de la carte graphique
   est relevée en continu via ADLX (bibliothèque du pilote AMD, sans droits
   administrateur), puis intégrée sur la durée exacte de chaque génération :
   Énergie (Wh) = ∫ P(t) dt / 3600.
4. Les résultats (bruts et résumés) sont écrits dans resultats/, avec les images.

Périmètre de la mesure : la carte graphique seule (capteur « Total Board Power »
du pilote AMD). Le processeur, la mémoire, l'alimentation et l'écran
ne sont pas inclus. Le temps mesuré est le temps d'exécution dans ComfyUI
(débruitage + décodage de l'image), modèle déjà chargé.

Prérequis
---------
- ComfyUI lancé (Comfy Desktop), avec les modèles :
    checkpoints/Illustrious-XL-v1.0.safetensors
    loras/lcm-lora-sdxl.safetensors
- Carte graphique AMD avec le pilote AMD Software (amdadlx64.dll).
- Python 3.10+ (bibliothèque standard uniquement, Windows).

Utilisation
-----------
    python outils/mesure-ia/adlx_puissance.py          (test du capteur)
    python outils/mesure-ia/mesurer_generation.py --essais 5
"""

import argparse
import json
import statistics
import sys
import threading
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
from adlx_puissance import PuissanceGPU  # noqa: E402

# ─── Configurations de l'atelier ────────────────────────────────────────────
PROMPT = ("scenery, mountain landscape at sunset, lake with reflection, tall grass in foreground, "
          "clouds, sun, no humans, detailed, masterpiece, best quality")
NEGATIF = "lowres, worst quality, bad quality, blurry, jpeg artifacts, text, watermark, signature"
CHECKPOINT = "Illustrious-XL-v1.0.safetensors"
LORA_LCM = "lcm-lora-sdxl.safetensors"

CONFIGS = {
    "A": {"nom": "Standard", "largeur": 1024, "hauteur": 1024, "etapes": 30,
          "sampler": "euler", "scheduler": "normal", "cfg": 6.0, "lora": None},
    "B": {"nom": "Optimisée", "largeur": 512, "hauteur": 512, "etapes": 15,
          "sampler": "euler", "scheduler": "normal", "cfg": 6.0, "lora": None},
    "C": {"nom": "Accélérée", "largeur": 512, "hauteur": 512, "etapes": 5,
          "sampler": "lcm", "scheduler": "sgm_uniform", "cfg": 1.5, "lora": LORA_LCM},
}


def workflow(cfg, graine, prefixe):
    """Graphe ComfyUI (format API) : texte → débruitage → décodage → image."""
    modele, clip = ["ckpt", 0], ["ckpt", 1]
    g = {
        "ckpt": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
    }
    if cfg["lora"]:
        g["lora"] = {"class_type": "LoraLoader", "inputs": {
            "model": modele, "clip": clip, "lora_name": cfg["lora"],
            "strength_model": 1.0, "strength_clip": 1.0}}
        modele, clip = ["lora", 0], ["lora", 1]
    g.update({
        "pos": {"class_type": "CLIPTextEncode", "inputs": {"clip": clip, "text": PROMPT}},
        "neg": {"class_type": "CLIPTextEncode", "inputs": {"clip": clip, "text": NEGATIF}},
        "latent": {"class_type": "EmptyLatentImage", "inputs": {
            "width": cfg["largeur"], "height": cfg["hauteur"], "batch_size": 1}},
        "sampler": {"class_type": "KSampler", "inputs": {
            "model": modele, "positive": ["pos", 0], "negative": ["neg", 0],
            "latent_image": ["latent", 0], "seed": graine, "steps": cfg["etapes"],
            "cfg": cfg["cfg"], "sampler_name": cfg["sampler"], "scheduler": cfg["scheduler"],
            "denoise": 1.0}},
        "decode": {"class_type": "VAEDecode", "inputs": {"samples": ["sampler", 0], "vae": ["ckpt", 2]}},
        "save": {"class_type": "SaveImage", "inputs": {"images": ["decode", 0], "filename_prefix": prefixe}},
    })
    return g


# ─── Lecture de la puissance : ADLX (pilote AMD), voir adlx_puissance.py ────
class Echantillonneur(threading.Thread):
    """Relève la puissance toutes les `periode` secondes, horodatée en temps Unix."""

    def __init__(self, capteur, periode=0.05):
        super().__init__(daemon=True)
        self.capteur, self.periode = capteur, periode
        self.points = []
        self._stop = threading.Event()

    def run(self):
        while not self._stop.is_set():
            self.points.append((time.time(), self.capteur.lire()[1]))
            time.sleep(self.periode)

    def arreter(self):
        self._stop.set()
        self.join()

    def energie_wh(self, debut, fin):
        """Intègre la puissance entre debut et fin (valeur tenue entre deux relevés)."""
        pts = self.points
        e, dernier = 0.0, None
        for i, (t, p) in enumerate(pts):
            t_suiv = pts[i + 1][0] if i + 1 < len(pts) else t
            a, b = max(t, debut), min(t_suiv, fin)
            if b > a:
                e += p * (b - a)
            if t <= fin:
                dernier = p
        return e / 3600.0, dernier

    def puissance_moyenne(self, debut, fin):
        e, _ = self.energie_wh(debut, fin)
        return e * 3600.0 / (fin - debut) if fin > debut else None

    def periode_capteur(self):
        """Intervalle médian entre deux changements de valeur (fréquence réelle du capteur)."""
        chang = [t for (t, p), (_, p0) in zip(self.points[1:], self.points[:-1]) if p != p0]
        ecarts = [b - a for a, b in zip(chang[:-1], chang[1:])]
        return statistics.median(ecarts) if ecarts else None


# ─── ComfyUI ────────────────────────────────────────────────────────────────
def appel(url, donnees=None):
    req = urllib.request.Request(url, data=json.dumps(donnees).encode() if donnees is not None else None,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def trouver_comfy(url):
    for u in ([url] if url else ["http://127.0.0.1:8000", "http://127.0.0.1:8188"]):
        try:
            appel(u + "/system_stats")
            return u
        except (urllib.error.URLError, OSError):
            continue
    raise SystemExit("ComfyUI injoignable : lancez Comfy Desktop (ou précisez --comfy http://127.0.0.1:PORT).")


def generer(comfy, graphe):
    """Soumet le graphe et attend la fin. Renvoie (début, fin) en secondes Unix et l'image produite."""
    rep = appel(comfy + "/prompt", {"prompt": graphe, "client_id": str(uuid.uuid4())})
    pid = rep["prompt_id"]
    while True:
        time.sleep(0.05)
        hist = appel(comfy + "/history/" + pid)
        if pid in hist and hist[pid].get("status", {}).get("completed") is not None:
            h = hist[pid]
            break
    msgs = dict((m[0], m[1]) for m in h["status"].get("messages", []))
    if "execution_success" not in msgs:
        raise SystemExit("Génération en échec : %s" % json.dumps(h["status"])[:800])
    debut = msgs["execution_start"]["timestamp"] / 1000.0
    fin = msgs["execution_success"]["timestamp"] / 1000.0
    images = [img for sortie in h["outputs"].values() for img in sortie.get("images", [])]
    return debut, fin, images[0] if images else None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--essais", type=int, default=5, help="générations mesurées par configuration")
    ap.add_argument("--repos", type=float, default=15, help="durée de la mesure au repos (s)")
    ap.add_argument("--comfy", help="URL de ComfyUI (détectée automatiquement sinon)")
    ap.add_argument("--configs", default="ABC", help="configurations à mesurer (ex. AC)")
    args = ap.parse_args()

    capteur = PuissanceGPU()
    print("Capteur de puissance : ADLX, %s (Total Board Power), intervalle %d ms"
          % (capteur.nom, capteur.intervalle_ms))
    comfy = trouver_comfy(args.comfy)
    stats = appel(comfy + "/system_stats")
    gpu = (stats.get("devices") or [{}])[0].get("name", "?")
    print("ComfyUI : %s — périphérique : %s" % (comfy, gpu))

    ech = Echantillonneur(capteur)
    ech.start()

    print("Mesure au repos pendant %.0f s… (ne pas utiliser le PC)" % args.repos)
    t0 = time.time()
    time.sleep(args.repos)
    p_repos = ech.puissance_moyenne(t0, time.time())
    print("  Puissance au repos : %.1f W" % p_repos)

    horodatage = datetime.now().strftime("%Y%m%d-%H%M")
    resultats = {
        "date": datetime.now().isoformat(timespec="seconds"),
        "materiel": {"gpu": capteur.nom, "vram_mo": capteur.vram_mo, "gpu_comfyui": gpu,
                     "capteur": "AMD ADLX - GPUTotalBoardPower, intervalle %d ms" % capteur.intervalle_ms},
        "logiciel": {"comfyui": stats.get("system", {}).get("comfyui_version"),
                     "pytorch": stats.get("system", {}).get("pytorch_version")},
        "prompt": PROMPT, "negatif": NEGATIF, "checkpoint": CHECKPOINT,
        "perimetre": "Carte graphique seule (puissance totale de la carte, capteur AMD ADLX). "
                     "Hors processeur, mémoire, alimentation, écran.",
        "puissance_repos_w": round(p_repos, 2),
        "configurations": {},
    }

    for lettre in args.configs:
        cfg = CONFIGS[lettre]
        print("\nConfiguration %s (%s) : %dx%d, %d étapes" % (lettre, cfg["nom"], cfg["largeur"], cfg["hauteur"], cfg["etapes"]))
        generer(comfy, workflow(cfg, 999, "atelier-ia/chauffe-%s" % lettre))  # chauffe, non comptée
        time.sleep(3)
        essais = []
        for i in range(args.essais):
            debut, fin, image = generer(comfy, workflow(cfg, 1000 + i, "atelier-ia/%s-%s" % (horodatage, lettre)))
            e_wh, _ = ech.energie_wh(debut, fin)
            duree = fin - debut
            essai = {"graine": 1000 + i, "duree_s": round(duree, 3), "energie_wh": round(e_wh, 5),
                     "puissance_moyenne_w": round(e_wh * 3600 / duree, 1),
                     "energie_au_dessus_repos_wh": round(e_wh - p_repos * duree / 3600, 5),
                     "image": image}
            essais.append(essai)
            print("  essai %d : %.2f s, %.1f W moyens, %.3f Wh" % (i + 1, duree, essai["puissance_moyenne_w"], e_wh))
            time.sleep(2)

        def moy(cle):
            return statistics.mean(e[cle] for e in essais)

        def ecart(cle):
            return statistics.stdev(e[cle] for e in essais) if len(essais) > 1 else 0.0

        resultats["configurations"][lettre] = {
            "parametres": cfg,
            "essais": essais,
            "resume": {
                "duree_s_moyenne": round(moy("duree_s"), 3), "duree_s_ecart_type": round(ecart("duree_s"), 3),
                "puissance_moyenne_w": round(moy("puissance_moyenne_w"), 1),
                "energie_wh_moyenne": round(moy("energie_wh"), 5), "energie_wh_ecart_type": round(ecart("energie_wh"), 5),
                "energie_au_dessus_repos_wh_moyenne": round(moy("energie_au_dessus_repos_wh"), 5),
            },
        }

    ech.arreter()
    resultats["periode_capteur_s"] = round(ech.periode_capteur() or 0, 3)
    sortie = ICI / "resultats" / ("mesures-%s.json" % horodatage)
    sortie.parent.mkdir(exist_ok=True)
    sortie.write_text(json.dumps(resultats, ensure_ascii=False, indent=2), encoding="utf-8")

    print("\nRésumé (moyenne de %d essais)" % args.essais)
    for lettre, r in resultats["configurations"].items():
        s = r["resume"]
        print("  %s : %.2f s ± %.2f | %.1f W | %.3f Wh" % (lettre, s["duree_s_moyenne"], s["duree_s_ecart_type"],
                                                         s["puissance_moyenne_w"], s["energie_wh_moyenne"]))
    print("Période réelle du capteur : %.3f s" % resultats["periode_capteur_s"])
    print("Résultats écrits dans", sortie)


if __name__ == "__main__":
    sys.exit(main())
