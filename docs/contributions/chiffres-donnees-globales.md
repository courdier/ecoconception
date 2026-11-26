# Amélioration individuelle : des données globales et parlantes sur la page « Chiffres »

## Groupe

Travail individuel : **Abdoul Fatao OUEDRAOGO**.

## Langage

**HTML5 et CSS3** uniquement. Aucun JavaScript, aucune image et aucune bibliothèque n'ont été ajoutés.

## Description de la contribution

### Élément amélioré et intérêt de la proposition

- **Page concernée** : `pages/quelques-chiffres.html` (rubrique « Chiffres » du menu).
- **Constat** : malgré son nom, la page n'affichait aucun chiffre global. Elle contenait une introduction, puis des liens vers les 11 fiches d'applications. Le visiteur passait au détail d'une application sans connaître le poids du numérique dans son ensemble, ni la façon de le mesurer, ni l'endroit où se situe l'impact.
- **Amélioration** : la page va maintenant du global au particulier. Trois sections précèdent les fiches :
    1. **L'empreinte du numérique, du monde à l'utilisateur** : 4 cartes (monde, Europe, France, utilisateur français). Chaque chiffre est accompagné d'une équivalence concrète. Exemple : 420 kg eq. CO₂ par utilisateur et par an, soit environ 3 750 km en voiture ou un quart du budget carbone soutenable d'une personne.
    2. **Comment lire ces chiffres : les 4 indicateurs** (GWP, PED, WD, ADP), avec leur nom standard, leur unité et un repère.
    3. **Où se situe vraiment l'impact ?** : étapes du cycle de vie (ISO 14040), 3 tiers techniques, types d'équipements, puis 3 points à retenir.
- **Mise à jour d'information** : un encadré présente la mise à jour ADEME / Arcep de janvier 2025 (29,5 Mt eq. CO₂, soit 4,4 % de l'empreinte carbone de la France ; terminaux 50 %, centres de données 46 %, réseaux 4 %). Il complète les chiffres du cours, qui datent de 2019 à 2021, et explique pourquoi les deux séries ne se comparent pas directement.
- **Références** : 6 sources sont listées sur la page, avec un lien vers chaque étude. Chaque chiffre renvoie à sa source par un appel de note.
- **Correction d'accessibilité** : le contenu de la page est placé dans une balise `<main>`.

### Règles d'écoconception proposées

| N° | Règle | Application dans la contribution |
|----|-------|----------------------------------|
| 1 | Ne garder que le contenu utile au message | Pas d'animation, pas de carrousel, pas de décor : uniquement des chiffres, leur équivalence et leur source |
| 2 | Pas de JavaScript pour un contenu statique | 0 octet de JavaScript ajouté ; la page fonctionne sans JavaScript |
| 3 | Dessiner les graphiques en CSS plutôt qu'avec une image ou une bibliothèque | 4 barres d'intervalle et 1 barre empilée en CSS pur (variables `--min` et `--max`) |
| 4 | Aucune image, aucune police, aucune bibliothèque d'icônes supplémentaire | La page ne charge pas Font Awesome ; elle réutilise la police et les couleurs du site |
| 5 | Ne charger une feuille de style que sur la page qui en a besoin | Nouvelle feuille `chiffres-cles.css`, chargée par cette seule page ; `styles.css` n'est pas modifiée |
| 6 | Préférer les éléments HTML natifs aux composants scriptés | Sources dans `<details>`, sigles dans `<abbr>`, listes de définitions `<dl>` |
| 7 | Concevoir pour tous les écrans et tous les appareils | Grilles CSS adaptatives, vérifiées à 390, 800 et 1 366 pixels, sans défilement horizontal |
| 8 | Rendre le contenu accessible | Balise `<main>`, titres hiérarchisés, graphiques décrits par `aria-label`, contrastes vérifiés |
| 9 | Publier des données datées et sourcées, faciles à mettre à jour | Année et source affichées pour chaque série ; les chiffres sont du simple texte HTML |

Ces règles s'inspirent du référentiel « 115 bonnes pratiques d'écoconception web » (GreenIT.fr et collectif Conception Numérique Responsable) et du RGESN (Arcep, Arcom et ADEME, 2024).

### Bénéfices attendus pour les règles essentielles

| Règle | Solution évitée | Bénéfice |
|-------|-----------------|----------|
| 3. Graphiques en CSS | Chart.js, utilisée par 8 pages du site : 210 Ko (71 Ko compressés) et 1 requête vers un CDN | 1,5 Ko de CSS à la place (0,5 Ko compressé), soit environ 140 fois moins, sans requête ni calcul côté navigateur |
| 4. Pas de Font Awesome | Chargée par 27 pages du site : 2 requêtes et 209 Ko (143 Ko transférés) | 0 requête et 0 octet pour cette page |
| 5. Feuille de style dédiée | Ajouter 7,5 Ko à `styles.css`, chargée par 36 pages | 1,9 Ko compressé sur une seule page ; les 35 autres pages ne changent pas |
| 2. Pas de JavaScript | Un script d'affichage ou d'animation | Aucun coût de processeur, ce qui ménage les appareils anciens |

**Bilan mesuré sur la page, avant et après**

| Indicateur | Avant | Après |
|------------|-------|-------|
| Requêtes HTTP | 5 | 6 |
| Éléments du DOM | 114 | 350 |
| Poids transféré (compressé) | 27,6 Ko | 33,4 Ko |
| EcoIndex | 90,8 (A) | 82,1 (A) |
| Gaz à effet de serre par page vue (EcoIndex) | 1,18 g eq. CO₂ | 1,36 g eq. CO₂ |
| Lighthouse : performance / accessibilité / bonnes pratiques / SEO | 99 / 98 / 100 / 100 | 99 / 100 / 100 / 100 |
| Anomalies d'accessibilité (axe-core) | 2 | 0 |

La page contient trois fois plus de contenu pour 5,8 Ko et 1 requête de plus. L'EcoIndex baisse logiquement, puisque le DOM grossit, mais la page reste en classe A. Le bénéfice principal est indirect : la page fait passer le message que le premier levier est de faire durer ses équipements.

### Démarche et outils de mesure

- Mesures avant et après, sur un serveur local, avec Chromium et un cache vide (16 novembre 2026).
- **Lighthouse 13.6** pour la performance, l'accessibilité, les bonnes pratiques et le référencement.
- **EcoIndex** (formule officielle, bibliothèque `ecoindex` du collectif Conception Numérique Responsable) à partir de trois mesures : éléments du DOM, requêtes HTTP et poids transféré.
- **axe-core 4.14** pour l'accessibilité (règles WCAG 2.1 A et AA).
- Contrôle visuel sur mobile, tablette et ordinateur.
- Limite : mesures locales. Le poids compressé est estimé avec gzip ; il peut varier légèrement sur GitHub Pages.

### Répartition du travail

Travail individuel : analyse de la page, recherche et vérification des sources, rédaction, intégration HTML et CSS, tests et documentation.

Pour éviter tout conflit avec les autres contributions, je n'ai modifié ni `styles.css`, ni la page Terminologie (Thomas), ni la grille des applications (Mathieu et Yanis), ni l'en-tête et le pied de page (Faniry et Teddy).

### Suggestions pour le site

**Améliorations immédiates**

1. **Remplacer Font Awesome par des icônes SVG intégrées.** Sur la page d'accueil, Font Awesome représente 2 requêtes sur 7 et 143 Ko sur 168 Ko transférés (85 %), pour 9 icônes.
2. **Utiliser la balise `<main>` sur toutes les pages.** axe-core signale 2 anomalies par page (« landmark-one-main » et « region »). La correction est faite sur la page Chiffres.
3. **Corriger deux noms d'indicateurs dans la Terminologie** : « Primary Energy Depletion » (et non « Demand ») et « Water Depletion » (et non « Demand »), puis ajouter les unités. Point signalé à Thomas, qui travaille sur cette page.

**Extensions futures**

1. **Regrouper les chiffres dans un fichier de données unique** (valeur, unité, année, source), utilisé pour générer la page. La mise à jour annuelle se ferait sans toucher au HTML, et le simulateur d'équipements pourrait utiliser les mêmes données.
2. **Ajouter un zoom « La Réunion »** : le mix électrique de l'île diffère de celui de l'Hexagone, ce qui change le poids de la phase d'utilisation.

## Liste des fichiers créés ou modifiés

| Fichier | État | Détail |
|---------|------|--------|
| `pages/quelques-chiffres.html` | Modifié | 3 nouvelles sections, encadré 2025, sources, titre, description, balise `<main>` (environ 300 lignes ajoutées) |
| `assets/styles/chiffres-cles.css` | Créé | Styles de la contribution (333 lignes, 7,5 Ko) |
| `docs/contributions/chiffres-donnees-globales.md` | Créé | Documentation de la contribution |
| `README.md` | Modifié | 1 phrase ajoutée dans la section « Contributions » : elle renvoie vers le dossier `docs/contributions/` |
