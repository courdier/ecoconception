let currentQuestionIndex = 0;
let userAnswers = [];
let totalCO2 = 0;

const questions = [
    {
        question: "Combien de temps passez-vous en moyenne par jour sur Internet sur un ordinateur (navigation web, réseaux sociaux, etc.) ?",
        answers: [
            { text: "Moins d'une heure", co2Impact: 0.1 * 365 },
            { text: "1 à 3 heures", co2Impact: 0.3 * 365 },
            { text: "3 à 5 heures", co2Impact: 0.5 * 365 },
            { text: "Plus de 5 heures", co2Impact: 1 * 365 }
        ],
        info: "En France, la moyenne est de 35 minutes par jour.",
        extra: "Un ordinateur moyen émet tout au long de sa vie (fabrication, transport, utilisation, recyclage, déchet) environ 510 Kg CO2. L’équivalent d’environ 212 cuissons de carry ou rougail de 4 heures.",
        source: "[1] L. Dupont, 'The Carbon Impact of Video Streaming,' Carbon Trust, 2019. [Online]. Available: <a href='https://www.carbontrust.com/resources/white-papers/2019/the-carbon-impact-of-video-streaming/' target='_blank'>https://www.carbontrust.com/resources/white-papers/2019/the-carbon-impact-of-video-streaming/</a>"
    },
    {
        question: "Combien de temps passez-vous en moyenne par jour sur Internet sur un téléphone (navigation web, réseaux sociaux, etc.) ?",
        answers: [
            { text: "Moins d'une heure", co2Impact: 0.05 * 365 },
            { text: "1 à 3 heures", co2Impact: 0.15 * 365 },
            { text: "3 à 5 heures", co2Impact: 0.25 * 365 },
            { text: "Plus de 5 heures", co2Impact: 0.5 * 365 }
        ],
        info: "En France, la moyenne est de 1h35 minutes par jour.",
        extra: "Entre 54 et 113 millions de téléphones dorment dans les placards en France. Ce qui représente environ 360 à 753 fois la population de Saint Denis. Un téléphone portable peut se recycler jusqu’à 80% !",
        source: "[2] 'Les Français passent toujours plus de temps sur le web et sur leur mobile,' Comarketing News. [Online]. Available: <a href='https://comarketing-news.fr/les-francais-passent-toujours-plus-de-temps-sur-le-web-et-sur-leur-mobile/#:~:text=Selon%20M%C3%A9diam%C3%A9trie%2C%20les%20Fran%C3%A7ais%20passent,3h30%20chez%20les%20plus%20jeunes.&text=En%20juin%202020%2C%20les%20Fran%C3%A7ais,1h51%20sur%20les%20%C3%A9crans%20mobiles.' target='_blank'>https://comarketing-news.fr/les-francais-passent-toujours-plus-de-temps-sur-le-web-et-sur-leur-mobile/</a>"
    },
    {
        question: "Quel type de connexion utilisez-vous principalement pour accéder à Internet sur votre téléphone ?",
        answers: [
            { text: "Wi-Fi", co2Impact: 0.05 * 365 },
            { text: "4G", co2Impact: 0.1 * 365 },
            { text: "5G", co2Impact: 0.15 * 365 }
        ],
        info: "La 5G est 10 fois moins énergivore et 8 fois moins émettrice de gaz à effet de serre que la 4G. Mais attention à l’effet rebond, plus le téléchargement d’un film est rapide, plus nous allons en télécharger.",
        extra: "La consommation du fonctionnement pendant une heure d’une antenne 5G correspond à environ 27 fois la quantité d’énergie utilisée par un cuiseur à riz en une heure.",
        source: "[3] 'La 5G est-elle soluble dans la sobriété?,' CNRS. [Online]. Available: <a href='https://lejournal.cnrs.fr/articles/la-5g-est-elle-soluble-dans-la-sobriete' target='_blank'>https://lejournal.cnrs.fr/articles/la-5g-est-elle-soluble-dans-la-sobriete</a>"
    },
    {
        question: "Quel type de connexion utilisez-vous principalement pour accéder à Internet sur votre ordinateur ?",
        answers: [
            { text: "Wi-Fi", co2Impact: 0.1 * 365 },
            { text: "Connexion filaire (Ethernet)", co2Impact: 0.05 * 365 },
            { text: "4G/5G", co2Impact: 0.15 * 365 }
        ],
        info: "95% de la consommation d'électricité d’une box internet est indépendante de la durée et de l'intensité de sa sollicitation.",
        extra: "Si Internet était considéré comme un pays, il serait le troisième plus grand consommateur d'électricité au monde, juste derrière les États-Unis et la Chine.",
        source: "[4] 'Faut-il vraiment éteindre sa box internet la nuit pour faire des économies?,' Journal du Geek, 2024. [Online]. Available: <a href='https://www.journaldugeek.com/2024/04/03/faut-il-vraiment-eteindre-sa-box-internet-la-nuit-pour-faire-des-economies/' target='_blank'>https://www.journaldugeek.com/2024/04/03/faut-il-vraiment-eteindre-sa-box-internet-la-nuit-pour-faire-des-economies/</a>"
    },
    {
        question: "Combien d'emails envoyez-vous en moyenne par jour (incluant les emails professionnels et personnels) ?",
        answers: [
            { text: "Moins de 10", co2Impact: 0.04 * 365 },
            { text: "10 à 30", co2Impact: 0.12 * 365 },
            { text: "30 à 50", co2Impact: 0.2 * 365 },
            { text: "Plus de 50", co2Impact: 0.4 * 365 }
        ],
        info: "À l'échelle mondiale 90% des spams sont filtrés en amont par les outils anti-spams des serveurs de messagerie.",
        extra: "En moyenne, chaque personne produit 130kg de CO2 par an avec les boîtes mail.",
        source: "[5] 'Impact des emails sur l'environnement,' CNRS, 2023. [Online]. Available: <a href='https://csi.math.cnrs.fr/documents/info.pdf' target='_blank'>https://csi.math.cnrs.fr/documents/info.pdf</a>"
    },
    {
        question: "Combien de vidéos en streaming regardez-vous en moyenne par semaine (YouTube, Netflix, etc.) ?",
        answers: [
            { text: "Moins de 5 heures", co2Impact: 0 },
            { text: "5 à 10 heures", co2Impact: 0 },
            { text: "10 à 20 heures", co2Impact: 0 },
            { text: "Plus de 20 heures", co2Impact: 0 }
        ],
        info: "Netflix, 160 millions d’abonnés payant dans le monde sur 220 millions ont visionné au moins une création Netflix évoquant le climat en 2020.",
        extra: "Regarder une heure de vidéo de streaming en Métropole ou à La Réunion n’a pas le même impact environnemental.",
        source: "[6] 'Le vrai coût écologique du streaming vidéo,' Les Numériques, 2023. [Online]. Available: <a href='https://www.lesnumeriques.com/vie-du-net/le-vrai-cout-ecologique-du-streaming-video-a197241.html' target='_blank'>https://www.lesnumeriques.com/vie-du-net/le-vrai-cout-ecologique-du-streaming-video-a197241.html</a>"
    },
    {
        question: "Utilisez-vous des services de stockage en ligne (cloud) pour vos fichiers ?",
        answers: [
            { text: "Non", co2Impact: 0 * 12 },
            { text: "Oui, moins de 10 Go", co2Impact: 1 * 12 },
            { text: "Oui, entre 10 et 100 Go", co2Impact: 10 * 12 },
            { text: "Oui, plus de 100 Go", co2Impact: 100 * 12 }
        ],
        info: "Chaque Go de données stockées dans le cloud consomme environ 0.0005 kWh par an en énergie de serveur.",
        extra: "Stocker 100 Go de données dans le cloud pendant un mois émet autant de CO2 qu'une voiture parcourant environ 400 km.",
        source: "[7] 'Évaluation des émissions du stockage cloud,' GreenIT. [Online]. Available: <a href='https://www.greenit.fr' target='_blank'>https://www.greenit.fr</a>"
    },
    {
        question: "Combien de fois changez-vous de téléphone portable en moyenne ?",
        answers: [
            { text: "Moins d'une fois tous les 3 ans", co2Impact: 10 },
            { text: "Tous les 2 à 3 ans", co2Impact: 25 },
            { text: "Tous les ans", co2Impact: 70 },
            { text: "Plus d'une fois par an", co2Impact: 150 }
        ],
        info: "10 milliards de smartphones vendus dans le monde entre 2007 et 2020.",
        extra: "Remplacer son téléphone tous les ans génère environ 70 kg de CO2.",
        source: "[8] 'Guide pratique des impacts des smartphones,' ADEME, 2017. [Online]. Available: <a href='https://presse.ademe.fr/wp-content/uploads/2017/09/guide-pratique-impacts-smartphone.pdf' target='_blank'>https://presse.ademe.fr/wp-content/uploads/2017/09/guide-pratique-impacts-smartphone.pdf</a>"
    },
    {
        question: "Combien d'appareils numériques connectés utilisez-vous quotidiennement (ordinateur, tablette, smartphone, télévision, montre, frigo, chauffe-eau, etc.) ?",
        answers: [
            { text: "1", co2Impact: 0.2 * 365 },
            { text: "2", co2Impact: 0.4 * 365 },
            { text: "3", co2Impact: 0.6 * 365 },
            { text: "Plus de 3", co2Impact: 1 * 365 }
        ],
        info: "Le nombre global d’appareils connectés a été projeté pour atteindre 50 milliards d’ici 2025.",
        extra: "50 milliards, cela représente environ 56 appareils connectés par habitant de La Réunion.",
        source: "[9] 'Objets connectés: 50 milliards d'émetteurs de CO2,' Télécom SudParis, 2023. [Online]. Available: <a href='https://www.telecom-sudparis.eu/actualite/objets-connectes-50-milliards-demetteurs-de-co2/' target='_blank'>https://www.telecom-sudparis.eu/actualite/objets-connectes-50-milliards-demetteurs-de-co2/</a>"
    },
    {
        question: "Avez-vous des pratiques pour réduire votre empreinte carbone numérique (réduction des emails inutiles, baisse de la qualité de streaming, etc.) ?",
        answers: [
            { text: "Oui, régulièrement", co2Impact: -0.1 },
            { text: "Oui, parfois", co2Impact: -0.05 },
            { text: "Non, mais j'y pense", co2Impact: 0 },
            { text: "Non, jamais ", co2Impact: 0.1 }
        ],
        info: "Réduire la qualité de streaming ou limiter les emails inutiles sont des pratiques efficaces pour diminuer son empreinte carbone.",
        extra: "Chaque petite action pour réduire l'empreinte numérique compte, particulièrement sur une île comme La Réunion où les ressources sont limitées.",
        source: "[10] 'Éteindre sa webcam pendant sa visioconférence, c'est bon pour la planète,' Huffington Post, 2023. [Online]. Available: <a href='https://www.huffingtonpost.fr/vie-de-bureau/video/eteindre-sa-webcam-pendant-sa-visioconference-c-est-bon-pour-la-planete_176254.html' target='_blank'>https://www.huffingtonpost.fr/vie-de-bureau/video/eteindre-sa-webcam-pendant-sa-visioconference-c-est-bon-pour-la-planete_176254.html</a>"
    },
    {
        question: "Combien de fois par an achetez-vous de nouveaux équipements électroniques (ordinateurs, tablettes, gadgets, etc.) ?",
        answers: [
            { text: "Aucun", co2Impact: 0 },
            { text: "1 à 2 fois", co2Impact: 50 },
            { text: "3 à 4 fois", co2Impact: 100 },
            { text: "Plus de 4 fois", co2Impact: 200 }
        ],
        info: "La fabrication de matériel informatique représente 97% de l’épuisement de nos ressources !",
        extra: "La fabrication de nouveau matériel informatique représente également : 29% de la consommation énergétique dans le monde, 54% des émissions de GES, et 61% de notre utilisation en eau.",
        source: "[11] 'L'impact environnemental des équipements électroniques,' CNRS, 2023. [Online]. Available: <a href='https://csi.math.cnrs.fr/documents/info.pdf' target='_blank'>https://csi.math.cnrs.fr/documents/info.pdf</a>"
    }
];


document.getElementById("validate-btn").addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        userAnswers.push(answerIndex);

        // Ajouter le CO2 de la réponse sélectionnée au total
        totalCO2 += questions[currentQuestionIndex].answers[answerIndex].co2Impact;

        // Afficher l'information, l'extra info, et la source après validation de la réponse
        showInformation(currentQuestionIndex, answerIndex);

        // Désactiver les boutons de réponse après validation
        document.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);

        // Cacher le bouton de validation et montrer le bouton suivant
        document.getElementById("validate-btn").style.display = "none";
        document.getElementById("next-btn").style.display = "block";
    } else {
        alert("Veuillez sélectionner une réponse avant de valider.");
    }
});

document.getElementById("next-btn").addEventListener("click", function () {
    loadNextQuestion();
});

function showInformation(questionIndex, answerIndex) {
    const infoContainer = document.getElementById("info-text");
    const extraInfoContainer = document.getElementById("extra-info-text");
    const question = questions[questionIndex];

    // Afficher l'information
    infoContainer.innerHTML = `<p><strong>Information :</strong> ${question.info}</p>`;
    document.getElementById("info").style.display = "block";

    // Afficher la comparaison
    extraInfoContainer.innerHTML = `<p><strong class="strong-yellow">Comparaison :</strong> ${question.extra}</p>`;
    document.getElementById("extra-info").style.display = "block";

    // Créer l'élément pour la source
    const sourceContainer = document.createElement("p");
    sourceContainer.innerHTML = `<em>Source :</em> ${question.source}`;
    sourceContainer.style.marginTop = "10px"; // Ajout d'un espace au-dessus de la source

    // Ajouter la source après la comparaison et avant le bouton "Suivant"
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.appendChild(sourceContainer);

    // Afficher le bouton "Suivant"
    const nextButton = document.getElementById("next-btn");
    nextButton.style.display = "inline-block";
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // Charger la question suivante
        loadQuestion(currentQuestionIndex);
    } else {
        // Effacer les éléments d'information restants
        document.getElementById("info").style.display = "none";
        document.getElementById("extra-info").style.display = "none";
        document.getElementById("info-text").innerHTML = "";
        document.getElementById("extra-info-text").innerHTML = "";

        // Effacer les anciennes sources
        const sourceElement = document.querySelector("#quiz-container p em");
        if (sourceElement) {
            sourceElement.parentElement.remove();
        }

        // Afficher les résultats
        showResults();
    }
}

function loadQuestion(index) {
    const questionData = questions[index];
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<h2>${questionData.question}</h2>`;

    questionData.answers.forEach((answer, i) => {
        questionContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${i}">
                ${answer.text}
            </label><br>
        `;
    });

    // Effacer les informations affichées précédemment
    document.getElementById("info").style.display = "none";
    document.getElementById("extra-info").style.display = "none";
    document.getElementById("info-text").innerHTML = "";
    document.getElementById("extra-info-text").innerHTML = "";

    // Réinitialiser l'affichage des boutons
    document.getElementById("validate-btn").style.display = "block";
    document.getElementById("next-btn").style.display = "none";

    // Effacer les anciennes sources
    const sourceElement = document.querySelector("#quiz-container p em");
    if (sourceElement) {
        sourceElement.parentElement.remove();
    }
}

function showResults() {
    // Masquer les éléments de la question précédente
    document.getElementById("info").style.display = "none";
    document.getElementById("extra-info").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    const smartphonesUsed = totalCO2 / 70;
    const tripsSaintPierreSaintDenis = totalCO2 / (78 * 0.24); 
    const tripsReunionParis = totalCO2 / 1500;
    const computersManufactured = totalCO2 / 120;
    const annualFrenchCO2Percentage = (totalCO2 / 9900) * 100;

    const resultContainer = document.getElementById("question-container");
    resultContainer.innerHTML = `
        <h2>Résultats du Quiz : <strong>${totalCO2.toFixed(2)} kg</strong></h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-around; margin: 50px 0;">
            <div style="border: 2px solid #FF5733; padding: 10px; border-radius: 5px; flex: 1 1 45%; margin-bottom: 10px;">
                <p style="font-size: 2em; font-weight: bold;">${smartphonesUsed.toFixed(2)}</p>
                <p>smartphones utilisés pendant un an</p>
            </div>
            <div style="border: 2px solid #33FF57; padding: 10px; border-radius: 5px; flex: 1 1 45%; margin-bottom: 10px;">
                <p style="font-size: 2em; font-weight: bold;">${tripsSaintPierreSaintDenis.toFixed(2)}</p>
                <p>trajets Saint-Pierre à Saint-Denis en voiture</p>
            </div>
            <div style="border: 2px solid #3357FF; padding: 10px; border-radius: 5px; flex: 1 1 45%; margin-bottom: 10px;">
                <p style="font-size: 2em; font-weight: bold;">${tripsReunionParis.toFixed(2)}</p>
                <p>aller-retour Réunion-Paris en avion</p>
            </div>
            <div style="border: 2px solid #FF33A1; padding: 10px; border-radius: 5px; flex: 1 1 45%; margin-bottom: 10px;">
                <p style="font-size: 2em; font-weight: bold;">${computersManufactured.toFixed(2)}</p>
                <p>ordinateurs fabriqués sur un an</p>
            </div>
        </div>
        <p>Merci d'avoir participé !</p>
        <hr style="margin: 50px 0;">
        <h3>Explications des Calculs :</h3>
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>La quantité moyenne de CO2 émise par la fabrication et l'utilisation d'un smartphone sur un an est de 70kg. <strong>Source</strong> : A. Agogué, "Guide pratique des impacts des smartphones," ADEME, 2017. Disponible en ligne : <a href="https://presse.ademe.fr/wp-content/uploads/2017/09/guide-pratique-impacts-smartphone.pdf" target="_blank">https://presse.ademe.fr/wp-content/uploads/2017/09/guide-pratique-impacts-smartphone.pdf</a></li>

            <li>Les trajets Saint-Pierre à Saint-Denis en voiture sont calculés en divisant le total des émissions de CO2 par 18.72 kg, représentant les émissions moyennes d'un trajet de 78 km en voiture.<strong> Source</strong> : ADEME, "Calculateur d'empreinte carbone," 2023. Disponible en ligne : <a href="https://www.ademe.fr/" target="_blank">https://www.ademe.fr/</a></li>

            <li>1500 kg est l'émission moyenne de CO2 pour un vol aller-retour Réunion-Paris.<strong> Source</strong> : "Calculateur de l'impact environnemental d'un trajet en avion," Bioaddict, 2023. Disponible en ligne : <a href="https://www.bioaddict.fr/calculez-l-impact-environnemental-de-votre-trajet-en-avion/#:~:text=Et%20si%20vous%20effectuez%20un,soit%20265%20litres%20de%20k%C3%A9ros%C3%A8ne." target="_blank">https://www.bioaddict.fr</a></li>
            <li>L'émission moyenne de CO2 associée à la fabrication d'un ordinateur est 120kg. <strong> Source</strong> : ADEME, "Calculateur d'empreinte carbone," 2023. Disponible en ligne : <a href="https://www.ademe.fr/" target="_blank">https://www.ademe.fr/</a></li>
        </ul>
    `;
}


window.onload = function () {
    loadQuestion(currentQuestionIndex);
};