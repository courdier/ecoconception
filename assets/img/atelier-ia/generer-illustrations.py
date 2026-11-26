"""
Génère le schéma « du bruit à l'image » de l'atelier « Génération d'images par IA »
(fichiers debruitage-0.webp à debruitage-5.webp).

IMPORTANT : ces images NE SONT PAS produites par un modèle d'IA.
Elles sont dessinées par ce script (paysage procédural + bruit) pour illustrer
le principe du débruitage progressif.

Les images des configurations A, B et C (config-*.webp, detail-*.webp) sont, elles,
de vraies générations réalisées lors de la mesure : voir outils/mesure-ia/.

Utilisation (depuis la racine du dépôt) :
    python assets/img/atelier-ia/generer-illustrations.py

Dépendances : Pillow (avec support WebP) et NumPy.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

OUT = Path(__file__).resolve().parent
RNG = np.random.default_rng(42)
SIZE = 1024


def fractal_noise_1d(n, octaves=6, seed=0):
    rng = np.random.default_rng(seed)
    out = np.zeros(n)
    amp, freq = 1.0, 4
    for _ in range(octaves):
        pts = rng.uniform(-1, 1, freq + 1)
        out += amp * np.interp(np.linspace(0, freq, n), np.arange(freq + 1), pts)
        amp *= 0.5
        freq *= 2
    return out


def fractal_noise_2d(h, w, octaves=7, seed=0):
    rng = np.random.default_rng(seed)
    out = np.zeros((h, w))
    amp, cells = 1.0, 4
    for _ in range(octaves):
        grid = rng.uniform(-1, 1, (cells + 1, cells + 1)).astype(np.float32)
        img = Image.fromarray(grid, mode="F").resize((w, h), Image.BICUBIC)
        out += amp * np.asarray(img)
        amp *= 0.55
        cells *= 2
    return out


def render_scene(size=SIZE):
    y, x = np.mgrid[0:size, 0:size] / size
    img = np.zeros((size, size, 3))

    # Ciel : dégradé + nuages
    sky_top = np.array([0.10, 0.16, 0.30])
    sky_bot = np.array([0.95, 0.62, 0.42])
    t = np.clip(y / 0.62, 0, 1)[..., None]
    img[:] = sky_top * (1 - t) + sky_bot * t
    clouds = fractal_noise_2d(size, size, 7, seed=3)
    clouds = np.clip((clouds - 0.25) * 1.6, 0, 1) * (y < 0.45)
    img += clouds[..., None] * np.array([0.35, 0.28, 0.25])

    # Soleil
    d = np.sqrt((x - 0.68) ** 2 + (y - 0.42) ** 2)
    img += (np.exp(-(d / 0.05) ** 2) * 0.9 + np.exp(-(d / 0.18) ** 2) * 0.25)[..., None] * np.array([1.0, 0.85, 0.55])

    # Montagnes (3 plans), avec texture fine pour rendre visible la résolution
    layers = [
        (0.46, 0.14, np.array([0.36, 0.33, 0.45]), 11),
        (0.54, 0.12, np.array([0.22, 0.26, 0.34]), 12),
        (0.62, 0.10, np.array([0.10, 0.20, 0.18]), 13),
    ]
    texture = fractal_noise_2d(size, size, 8, seed=7)
    for base, amp, color, seed in layers:
        ridge = base - amp * (0.5 + 0.5 * fractal_noise_1d(size, 8, seed))
        mask = y > ridge[None, :]
        shade = color * (0.85 + 0.25 * texture[..., None])
        img = np.where(mask[..., None], shade, img)

    # Lac avec reflet et vaguelettes fines
    lake = y > 0.70
    refl_y = np.clip(2 * 0.70 - y, 0, 0.999)
    ripples = 0.012 * np.sin(y * size * 0.9) * (1 + fractal_noise_2d(size, size, 5, seed=21))
    ry = np.clip((refl_y * size).astype(int), 0, size - 1)
    rx = np.clip(((x + ripples) * size).astype(int), 0, size - 1)
    reflection = img[ry, rx] * 0.65 + np.array([0.02, 0.06, 0.10])
    img = np.where(lake[..., None], reflection, img)

    # Herbes au premier plan : traits fins (détails haute fréquence)
    grass_rng = np.random.default_rng(5)
    for _ in range(2600):
        gx = grass_rng.integers(0, size)
        gh = grass_rng.integers(8, 34)
        gy0 = size - 1 - grass_rng.integers(0, 60)
        lean = grass_rng.uniform(-0.4, 0.4)
        c = np.array([0.18, 0.42, 0.22]) * grass_rng.uniform(0.6, 1.3)
        for k in range(gh):
            px = int(gx + lean * k)
            py = gy0 - k
            if 0 <= px < size and 0 <= py < size:
                img[py, px] = c

    # Grain fin
    img += RNG.normal(0, 0.012, img.shape)
    return Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))


def save(img, name, quality=72):
    path = OUT / name
    img.save(path, "WEBP", quality=quality, method=6)
    print(f"{name:28s} {img.size[0]}x{img.size[1]}  {path.stat().st_size / 1024:.1f} Ko")


def main():
    # Les images des configurations A, B et C sont désormais de vraies générations,
    # produites lors de la mesure (voir outils/mesure-ia/). Ce script ne produit
    # plus que le schéma du débruitage, afin de ne pas les écraser.
    full = render_scene(SIZE)

    # Principe du débruitage : du bruit pur vers l'image (schéma, 6 états)
    small = np.asarray(full.resize((256, 256), Image.LANCZOS)).astype(np.float32) / 255
    # Bruit majoritairement achromatique : visuellement équivalent, fichiers bien plus légers
    nrng = np.random.default_rng(1)
    noise = nrng.normal(0.5, 0.3, small.shape[:2])[..., None] + nrng.normal(0, 0.08, small.shape)
    levels = [1.0, 0.85, 0.65, 0.45, 0.22, 0.0]
    blurs = [0, 6, 4, 2.5, 1, 0]
    for i, (lvl, blur) in enumerate(zip(levels, blurs)):
        base = Image.fromarray((small * 255).astype(np.uint8))
        if blur:
            base = base.filter(ImageFilter.GaussianBlur(blur))  # les grandes formes apparaissent d'abord
        base_arr = np.asarray(base).astype(np.float32) / 255
        mix = np.sqrt(1 - lvl ** 2) * base_arr + lvl * noise if lvl < 1 else noise
        frame = Image.fromarray((np.clip(mix, 0, 1) * 255).astype(np.uint8))
        save(frame, f"debruitage-{i}.webp", quality=45)


if __name__ == "__main__":
    main()
