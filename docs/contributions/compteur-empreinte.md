# Amélioration individuelle : un compteur d'empreinte EcoIndex sur chaque page

## Membre

Travail individuel : Teddy GREZE.

## Langage

JavaScript, avec HTML et CSS, sans bibliothèque.

## Ma contribution

J'ai ajouté un compteur d'empreinte dans le bandeau du bas de chaque page. Il affiche une estimation selon la méthode EcoIndex, par exemple « A 89/100, 1,22 g de CO₂e ». On l'ouvre d'un clic ou avec la touche Entrée. Voici ce qu'on y trouve.

| Élément du panneau | Ce qu'il montre |
|---|---|
| Réglette de G à A | La note de la page et son score sur 100 |
| Impact par visite | Les grammes de CO₂e et les centilitres d'eau |
| Trois jauges | Chaque mesure comparée à son objectif |
| Fichiers les plus lourds | Les trois premiers, avec leur part du poids de la page |
| Liens | La mesure officielle sur ecoindex.fr et la page Outils du site |

## De quoi je me suis inspiré

Je suis parti d'EcoIndex, la méthode de GreenIT.fr et du Collectif Conception Numérique Responsable. J'ai repris tels quels les seuils, les objectifs, les notes et la formule de leur dépôt public (https://github.com/cnumr/ecoindex_reference). J'ai aussi regardé leur extension GreenIT-Analysis (https://github.com/cnumr/GreenIT-Analysis) pour en apprendre un peu plus.

Il existe aussi une API EcoIndex. Je ne l'ai pas utilisée car chaque visite aurait déclenché un appel réseau et une analyse sur un serveur.

## Les données utilisées

| Mesure | Comment elle est obtenue | Objectif EcoIndex | Poids dans le score |
|---|---|---|---|
| Éléments de la page | Nombre de balises, sans l'intérieur des images SVG ni le compteur lui-même | 600 | 3 |
| Requêtes | La page et chaque fichier qu'elle a chargé | 40 | 2 |
| Poids transféré | Taille des fichiers donnée par l'API Performance du navigateur | 1 024 Ko | 1 |

Les objectifs servent seulement de repère dans le panneau, ils n'entrent pas dans le score.

## Comment le calcul est fait

**1. Situer chaque mesure.** Pour chacune, EcoIndex donne 21 seuils, appelés quantiles, tirés d'un grand nombre de sites réels. C'est un barème qui va de 0 (page très sobre) à 20 (page très lourde). Le compteur calcule la position de la page entre deux seuils.

**2. Calculer le score.**

```
score = 100 - 5 × (3 * position des éléments + 2 * position des requêtes + position du poids) / 6
```

Les éléments comptent triple parce qu'une page complexe fait plus travailler l'appareil du visiteur.

**3. Donner une note.**

| Note | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| Score | plus de 80 | plus de 70 | plus de 55 | plus de 40 | plus de 25 | plus de 10 | 10 ou moins |

**4. En déduire le CO₂ et l'eau.**

```
CO₂ (g) = 2 + 2 × (50 - score) / 100
eau (cl) = 3 + 3 × (50 - score) / 100
```

Les valeurs de ces deux formules sont celles de Frédéric Bordage.

**Exemple avec la page d'accueil**, relevée sur un serveur local :

| Mesure | Valeur | Position sur 20 |
|---|---|---|
| Éléments | 144 | 2,82 |
| Requêtes | 6 | 1,31 |
| Poids | 121,2 Ko | 1,84 |

```
score = 100 - 5 * (3 * 2,82 + 2 * 1,31 + 1,84) / 6 = 89
```

Soit la note A, 1,22 g de CO₂e et 1,82 cl d'eau par visite.

Ça reste une estimation : la valeur change avec le cache et la taille de l'écran. Le site officiel ecoindex.fr mesure toujours dans les mêmes conditions, son score peut donc être un peu différent.

## Règles d'écoconception proposées et bénéfices

| Règle | Application | Bénéfice attendu |
|---|---|---|
| Rendre l'impact visible | Un badge sur chaque page, avec les fichiers les plus lourds | On voit quoi alléger en premier |
| Mesurer dans le navigateur | Aucun serveur ni service extérieur | Aucune requête de mesure, aucune donnée envoyée |
| Écrire en JavaScript natif | Aucune bibliothèque | Un script de 4,2 Ko compressés |
| Charger après l'essentiel | Le compteur attend que la page soit affichée et le navigateur inactif | La page n'est pas ralentie |
| Ne pas calculer en continu | Une mesure à l'affichage, puis à l'ouverture du panneau | Pas de travail en arrière-plan |
| Utiliser le HTML natif | Balises details et summary pour ouvrir et fermer | Moins de code à charger et à exécuter |
| N'afficher que le nécessaire | Le panneau n'existe dans la page que lorsqu'il est ouvert | Une page plus légère le reste du temps |
| Dessiner en CSS | Réglette et jauges sans image | Aucune requête ni image en plus |
| Penser à tous | Utilisable au clavier, texte prévu pour les lecteurs d'écran, écran de 320 px | Accessible, y compris sur de petits appareils |

Le compteur sert surtout à voir où agir. Il m'a par exemple montré qu'une police d'icônes de 125 Ko représente 34 à 39 % du poids de certaines pages.

## Ce que coûte le compteur

Estimation sur la page d'accueil, avec des fichiers non compressés :

| Indicateur | Sans le compteur | Avec le compteur |
|---|---|---|
| Éléments | 144 | 153 |
| Requêtes | 5 | 6 |
| Poids | 100,5 Ko | 121,2 Ko |
| Score EcoIndex | 89,5 | 89,0 |
| CO₂e par visite | 1,21 g | 1,22 g |

## Améliorations immédiates

| Action |
|---|
| Remplacer Font Awesome par les seules icônes utilisées |
| Minifier la feuille de style principale, d'environ 77 à 52 Ko |
| Corriger les sept pages de langages qui appellent encore un script inexistant |

## Extensions futures

| Action |
|---|
| Vérifier automatiquement l'empreinte des pages à chaque pull request |
| Créer une page qui récapitule le score de tout le site |

## Fichiers créés ou modifiés

| Fichier | Rôle de la modification |
|---|---|
| `assets/scripts/empreinte.js` (créé) | Calcule et affiche l'empreinte |
| `assets/scripts/hamburger.js` (modifié) | Charge le compteur |
| `assets/styles/styles.css` (modifié) | Apparence du compteur et du pied de page |
| `pages/langages.html` (modifié) | Retrait d'un script inexistant |
| Les sept pages du dossier `pages/langages` (modifiées) | Chargement du compteur |
| `docs/contributions/compteur-empreinte.md` (créé) | Documentation |

## Dépôt sur GitHub

J'ai déposé mon travail, depuis la branche Teddy-Greze_26-27. La pull request n° 41 l'a fusionné dans la branche M2Info_26-27 : https://github.com/courdier/ecoconception/pull/41
