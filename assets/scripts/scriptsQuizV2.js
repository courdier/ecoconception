const questions = [
    {
        id: "streaming",
        question: "Combien d’heures de vidéo en streaming regardez-vous par jour ?",
        icon: "📺",
        source: {
            label: "ADEME — Modérer le streaming vidéo",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mod%C3%A9rer%20le%20streaming%20vid%C3%A9o",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 1 h",
                info: "La résolution influence le volume de données transférées. La lecture automatique peut lancer des vidéos supplémentaires.",
                recommendation: "Si vous regardez une vidéo, essayez une résolution inférieure qui reste lisible."
            },
            {
                label: "De 1 h à moins de 3 h",
                info: "La résolution influence le volume de données transférées. La lecture automatique peut lancer des vidéos supplémentaires.",
                recommendation: "Dans votre plateforme vidéo, désactivez la lecture automatique des vidéos ou de l’épisode suivant."
            },
            {
                label: "De 3 h à 5 h",
                info: "La résolution influence le volume de données transférées. La lecture automatique peut lancer des vidéos supplémentaires.",
                recommendation: "Si vous lancez une vidéo uniquement pour écouter de la musique, essayez sa version audio."
            },
            {
                label: "Plus de 5 h",
                info: "La résolution influence le volume de données transférées. La lecture automatique peut lancer des vidéos supplémentaires.",
                recommendation: "Choisissez les vidéos à regarder avant votre session et coupez l’enchaînement automatique."
            },
        ]
    },
    {
        id: "email_storage",
        question: "Combien d’e-mails conservez-vous dans votre boîte mail ?",
        icon: "📧",
        source: {
            label: "ADEME — Faire le ménage dans sa boîte mail",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Faire%20le%20m%C3%A9nage%20dans%20sa%20bo%C3%AEte%20mail",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "De 0 à 999",
                info: "Le nombre de messages ne renseigne pas sur la taille de leurs pièces jointes.",
                recommendation: "Si vous recevez une newsletter fiable que vous ne lisez jamais, désabonnez-vous."
            },
            {
                label: "De 1 000 à 4 999",
                info: "Le nombre de messages ne renseigne pas sur la taille de leurs pièces jointes.",
                recommendation: "Recherchez les messages d’un expéditeur connu et supprimez ceux devenus inutiles après vérification."
            },
            {
                label: "De 5 000 à 10 000",
                info: "Le nombre de messages ne renseigne pas sur la taille de leurs pièces jointes.",
                recommendation: "Utilisez le filtre des messages volumineux et vérifiez les pièces jointes avant de supprimer les messages inutiles."
            },
            {
                label: "Plus de 10 000",
                info: "Le nombre de messages ne renseigne pas sur la taille de leurs pièces jointes.",
                recommendation: "Triez une catégorie à la fois, par exemple les anciennes newsletters, et gardez les justificatifs dont vous avez besoin."
            },
            {
                label: "Je ne sais pas",
                info: "Le nombre de messages ne renseigne pas sur la taille de leurs pièces jointes.",
                recommendation: "Consultez le compteur de votre boîte ou l’espace occupé avant de choisir une catégorie à trier."
            },
        ]
    },
    {
        id: "cloud_storage",
        question: "Combien de fichiers stockez-vous dans le cloud ?",
        icon: "☁️",
        source: {
            label: "ADEME — Faire le ménage dans le Cloud",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Faire%20le%20m%C3%A9nage%20dans%20le%20Cloud",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "De 0 à 99",
                info: "Le nombre de fichiers ne dit pas quel volume ils occupent. Avant un tri, distinguez les doublons inutiles des sauvegardes.",
                recommendation: "Si vous stockez des fichiers, repérez les doublons et conservez les copies nécessaires à vos sauvegardes."
            },
            {
                label: "De 100 à 499",
                info: "Le nombre de fichiers ne dit pas quel volume ils occupent. Avant un tri, distinguez les doublons inutiles des sauvegardes.",
                recommendation: "Triez les fichiers par taille et examinez les fichiers les plus volumineux avant toute suppression."
            },
            {
                label: "De 500 à 1 000",
                info: "Le nombre de fichiers ne dit pas quel volume ils occupent. Avant un tri, distinguez les doublons inutiles des sauvegardes.",
                recommendation: "Commencez par un dossier et vérifiez si sa suppression se répercuterait sur les autres appareils synchronisés."
            },
            {
                label: "Plus de 1 000",
                info: "Le nombre de fichiers ne dit pas quel volume ils occupent. Avant un tri, distinguez les doublons inutiles des sauvegardes.",
                recommendation: "Consultez les volumes par dossier et faites un premier tri là où vous voyez des fichiers devenus inutiles."
            },
            {
                label: "Je ne sais pas",
                info: "Le nombre de fichiers ne dit pas quel volume ils occupent. Avant un tri, distinguez les doublons inutiles des sauvegardes.",
                recommendation: "Utilisez le gestionnaire d’espace du service pour repérer un dossier à examiner."
            },
        ]
    },
    {
        id: "gaming",
        question: "Combien d’heures par semaine jouez-vous à des jeux vidéo ?",
        icon: "🎮",
        source: {
            label: "ADEME — Jeux sur console, jeux sur ordinateur ou via le Cloud",
            url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/impacts-lecture-musique-films-jeux-ligne?backtosearch=true#:~:text=Jeux%20sur%20console%2C%20jeux%20sur%20ordinateur%20ou%20via%20le%20Cloud",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 5 h",
                info: "La durée ne renseigne ni sur l’équipement ni sur le mode de jeu. La taille d’un jeu et le temps passé sur ce titre comptent dans la comparaison entre téléchargement et jeu à distance.",
                recommendation: "Si vous jouez occasionnellement, essayez d’abord un titre déjà installé sur un appareil que vous possédez."
            },
            {
                label: "De 5 h à moins de 10 h",
                info: "La durée ne renseigne ni sur l’équipement ni sur le mode de jeu. La taille d’un jeu et le temps passé sur ce titre comptent dans la comparaison entre téléchargement et jeu à distance.",
                recommendation: "Si vous envisagez un jeu en format physique, recherchez une copie d’occasion adaptée à votre équipement."
            },
            {
                label: "De 10 h à 20 h",
                info: "La durée ne renseigne ni sur l’équipement ni sur le mode de jeu. La taille d’un jeu et le temps passé sur ce titre comptent dans la comparaison entre téléchargement et jeu à distance.",
                recommendation: "Si vous rejouez souvent au même titre en cloud gaming et qu’il fonctionne déjà sur votre appareil, comparez avec une installation locale."
            },
            {
                label: "Plus de 20 h",
                info: "La durée ne renseigne ni sur l’équipement ni sur le mode de jeu. La taille d’un jeu et le temps passé sur ce titre comptent dans la comparaison entre téléchargement et jeu à distance.",
                recommendation: "Avant d’acheter du matériel pour jouer, vérifiez si l’équipement existant peut faire tourner vos titres habituels."
            },
        ]
    },
    {
        id: "dark_mode",
        question: "À quelle fréquence utilisez-vous le mode sombre ?",
        icon: "🌑",
        source: {
            label: "Purdue University — Étude sur le mode sombre",
            url: "https://engineering.purdue.edu/ECE/News/2022/shedding-light-on-dark-mode-to-save-energy#:~:text=Shedding%20light%20on%20dark%20mode%20to%20save%20energy",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais",
                info: "Sur OLED, les pixels sombres peuvent consommer moins selon la luminosité. Sur un LCD rétroéclairé, changer le thème ne donne pas le même effet.",
                recommendation: "Si le thème clair vous convient, gardez-le et adaptez la luminosité à votre confort."
            },
            {
                label: "Rarement",
                info: "Sur OLED, les pixels sombres peuvent consommer moins selon la luminosité. Sur un LCD rétroéclairé, changer le thème ne donne pas le même effet.",
                recommendation: "Vérifiez dans la fiche de l’appareil s’il est équipé d’une dalle OLED ou AMOLED avant de compter sur ce réglage."
            },
            {
                label: "Parfois",
                info: "Sur OLED, les pixels sombres peuvent consommer moins selon la luminosité. Sur un LCD rétroéclairé, changer le thème ne donne pas le même effet.",
                recommendation: "Si vous avez un écran OLED, essayez le thème sombre dans une application et gardez-le si le texte reste confortable à lire."
            },
            {
                label: "Toujours",
                info: "Sur OLED, les pixels sombres peuvent consommer moins selon la luminosité. Sur un LCD rétroéclairé, changer le thème ne donne pas le même effet.",
                recommendation: "Si vous augmentez la luminosité pour lire en mode sombre, comparez les deux thèmes et privilégiez la lisibilité."
            },
        ]
    },
    {
        id: "updates",
        glossary: "impact_environnemental",
        question: "Quand installez-vous les mises à jour de sécurité ?",
        icon: "🔄",
        source: {
            label: "ANSSI — Règles de sécurité numérique",
            url: "https://cyber.gouv.fr/securisation/10-regles-or-securite-numerique/#:~:text=Activez%20l%E2%80%99option%20de%20t%C3%A9l%C3%A9chargement%20et%20d%E2%80%99installation%20automatique%20des%20mises%20%C3%A0%20jour",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Dès qu’elles sont proposées, automatiquement ou manuellement",
                info: "Les correctifs de sécurité corrigent des failles. Attendre pour limiter les téléchargements peut laisser l’appareil exposé.",
                recommendation: "Vérifiez que le système et les applications installent bien les correctifs et redémarrez si le système le demande."
            },
            {
                label: "À un contrôle mensuel",
                info: "Les correctifs de sécurité corrigent des failles. Attendre pour limiter les téléchargements peut laisser l’appareil exposé.",
                recommendation: "Activez les correctifs automatiques si votre appareil le permet, sans attendre votre contrôle mensuel."
            },
            {
                label: "Moins souvent ou jamais",
                info: "Les correctifs de sécurité corrigent des failles. Attendre pour limiter les téléchargements peut laisser l’appareil exposé.",
                recommendation: "Ouvrez les réglages système et installez les correctifs proposés. Pour un appareil géré, suivez les consignes du service informatique."
            },
            {
                label: "Je ne sais pas",
                info: "Les correctifs de sécurité corrigent des failles. Attendre pour limiter les téléchargements peut laisser l’appareil exposé.",
                recommendation: "Vérifiez la date du dernier correctif et si votre modèle reçoit encore des mises à jour."
            },
        ]
    },
    {
        id: "data_downloads",
        question: "Quel volume de fichiers téléchargez-vous par mois ?",
        icon: "📥",
        source: {
            label: "ADEME — Modérer les transferts automatiques de données des téléphones portables",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mod%C3%A9rer%20les%20transferts%20automatiques%20de%20donn%C3%A9es%20des%20t%C3%A9l%C3%A9phones%20portables",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 10 Go",
                info: "Le volume seul ne permet pas de connaître le réseau utilisé, le contenu ni la nécessité du téléchargement.",
                recommendation: "Pour un prochain gros téléchargement non urgent sur téléphone, privilégiez un Wi-Fi de confiance si disponible."
            },
            {
                label: "De 10 à moins de 50 Go",
                info: "Le volume seul ne permet pas de connaître le réseau utilisé, le contenu ni la nécessité du téléchargement.",
                recommendation: "Vérifiez si une application télécharge automatiquement du contenu que vous ne consultez pas."
            },
            {
                label: "De 50 à 100 Go",
                info: "Le volume seul ne permet pas de connaître le réseau utilisé, le contenu ni la nécessité du téléchargement.",
                recommendation: "Si un service propose des téléchargements en données mobiles par défaut, configurez-le sur un Wi-Fi de confiance quand c’est possible."
            },
            {
                label: "Plus de 100 Go",
                info: "Le volume seul ne permet pas de connaître le réseau utilisé, le contenu ni la nécessité du téléchargement.",
                recommendation: "Repérez les transferts volumineux que vous pouvez programmer sur un accès fixe, tout en installant rapidement les correctifs de sécurité."
            },
            {
                label: "Je ne sais pas",
                info: "Le volume seul ne permet pas de connaître le réseau utilisé, le contenu ni la nécessité du téléchargement.",
                recommendation: "Consultez les statistiques par application de votre appareil. Elles peuvent inclure d’autres échanges que les téléchargements."
            },
        ]
    },
    {
        id: "device_usage",
        question: "Combien de temps utilisez-vous votre smartphone par jour, en ligne ou hors ligne ?",
        icon: "📱",
        source: {
            label: "ADEME — Résister au renouvellement des appareils qui fonctionnent encore",
            url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/bons-conseils-achats-numeriques#:~:text=R%C3%A9sister%20au%20renouvellement%20des%20appareils%20qui%20fonctionnent%20encore",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 1 h",
                info: "La durée d’écran ne suffit pas à estimer une empreinte. Garder un appareil en état de marche évite un remplacement prématuré.",
                recommendation: "Si le téléphone vous sert peu, gardez-le tant qu’il répond à vos besoins et reste suivi côté sécurité."
            },
            {
                label: "De 1 h à moins de 3 h",
                info: "La durée d’écran ne suffit pas à estimer une empreinte. Garder un appareil en état de marche évite un remplacement prématuré.",
                recommendation: "Repérez dans les réglages la date du dernier correctif pour préparer une utilisation durable."
            },
            {
                label: "De 3 h à 5 h",
                info: "La durée d’écran ne suffit pas à estimer une empreinte. Garder un appareil en état de marche évite un remplacement prématuré.",
                recommendation: "Si l’autonomie se dégrade, examinez l’état de la batterie avant d’envisager un nouvel appareil."
            },
            {
                label: "Plus de 5 h",
                info: "La durée d’écran ne suffit pas à estimer une empreinte. Garder un appareil en état de marche évite un remplacement prématuré.",
                recommendation: "Si un problème gêne votre usage quotidien, demandez un diagnostic de réparation avant de remplacer le téléphone."
            },
        ]
    },
    {
        id: "video_calls",
        question: "Combien d’heures de visioconférence faites-vous par semaine ?",
        icon: "🎥",
        source: {
            label: "ADEME — Limiter le poids des réunions en ligne",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Limiter%20le%20poids%20des%20r%C3%A9unions%20en%20ligne",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 1 h",
                info: "Désactiver sa caméra réduit les données vidéo envoyées. La vidéo reste utile, notamment pour certains besoins d’accessibilité.",
                recommendation: "Si votre prochain échange ne nécessite pas d’image, proposez un appel audio."
            },
            {
                label: "De 1 h à moins de 5 h",
                info: "Désactiver sa caméra réduit les données vidéo envoyées. La vidéo reste utile, notamment pour certains besoins d’accessibilité.",
                recommendation: "Coupez votre caméra pour une partie de la réunion où elle n’est pas nécessaire, si cela convient à tout le monde."
            },
            {
                label: "De 5 h à 10 h",
                info: "Désactiver sa caméra réduit les données vidéo envoyées. La vidéo reste utile, notamment pour certains besoins d’accessibilité.",
                recommendation: "Si vous animez une réunion récurrente, demandez quand la vidéo est utile et convenez de moments en audio."
            },
            {
                label: "Plus de 10 h",
                info: "Désactiver sa caméra réduit les données vidéo envoyées. La vidéo reste utile, notamment pour certains besoins d’accessibilité.",
                recommendation: "Passez en revue vos réunions récurrentes et identifiez-en une où l’audio convient aux participants."
            },
        ]
    },
    {
        id: "browser_tabs",
        question: "Combien d’onglets de navigateur gardez-vous généralement ouverts ?",
        icon: "🗂️",
        source: {
            label: "Google Chrome — Réglages de performances",
            url: "https://support.google.com/chrome/answer/12929150?hl=fr#:~:text=Activer%20ou%20d%C3%A9sactiver%20l%27%C3%A9conomiseur%20de%20m%C3%A9moire",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Le navigateur peut mettre certains onglets en veille. Le nombre affiché ne dit pas combien restent actifs.",
                recommendation: "Si vous souhaitez retrouver une page lors de votre prochaine navigation, utilisez un favori."
            },
            {
                label: "De 1 à 4",
                info: "Le navigateur peut mettre certains onglets en veille. Le nombre affiché ne dit pas combien restent actifs.",
                recommendation: "Si un onglet a fini de servir, fermez-le après avoir enregistré votre travail."
            },
            {
                label: "De 5 à 9",
                info: "Le navigateur peut mettre certains onglets en veille. Le nombre affiché ne dit pas combien restent actifs.",
                recommendation: "Mettez en favori une page à retrouver plus tard avant de fermer son onglet."
            },
            {
                label: "De 10 à 20",
                info: "Le navigateur peut mettre certains onglets en veille. Le nombre affiché ne dit pas combien restent actifs.",
                recommendation: "Si vous utilisez Chrome sur ordinateur, vérifiez le réglage Économiseur de mémoire dans Performances."
            },
            {
                label: "Plus de 20",
                info: "Le navigateur peut mettre certains onglets en veille. Le nombre affiché ne dit pas combien restent actifs.",
                recommendation: "Fermez un groupe d’onglets inutiles et, si votre navigateur le permet, réservez les exceptions à la mise en veille aux sites indispensables."
            },
        ]
    },
    {
        id: "wifi_on",
        question: "Laissez-vous le Wi-Fi de votre box activé pendant les périodes où personne n’en a besoin ?",
        icon: "📶",
        source: {
            label: "Arcep — Consommation des box, désactivation du Wi-Fi",
            url: "https://www.arcep.fr/fileadmin/user_upload/observatoire/enquete-pns/edition-2026/enquete-annuelle-pour-un-numerique-soutenable_edition2026_mai2026.pdf#page=44",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais",
                info: "Une box consomme même sans trafic. Couper le Wi-Fi et éteindre la box sont deux actions différentes.",
                recommendation: "Vérifiez que vos horaires de coupure laissent disponibles les services essentiels qui dépendent de la box."
            },
            {
                label: "Parfois",
                info: "Une box consomme même sans trafic. Couper le Wi-Fi et éteindre la box sont deux actions différentes.",
                recommendation: "Repérez un créneau sans usage et vérifiez si l’interface de la box permet de programmer une coupure du Wi-Fi."
            },
            {
                label: "Souvent",
                info: "Une box consomme même sans trafic. Couper le Wi-Fi et éteindre la box sont deux actions différentes.",
                recommendation: "Avant un essai de coupure, vérifiez si une alarme, un appareil de santé ou un autre service dépend du réseau."
            },
            {
                label: "Toujours",
                info: "Une box consomme même sans trafic. Couper le Wi-Fi et éteindre la box sont deux actions différentes.",
                recommendation: "Si vous avez des plages sans usage et sans service dépendant du Wi-Fi, essayez une coupure programmée."
            },
            {
                label: "Sans box ou je ne sais pas",
                info: "Une box consomme même sans trafic. Couper le Wi-Fi et éteindre la box sont deux actions différentes.",
                recommendation: "Si vous gérez une box, ouvrez ses réglages pour distinguer la fonction Wi-Fi de l’arrêt complet."
            },
        ]
    },
    {
        id: "device_replacement",
        question: "En moyenne, combien de temps gardez-vous un appareil électronique avant de le remplacer ?",
        icon: "💻",
        source: {
            label: "ADEME — Résister au renouvellement des appareils qui fonctionnent encore",
            url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/bons-conseils-achats-numeriques#:~:text=R%C3%A9sister%20au%20renouvellement%20des%20appareils%20qui%20fonctionnent%20encore",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "5 ans ou plus, ou jamais remplacé",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Notez où obtenir les pièces ou le service de réparation des appareils que vous gardez."
            },
            {
                label: "De 3 ans à moins de 5 ans",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Avant un remplacement, faites vérifier si le composant défaillant peut être remplacé."
            },
            {
                label: "De 2 ans à moins de 3 ans",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Si un appareil vous semble lent, faites diagnostiquer le problème avant de le remplacer."
            },
            {
                label: "De 1 an à moins de 2 ans",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Pour le prochain remplacement envisagé, vérifiez d’abord le besoin, la réparabilité et le suivi logiciel."
            },
            {
                label: "Moins de 1 an",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Pour le prochain remplacement envisagé, vérifiez d’abord le besoin, la réparabilité et le suivi logiciel."
            },
            {
                label: "Je ne sais pas",
                info: "La fabrication mobilise des ressources. L’entretien et la réparation peuvent prolonger l’usage d’un appareil encore adapté.",
                recommendation: "Repérez la date d’achat d’un appareil pour estimer sa durée d’usage."
            },
        ]
    },
    {
        id: "file_backup",
        question: "À quelle fréquence sauvegardez-vous vos données, manuellement ou automatiquement ?",
        icon: "💾",
        source: {
            label: "Cybermalveillance.gouv.fr — Bien gérer ses sauvegardes",
            url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes#:~:text=Effectuez%20des%20sauvegardes%20r%C3%A9guli%C3%A8res%20de%20vos%20donn%C3%A9es",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais ou moins d’une fois par mois",
                info: "La fréquence dépend des changements et de ce que vous accepteriez de perdre. Une restauration testée permet de vérifier la copie.",
                recommendation: "Effectuez une première sauvegarde des fichiers irremplaçables puis programmez des copies régulières."
            },
            {
                label: "De 1 à 3 fois par mois",
                info: "La fréquence dépend des changements et de ce que vous accepteriez de perdre. Une restauration testée permet de vérifier la copie.",
                recommendation: "Si vous ne pouvez pas vous permettre de perdre les fichiers créés entre deux sauvegardes, rapprochez les copies."
            },
            {
                label: "De 4 à 10 fois par mois",
                info: "La fréquence dépend des changements et de ce que vous accepteriez de perdre. Une restauration testée permet de vérifier la copie.",
                recommendation: "Restaurez un fichier d’essai pour vérifier qu’il peut être relu et conservez une copie déconnectée."
            },
            {
                label: "Plus de 10 fois par mois",
                info: "La fréquence dépend des changements et de ce que vous accepteriez de perdre. Une restauration testée permet de vérifier la copie.",
                recommendation: "Vérifiez que vos sauvegardes récentes sont utilisables et que vous disposez d’une copie séparée et déconnectée."
            },
            {
                label: "Je ne sais pas",
                info: "La fréquence dépend des changements et de ce que vous accepteriez de perdre. Une restauration testée permet de vérifier la copie.",
                recommendation: "Ouvrez votre outil de sauvegarde et vérifiez la date de la dernière copie réussie."
            },
        ]
    },
    {
        id: "online_shopping",
        question: "Combien de commandes de biens physiques passez-vous en ligne par mois ?",
        icon: "📦",
        source: {
            label: "ADEME — Comment utiliser le calculateur",
            url: "https://agirpourlatransition.ademe.fr/particuliers/evaluer-son-impact/calculer-impact-achats/calculez-impact-livraison-colis#:~:text=Comment%20utiliser%20le%20calculateur",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "De 0 à 4",
                info: "Le mode de livraison, les déplacements pour retirer un colis et les retours comptent dans l’impact logistique.",
                recommendation: "Pour votre prochaine commande, vérifiez si un point de retrait se trouve sur un trajet déjà prévu."
            },
            {
                label: "De 5 à 9",
                info: "Le mode de livraison, les déplacements pour retirer un colis et les retours comptent dans l’impact logistique.",
                recommendation: "Si plusieurs achats sont prévus chez le même vendeur, vérifiez si une expédition groupée est proposée."
            },
            {
                label: "De 10 à 20",
                info: "Le mode de livraison, les déplacements pour retirer un colis et les retours comptent dans l’impact logistique.",
                recommendation: "Quand le délai le permet, comparez l’option standard et les modes de retrait avant de valider."
            },
            {
                label: "Plus de 20",
                info: "Le mode de livraison, les déplacements pour retirer un colis et les retours comptent dans l’impact logistique.",
                recommendation: "Identifiez un type de commande qui génère des retours et vérifiez tailles ou compatibilité avant le prochain achat."
            },
        ]
    },
    {
        id: "vpn_usage",
        question: "À quelle fréquence utilisez-vous un réseau privé virtuel (VPN) ?",
        icon: "🔒",
        source: {
            label: "Cybermalveillance.gouv.fr — Sécuriser les accès à distance",
            url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/securisation-du-teletravail#:~:text=S%C3%A9curisez%20vos%20acc%C3%A8s%20ext%C3%A9rieurs",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais",
                info: "Un VPN peut sécuriser un accès distant à une organisation. La fréquence d’utilisation ne suffit pas à évaluer son impact environnemental.",
                recommendation: "Si votre organisation vous donne un accès distant, vérifiez avec elle si un VPN est requis et lequel utiliser."
            },
            {
                label: "Parfois",
                info: "Un VPN peut sécuriser un accès distant à une organisation. La fréquence d’utilisation ne suffit pas à évaluer son impact environnemental.",
                recommendation: "Identifiez les accès pour lesquels le VPN est requis et suivez les consignes de connexion."
            },
            {
                label: "Souvent",
                info: "Un VPN peut sécuriser un accès distant à une organisation. La fréquence d’utilisation ne suffit pas à évaluer son impact environnemental.",
                recommendation: "Pour un VPN professionnel, activez l’authentification multifacteur si votre organisation la propose."
            },
            {
                label: "Toujours",
                info: "Un VPN peut sécuriser un accès distant à une organisation. La fréquence d’utilisation ne suffit pas à évaluer son impact environnemental.",
                recommendation: "Gardez le VPN actif quand sa configuration ou vos besoins de sécurité l’exigent. Vérifiez les paramètres avec le service chargé de le gérer."
            },
            {
                label: "Je ne sais pas",
                info: "Un VPN peut sécuriser un accès distant à une organisation. La fréquence d’utilisation ne suffit pas à évaluer son impact environnemental.",
                recommendation: "Vérifiez les réglages réseau et demandez au service informatique s’il s’agit d’un appareil géré."
            },
        ]
    },
    {
        id: "search_engine",
        question: "Combien de recherches en ligne faites-vous par jour ?",
        icon: "🔎",
        source: {
            label: "ADEME — Mettre les adresses web fréquemment consultées en favoris",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mettre%20les%20adresses%20web%20fr%C3%A9quemment%20consult%C3%A9es%20en%20favoris",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "De 0 à 9",
                info: "Une recherche peut mener à plusieurs pages. Un favori donne directement accès à une page déjà connue.",
                recommendation: "Ajoutez en favori un site dont vous recherchez souvent le nom."
            },
            {
                label: "De 10 à 29",
                info: "Une recherche peut mener à plusieurs pages. Un favori donne directement accès à une page déjà connue.",
                recommendation: "Si vous retrouvez régulièrement les mêmes sites via un moteur, regroupez-les dans un dossier de favoris."
            },
            {
                label: "De 30 à 50",
                info: "Une recherche peut mener à plusieurs pages. Un favori donne directement accès à une page déjà connue.",
                recommendation: "Pour une recherche nouvelle, précisez vos mots-clés, par exemple en ajoutant le nom de l’organisme recherché."
            },
            {
                label: "Plus de 50",
                info: "Une recherche peut mener à plusieurs pages. Un favori donne directement accès à une page déjà connue.",
                recommendation: "Repérez une recherche répétitive et épinglez la page utile dans vos favoris."
            },
        ]
    },
    {
        id: "e-waste_disposal",
        question: "Que faites-vous le plus souvent de vos appareils électroniques usagés ?",
        icon: "♻️",
        source: {
            label: "ecosystem — Don et recyclage de matériel de téléphonie",
            url: "https://www.ecosystem.eco/donner-recycler/equipement/telephonie#:~:text=Que%20faire%20de%20mes%20autres%20%C3%A9quipements%20et%20accessoires%20de%20t%C3%A9l%C3%A9phonie",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Je les donne ou les dépose en collecte",
                info: "Un appareil réutilisable peut être donné. Un appareil hors d’usage peut être déposé dans une filière dédiée.",
                recommendation: "Avant de céder un appareil qui contient vos données, sauvegardez-les et faites effacer l’appareil de façon sûre."
            },
            {
                label: "Je les garde chez moi",
                info: "Un appareil réutilisable peut être donné. Un appareil hors d’usage peut être déposé dans une filière dédiée.",
                recommendation: "Choisissez un appareil inutilisé, puis recherchez une structure de réemploi s’il fonctionne encore."
            },
            {
                label: "Je les jette avec les ordures ménagères",
                info: "Un appareil réutilisable peut être donné. Un appareil hors d’usage peut être déposé dans une filière dédiée.",
                recommendation: "Repérez un point de collecte d’équipements électriques et utilisez-le pour le prochain appareil hors d’usage."
            },
            {
                label: "Je ne sais pas",
                info: "Un appareil réutilisable peut être donné. Un appareil hors d’usage peut être déposé dans une filière dédiée.",
                recommendation: "Recherchez un point de collecte ou une association de réemploi près de chez vous."
            },
            {
                label: "Je n’en ai pas encore",
                info: "Un appareil réutilisable peut être donné. Un appareil hors d’usage peut être déposé dans une filière dédiée.",
                recommendation: "Recherchez un point de collecte ou une association de réemploi près de chez vous."
            },
        ]
    },
    {
        id: "ad_blockers",
        question: "À quelle fréquence utilisez-vous un bloqueur de publicités dans votre navigateur ?",
        icon: "🛡️",
        source: {
            label: "Mozilla — Protection renforcée contre le pistage dans Firefox",
            url: "https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur?redirectlocale=fr&redirectslug=activer-desactiver-cookies-preferences#:~:text=Ce%20que%20bloque%20la%20protection%20renforc%C3%A9e%20contre%20le%20pistage",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais",
                info: "Un bloqueur de publicités et une protection contre le pistage ont des rôles distincts. Certains traqueurs se trouvent dans des publicités.",
                recommendation: "Vérifiez dans les réglages de confidentialité de votre navigateur les protections déjà actives."
            },
            {
                label: "Rarement",
                info: "Un bloqueur de publicités et une protection contre le pistage ont des rôles distincts. Certains traqueurs se trouvent dans des publicités.",
                recommendation: "Si vous utilisez Firefox, ouvrez le bouclier près de l’adresse pour voir les protections actives sur un site."
            },
            {
                label: "Parfois",
                info: "Un bloqueur de publicités et une protection contre le pistage ont des rôles distincts. Certains traqueurs se trouvent dans des publicités.",
                recommendation: "Si vous souhaitez limiter le pistage, commencez par les réglages de confidentialité intégrés à votre navigateur."
            },
            {
                label: "Toujours",
                info: "Un bloqueur de publicités et une protection contre le pistage ont des rôles distincts. Certains traqueurs se trouvent dans des publicités.",
                recommendation: "Vérifiez que votre navigateur active ses protections de base et consultez ce qu’elles filtrent."
            },
        ]
    },
    {
        id: "smart_home",
        question: "Comment décririez-vous le nombre d’objets connectés que vous utilisez à domicile, par exemple pour l’éclairage ou le chauffage ?",
        icon: "🏠",
        source: {
            label: "ADEME — Les gestes pour les objets connectés",
            url: "https://www.ademe.fr/wp-content/uploads/2024/12/DP_Numerique-responsable-190122.pdf#page=11",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Certains objets restent alimentés pour répondre à distance. L’utilité d’une veille dépend du service assuré.",
                recommendation: "Avant d’acheter un objet connecté, vérifiez si une commande simple couvre le besoin."
            },
            {
                label: "Quelques-uns",
                info: "Certains objets restent alimentés pour répondre à distance. L’utilité d’une veille dépend du service assuré.",
                recommendation: "Identifiez les fonctions dont vous avez besoin avant de couper l’alimentation d’un objet inutilisé."
            },
            {
                label: "Plusieurs",
                info: "Certains objets restent alimentés pour répondre à distance. L’utilité d’une veille dépend du service assuré.",
                recommendation: "Faites l’inventaire des objets rarement utilisés et envisagez de donner ceux dont vous n’avez plus besoin."
            },
            {
                label: "Beaucoup",
                info: "Certains objets restent alimentés pour répondre à distance. L’utilité d’une veille dépend du service assuré.",
                recommendation: "Repérez une catégorie d’objets inutilisés. Conservez les fonctions de sécurité et les automatismes nécessaires."
            },
        ]
    },
    {
        id: "auto_backup",
        question: "Sur combien de vos appareils utilisez-vous une sauvegarde automatique ?",
        icon: "🔁",
        source: {
            label: "Cybermalveillance.gouv.fr — Bien gérer ses sauvegardes",
            url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes#:~:text=Effectuez%20des%20sauvegardes%20r%C3%A9guli%C3%A8res%20de%20vos%20donn%C3%A9es",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Une sauvegarde automatique évite certains oublis. La synchronisation peut répercuter une suppression et ne suffit pas toujours pour restaurer un fichier.",
                recommendation: "Si vous sauvegardez à la main, programmez un rappel ou configurez une sauvegarde automatique adaptée."
            },
            {
                label: "Un seul",
                info: "Une sauvegarde automatique évite certains oublis. La synchronisation peut répercuter une suppression et ne suffit pas toujours pour restaurer un fichier.",
                recommendation: "Vérifiez si vos autres appareils contiennent des données uniques à protéger et testez une restauration."
            },
            {
                label: "Au moins deux, mais pas tous",
                info: "Une sauvegarde automatique évite certains oublis. La synchronisation peut répercuter une suppression et ne suffit pas toujours pour restaurer un fichier.",
                recommendation: "Vérifiez que chaque dossier important est couvert et conservez une copie déconnectée pour les données irremplaçables."
            },
            {
                label: "Au moins deux, sur tous",
                info: "Une sauvegarde automatique évite certains oublis. La synchronisation peut répercuter une suppression et ne suffit pas toujours pour restaurer un fichier.",
                recommendation: "Testez la restauration d’un fichier et vérifiez que la copie de secours reste accessible même en cas de panne ou de perte d’un compte."
            },
            {
                label: "Je ne sais pas",
                info: "Une sauvegarde automatique évite certains oublis. La synchronisation peut répercuter une suppression et ne suffit pas toujours pour restaurer un fichier.",
                recommendation: "Regardez si vos réglages indiquent une sauvegarde ou une synchronisation et vérifiez comment restaurer un fichier."
            },
        ]
    },
    {
        id: "music_streaming",
        question: "À quelle fréquence écoutez-vous de la musique en streaming ?",
        icon: "🎵",
        source: {
            label: "Spotify — Écouter en mode hors connexion",
            url: "https://support.spotify.com/fr/article/listen-offline/#:~:text=Instructions%20pour%20t%C3%A9l%C3%A9charger%20du%20contenu",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Jamais",
                info: "Le mode hors connexion dépend du service et parfois de l’abonnement. Il permet de relire un fichier déjà téléchargé.",
                recommendation: "Si vous écoutez déjà vos fichiers hors ligne, gardez disponibles les morceaux que vous utilisez."
            },
            {
                label: "Moins d’un jour par semaine",
                info: "Le mode hors connexion dépend du service et parfois de l’abonnement. Il permet de relire un fichier déjà téléchargé.",
                recommendation: "Si vous réécoutez souvent une même sélection, vérifiez si votre service permet de la garder hors connexion."
            },
            {
                label: "De 1 à 6 jours par semaine",
                info: "Le mode hors connexion dépend du service et parfois de l’abonnement. Il permet de relire un fichier déjà téléchargé.",
                recommendation: "Si votre service le permet, téléchargez sur le Wi-Fi une sélection écoutée régulièrement et vérifiez qu’elle se lit hors connexion."
            },
            {
                label: "Tous les jours",
                info: "Le mode hors connexion dépend du service et parfois de l’abonnement. Il permet de relire un fichier déjà téléchargé.",
                recommendation: "Choisissez une playlist souvent réécoutée et téléchargez-la si votre abonnement le permet, puis testez sa lecture hors connexion."
            },
        ]
    },
];

// Barème historique conservé pour examen. Voir QUIZ-CARBONE.md.
const legacyCarbon = {
    "streaming": [10, 30, 50, 80],
    "email_storage": [5, 20, 40, 60, null],
    "cloud_storage": [5, 20, 50, 100, null],
    "gaming": [20, 50, 100, 150],
    "dark_mode": [20, 10, 0, -5],
    "updates": [5, 3, 2, null],
    "data_downloads": [10, 50, 100, 200, null],
    "device_usage": [10, 30, 50, 80],
    "video_calls": [10, 30, 60, 100],
    "browser_tabs": [null, 5, 15, 30, 50],
    "wifi_on": [0, 10, 20, 30, null],
    "device_replacement": [10, 30, 50, 80, null, null],
    "file_backup": [5, 20, 50, 100, null],
    "online_shopping": [10, 30, 60, 100],
    "vpn_usage": [0, 10, 30, 50, null],
    "search_engine": [5, 15, 30, 50],
    "e-waste_disposal": [0, 20, 50, 30, null],
    "ad_blockers": [30, 20, 10, -5],
    "smart_home": [0, 15, 30, 50],
    "auto_backup": [0, 10, 30, 50, null],
    "music_streaming": [0, 10, 20, 30],
};
