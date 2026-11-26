# Chatbot du site (IA frugale)

Le bouton « Une question ? » ouvre un chatbot qui fonctionne entièrement dans le navigateur :
un petit classifieur reconnaît le sujet de la question, puis le chatbot affiche une réponse
rédigée à l'avance à partir du site. Explications complètes : `pages/en-pratique/atelier-chatbot.html`.

Pour chaque question, du moins coûteux au plus coûteux : règle de calcul (comparaisons et durées
à partir des chiffres des fiches), classifieur, recherche dans les phrases du site, puis « je ne sais pas ».

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `chatbot/intentions.mjs` | Sujets, exemples de questions, réponses, liens, et chiffres des fiches (`FAITS`) pour les comparaisons |
| `chatbot/tests.mjs` | Questions de test, jamais utilisées pour l'entraînement |
| `chatbot/entrainer.mjs` | Entraînement, compression et évaluation du modèle |
| `assets/data/chatbot-eco.json` | Modèle, réponses et chiffres, générés (ne pas modifier à la main) |
| `assets/data/chatbot-eco-textes.json` | Phrases des pages du site, générées, téléchargées seulement si le modèle ne sait pas répondre |
| `assets/scripts/chatbot-eco.js` | Traitement du texte, prédiction et interface |
| `assets/styles/chatbot-eco.css` | Styles du panneau |
| `assets/scripts/hamburger.js` | Bouton d'ouverture, qui charge les 3 fichiers ci-dessus au premier clic |

## Modifier le chatbot

1. Modifier `chatbot/intentions.mjs` (au moins 10 exemples variés par sujet). Une page du site
   modifiée ou ajoutée est prise en compte automatiquement par la recherche au prochain entraînement.
2. Ré-entraîner depuis la racine du dépôt (Node.js 18 ou plus, aucune dépendance) :

   ```
   node chatbot/entrainer.mjs
   ```

3. Lire le rapport affiché (taille, précision), puis tester le site en local :

   ```
   python -m http.server 8000
   ```
