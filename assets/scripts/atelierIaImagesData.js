/*
 * Données de l'atelier « Génération d'images par IA et écoconception ».
 *
 * Ce fichier ne contient QUE des données : modifiez-le pour changer les
 * configurations ou les mesures, sans toucher à l'interface
 * (assets/scripts/atelierIaImages.js).
 *
 * ─── Statuts possibles d'une donnée ───────────────────────────────────────
 *   "mesure"     : valeur réellement obtenue lors d'une expérimentation documentée.
 *   "estime"     : ordre de grandeur calculé à partir d'une hypothèse explicite
 *                  (jamais présenté comme une mesure).
 *   "simule"     : valeur fictive servant uniquement à illustrer un scénario.
 *   "non-mesure" : aucune donnée disponible → affiché « Donnée non mesurée ».
 *
 * ─── Origine des mesures ──────────────────────────────────────────────────
 * Mesures réalisées le 25/11/2026 sur une AMD Radeon RX 9070 XT avec ComfyUI,
 * à l'aide des scripts de outils/mesure-ia/ (protocole détaillé dans le README
 * de ce dossier, résultats bruts dans outils/mesure-ia/resultats/).
 * Chaque valeur est la moyenne de 10 générations, après une génération de
 * chauffe non comptée. Énergie = puissance de la carte intégrée sur la durée
 * de chaque génération (Énergie (Wh) = Puissance moyenne (W) × Durée (h)).
 *
 * Pour refaire les mesures sur un autre matériel : relancer
 * outils/mesure-ia/mesurer_generation.py puis reporter ici les moyennes.
 * Si seule la puissance et la durée sont connues, laisser energieWh à null :
 * l'interface la calculera.
 */

window.ATELIER_IA_DATA = {
    /* États du schéma « du bruit à l'image » (section 2) : illustration, pas une vraie génération. */
    debruitage: [
        { src: "../../assets/img/atelier-ia/debruitage-0.webp", legende: "Départ : un bruit aléatoire, sans aucune image." },
        { src: "../../assets/img/atelier-ia/debruitage-1.webp", legende: "Premières étapes : le modèle devine les grandes masses de couleur." },
        { src: "../../assets/img/atelier-ia/debruitage-2.webp", legende: "Les formes principales (ciel, montagnes) se dessinent." },
        { src: "../../assets/img/atelier-ia/debruitage-3.webp", legende: "La composition est en place, le bruit diminue." },
        { src: "../../assets/img/atelier-ia/debruitage-4.webp", legende: "Dernières étapes : les détails fins sont affinés." },
        { src: "../../assets/img/atelier-ia/debruitage-5.webp", legende: "Fin : l'image est entièrement débruitée." }
    ],

    /* Contexte commun aux trois mesures. */
    contexteMesures: {
        materiel: "AMD Radeon RX 9070 XT (16 Go) — carte graphique seule",
        logiciel: "ComfyUI 0.45.5, PyTorch 2.12 (ROCm 7.14), Windows 11",
        date: "25/11/2026",
        essais: 10,
        puissanceReposW: 60.0,
        protocole:
            "Moyenne de 10 générations après une génération de chauffe. Puissance totale de la carte " +
            "relevée par le pilote AMD (ADLX) toutes les 250 ms et intégrée sur la durée de chaque génération. " +
            "Hors processeur, mémoire, alimentation et écran.",
        prompt: "scenery, mountain landscape at sunset, lake with reflection, tall grass in foreground, clouds, sun"
    },

    configurations: [
        {
            id: "standard",
            lettre: "A",
            nom: "Standard",
            resume: "Génération classique par diffusion.",
            largeur: 1024,
            hauteur: 1024,
            etapes: 30,
            methode:
                "Modèle de diffusion classique (Illustrious-XL v1.0, de la famille SDXL, conçu pour 1024 × 1024), " +
                "échantillonneur euler, 30 étapes. C'est la référence de comparaison.",
            vigilance:
                "La résolution la plus élevée multiplie le nombre de pixels à calculer : " +
                "intéressant pour un tirage ou un grand écran, souvent superflu pour une vignette.",
            image: {
                apercu: "../../assets/img/atelier-ia/config-a-apercu.webp",
                pleineTaille: "../../assets/img/atelier-ia/config-a-1024.webp",
                pleineTailleKo: 78,
                detail: "../../assets/img/atelier-ia/detail-a.webp",
                detailTaille: 256,
                alt: "Image générée en configuration standard : paysage de style illustration, montagne enneigée au coucher du soleil, lac où se reflète le soleil, herbes dorées très détaillées au premier plan.",
                altDetail: "Zoom en pixels réels : les brins d'herbe dorés sont fins, nets et bien dessinés."
            },
            mesure: {
                statut: "mesure",
                tempsSecondes: 10.38,
                tempsEcartType: 0.18,
                puissanceMoyenneW: 270.8,
                energieWh: 0.781,
                energieEcartType: 0.007,
                modele: "Illustrious-XL v1.0 (SDXL)"
            },
            qualite: {
                statut: "non-mesure",
                valeur: null,
                methode: null,
                attendu: "Observé : image la plus détaillée et la plus fidèle à la demande. Sert de référence."
            }
        },
        {
            id: "optimisee",
            lettre: "B",
            nom: "Optimisée",
            resume: "Résolution et nombre d'étapes réduits.",
            largeur: 512,
            hauteur: 512,
            etapes: 15,
            methode:
                "Même modèle (Illustrious-XL v1.0) et même échantillonneur, avec une image quatre fois moins grande " +
                "en pixels et deux fois moins d'étapes de débruitage.",
            vigilance:
                "Ce modèle a été conçu pour 1024 × 1024 : en 512 × 512, il produit une autre composition, souvent moins " +
                "soignée. Réduire la résolution ne donne pas la même image en plus petit, mais une autre image.",
            image: {
                apercu: "../../assets/img/atelier-ia/config-b-apercu.webp",
                pleineTaille: null,
                detail: "../../assets/img/atelier-ia/detail-b.webp",
                detailTaille: 128,
                alt: "Image générée en configuration optimisée : montagne sombre au coucher du soleil, ciel bleu avec nuages, forêt de sapins et lac rectiligne bordé d'un champ ; composition différente et plus simple que l'image standard.",
                altDetail: "Zoom en pixels réels sur la même zone relative : l'herbe et la rive sont formées de gros pixels, les détails sont grossiers."
            },
            mesure: {
                statut: "mesure",
                tempsSecondes: 2.48,
                tempsEcartType: 0.05,
                puissanceMoyenneW: 113.4,
                energieWh: 0.078,
                energieEcartType: 0.002,
                modele: "Illustrious-XL v1.0 (SDXL)"
            },
            qualite: {
                statut: "non-mesure",
                valeur: null,
                methode: null,
                attendu: "Observé : image correcte mais moins détaillée, avec une composition différente de A."
            }
        },
        {
            id: "acceleree",
            lettre: "C",
            nom: "Accélérée",
            resume: "Très peu d'étapes, avec une méthode conçue pour cela.",
            largeur: 512,
            hauteur: 512,
            etapes: 5,
            methode:
                "Même modèle complété par LCM-LoRA SDXL, un petit module (environ 400 Mo) entraîné par « distillation » " +
                "pour générer en 4 à 8 étapes (Latent Consistency Model), avec l'échantillonneur lcm et un guidage réduit.",
            vigilance:
                "Ce n'est pas une optimisation universelle : sans ce module, 5 étapes donnent une image floue ou inachevée. " +
                "Même avec lui, l'image perd en netteté et en fidélité : ici, le modèle a ajouté des immeubles absents de la demande.",
            image: {
                apercu: "../../assets/img/atelier-ia/config-c-apercu.webp",
                pleineTaille: null,
                detail: "../../assets/img/atelier-ia/detail-c.webp",
                detailTaille: 128,
                alt: "Image générée en configuration accélérée : lac au coucher du soleil avec reflets et roseaux, mais aussi des immeubles et une tour futuriste qui ne figuraient pas dans la demande ; rendu plus flou.",
                altDetail: "Zoom en pixels réels sur la même zone relative : la rive et l'herbe sont floues et bavent, les détails fins ont disparu."
            },
            mesure: {
                statut: "mesure",
                tempsSecondes: 1.12,
                tempsEcartType: 0.04,
                puissanceMoyenneW: 95.2,
                energieWh: 0.030,
                energieEcartType: 0.001,
                modele: "Illustrious-XL v1.0 + LCM-LoRA SDXL"
            },
            qualite: {
                statut: "non-mesure",
                valeur: null,
                methode: null,
                attendu: "Observé : image plus floue et moins fidèle (éléments inventés), mais obtenue presque dix fois plus vite que A."
            }
        }
    ]
};
