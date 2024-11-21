const questions = [
    {
        id: 'streaming',
        question: "Combien d'heures passez-vous à regarder des vidéos en streaming par jour ?",
        icon: '📺',
        options: [
            { value: 1, label: "Moins d'1h", impact: 10, info: "Un film HD émet environ 1 kg de CO2.", recommendation: "Continuez de limiter votre consommation de streaming vidéo." },
            { value: 2, label: "1-3h", impact: 30, info: "Le streaming est l'une des activités les plus énergivores du numérique.", recommendation: "Essayez de réduire votre temps de streaming à moins de 2h par jour." },
            { value: 3, label: "3-5h", impact: 50, info: "Le streaming représente 34% de l'empreinte carbone du numérique.", recommendation: "Réduisez votre temps de streaming à moins de 3h par jour." },
            { value: 4, label: "Plus de 5h", impact: 80, info: "Le streaming vidéo est l'activité la plus polluante du numérique.", recommendation: "Limitez fortement votre temps de streaming quotidien." }
        ]
    },
    {
        id: 'email',
        question: "Combien d'emails conservez-vous dans votre boîte mail ?",
        icon: '📧',
        options: [
            { value: 1, label: "Moins de 1000", impact: 5, info: "Chaque email conservé émet environ 10g de CO2 par an.", recommendation: "Continuez à maintenir une boîte mail légère." },
            { value: 2, label: "1000-5000", impact: 20, info: "Plus votre boîte mail contient d'emails, plus votre impact augmente.", recommendation: "Pensez à archiver ou supprimer les emails anciens." },
            { value: 3, label: "5000-10000", impact: 40, info: "Une boîte mail avec 10 000 emails représente l'équivalent de 100 kg de CO2.", recommendation: "Faites un tri régulier de vos emails." },
            { value: 4, label: "Plus de 10000", impact: 60, info: "Une boîte mail surchargée a un impact environnemental important.", recommendation: "Effectuez un grand nettoyage de votre boîte mail." }
        ]
    },
    {
        id: 'devices',
        question: "Combien d'appareils connectés possédez-vous ?",
        icon: '📱',
        options: [
            { value: 1, label: "1-2", impact: 15, info: "Chaque appareil a un impact à la fabrication et à l'utilisation.", recommendation: "Conservez vos appareils le plus longtemps possible." },
            { value: 2, label: "3-5", impact: 35, info: "La multiplication des appareils augmente l'impact.", recommendation: "Limitez le nombre d'appareils au nécessaire." },
            { value: 3, label: "6-8", impact: 55, info: "Avoir beaucoup d'appareils augmente significativement l'impact.", recommendation: "Réduisez le nombre de vos appareils connectés." },
            { value: 4, label: "Plus de 8", impact: 85, info: "Un grand nombre d'appareils a un impact très important.", recommendation: "Diminuez drastiquement votre nombre d'appareils." }
        ]
    }
];
