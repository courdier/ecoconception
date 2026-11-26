const questions = [
    {
        id: "computer_time",
        question: "Combien de temps passez-vous en ligne sur un ordinateur par jour ?",
        source: {
            label: "ADEME — Ne pas oublier d’éteindre son ordinateur en fin de journée",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Ne%20pas%20oublier%20d%E2%80%99%C3%A9teindre%20son%20ordinateur%20en%20fin%20de%20journ%C3%A9e",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 1 h",
                info: "Un ordinateur allumé ou en veille peut continuer à consommer de l’électricité.",
                recommendation: "Après une courte session, enregistrez votre travail et éteignez l’ordinateur si vous avez fini pour la journée."
            },
            {
                label: "De 1 h à moins de 3 h",
                info: "Un ordinateur allumé ou en veille peut continuer à consommer de l’électricité.",
                recommendation: "Réglez la mise en veille de l’écran pour les pauses et éteignez l’ordinateur en fin de journée."
            },
            {
                label: "De 3 h à 5 h",
                info: "Un ordinateur allumé ou en veille peut continuer à consommer de l’électricité.",
                recommendation: "Lors de votre prochaine longue pause, éteignez l’ordinateur si aucun travail en cours ne doit continuer."
            },
            {
                label: "Plus de 5 h",
                info: "Un ordinateur allumé ou en veille peut continuer à consommer de l’électricité.",
                recommendation: "Si vous laissez l’ordinateur en veille toute la nuit, essayez de l’éteindre après votre dernière session."
            },
        ]
    },
    {
        id: "phone_time",
        question: "Combien de temps passez-vous en ligne sur un téléphone par jour ?",
        source: {
            label: "ADEME — Modérer les transferts automatiques de données des téléphones portables",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mod%C3%A9rer%20les%20transferts%20automatiques%20de%20donn%C3%A9es%20des%20t%C3%A9l%C3%A9phones%20portables",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 1 h",
                info: "Le temps passé en ligne ne renseigne ni sur les vidéos regardées ni sur les transferts automatiques.",
                recommendation: "Vérifiez si une application lance des vidéos sans votre accord et désactivez cette option si elle vous gêne."
            },
            {
                label: "De 1 h à moins de 3 h",
                info: "Le temps passé en ligne ne renseigne ni sur les vidéos regardées ni sur les transferts automatiques.",
                recommendation: "Si un fil d’actualité lance des vidéos tout seul, désactivez la lecture automatique dans cette application."
            },
            {
                label: "De 3 h à 5 h",
                info: "Le temps passé en ligne ne renseigne ni sur les vidéos regardées ni sur les transferts automatiques.",
                recommendation: "Repérez une application qui propose de limiter la lecture automatique aux connexions Wi-Fi et testez ce réglage."
            },
            {
                label: "Plus de 5 h",
                info: "Le temps passé en ligne ne renseigne ni sur les vidéos regardées ni sur les transferts automatiques.",
                recommendation: "Si vous utilisez plusieurs applications vidéo, vérifiez les réglages de lecture automatique de chacune."
            },
        ]
    },
    {
        id: "phone_network",
        question: "Quel réseau utilisez-vous principalement pour accéder à Internet sur votre téléphone ?",
        source: {
            label: "ADEME — Éviter les connexions en 4G/5G sur les téléphones portables",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=%C3%89viter%20les%20connexions%20en%204G%2F5G%20sur%20les%20t%C3%A9l%C3%A9phones%20portables",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Wi-Fi",
                info: "Le Wi-Fi d’une box et les réseaux mobiles utilisent des infrastructures différentes. Le type de réseau seul ne suffit pas à calculer votre empreinte.",
                recommendation: "Pour un téléchargement volumineux non urgent, utilisez votre réseau Wi-Fi de confiance si vous en avez un."
            },
            {
                label: "4G",
                info: "Le Wi-Fi d’une box et les réseaux mobiles utilisent des infrastructures différentes. Le type de réseau seul ne suffit pas à calculer votre empreinte.",
                recommendation: "Chez vous, essayez le Wi-Fi de votre box si le signal est suffisant."
            },
            {
                label: "5G",
                info: "Le Wi-Fi d’une box et les réseaux mobiles utilisent des infrastructures différentes. Le type de réseau seul ne suffit pas à calculer votre empreinte.",
                recommendation: "Si vous avez accès à un Wi-Fi de confiance, utilisez-le pour un prochain téléchargement volumineux."
            },
            {
                label: "Je ne sais pas ou pas de réseau principal",
                info: "Le Wi-Fi d’une box et les réseaux mobiles utilisent des infrastructures différentes. Le type de réseau seul ne suffit pas à calculer votre empreinte.",
                recommendation: "Avant votre prochain téléchargement, regardez si le téléphone affiche le symbole Wi-Fi ou celui du réseau mobile."
            },
        ]
    },
    {
        id: "computer_network",
        question: "Quel réseau utilisez-vous principalement pour accéder à Internet sur votre ordinateur ?",
        source: {
            label: "ADEME — Éviter les connexions en 4G/5G sur les téléphones portables",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=%C3%89viter%20les%20connexions%20en%204G%2F5G%20sur%20les%20t%C3%A9l%C3%A9phones%20portables",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Wi-Fi",
                info: "Un câble Ethernet permet de relier un ordinateur à la box. Le Wi-Fi permet aussi d’utiliser l’accès fixe de la box.",
                recommendation: "Si votre ordinateur est près de la box et que vous avez déjà un câble Ethernet, essayez la connexion filaire."
            },
            {
                label: "Ethernet",
                info: "Un câble Ethernet permet de relier un ordinateur à la box. Le Wi-Fi permet aussi d’utiliser l’accès fixe de la box.",
                recommendation: "Gardez la connexion filaire quand elle convient, par exemple pour un téléchargement volumineux."
            },
            {
                label: "4G ou 5G",
                info: "Un câble Ethernet permet de relier un ordinateur à la box. Le Wi-Fi permet aussi d’utiliser l’accès fixe de la box.",
                recommendation: "Si vous utilisez un partage de connexion mobile, passez sur le réseau fixe quand il est disponible et fiable."
            },
            {
                label: "Je ne sais pas ou pas de réseau principal",
                info: "Un câble Ethernet permet de relier un ordinateur à la box. Le Wi-Fi permet aussi d’utiliser l’accès fixe de la box.",
                recommendation: "Vérifiez dans les réglages réseau si votre ordinateur utilise un câble, un réseau Wi-Fi ou un partage mobile."
            },
        ]
    },
    {
        id: "email_sent",
        question: "Combien d’e-mails envoyez-vous en moyenne par jour ?",
        source: {
            label: "ADEME — Alléger les échanges sur messagerie",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=All%C3%A9ger%20les%20%C3%A9changes%20sur%20messagerie",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "De 0 à 9",
                info: "Le nombre d’envois ne dit rien sur la taille des pièces jointes ni sur le nombre de destinataires.",
                recommendation: "Si vous joignez une image, réduisez sa taille quand la qualité restante suffit."
            },
            {
                label: "De 10 à 29",
                info: "Le nombre d’envois ne dit rien sur la taille des pièces jointes ni sur le nombre de destinataires.",
                recommendation: "Avant votre prochain envoi groupé, vérifiez qui a besoin de recevoir le message."
            },
            {
                label: "De 30 à 50",
                info: "Le nombre d’envois ne dit rien sur la taille des pièces jointes ni sur le nombre de destinataires.",
                recommendation: "Si vous échangez déjà un document partagé, envoyez son lien avec les droits d’accès appropriés."
            },
            {
                label: "Plus de 50",
                info: "Le nombre d’envois ne dit rien sur la taille des pièces jointes ni sur le nombre de destinataires.",
                recommendation: "Si vous utilisez souvent une signature avec image pour des échanges internes, configurez une version texte."
            },
        ]
    },
    {
        id: "streaming_week",
        glossary: "impact_environnemental",
        question: "Combien d’heures de vidéo en streaming regardez-vous en moyenne par semaine ?",
        source: {
            label: "ADEME — Modérer le streaming vidéo",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mod%C3%A9rer%20le%20streaming%20vid%C3%A9o",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Moins de 5 h",
                info: "La résolution, l’enchaînement des vidéos et le besoin de regarder l’image sont des leviers différents.",
                recommendation: "Si vous regardez une vidéo sur un petit écran, essayez une résolution qui reste lisible."
            },
            {
                label: "De 5 h à moins de 10 h",
                info: "La résolution, l’enchaînement des vidéos et le besoin de regarder l’image sont des leviers différents.",
                recommendation: "Si votre plateforme enchaîne les épisodes, désactivez la lecture automatique."
            },
            {
                label: "De 10 h à 20 h",
                info: "La résolution, l’enchaînement des vidéos et le besoin de regarder l’image sont des leviers différents.",
                recommendation: "Si vous lancez des clips pour écouter de la musique, choisissez leur version audio quand elle existe."
            },
            {
                label: "Plus de 20 h",
                info: "La résolution, l’enchaînement des vidéos et le besoin de regarder l’image sont des leviers différents.",
                recommendation: "À votre prochaine session, choisissez les vidéos à voir et désactivez les suggestions en lecture automatique."
            },
        ]
    },
    {
        id: "cloud_size",
        question: "Quel volume de fichiers conservez-vous dans le cloud ?",
        source: {
            label: "ADEME — Faire le ménage dans le Cloud",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Faire%20le%20m%C3%A9nage%20dans%20le%20Cloud",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Le volume occupé aide à repérer les fichiers volumineux. Un fichier peut aussi être une copie de sauvegarde nécessaire.",
                recommendation: "Si vous devez partager des fichiers en ligne, sélectionnez uniquement ceux dont les destinataires ont besoin."
            },
            {
                label: "Moins de 10 Go",
                info: "Le volume occupé aide à repérer les fichiers volumineux. Un fichier peut aussi être une copie de sauvegarde nécessaire.",
                recommendation: "Repérez un ancien dossier partagé et vérifiez ce qui doit encore être conservé."
            },
            {
                label: "De 10 à 100 Go",
                info: "Le volume occupé aide à repérer les fichiers volumineux. Un fichier peut aussi être une copie de sauvegarde nécessaire.",
                recommendation: "Triez un dossier par taille et repérez les fichiers volumineux devenus inutiles."
            },
            {
                label: "Plus de 100 Go",
                info: "Le volume occupé aide à repérer les fichiers volumineux. Un fichier peut aussi être une copie de sauvegarde nécessaire.",
                recommendation: "Consultez le détail de l’espace occupé et commencez par un gros dossier. Vérifiez vos sauvegardes avant de supprimer des fichiers."
            },
            {
                label: "Je ne sais pas",
                info: "Le volume occupé aide à repérer les fichiers volumineux. Un fichier peut aussi être une copie de sauvegarde nécessaire.",
                recommendation: "Ouvrez la rubrique de gestion de l’espace de votre service pour voir quels dossiers occupent le plus de place."
            },
        ]
    },
    {
        id: "phone_replacement",
        question: "En moyenne, combien de temps gardez-vous un téléphone avant de le remplacer ?",
        source: {
            label: "ADEME — Résister au renouvellement des appareils qui fonctionnent encore",
            url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/bons-conseils-achats-numeriques#:~:text=R%C3%A9sister%20au%20renouvellement%20des%20appareils%20qui%20fonctionnent%20encore",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Plus de 3 ans ou jamais remplacé",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Si l’autonomie baisse, demandez un devis de remplacement de la batterie et vérifiez le suivi de sécurité du modèle."
            },
            {
                label: "De 2 à 3 ans",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Avant le prochain remplacement, identifiez le défaut qui vous gêne et vérifiez s’il est réparable."
            },
            {
                label: "1 an",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Si le téléphone fonctionne et reçoit encore ses correctifs, gardez-le jusqu’à ce qu’un besoin réel justifie son remplacement."
            },
            {
                label: "Plus de 1 an et moins de 2 ans",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Si le téléphone fonctionne et reçoit encore ses correctifs, gardez-le jusqu’à ce qu’un besoin réel justifie son remplacement."
            },
            {
                label: "Moins de 1 an",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Avant un prochain achat, notez le besoin concret et comparez une réparation avec une option reconditionnée encore suivie."
            },
            {
                label: "Je n’utilise pas de téléphone portable",
                info: "Prolonger la durée d’usage d’un appareil reporte le besoin de fabriquer son remplaçant lorsqu’il reste adapté et utilisable en sécurité.",
                recommendation: "Si un besoin se présente, définissez les fonctions utiles avant de choisir un appareil neuf ou reconditionné."
            },
        ]
    },
    {
        id: "connected_daily",
        question: "Combien d’appareils numériques connectés utilisez-vous chaque jour ?",
        source: {
            label: "ADEME — Les gestes pour les objets connectés",
            url: "https://www.ademe.fr/wp-content/uploads/2024/12/DP_Numerique-responsable-190122.pdf#page=11",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Le nombre d’appareils ne dit rien de leur puissance, de leur durée de vie ni de leurs fonctions en veille.",
                recommendation: "Si un besoin se présente, vérifiez si un équipement existant peut le couvrir avant d’acheter."
            },
            {
                label: "1",
                info: "Le nombre d’appareils ne dit rien de leur puissance, de leur durée de vie ni de leurs fonctions en veille.",
                recommendation: "Repérez le réglage de veille ou d’arrêt de l’appareil pour les périodes sans usage."
            },
            {
                label: "2",
                info: "Le nombre d’appareils ne dit rien de leur puissance, de leur durée de vie ni de leurs fonctions en veille.",
                recommendation: "Vérifiez si l’un des appareils peut être éteint après usage sans interrompre une fonction utile."
            },
            {
                label: "3",
                info: "Le nombre d’appareils ne dit rien de leur puissance, de leur durée de vie ni de leurs fonctions en veille.",
                recommendation: "Repérez un appareil rarement sollicité et vérifiez si son usage peut être couvert par un autre que vous possédez."
            },
            {
                label: "Plus de 3",
                info: "Le nombre d’appareils ne dit rien de leur puissance, de leur durée de vie ni de leurs fonctions en veille.",
                recommendation: "Faites l’inventaire des appareils. Si l’un est devenu inutile, envisagez le réemploi."
            },
        ]
    },
    {
        id: "habits",
        glossary: "empreinte_carbone",
        question: "À quelle fréquence appliquez-vous des gestes pour réduire l’impact de vos usages numériques ?",
        source: {
            label: "ADEME — Modérer le streaming vidéo",
            url: "https://agirpourlatransition.ademe.fr/particuliers/agir-bureau/teletravailler/bons-gestes-teletravail#:~:text=Mod%C3%A9rer%20le%20streaming%20vid%C3%A9o",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Régulièrement",
                info: "Un réglage peut rester actif après la première configuration, par exemple la désactivation de la lecture automatique.",
                recommendation: "Si vous regardez des vidéos en ligne, vérifiez que la lecture automatique reste désactivée sur vos appareils."
            },
            {
                label: "Parfois",
                info: "Un réglage peut rester actif après la première configuration, par exemple la désactivation de la lecture automatique.",
                recommendation: "Si vous baissez déjà la résolution de certaines vidéos, recherchez un réglage de qualité par défaut."
            },
            {
                label: "Jamais pour l’instant, mais j’y pense",
                info: "Un réglage peut rester actif après la première configuration, par exemple la désactivation de la lecture automatique.",
                recommendation: "Si vous écoutez de la musique via des clips, essayez une version audio la prochaine fois."
            },
            {
                label: "Jamais et je n’y ai pas encore réfléchi",
                info: "Un réglage peut rester actif après la première configuration, par exemple la désactivation de la lecture automatique.",
                recommendation: "Si une vidéo se lance seule dans une application, repérez le réglage qui permet de choisir quand la lancer."
            },
        ]
    },
    {
        id: "equipment_purchases",
        glossary: "impact_environnemental",
        question: "Combien d’équipements électroniques neufs achetez-vous par an ?",
        source: {
            label: "ADEME — Vérifier l’étiquette avant d’acheter",
            url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/bons-conseils-achats-numeriques#:~:text=V%C3%A9rifier%20l%E2%80%99%C3%A9tiquette%20avant%20d%E2%80%99acheter",
            consultedAt: "24/11/2026"
        },
        options: [
            {
                label: "Aucun",
                info: "Réparabilité, durée du support logiciel et adéquation au besoin aident à choisir un appareil qui durera.",
                recommendation: "Pour un futur achat nécessaire, comparez les possibilités de réparation et la durée du support logiciel."
            },
            {
                label: "1 ou 2",
                info: "Réparabilité, durée du support logiciel et adéquation au besoin aident à choisir un appareil qui durera.",
                recommendation: "Avant un prochain achat, demandez un devis de réparation si un équipement que vous possédez peut encore servir."
            },
            {
                label: "3 ou 4",
                info: "Réparabilité, durée du support logiciel et adéquation au besoin aident à choisir un appareil qui durera.",
                recommendation: "Listez vos prochains achats prévus et vérifiez lesquels peuvent être remplacés par du réemploi ou une réparation."
            },
            {
                label: "5 ou plus",
                info: "Réparabilité, durée du support logiciel et adéquation au besoin aident à choisir un appareil qui durera.",
                recommendation: "Identifiez une catégorie où vous remplacez souvent du matériel et vérifiez si une pièce ou un accessoire suffirait."
            },
        ]
    },
];

// Barème historique conservé pour examen. Voir QUIZ-CARBONE.md.
const legacyCarbon = {
    "computer_time": [36.5, 109.5, 182.5, 365],
    "phone_time": [18.25, 54.75, 91.25, 182.5],
    "phone_network": [18.25, 36.5, 54.75, null],
    "computer_network": [36.5, 18.25, 54.75, null],
    "email_sent": [14.6, 43.8, 73, 146],
    "streaming_week": [0, 0, 0, 0],
    "cloud_size": [0, 12, 120, 1200, null],
    "phone_replacement": [10, 25, 70, null, 150, null],
    "connected_daily": [null, 73, 146, 219, 365],
    "habits": [-0.1, -0.05, 0, 0.1],
    "equipment_purchases": [0, 50, 100, 200],
};
