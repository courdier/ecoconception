# Mesures de l'atelier « Génération d'images par IA »

Ce dossier contient de quoi **reproduire les mesures réelles** affichées dans
l'atelier `pages/en-pratique/atelier-ia-images.html`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `adlx_puissance.py` | Lit la puissance électrique totale d'une carte graphique AMD via ADLX (bibliothèque fournie avec le pilote AMD, sans droits administrateur). |
| `mesurer_generation.py` | Lance les générations dans ComfyUI, relève la puissance en continu et calcule temps et énergie. |
| `resultats/mesures-*.json` | Résultats bruts : chaque essai, moyennes, écarts-types, matériel et logiciels. |

## Protocole

1. **Puissance au repos** : relevée pendant 20 s avant toute génération.
2. **Chauffe** : pour chaque configuration, une génération non comptée (chargement du modèle en mémoire).
3. **Mesure** : 10 générations par configuration, avec une graine différente à chaque essai
   (sinon ComfyUI réutiliserait le résultat en cache).
4. **Temps** : durée d'exécution donnée par ComfyUI (début → fin du graphe : encodage du texte,
   débruitage, décodage de l'image), modèle déjà chargé.
5. **Énergie** : la puissance est échantillonnée toutes les 50 ms (le capteur AMD se met à jour
   toutes les 250 ms environ) puis intégrée sur la durée exacte de chaque génération :
   `Énergie (Wh) = ∫ P(t) dt / 3600`.

### Configurations

| | Modèle | Résolution | Étapes | Échantillonneur | Guidage (CFG) |
|---|---|---|---|---|---|
| A | Illustrious-XL v1.0 (architecture SDXL) | 1024 × 1024 | 30 | euler / normal | 6 |
| B | Illustrious-XL v1.0 | 512 × 512 | 15 | euler / normal | 6 |
| C | Illustrious-XL v1.0 + LCM-LoRA SDXL | 512 × 512 | 5 | lcm / sgm_uniform | 1,5 |

Prompt identique pour les trois configurations (voir `mesurer_generation.py`).

### Limites à connaître

- **Périmètre** : carte graphique seule. Le processeur, la mémoire, l'alimentation et l'écran
  ne sont pas comptés : la consommation réelle de la machine est plus élevée.
- **Capteur** : valeur logicielle fournie par le pilote, pas un wattmètre. Elle est mise à jour
  toutes les ~250 ms : pour les générations très courtes (configuration C, ~1 s), l'incertitude
  relative est plus forte, d'où la moyenne sur 10 essais.
- **Puissance au repos** : la carte consomme déjà quelques dizaines de watts sans générer
  (affichage, applications ouvertes). Les résultats donnent l'énergie totale et l'énergie
  « au-dessus du repos ».
- **Un seul matériel** : les valeurs sont propres à cette machine et à ces logiciels.
  Un autre GPU ou un autre modèle donnerait d'autres chiffres ; ce sont les **écarts entre
  configurations** qui sont instructifs.

## Reproduire

Prérequis : carte AMD avec le pilote AMD Software, ComfyUI lancé, modèles
`checkpoints/Illustrious-XL-v1.0.safetensors` et `loras/lcm-lora-sdxl.safetensors`.

```powershell
python outils/mesure-ia/adlx_puissance.py
python outils/mesure-ia/mesurer_generation.py --comfy http://127.0.0.1:8188 --essais 10 --repos 20
```

Le premier script vérifie la lecture de la puissance ; le second lance les mesures et écrit un
nouveau fichier dans `resultats/`.

Pour une autre marque de carte graphique, il suffit de remplacer `adlx_puissance.py` par un
module qui expose la même méthode `lire()` (par exemple avec `nvidia-smi` pour NVIDIA).
