const questions = [
    {
        question: "Combien de temps passez-vous en moyenne par jour sur Internet sur un ordinateur (navigation web, réseaux sociaux, etc.) ?",
        answers: [
            { text: "Moins d'une heure"},
            { text: "1 à 3 heures"},
            { text: "3 à 5 heures"},
            { text: "Plus de 5 heures"}
        ],
        info: "En France, la moyenne est de 35 minutes par jour.",
        extra: "Un ordinateur moyen émet tout au long de sa vie (fabrication, transport, utilisation, recyclage, déchet) environ 510 Kg CO2. L’équivalent d’environ 212 cuissons de carry ou rougail de 4 heures. "
    },
    {
        question: "Combien de temps passez-vous en moyenne par jour sur Internet sur un téléphone (navigation web, réseaux sociaux, etc.) ?",
        answers: [
            { text: "Moins d'une heure"},
            { text: "1 à 3 heures"},
            { text: "3 à 5 heures"},
            { text: "Plus de 5 heures"}
        ],
        info: "En France, la moyenne est de 1h35 minutes par jour.",
        extra: "Entre 54 et 113 millions de téléphones dorment dans les placards en France. Ce qui représente environ 360 a 753 fois la population de Saint Denis. Un téléphone portable peut se recycler jusqu’à 80% ! "
    },
    {
        question: "Quel type de connexion utilisez-vous principalement pour accéder à Internet sur votre téléphone ?",
        answers: [
            { text: "Wi-Fi"},
            { text: "4G"},
            { text: "5G"}
        ],
        info: "La 5G 10 fois moins énergivore et 8 fois moins émettrice de gaz à effet de serre que la 4G. Mais attention à l’effet rebond, plus le téléchargement d’un film est rapide, plus nous allons en télécharger. Une antenne 5G peut consommer jusqu'à 19 kilowatts quand une antenne 4G se contente de 7 kilowatts. ",
        extra: "La consommation du fonctionnement pendant une heure d’une  antenne 5G correspond a environ 27 fois la quantité d’énergie utilisée par un cuiseur à riz en une heure."
    },
    {
        question: "Quel type de connexion utilisez-vous principalement pour accéder à Internet sur votre ordinateur ?",
        answers: [
            { text: "Wi-Fi"},
            { text: "Connexion filaire (Ethernet)"},
            { text: "4G/5G"}
        ],
        info: "95% de la consommation d'électricité d’une box internet est indépendante de la durée et de l'intensité de sa sollicitation.",
        extra: "Si Internet était considéré comme un pays, il serait le troisième plus grand consommateur d'électricité au monde, juste derrière les États-Unis et la Chine. La France et par extension la Réunion, se classe au dixième rang mondial en termes de consommation d’électricité."
    },
    {
        question: "Combien d'emails envoyez-vous en moyenne par jour (incluant les emails professionnels et personnels) ?",
        answers: [
            { text: "Moins de 10"},
            { text: "10 à 30"},
            { text: "30 à 50"},
            { text: "Plus de 50"}
        ],
        info: "À l'échelle mondiale 90% des spams sont filtrés en amont par les outils anti-spams des serveurs de messagerie. Vous ne les voyez pas mais ils vous sont adressés.",
        extra: "En moyenne, chaque personne produit 130kg de CO2 par an avec les boîtes mail. Pour un laboratoire de 100 personnes, cela représente 13 tonnes de CO2 par an, uniquement pour l’usage d’emails. Ce qui équivaut à 19.4 vols aller-retour Paris Saint-Denis de la Réunion ! "
    },
    {
        question: "Combien de vidéos en streaming regardez-vous en moyenne par semaine (YouTube, Netflix, etc.) ?",
        answers: [
            { text: "Moins de 5 heures"},
            { text: "5 à 10 heures"},
            { text: "10 à 20 heures"},
            { text: "Plus de 20 heures"}
        ],
        info: "Netflix, 160 millions d’abonnés payant dans le monde sur 220 millions ont visionné au moins une création Netflix évoquant le climat en 2020.",
        extra: "Regarder une heure de vidéo de streaming en Métropole ou à la Réunion n’a pas le même impact environnemental. Cela dépend de la manière dont l'électricité est produite dans la région. Mais attention également au “pic de la marmite à riz”. À la Rréunion, la production d'électricité varie entre énergies renouvelables et combustibles fossiles en fonction de la charge du réseau."
    },
    {
        question: "Utilisez-vous des services de stockage en ligne (cloud) pour vos fichiers ?",
        answers: [
            { text: "Non"},
            { text: "Oui, moins de 10 Go"},
            { text: "Oui, entre 10 et 100 Go"},
            { text: "Oui, plus de 100 Go"}
        ],
        info: "Chaque Go de données stockées dans le cloud consomme environ 0.0005 kWh par an en énergie de serveur, ce qui peut sembler minime mais s'accumule rapidement avec l'augmentation de la quantité de données stockées.",
        extra: "Stocker 100 Go de données dans le cloud pendant un mois émet autant de CO2 qu'une voiture parcourant environ 400 km. À La Réunion, cela équivaut à presque deux tours complets de l'île, qui fait environ 207 km de circonférence."
    },
    {
        question: "Combien de fois changez-vous de téléphone portable en moyenne ?",
        answers: [
            { text: "Moins d'une fois tous les 3 ans"},
            { text: "Tous les 2 à 3 ans"},
            { text: "Tous les ans"},
            { text: "Plus d'une fois par an"}
        ],
        info: "10 milliards de smartphones vendues dans le monde entre 2007 et 2020. 4 tours du monde pour fabriquer un smartphone.",
        extra: "Remplacer son téléphone tous les ans génère environ 70 kg de CO2, ce qui est équivalent à la consommation électrique d'un foyer réunionnais moyen pour environ deux mois, en tenant compte d'une consommation moyenne de 200 kWh par mois."
    },
    {
        question: "Combien d'appareils numériques connectés utilisez-vous quotidiennement (ordinateur, tablette, smartphone, télévision, montre, frigo, chauffe-eau, etc.) ?",
        answers: [
            { text: "1"},
            { text: "2"},
            { text: "3"},
            { text: "Plus de 3"}
        ],
        info: "Le nombre global d’appareils connectés a été projeté pour atteindre 50 milliards d’ici 2025.",
        extra: "50 milliards, cela représente environ 56 appareils connectés par habitant de La Réunion …. : un frigo, une machine à laver, un chauffe-eau, un smarthphone, une montre, un ordinateur, une enceinte, un aspirateur, une tondeuse … 56 vraiment ? "
    },
    {
        question: "Avez-vous des pratiques pour réduire votre empreinte carbone numérique (réduction des emails inutiles, baisse de la qualité de streaming, etc.) ?",
        answers: [
            { text: "Oui, régulièrement"},
            { text: "Oui, parfois"},
            { text: "Non, mais j'y pense"},
            { text: "Non, jamais "}
        ],
    },
    {
        question: "Combien de fois par an achetez-vous de nouveaux équipements électroniques (ordinateurs, tablettes, gadgets, etc.) ?",
        answers: [
            { text: "Aucun"},
            { text: "1 à 2 fois"},
            { text: "3 à 4 fois"},
            { text: "Plus de 4 fois"}
        ],
        info: "La fabrication de matériel informatique représente 97% de l’épuisement de nos ressources !",
        extra: "La fabrication de nouveau matériel informatique représente également : 29% de la consommation énergétique dans le monde, 54% des émissions de GES, et 61% de notre utilisation en eau."
    },

];

let currentQuestionIndex = 0;
let userAnswers = [];

function showQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <ul>
            ${question.answers.map((answer, i) => `
                <li>
                    <label>
                        <input type="radio" name="answer" value="${i}">
                        ${answer.text} 
                    </label>
                </li>
            `).join('')}
        </ul>
    `;
    const infoText = question.info ? question.info : '';
    const extraInfoText = question.extra ? question.extra : '';
    document.getElementById('info-text').innerText = question.info;
    document.getElementById('extra-info-text').innerText = question.extra;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

let totalCO2 = 0;

function calculateCO2(answerIndex, co2Values) {
    return co2Values[answerIndex];
}

document.getElementById('next-btn').addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const co2Values = [
            // Pour la première question (ordinateur, par jour)
            0.1 * 365, 0.3 * 365, 0.5 * 365, 1 * 365,
            // Pour la deuxième question (téléphone, par jour)
            0.05 * 365, 0.15 * 365, 0.25 * 365, 0.5 * 365,
            // Pour la troisième question (connexion sur téléphone, par heure)
            0.05 * 365, 0.1 * 365, 0.15 * 365,
            // Pour la quatrième question (connexion sur ordinateur, par heure)
            0.1 * 365, 0.05 * 365, 0.15 * 365,
            // Pour la cinquième question (emails envoyés, par jour)
            0.04 * 365, 0.12 * 365, 0.2 * 365, 0.4 * 365,
            // Pour la sixième question (vidéos en streaming, déjà en kg CO2 par semaine)
            0, 0, 0, 0,
            // Pour la septième question (cloud, par mois)
            0 * 12, 1 * 12, 10 * 12, 100 * 12,
            // Pour la huitième question (changement de téléphone, par an)
            10, 25, 70, 150,
            // Pour la neuvième question (appareils numériques connectés, par jour)
            0.2 * 365, 0.4 * 365, 0.6 * 365, 1 * 365,
            // Pour la dixième question (pratiques pour réduire l'empreinte numérique)
            -0.1, -0.05, 0, 0.1,
            // Pour la onzième question (visioconférence, par jour)
            0.1 * 365, 0.2 * 365, 0.4 * 365, 1 * 365,
            // Pour la douzième question (achat d'équipements électroniques, par an)
            0, 50, 100, 200
        ];

        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        totalCO2 += calculateCO2(parseInt(selectedAnswer.value), co2Values.slice(currentQuestionIndex * 4, (currentQuestionIndex + 1) * 4));

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            updateProgressBar();
        } else {
            showResults();
        }
    } else {
        alert("Veuillez sélectionner une réponse avant de passer à la question suivante.");
    }
});


function showResults() {
    const quizContainer = document.getElementById('quiz-container');

    const totalCO2PerPerson = totalCO2.toFixed(1);
    const co2PerCarYear = 3000; // 3000 kg CO2 pour la consommation annuelle moyenne d'une voiture
    const userPercentage = Math.min((totalCO2PerPerson / co2PerCarYear) * 100, 100); // Pourcentage par rapport à la voiture
    const carEquivalent = (totalCO2PerPerson / co2PerCarYear).toFixed(2);

    quizContainer.innerHTML = `
        <div class="result-summary">
            <div class="result-block">
                <h3>Total CO2 Émis</h3>
                <div class="progress-container">
                    <div class="progress-bar" id="user-progress" style="width: 0;"></div>
                </div>
                <p>${totalCO2PerPerson} kg/CO2 par an</p>
                <p>Équivalent à ${carEquivalent} année(s) de conduite d'une voiture moyenne parcourant 15 000 km/an</p>
            </div>
        </div>
        <div class="equivalences">
            <div class="equivalence-item">
                <i class="fas fa-car"></i>
                <p>${totalCO2PerPerson} kg/CO2 équivaut à ${Math.round(totalCO2PerPerson / 26.4)} tours de l'île de La Réunion en voiture.</p>
            </div>
            <div class="equivalence-item">
                <i class="fas fa-rocket"></i>
                <p>Impact équivalent à ${Math.round(totalCO2PerPerson / 1150 * 100) / 100} lancements de fusées Falcon 9.</p>
            </div>
        </div>
    `;

    // Dynamically animate the user progress bar
    setTimeout(() => {
        document.getElementById('user-progress').style.width = `${userPercentage}%`;
    }, 100); // Delay to ensure the animation starts after rendering
}

showQuestion(currentQuestionIndex);
updateProgressBar();

showQuestion(currentQuestionIndex);
updateProgressBar();

