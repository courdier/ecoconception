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
        source: "[1] F.Bordage, '24 fois plus de CO2 lors de la fabrication d’un ordinateur que lors de son utilisation,' Green IT, 2010. [Online]. Available: <a href='https://www.greenit.fr/2010/02/26/24-fois-plus-de-co2-lors-de-la-fabrication-d-un-ordinateur-que-lors-de-son-utilisation/' target='_blank'>https://www.greenit.fr/2010/02/26/24-fois-plus-de-co2-lors-de-la-fabrication-d-un-ordinateur-que-lors-de-son-utilisation/</a>"
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
        extra: "Éteindre sa webcam pendant sa visioconférence, c'est bon pour la planète. Passer votre vidéo de 4K à HD permet de réduire votre consommation énergétique.",
        source: "[10] 'Éteindre sa webcam pendant sa visioconférence, c'est bon pour la planète,' Huffington Post, 2023. [Online]. Available: <a href='https://www.huffingtonpost.fr/vie-de-bureau/video/eteindre-sa-webcam-pendant-sa-visioconference-c-est-bon-pour-la-planete_176254.html' target='_blank'>https://www.huffingtonpost.fr/vie-de-bureau/video/eteindre-sa-webcam-pendant-sa-visioconference-c-est-bon-pour-la-planete_176254.html</a><br>[11] 'Energy consumption of video streaming' Université de Linköping, 2024. [Online]. Available: <a href='https://www.diva-portal.org/smash/get/diva2%3A1861519/FULLTEXT01.pdf' target='_blank'>https://www.diva-portal.org/smash/get/diva2%3A1861519/FULLTEXT01.pdf</a>"
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
        source: "[12] 'L'impact environnemental des équipements électroniques,' CNRS, 2023. [Online]. Available: <a href='https://csi.math.cnrs.fr/documents/info.pdf' target='_blank'>https://csi.math.cnrs.fr/documents/info.pdf</a>"
    }
];

const validateButton = document.getElementById("validate-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const infoWrapper = document.getElementById("info");
const extraInfoWrapper = document.getElementById("extra-info");
const infoText = document.getElementById("info-text");
const extraInfoText = document.getElementById("extra-info-text");
const sourceText = document.getElementById("source-text");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("quiz-progress-text");

validateButton.addEventListener("click", validateAnswer);
nextButton.addEventListener("click", loadNextQuestion);

function validateAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert("Veuillez sélectionner une réponse avant de valider.");
        return;
    }

    const answerIndex = Number(selectedAnswer.value);
    userAnswers.push(answerIndex);

    totalCO2 += questions[currentQuestionIndex].answers[answerIndex].co2Impact;

    showInformation(currentQuestionIndex);

    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.disabled = true;
    });

    validateButton.style.display = "none";
    nextButton.style.display = "inline-block";
}

function showInformation(questionIndex) {
    const question = questions[questionIndex];

    infoText.innerHTML = `
        <p>
            <strong>Information :</strong>
            ${question.info}
        </p>
    `;

    extraInfoText.innerHTML = `
        <p>
            <strong class="strong-yellow">Comparaison :</strong>
            ${question.extra}
        </p>
    `;

    sourceText.innerHTML = `
        <em>Source :</em> ${question.source}
    `;

    infoWrapper.style.display = "block";
    extraInfoWrapper.style.display = "block";
}

function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function loadQuestion(index) {
    const questionData = questions[index];

    updateProgress(index);

    questionContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <div class="answers-list">
            ${questionData.answers.map((answer, answerIndex) => `
                <label class="answer-option">
                    <input type="radio" name="answer" value="${answerIndex}">
                    <span>${answer.text}</span>
                </label>
            `).join("")}
        </div>
    `;

    infoWrapper.style.display = "none";
    extraInfoWrapper.style.display = "none";

    infoText.innerHTML = "";
    extraInfoText.innerHTML = "";
    sourceText.innerHTML = "";

    validateButton.style.display = "inline-block";
    nextButton.style.display = "none";
}

function updateProgress(index) {
    const currentQuestionNumber = index + 1;
    const totalQuestions = questions.length;
    const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

    progressText.textContent = `Question ${currentQuestionNumber} sur ${totalQuestions}`;
    progressBar.style.width = `${progressPercentage}%`;
}

function showResults() {
    infoWrapper.style.display = "none";
    extraInfoWrapper.style.display = "none";
    sourceText.innerHTML = "";

    validateButton.style.display = "none";
    nextButton.style.display = "none";

    progressText.textContent = "Quiz terminé";
    progressBar.style.width = "100%";

    const smartphonesUsed = totalCO2 / 70;
    const tripsSaintPierreSaintDenis = totalCO2 / (78 * 0.24);
    const tripsReunionParis = totalCO2 / 1500;
    const computersManufactured = totalCO2 / 120;

    questionContainer.innerHTML = `
        <h2 class="quiz-results-title">
            Résultat du quiz :
            <strong>${totalCO2.toFixed(2)} kg de CO₂e estimés</strong>
        </h2>

        <div class="result-grid">
            <div class="result-card">
                <p class="result-value">${smartphonesUsed.toFixed(2)}</p>
                <p class="result-label">smartphones utilisés pendant un an</p>
            </div>

            <div class="result-card">
                <p class="result-value">${tripsSaintPierreSaintDenis.toFixed(2)}</p>
                <p class="result-label">trajets Saint-Pierre → Saint-Denis en voiture</p>
            </div>

            <div class="result-card">
                <p class="result-value">${tripsReunionParis.toFixed(2)}</p>
                <p class="result-label">aller-retour Réunion → Paris en avion</p>
            </div>

            <div class="result-card">
                <p class="result-value">${computersManufactured.toFixed(2)}</p>
                <p class="result-label">ordinateurs fabriqués sur un an</p>
            </div>
        </div>

        <p class="quiz-end-copy">
            Merci d’avoir participé ! Ces équivalences donnent un ordre de grandeur
            de l’impact associé aux réponses sélectionnées.
        </p>

        <details class="quiz-calculations">
            <summary>Voir les explications des calculs</summary>

            <ul>
                <li>
                    La quantité moyenne de CO₂ associée à la fabrication et à l’utilisation
                    d’un smartphone sur un an est de 70 kg.
                    <strong>Source :</strong>
                    A. Agogué, « Guide pratique des impacts des smartphones », ADEME, 2017.
                </li>

                <li>
                    Les trajets Saint-Pierre à Saint-Denis sont calculés à partir d’un trajet
                    de 78 km et d’une estimation de 0,24 kg de CO₂ par kilomètre.
                </li>

                <li>
                    Un aller-retour Réunion–Paris est ici estimé à 1500 kg de CO₂.
                </li>

                <li>
                    L’émission moyenne associée à la fabrication d’un ordinateur est ici estimée à 120 kg de CO₂.
                </li>
            </ul>
        </details>

        <div class="button-container quiz-results-actions">
            <a href="./quizV2.html" class="button">Encore un quiz</a>
            <a href="./quelques-chiffres.html" class="button">Quelques chiffres</a>
            <a href="./en-pratique.html" class="button-secondary">En pratique</a>
        </div>
    `;
}

window.addEventListener("load", () => {
    loadQuestion(currentQuestionIndex);
});