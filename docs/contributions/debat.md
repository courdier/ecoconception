# Contribution individuelle : la rubrique « Débat »

## Prénom NOM

Fanirininony ANDRIATOMBONTSOA

## Langage

HTML5 et CSS3 uniquement. Je n'ai ajouté ni JavaScript, ni image, ni bibliothèque. La seule balise script chargée est `hamburger.js`, commune à tout le site.

## Description des contributions

### Ce qui a été fait

- Une page d'entrée, `pages/debat.html` : une courte rubrique « Qui est responsable de l'impact du numérique ? », avec 2 à 3 phrases d'accroche et un lien « Lire l'analyse → ».
- Une page d'analyse, `pages/responsable_impact_numerique.html`, qui suit le cycle de vie d'un équipement numérique :
  1. Introduction : qui décide ?
  2. Les fabricants et l'extraction des matières premières
  3. Les infrastructures : opérateurs télécom, data centers et cloud
  4. Les concepteurs : développeurs, designers UX, chefs de projet, product owners
  5. Les plateformes et le modèle publicitaire
  6. Les utilisateurs : particuliers, entreprises, administrations
  7. Les pouvoirs publics et la fin de vie (DEEE)
  8. Conclusion avec un tableau récapitulatif : acteur, levier d'action, source
  9. 23 références bibliographiques numérotées

  Chaque section se termine par une nuance qui présente les arguments de chaque camp, sans trancher à la place du lecteur. Un sommaire en haut de page mène directement à chaque section.

- Uniquement des sources vérifiables : des articles à comité de lecture et des actes de conférences (Science, Patterns, Journal of Cleaner Production, CHI, ICSE…), complétés par des rapports institutionnels clairement identifiés (ADEME et Arcep, Haut Conseil pour le Climat, Global E-waste Monitor 2024). Chaque chiffre renvoie à sa référence par un appel de note `[N]`.

### Règles d'écoconception proposées

| N°  | Règle                                                     | Application sur les pages Débat                                                                                                                                                                              |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Aucune image quand le texte suffit                        | 0 image sur les deux pages                                                                                                                                                                                   |
| 2   | Pas de JavaScript pour un contenu statique                | 0 octet de JavaScript ajouté ; les pages fonctionnent sans JavaScript                                                                                                                                        |
| 3   | Aucune nouvelle dépendance externe                        | Pas de CDN, pas de nouvelle police, pas de bibliothèque d'icônes                                                                                                                                             |
| 4   | Charger le contenu long seulement à la demande            | `debat.html` est une page d'accroche d'environ 3 Ko ; l'analyse (environ 37 Ko) n'est chargée que si le visiteur clique                                                                                      |
| 5   | Préférer les éléments HTML natifs aux composants scriptés | Sommaire en liste d'ancres internes, tableau sémantique (`<table>`, `<caption>`, `<th scope="col">`), sections et titres hiérarchisés                                                                        |
| 6   | Réutiliser le CSS existant, ne rien charger en plus       | Classes existantes réutilisées (`.intro-card`, `.button-secondary`, `.bibliography-list`) ; seulement deux petits blocs ajoutés dans `styles.css` (`.toc` et `.recap-table`), sans nouvelle feuille de style |
| 7   | Supprimer les métadonnées inutiles                        | Retrait de `keywords`, `http-equiv="cache-control"` et `expires`, ignorés par les navigateurs et les moteurs de recherche                                                                                    |
| 8   | Concevoir pour tous les écrans                            | Sommaire en grille CSS adaptative (`auto-fit`) : 2 ou 3 colonnes sur ordinateur, 1 colonne sur mobile                                                                                                        |

Ces règles s'appuient sur le RGESN (Arcep, Arcom et ADEME, 2024) et sur les bonnes pratiques d'écoconception web de GreenIT.fr.

### Bénéfices attendus de quelques règles

- Règle 4 (chargement à la demande) : un visiteur qui parcourt le site sans lire l'analyse ne télécharge que la page d'accroche, soit environ 3 Ko de HTML et 50 éléments, au lieu de 37 Ko et 320 éléments. Or le nombre d'éléments du DOM est le critère qui pèse le plus dans l'EcoIndex (coefficient 3 sur 6).
- Règles 1, 2 et 3 (ni image, ni script, ni dépendance) : dans la formule de l'EcoIndex, le nombre de requêtes compte deux fois plus que le poids (coefficient 2 contre 1). Les deux pages n'ajoutent aucune requête à celles que tout le site fait déjà (HTML, `styles.css`, `hamburger.js`, favicon et police Google Fonts), soit 6 au total.
- Règle 6 (pas de nouvelle feuille CSS) : les styles ajoutés tiennent en une cinquantaine de lignes dans `styles.css`. Un visiteur qui vient d'une autre page du site a déjà ce fichier en cache, et ne télécharge donc rien de plus.

### Démarche et outils de mesure

J'ai estimé les scores avec un script Python qui applique la formule de l'EcoIndex et ses tables de quantiles standard :
`score = 100 − 5 × (3 × qDOM + 2 × qRequêtes + qPoids) / 6`.

Le nombre d'éléments du DOM a été compté avec un analyseur HTML. Le poids additionne la page, `styles.css`, `hamburger.js`, la favicon et la police.

| Page                                | Éléments DOM | Requêtes | Poids estimé   | Score estimé   |
| ----------------------------------- | ------------ | -------- | -------------- | -------------- |
| `debat.html`                        | 50           | 6        | environ 123 Ko | environ 93 (A) |
| `responsable_impact_numerique.html` | 320          | 6        | environ 156 Ko | environ 83 (A) |

Ces scores ne remplacent pas une mesure officielle : pour les confirmer, on peut passer les pages en ligne dans ecoindex.fr ou dans l'extension GreenIT-Analysis.

### Autres tâches réalisées

- Navigation : ajout du lien « Débat » dans la barre de menu des 37 pages du site, avec un ordre commun à toutes : Home, Quiz, Chiffres, Outils, Langages, Ateliers, Ressources, Débat, Terminologie.

## Suggestions d'amélioration

### Améliorations immédiates

1. Corriger les liens du menu de `pages/quizV2.html` : ils utilisent `../` et `../../index.html` alors que le fichier est dans `pages/`, et mènent donc vers des pages qui n'existent pas.
2. Remplacer la police Google Fonts ou l'héberger sur le site : elle ne sert qu'aux titres `h1`, mais coûte sur chaque page 2 requêtes vers des serveurs externes et environ 25 Ko.
3. Alléger la favicon : `favicon.ico` pèse environ 15 Ko, alors qu'une version SVG ou un PNG optimisé serait beaucoup plus léger.

### Extensions futures

1. Ajouter d'autres questions de débat sur le même modèle (accroche courte, analyse sourcée, nuance par section, tableau final), par exemple sur l'IA générative ou sur la sobriété des usages.
2. Découper `styles.css` (environ 77 Ko, chargé en entier sur chaque page) en une feuille commune et des feuilles par rubrique, chargées seulement là où elles servent.

## Liste des fichiers créés ou modifiés

**Créés**

- `pages/debat.html` : page d'entrée de la rubrique Débat.
- `pages/responsable_impact_numerique.html` : analyse complète, sommaire, tableau récapitulatif et 23 références.

**Modifiés**

- `assets/styles/styles.css` : ajout des blocs `.toc` (sommaire) et `.recap-table` (tableau récapitulatif).
- Barre de navigation (lien Débat et nouvel ordre) :
  - `index.html`
  - `pages/` : `a-propos.html`, `en-pratique.html`, `langages.html`, `outils.html`, `quelques-chiffres.html`, `quizV1.html`, `quizV2.html`, `quizz-access.html`, `ressources.html`, `terminologie.html`
  - `pages/en-pratique/` : `qcm.html`, `tp01.html`, `tp02.html`, `tp03.html`, `tp04.html`
  - `pages/fiches/` : `amazonprimevideo.html`, `chatgpt.html`, `claude.html`, `facebook.html`, `google.html`, `instagram.html`, `netflix.html`, `steam.html`, `tiktok.html`, `twitch.html`, `x.html`, `youtube.html`
  - `pages/langages/` : `c.html`, `dart.html`, `java.html`, `javascript.html`, `php.html`, `python.html`, `rust.html`
- `templates/service.html` et `templates/tp.html` : seules les fins de ligne ont changé, le contenu est identique.
