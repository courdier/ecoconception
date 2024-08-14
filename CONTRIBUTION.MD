# Documentation pour contribuer au projet

## Structure du Projet

Le projet est organisé en plusieurs répertoires principaux :
- **assets/** : Contient les images, scripts, et styles utilisés sur le site.
- **pages/** : Contient toutes les pages HTML du site, organisées en sous-répertoires.
    - **en-pratique/** : Sous-répertoire contenant les sujets de TP, fiches produits, et autres pages liées à la pratique de l'écoconception numérique.
        - **bde-esiroi/** : Répertoire pour les sujets de TP.
        - **fiches/** : Répertoire pour les fiches d'analyse des services numériques.
    - **outils.html** : Page listant les outils recommandés pour l'écoconception.
    - **terminologie.html** : Page contenant les définitions des termes techniques liés à l'écoconception.
    - **ressources.html** : Page listant les ressources utiles.
    - **quelques-chiffres.html** : Page résumant les données clés sur l'empreinte carbone des services numériques.

## Instructions pour ajouter une nouvelle fiche ou un sujet de TP

### 1. Ajouter une nouvelle fiche sur un service numérique

Pour ajouter une nouvelle fiche sur l'impact environnemental d'un service numérique (par exemple, pour "Spotify") :

- **Étape 1** : Accédez au répertoire `pages/en-pratique/fiches/`.
- **Étape 2** : Créez un nouveau fichier HTML nommé `spotify.html`.
- **Étape 3** : Copiez le modèle du template existant dans le dossier **templates/service.html**, puis modifiez le contenu pour correspondre au service numérique que vous ajoutez.
  - Remplacez `[NOM_DU_SERVICE]` par le nom du service (ex. "Spotify").
  - Mettez à jour les statistiques et les graphiques pour refléter les données spécifiques à ce service.
  - Ajoutez les sources pertinentes en bas de la fiche.
- **Étape 4** : Mettez à jour la page `en-pratique.html` pour inclure un lien vers la nouvelle fiche "[NOM_DU_SERVICE]".
  - Exemple de lien : 
  ```html
  <a href="./fiches/[NOM_DU_SERVICE].html">
        <h2>[NOM_DU_SERVICE]</h2>
        <p>
            Description courte de la fiche du [NOM_DU_SERVICE]
        </p>
    </a>
    ```

### 2. Ajouter un nouveau sujet de TP

Pour ajouter un nouveau sujet de travail pratique (TP) :

- **Étape 1** : Accédez au répertoire `pages/en-pratique/bde-esiroi/`.
- **Étape 2** : Créez un nouveau fichier HTML nommé `tp05.html` pour le TP 5.
- **Étape 3** : Copiez le modèle du template existant dans le dossier **templates/tp.html**, et modifiez-le en fonction du nouveau sujet.
  - Adaptez les consignes, objectifs, et ressources spécifiques à ce TP.
- **Étape 4** : Mettez à jour la page `en-pratique.html` pour inclure un lien vers le nouveau TP.
  - Exemple de lien :
    ```html
            <div class="card">
                <a href="./en-pratique/[NOM_DU_TP].html">
                    <h2><strong>[NUMERO_DU_TP]</strong> : [NOM_DU_TP]</h2>
                    <p>Description du TP</p>
                </a>
            </div>
    ```

### 3. Modifier le menu de navigation

Après avoir ajouté une nouvelle fiche ou un nouveau TP, il est important de mettre à jour les liens dans le menu de navigation si nécessaire :

- **Étape 1** : Ouvrez le fichier `en-pratique.html` ou `quelques-chiffres.html` selon le contexte.
- **Étape 2** : Ajoutez ou modifiez les liens de navigation pour inclure la nouvelle page.

### 4. Conseils pour maintenir une structure cohérente

- **Utiliser des noms explicites** : Choisissez des noms de fichiers et des balises de titre qui reflètent clairement le contenu pour faciliter la navigation et la compréhension. Par exemple, nommez le fichier HTML en fonction du service ou du TP (ex. `spotify.html`, `tp05.html`).
- **Conserver une mise en page cohérente** : Assurez-vous que chaque nouvelle page suit le style et le formatage définis dans les feuilles de style CSS globales. Utilisez les classes CSS déjà définies pour garantir une apparence uniforme.
- **Vérifier les liens** : Après avoir ajouté de nouvelles pages, vérifiez que tous les liens internes fonctionnent correctement. Testez les liens sur plusieurs pages pour éviter les erreurs 404.

## Schéma de la structure des répertoires

```plaintext
.
├── assets
│   ├── img
│   ├── scripts
│   └── styles
├── pages
│   ├── en-pratique
│   │   ├── bde-esiroi
│   │   │   ├── tp01.html
│   │   │   ├── tp02.html
│   │   │   ├── tp03.html
│   │   │   ├── tp04.html
│   │   │   └── tp05.html  # Exemple d'ajout de TP
│   │   ├── fiches
│   │   │   ├── chatgpt.html
│   │   │   ├── netflix.html
│   │   │   ├── spotify.html  # Exemple d'ajout de fiche
│   │   │   └── tiktok.html
│   │   ├── en-pratique.html
│   │   └── quelques-chiffres.html
│   ├── outils.html
│   ├── terminologie.html
│   ├── ressources.html
│   ├── quiz.html
│   ├── a-propos.html
│   └── index.html
└── README.md
```