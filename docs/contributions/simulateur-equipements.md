# Travail de groupe : simulateur d'empreinte CO₂ des équipements

## Groupe

- **Abdoul Fatao OUEDRAOGO**
- **Yanis VINGADASSAMY**

## Langage

**HTML5, CSS3 et JavaScript natif** (ES2015), sans bibliothèque ni framework.

## Description de la contribution

### Ce que nous avons ajouté et pourquoi

- **Nouvelle page** : `pages/simulateur-equipements.html`, accessible depuis une quatrième carte de la page d'accueil, placée entre « Quiz » et « Ateliers ».
- **Pourquoi** : le cours montre que l'impact du numérique vient d'abord de la fabrication des équipements des utilisateurs. Pour un smartphone, la fabrication représente 99 % de l'empreinte carbone. Le site ne permettait pas de s'approprier ce constat : les quiz notent les usages en points et les fiches décrivent des applications. Aucun outil ne chiffrait le levier le plus efficace, qui est de garder ses appareils plus longtemps.
- **Fonctionnement** :
    1. L'utilisateur indique, pour 5 types d'appareils (smartphone, ordinateur portable, tablette, télévision, ordinateur fixe), combien il en possède et combien d'années il les garde.
    2. Le résultat s'affiche à chaque saisie : empreinte annuelle en kg eq. CO₂, part de la fabrication, détail par appareil et trois repères (kilomètres en voiture, part du budget carbone soutenable, moyenne française).
    3. Un curseur répond à la question « Et si je gardais chaque appareil N ans de plus ? » et affiche le gain en kg eq. CO₂, en pourcentage et en kilomètres parcourus en voiture thermique.
    4. La page explique la formule, les données de référence, les limites du calcul et donne des conseils pour faire durer ses appareils.
- **Formule** : empreinte annuelle = nombre × (fabrication ÷ durée de vie + usage annuel).
- **Références** : données par appareil d'Impact CO₂ (ADEME), d'après l'étude ADEME / Arcep (mise à jour 2025) et la Base Empreinte. Équivalence voiture : Benchmark Green IT 2021. Budget soutenable et moyenne française : cours Eco-TIC, d'après l'étude iNum de GreenIT.fr (2021). Les sources sont affichées sur la page.

### Règles d'écoconception proposées

| N° | Règle | Application dans la contribution |
|----|-------|----------------------------------|
| 1 | Limiter la fonctionnalité à l'essentiel | 5 appareils, 2 champs par appareil, 1 curseur ; pas de compte, pas d'historique |
| 2 | Calculer dans le navigateur, sans serveur | Aucune requête pendant le calcul ; aucune donnée personnelle envoyée ou stockée (ni cookie, ni stockage local) |
| 3 | Écrire en JavaScript natif, sans bibliothèque | Un script de 6 Ko (2,1 Ko compressés), chargé avec `defer` |
| 4 | Dessiner les graphiques en CSS | Barre fabrication / usage et barres par appareil : de simples `<span>` dont la largeur change |
| 5 | Ne pas charger de bibliothèque d'icônes pour quelques pictogrammes | Pas de Font Awesome sur la page : 4 émojis natifs, masqués aux lecteurs d'écran |
| 6 | Charger le CSS et le JavaScript uniquement sur la page concernée | `simulateur.css` et `simulateurEquipements.js` ne sont chargés que par le simulateur |
| 7 | Limiter les accès au DOM | Les éléments sont recherchés une seule fois ; un seul écouteur d'événement pour tout le formulaire ; aucun élément créé par le script |
| 8 | Utiliser les composants natifs du navigateur | Champs `number` et `range`, bouton `reset`, balise `<output>` |
| 9 | Garder la page utile sans JavaScript | Formulaire, données, méthode et conseils sont dans le HTML ; un message `<noscript>` prévient l'utilisateur |
| 10 | Rendre l'outil accessible et utilisable partout | Étiquettes sur tous les champs, navigation au clavier, résultat annoncé aux lecteurs d'écran, mise en page adaptée au mobile |
| 11 | Réutiliser les composants existants | La carte d'accueil reprend le composant des 3 cartes existantes ; aucune nouvelle requête sur la page d'accueil |

Ces règles s'inspirent du référentiel « 115 bonnes pratiques d'écoconception web » (GreenIT.fr et collectif Conception Numérique Responsable) et du RGESN (Arcep, Arcom et ADEME, 2024).

### Bénéfices attendus pour les règles essentielles

| Règle | Solution évitée | Bénéfice |
|-------|-----------------|----------|
| 3 et 4. JavaScript natif et graphiques en CSS | Chart.js, utilisée par 8 pages du site : 210 Ko (71 Ko compressés) et 1 requête vers un CDN | 6 Ko de script (2,1 Ko compressés), soit environ 35 fois moins |
| 5. Pas de Font Awesome | Chargée par 27 pages du site : 2 requêtes et 143 Ko transférés | 0 requête et 0 octet |
| 2. Calcul dans le navigateur | Un service web avec base de données | Aucun serveur sollicité, aucune donnée personnelle collectée |
| 11. Réutilisation à l'accueil | Un nouveau composant avec son propre style | Page d'accueil : 0 requête de plus, 6 éléments et 0,3 Ko compressé de plus |

**Mesures de la nouvelle page**

| Indicateur | Simulateur | Pour comparer : page d'accueil |
|------------|------------|-------------------------------|
| Requêtes HTTP | 7 | 7 |
| Éléments du DOM | 216 | 136 |
| Poids transféré (compressé) | 33 Ko | 168 Ko |
| EcoIndex | 87,2 (A) | 89,1 (A) |
| Lighthouse : performance / accessibilité / bonnes pratiques / SEO | 99 / 100 / 100 / 100 | non mesuré |
| Anomalies d'accessibilité (axe-core) | 0 | 2 (déjà présentes avant notre ajout) |

Sur la page d'accueil, l'EcoIndex passe de 89,3 à 89,1 après l'ajout de la carte.

**Bénéfice pour l'utilisateur** : avec les valeurs moyennes (un smartphone, un ordinateur portable et une télévision), l'empreinte est de 117 kg eq. CO₂ par an, dont 93 % pour la fabrication. Garder chaque appareil 2 ans de plus la ramène à 84 kg, soit 33 kg eq. CO₂ évités par an (28 % de moins), l'équivalent d'environ 292 km en voiture thermique. Le simulateur rend ce gain visible.

### Démarche et outils de mesure

- Mesures sur un serveur local, avec Chromium et un cache vide (16 novembre 2026).
- **Lighthouse 13.6**, **EcoIndex** (formule officielle, bibliothèque `ecoindex` du collectif Conception Numérique Responsable) et **axe-core 4.14**.
- **10 scénarios de test** du calcul : valeurs moyennes, durée modifiée, un seul appareil, champ vide, valeurs hors limites, bouton de remise à zéro, curseur à 0, 1 et 5 ans, saisie au clavier. Aucun écart et aucune erreur JavaScript.
- Vérification du calcul à la main : smartphone (79,3 + 0,89) ÷ 2,5 = 32,1 ; ordinateur portable (182 + 10,3) ÷ 5 = 38,5 ; télévision (328 + 41,5) ÷ 8 = 46,2 ; total 116,7, arrondi à 117 kg par an.
- Limite : mesures locales. Le poids compressé est estimé avec gzip.

### Répartition du travail dans le groupe

Le simulateur demandait six tâches, que nous nous sommes réparties à deux :

| Tâche | Réalisée par |
|-------|--------------|
| Choix du sujet et recherche des données (ADEME, cours) | Abdoul Fatao OUEDRAOGO |
| Formule de calcul et script JavaScript | Abdoul Fatao OUEDRAOGO |
| Page du simulateur : structure HTML et style CSS | Yanis VINGADASSAMY |
| Carte « Simulateur » de l'accueil, section « Pour aller plus loin » | Yanis VINGADASSAMY |
| Tests et mesures : 10 scénarios, EcoIndex, accessibilité | Yanis VINGADASSAMY |
| Documentation (README) et dépôt GitHub | Abdoul Fatao OUEDRAOGO |

**Ma part (Abdoul Fatao OUEDRAOGO)** :

- **Sujet et données** : j'ai choisi le levier de la durée de vie des équipements, puis relevé les valeurs de fabrication et d'usage des 5 appareils dans Impact CO₂ (ADEME, étude ADEME / Arcep mise à jour en 2025) et les repères du cours Eco-TIC (budget soutenable, moyenne française, équivalence voiture).
- **Calcul** : j'ai écrit la formule (nombre × (fabrication ÷ durée de vie + usage annuel)) et le script `simulateurEquipements.js` en JavaScript natif : calcul à chaque saisie, détail par appareil, curseur « N ans de plus » et gain en kg eq. CO₂, en pourcentage et en kilomètres en voiture.
- **Documentation et dépôt** : j'ai rédigé ce README et la page `docs/contributions/simulateur-equipements.md`, puis préparé la branche et la pull request.

Pour éviter tout conflit avec les autres contributions, nous n'avons pas modifié la barre de navigation (Faniry), le pied de page (Teddy) ni les pages de quiz (Aya). Le simulateur ne fait pas doublon avec le quiz : le quiz note des habitudes en points, le simulateur calcule l'empreinte des équipements en kg eq. CO₂.

### Suggestions pour le site

**Améliorations immédiates**

1. **Ajouter une entrée « Simulateur » dans la barre de navigation** et un lien depuis la page Chiffres, en coordination avec la refonte de la barre du haut.
2. **Alléger l'image de fond du quiz** : `assets/img/BG2.png` pèse 167 Ko, soit 93 % du poids transféré de la page du quiz n° 2. Une conversion en WebP ou un dégradé CSS la réduirait fortement.
3. **Ajouter d'autres appareils** (écran, box internet, console de jeux) et une option « acheté reconditionné », à partir des données publiées par l'ADEME.

**Extensions futures**

1. **Passer au multicritère** : ajouter l'eau, l'énergie primaire et les ressources abiotiques, pour ne pas réduire l'impact au seul CO₂.
2. **Créer un atelier (TP) autour du simulateur** : calculer l'empreinte du parc d'une salle informatique ou d'une promotion, puis comparer des scénarios de renouvellement.

## Liste des fichiers créés ou modifiés

| Fichier | État | Détail |
|---------|------|--------|
| `pages/simulateur-equipements.html` | Créé | Page du simulateur : formulaire, résultat, méthode, sources, conseils |
| `assets/scripts/simulateurEquipements.js` | Créé | Calcul et affichage (JavaScript natif, 6 Ko) |
| `assets/styles/simulateur.css` | Créé | Styles du simulateur (5,5 Ko) |
| `index.html` | Modifié | Quatrième carte « Simulateur » entre « Quiz » et « Ateliers » ; phrase d'introduction mise à jour |
| `assets/styles/styles.css` | Modifié | 20 lignes ajoutées : grille d'accueil à 4 cartes, titres et boutons alignés |
| `docs/contributions/simulateur-equipements.md` | Créé | Documentation de la contribution |
| `README.md` | Modifié | Courte section ajoutée dans « Contributions » : résumé, lien vers `docs/contributions/simulateur-equipements.md` et vers la pull request |

## Dépôt sur GitHub

- **Branche** : `feature/simulateur-equipements`
- **Pull request** : https://github.com/courdier/ecoconception/pull/46
- **Dépôts** : réalisés par Abdoul Fatao OUEDRAOGO, pour le groupe, à partir du travail des deux membres.
- **Documentation dans le dépôt** : le `README.md` renvoie vers `docs/contributions/simulateur-equipements.md`, qui reprend ce document.
