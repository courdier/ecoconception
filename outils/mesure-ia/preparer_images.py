"""
Prépare, pour l'atelier, les images réellement générées pendant la mesure.

Pour chaque configuration, l'image de l'essai n°1 (même graine pour A, B et C)
est convertie en WebP léger dans assets/img/atelier-ia/ :
  - config-X-apercu.webp : 512 × 512 px (taille suffisante pour l'affichage) ;
  - config-a-1024.webp   : image A en pleine résolution, chargée seulement à la demande ;
  - detail-X.webp        : recadrage d'une même zone relative de l'image
                           (un quart de la largeur), en pixels réels.

Utilisation (depuis la racine du dépôt) :
    python outils/mesure-ia/preparer_images.py resultats.json DOSSIER_SORTIE_COMFYUI
"""

import json
import sys
from pathlib import Path

from PIL import Image

RACINE = Path(__file__).resolve().parents[2]
DEST = RACINE / "assets" / "img" / "atelier-ia"
ZONE = (0.55, 0.55, 0.80, 0.80)  # zone recadrée (x0, y0, x1, y1), en fraction de l'image


def enregistrer(img, nom, qualite=72):
    chemin = DEST / nom
    img.save(chemin, "WEBP", quality=qualite, method=6)
    print("%-22s %4dx%-4d %6.1f Ko" % (nom, img.size[0], img.size[1], chemin.stat().st_size / 1024))


def main(resultats, dossier_comfy):
    donnees = json.loads(Path(resultats).read_text(encoding="utf-8"))
    for lettre, conf in donnees["configurations"].items():
        info = conf["essais"][0]["image"]
        source = Path(dossier_comfy) / info.get("subfolder", "") / info["filename"]
        img = Image.open(source).convert("RGB")
        l, h = img.size
        enregistrer(img.resize((512, 512), Image.LANCZOS), "config-%s-apercu.webp" % lettre.lower())
        if lettre == "A":
            enregistrer(img, "config-a-1024.webp", qualite=70)
        boite = tuple(round(v * d) for v, d in zip(ZONE, (l, h, l, h)))
        enregistrer(img.crop(boite), "detail-%s.webp" % lettre.lower(), qualite=80)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
