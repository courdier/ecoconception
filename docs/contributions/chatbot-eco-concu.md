# Travail de groupe : un chatbot éco-conçu et son atelier

## Groupe

- **Teddy GREZE**
- **Aya MEZIANI**
- **Fanirininony ANDRIATOMBONTSOA**

## Langage

JavaScript, avec HTML et CSS, sans bibliothèque ni framework. L'entraînement du modèle utilise Node.js, sans dépendance.

## Notre contribution

Notre sujet était d'identifier des règles d'écoconception propres à une technique d'IA et de justifier leur bénéfice. Nous avons choisi le chatbot, et nous l'avons construit pour montrer ces règles en pratique :

- **un chatbot** sur les pages du site (bouton « Une question ? ») ;
- **une page « Atelier ChatBot éco-conçu »** (`pages/en-pratique/atelier-chatbot.html`), ajoutée à la page Ateliers.

Le chatbot n'utilise pas de grand modèle de langage. Un petit modèle reconnaît le sujet de la question dans le navigateur, puis affiche une réponse rédigée à l'avance à partir du site. Il ne génère aucun texte.

## Pourquoi pas un grand modèle de langage

| Technique | Comprend une question libre ? | Ressources | Peut inventer ? |
|---|---|---|---|
| Boutons et règles fixes | Non | Quelques Ko | Non |
| Recherche par mots-clés | En partie, avec les mots exacts | Un index de quelques Ko | Non |
| **Petit classifieur (notre choix)** | **Oui, sur 75 sujets** | **23 Ko de modèle** | **Non** |
| Recherche sémantique | Oui, synonymes compris | Plusieurs dizaines de Mo | Non, si les réponses sont rédigées |
| Petit modèle de langage dans le navigateur | Oui | Des centaines de Mo à quelques Go | Oui |
| Grand modèle de langage sur serveur | Oui | Des serveurs à cartes graphiques | Oui |

## Ce que fait le chatbot

| Fonction | Détail |
|---|---|
| Questions libres | 75 sujets : chiffres, services, outils, langages, ateliers, quiz |
| Comparaisons et calculs | « TikTok ou YouTube ? », « 2 h 30 de Netflix par jour » |
| Fautes et abréviations | « netflx », « c koi », « tel » sont compris |
| Suggestions | Adaptées à la page consultée, puis « Pour aller plus loin » |
| Sources | Chaque réponse renvoie vers les pages du site |
| Doute | Demande une précision ou cite une phrase du site |
| Ignorance | Dit qu'il ne sait pas |
| Transparence | « Pourquoi cette réponse ? » montre la confiance et le temps de calcul |
| Première ouverture | Invitation à découvrir l'atelier ou à aller au chatbot |
| Conversation | Gardée dans l'onglet d'une page à l'autre ; le panneau se réduit au clic en dehors |
| Panne réseau | Bouton « Réessayer » |

## Comment il fonctionne

### Du moins coûteux au plus coûteux

| Étape | Ce qui se passe | Coût |
|---|---|---|
| 1. Bouton de suggestion | La réponse s'affiche directement | Aucun calcul |
| 2. Règle de calcul | Comparaison ou durée avec les chiffres des fiches | Quelques opérations, sans modèle |
| 3. Classifieur | Reconnaît le sujet s'il est sûr à 75 % au moins | Environ 1 ms |
| 4. Recherche | Cherche la phrase du site qui correspond | Télécharge les phrases, seulement à ce moment |
| 5. « Je ne sais pas » | Rien de fiable n'a été trouvé | Rien n'est inventé |

### Comprendre une question

1. La question est mise en minuscules, sans accents ni ponctuation, et les petits mots sont retirés.
2. Chaque mot est réduit à sa racine (« pollue » et « pollution » se rejoignent) et les synonymes sont regroupés.
3. Les fautes de frappe sont corrigées avec le mot connu le plus proche.
4. Le modèle donne un pourcentage de confiance à chaque sujet.

### Entraînement

Le modèle est une **régression logistique**. Les réponses, elles, ne sont pas apprises : elles sont préparées à l'avance.

**Aide de Claude.** Pour couvrir autant de sujets, nous nous sommes aidés de Claude (Anthropic) : il a analysé le contenu du site pour générer les sujets, les exemples de questions, les réponses et les questions de test. Claude sert uniquement à préparer ces données : le chatbot ne l'appelle jamais et fonctionne sans lui.

| Donnée | Valeur |
|---|---|
| Sujets | 75 |
| Exemples de questions, générés avec l'aide de Claude | 650 |
| Phrases d'entraînement, après ajout de tournures types | 3 370 |
| Phrases du site pour la recherche | 974, sur 42 pages |

L'entraînement se fait une fois, sur un ordinateur, en quelques secondes : `node chatbot/entrainer.mjs`. Le résultat est le même à chaque lancement.

### Compression

| Étape | Effet |
|---|---|
| Élagage | Les poids trop faibles sont supprimés : de 61 200 à 2 577 |
| Ré-entraînement | Les poids gardés sont ajustés pour retrouver la précision |
| Quantification | Chaque poids tient sur un entier de -127 à 127 |
| **Résultat** | **Le modèle passe de 1,4 Mo à 23 Ko, soit environ 63 fois moins** |

Nous avons aussi essayé d'ajouter les paires de mots : le modèle devenait trois fois plus lourd sans être plus précis. Nous les avons retirées.

### Choix du seuil de confiance

Résultats sur les 60 questions de test finales :

| Seuil | Bonnes réponses | Demandes de précision ou « je ne sais pas » | Mauvaises réponses |
|---|---|---|---|
| 30 % | 55 | 0 | 5 |
| **75 % (retenu)** | **51** | **8** | **1** |
| 95 % | 40 | 20 | 0 |

Le seuil a été choisi sur des exemples mis de côté, en comptant une mauvaise réponse comme trois fois plus grave qu'une demande de précision.

## L'atelier

La page fait manipuler plutôt que lire :

| Étape | Activité |
|---|---|
| 1. Devinez | Estimer l'écart d'énergie entre classer et générer, puis voir le graphique |
| 2. L'échelle de l'IA | Comparer six techniques sur un escalier |
| 3. Essayez | Poser une question et voir quelle étape du vrai chatbot répond |
| 4. Réglez | Déplacer le seuil de confiance et observer les résultats |
| 5. Retenez | Ouvrir les dix règles, une carte à la fois |
| 6. Observez | Visualiser la compression du modèle |
| 7. Vérifiez | Quiz de trois questions expliquées |
| 8. À vous | Quatre missions pour modifier et ré-entraîner le chatbot |

Elle n'utilise ni image ni bibliothèque et ne télécharge le chatbot que lorsqu'on l'essaie. Compressée, elle pèse environ 12 Ko, plus 2,6 Ko de script.

## Règles d'écoconception proposées et bénéfices

| N° | Règle | Application | Bénéfice attendu |
|---|---|---|---|
| 1 | Se demander d'abord si l'IA est utile | Les boutons répondent sans calcul | Le calcul évité ne consomme rien |
| 2 | Choisir le plus petit modèle qui suffit | Régression logistique | Environ vingt fois moins d'énergie que de générer du texte |
| 3 | Préparer une réponse une fois, la servir à tous | 75 réponses préparées à partir du site, avec liens | Pas de génération à chaque question, pas d'invention |
| 4 | Calculer chez l'utilisateur, si le modèle est très léger | Aucun serveur | Pas d'aller-retour réseau, aucune question envoyée |
| 5 | Ne rien charger avant la demande | Chargement au premier clic | 0 octet pour les visiteurs qui n'ouvrent pas le chatbot |
| 6 | Guider avec des suggestions | Sujets liés à la page, invitation vers l'atelier | Moins de questions mal comprises et de relances |
| 7 | Avouer quand on n'est pas sûr | Seuil de 75 % | Moins de réponses fausses |
| 8 | Garder des échanges courts | Quelques phrases et un lien, aucun historique envoyé | Moins de données à traiter |
| 9 | Compresser le modèle | Élagage et quantification | Moins à stocker, transférer et calculer |
| 10 | Mesurer et montrer les résultats | Tests, tailles et « Pourquoi cette réponse ? » | On peut vérifier la sobriété et la suivre |

## Démarche et outils de mesure

| Ce que nous mesurons | Outil | Résultat |
|---|---|---|
| Précision sur 147 questions de mise au point | `entrainer.mjs` | 89 % de bonnes réponses, aucune mauvaise |
| Précision sur 60 questions finales | `entrainer.mjs` | 85 % de bonnes réponses, 1 mauvaise |
| Taille du modèle | `entrainer.mjs` | 23 Ko (1,4 Mo avant compression) |
| Chargement au premier clic (script, style, modèle) | Compression gzip | Environ 37 Ko |
| Phrases du site, chargées seulement si besoin | Compression gzip | Environ 37 Ko |
| Temps de calcul d'une question | Navigateur (`performance.now`) | Environ 1 ms |

**Limites**

- Les questions de test ont été générées avec l'aide de Claude, comme les exemples d'entraînement, et non posées par de vrais visiteurs : le score est probablement optimiste.
- Une erreur connue : « je veux estimer l'empreinte de mes équipements » renvoie vers le contact au lieu du simulateur.
- Les réponses sont fixes : quand une page change, il faut mettre à jour la réponse et ré-entraîner.
- Le chatbot traite un sujet par question, en français, et ne connaît que ce site.
- Nous n'avons pas mesuré son énergie en wattheures.

## Accessibilité

- Vrai bouton avec un nom visible (icône seule sur petit écran, le texte restant lu).
- Panneau annoncé comme une boîte de dialogue, conversation lue par les lecteurs d'écran.
- Utilisable au clavier : focus dans le champ à l'ouverture, Échap pour fermer.
- Animations réduites respectées, affichage sur mobile.

## Suggestions d'amélioration

### Améliorations immédiates

- Faire tester le chatbot par de vrais visiteurs et ajouter leurs questions aux exemples.
- Corriger l'erreur connue sur l'estimation des équipements.
- Retirer l'ancien chatbot inutilisé (`chatbot.js`, `chatbot.css`).

### Extensions futures

- Signaler automatiquement les réponses à revoir quand une page du site change.
- Mesurer l'énergie réelle du chatbot et la comparer à celle d'un modèle génératif.

## Fichiers créés ou modifiés

| Fichier | Rôle |
|---|---|
| `chatbot/intentions.mjs` (créé) | Sujets, exemples, réponses et chiffres des fiches |
| `chatbot/tests.mjs` (créé) | Questions de test |
| `chatbot/entrainer.mjs` (créé) | Entraînement, compression et évaluation |
| `chatbot/README.md` (créé) | Mode d'emploi pour modifier le chatbot |
| `assets/data/chatbot-eco.json` (créé) | Modèle et réponses, générés |
| `assets/data/chatbot-eco-textes.json` (créé) | Phrases du site, générées |
| `assets/scripts/chatbot-eco.js` (créé) | Moteur et interface du chatbot |
| `assets/scripts/atelier-chatbot.js` (créé) | Parties interactives de l'atelier |
| `assets/styles/chatbot-eco.css` (créé) | Apparence du chatbot |
| `pages/en-pratique/atelier-chatbot.html` (créé) | Page de l'atelier |
| `assets/scripts/hamburger.js` (modifié) | Bouton du chatbot |
| `assets/styles/styles.css` (modifié) | Apparence du bouton |
| `pages/en-pratique.html` (modifié) | Carte de l'atelier |
| `pages/langages/*.html`, 7 pages (modifiées) | Chargement du chatbot |
| `docs/contributions/chatbot-eco-concu.md` (créé) | Ce document |

## Dépôt sur GitHub

La première version a été déposée **collectivement**, dans un seul commit signé par les trois membres. Les compléments ont ensuite été déposés **individuellement**.

| Pull request | Contenu |
|---|---|
| [n° 50](https://github.com/courdier/ecoconception/pull/50) | Première version du chatbot et de l'atelier |
| [n° 52](https://github.com/courdier/ecoconception/pull/52) | Calculs, nouveaux sujets et bouton « Réessayer » |
| [n° 53](https://github.com/courdier/ecoconception/pull/53) | Invitation vers l'atelier |
| [n° 55](https://github.com/courdier/ecoconception/pull/55) | Ajustements d'affichage |

Toutes sont fusionnées dans la branche `M2Info_26-27`.
