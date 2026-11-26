/*
 * Quiz « Génération d'images par IA » : estimation de l'impact de vos habitudes.
 *
 * Pour modifier le quiz, éditer le tableau `questions` :
 *   question : énoncé
 *   answers  : propositions ; `recommendation` (facultatif) est reprise dans les résultats,
 *              `value` (facultatif) sert au calcul de l'estimation
 *   info     : encadré « Information » affiché après validation
 *   extra    : encadré « Comparaison » (facultatif)
 *   source   : référence (facultatif)
 *   key      : "needs", "launches" ou "perLaunch" pour les trois questions utilisées dans le calcul
 */
const SOURCE_LUCCIONI = "[1] A. S. Luccioni, Y. Jernite et E. Strubell, « Power Hungry Processing: Watts Driving the Cost of AI Deployment? », ACM FAccT 2024. [Online]. Available: <a href='https://arxiv.org/abs/2311.16863' target='_blank'>https://arxiv.org/abs/2311.16863</a>";

// Valeurs de référence (Luccioni et al., FAccT 2024, section 4.1 et tableau 2).
const ENERGY = {
    imageWh: 2.907,       // moyenne pour la génération d'images : 2,907 kWh pour 1 000 images
    imageWorstWh: 11.49,  // modèle de génération d'images le moins efficace : 11,49 kWh pour 1 000 images
    smartphoneChargeWh: 22, // une recharge de smartphone : 0,022 kWh (US EPA 2024, cité par l'étude)
    textRequestWh: 0.047, // génération de texte : 0,047 kWh pour 1 000 requêtes
    ledBulbW: 10          // ampoule LED de 10 W
};

const questions = [
    {
        key: "needs",
        question: "Combien de fois par semaine avez-vous besoin de générer une image avec une IA (projet, message, curiosité…) ?",
        answers: [
            { text: "Jamais ou presque", value: 0 },
            { text: "1 à 2 fois", value: 1.5 },
            { text: "3 à 10 fois", value: 6.5, recommendation: "Avant de générer, demandez-vous si une image existante ou une photo libre de droits ne suffirait pas." },
            { text: "Plus de 10 fois", value: 15, recommendation: "Avant de générer, demandez-vous si une image existante ou une photo libre de droits ne suffirait pas." }
        ],
        info: "Chaque demande lance un calcul important sur un processeur graphique (GPU), qui retire progressivement le « bruit » d'une image en plusieurs étapes. Dans une étude de référence, générer une image consomme en moyenne environ 2,9 Wh.",
        extra: "Générer 1 000 images consomme en moyenne 2,9 kWh, soit l'énergie d'environ 130 recharges de smartphone.",
        source: SOURCE_LUCCIONI
    },
    {
        key: "launches",
        question: "Pour un même besoin, combien de fois lancez-vous la génération avant d'être satisfait(e) ?",
        answers: [
            { text: "Une seule fois", value: 1 },
            { text: "2 à 4 fois", value: 3, recommendation: "Précisez votre description (sujet, style, cadrage) avant de lancer la génération pour limiter les essais." },
            { text: "5 à 10 fois", value: 7.5, recommendation: "Précisez votre description (sujet, style, cadrage) avant de lancer la génération pour limiter les essais." },
            { text: "Plus de 10 fois", value: 12, recommendation: "Précisez votre description (sujet, style, cadrage) avant de lancer la génération pour limiter les essais." }
        ],
        info: "Chaque nouvel essai refait tout le calcul : les images écartées ont consommé autant d'énergie que celle que vous gardez.",
        extra: "Dans l'étude de référence, le modèle le moins efficace consomme environ la moitié d'une recharge de smartphone pour une seule image.",
        source: SOURCE_LUCCIONI
    },
    {
        key: "perLaunch",
        question: "À chaque lancement, combien d'images votre outil produit-il ?",
        answers: [
            { text: "Une seule", value: 1 },
            { text: "Deux", value: 2 },
            { text: "Quatre ou plus", value: 4, recommendation: "Si l'outil le permet, ne produisez qu'une image par lancement tant que vous explorez une idée." },
            { text: "Je ne sais pas", value: 1, recommendation: "Vérifiez combien d'images votre outil produit à chaque demande : certains en génèrent plusieurs par défaut." }
        ],
        info: "Certains services proposent plusieurs images à chaque demande. Chacune représente un calcul complet, même si vous n'en conservez qu'une.",
        extra: "",
        source: ""
    },
    {
        question: "En quelle taille générez-vous habituellement vos images ?",
        answers: [
            { text: "Une taille adaptée à l'usage (vignette, publication, diaporama…)" },
            { text: "La taille proposée par défaut, sans y penser", recommendation: "Choisissez la taille de l'image selon son affichage réel plutôt que la taille par défaut." },
            { text: "Toujours la plus grande taille possible, voire avec un agrandissement", recommendation: "Évitez de générer ou d'agrandir en très haute résolution une image qui sera affichée en petit." },
            { text: "Je ne sais pas", recommendation: "Regardez la taille des images que vous générez et adaptez-la à leur affichage réel." }
        ],
        info: "Doubler la largeur et la hauteur d'une image multiplie par quatre le nombre de pixels à calculer. L'étude de référence observe de grands écarts de consommation entre modèles, liés notamment à la taille des images produites.",
        extra: "Une image de 512 × 512 pixels compte 262 144 pixels, une image de 1024 × 1024 pixels en compte 1 048 576.",
        source: SOURCE_LUCCIONI
    },
    {
        question: "Avant de lancer une génération, comment rédigez-vous votre description ?",
        answers: [
            { text: "Je la prépare précisément (sujet, style, cadrage, couleurs)" },
            { text: "J'écris quelques mots puis je corrige au fil des essais", recommendation: "Prenez une minute pour rédiger une description complète avant le premier lancement." },
            { text: "Je teste au hasard pour voir ce qui sort", recommendation: "Prenez une minute pour rédiger une description complète avant le premier lancement." }
        ],
        info: "Une description précise réduit les essais inutiles. Certains outils permettent aussi de modifier une zone d'une image existante plutôt que de tout régénérer.",
        extra: "",
        source: ""
    },
    {
        question: "Quand vous avez besoin d'une image proche d'une image déjà générée, que faites-vous ?",
        answers: [
            { text: "Je réutilise ou je retouche l'image existante" },
            { text: "Je génère une nouvelle image", recommendation: "Réutilisez ou retouchez les images déjà générées quand elles répondent au besoin." },
            { text: "Je ne retrouve jamais mes anciennes images", recommendation: "Classez les images que vous conservez pour pouvoir les retrouver et les réutiliser." }
        ],
        info: "Réutiliser une image existante évite tout le calcul d'une nouvelle génération : il ne reste que le coût de son stockage et de son affichage.",
        extra: "",
        source: ""
    },
    {
        question: "Pour quoi utilisez-vous le plus souvent la génération d'images ?",
        answers: [
            { text: "Un besoin précis (illustrer un travail, une présentation…)" },
            { text: "Le divertissement ou la curiosité", recommendation: "Gardez en tête que chaque image « pour voir » mobilise un GPU : générez avec modération." },
            { text: "Des images que je pourrais trouver dans une banque d'images libre de droits", recommendation: "Pour des images courantes, consultez d'abord une banque d'images libre de droits." }
        ],
        info: "Pour une image courante (paysage, objet, photo d'illustration), une banque d'images libre de droits peut suffire et évite une génération.",
        extra: "Dans l'étude de référence, générer une image consomme en moyenne plus de 60 fois plus d'énergie qu'une requête de génération de texte.",
        source: SOURCE_LUCCIONI
    },
    {
        question: "Quel type d'outil utilisez-vous principalement ?",
        answers: [
            { text: "Un service en ligne (site ou application)" },
            { text: "Un logiciel installé sur mon ordinateur" },
            { text: "Les deux" },
            { text: "Je ne sais pas" }
        ],
        info: "Avec un service en ligne, le calcul est réalisé dans un centre de données : sa consommation, son refroidissement et le réseau restent invisibles pour vous. En local, c'est votre propre carte graphique ou processeur qui travaille. Dans les deux cas, la consommation dépend fortement du matériel et du modèle utilisés.",
        extra: "D'après l'étude, 1 000 images générées par le modèle le plus émetteur testé (Stable Diffusion XL) émettent environ 1,6 kg de CO₂e, l'équivalent d'environ 6,6 km parcourus en voiture essence. Ce chiffre dépend du mix électrique du centre de données.",
        source: SOURCE_LUCCIONI
    },
    {
        question: "Que faites-vous des images que vous ne gardez pas ?",
        answers: [
            { text: "Je les supprime au fur et à mesure" },
            { text: "Elles restent stockées dans mon historique en ligne", recommendation: "Faites régulièrement le tri dans votre historique : ne conservez que les images utiles." },
            { text: "Je les télécharge toutes, au cas où", recommendation: "Ne téléchargez que les images que vous comptez réellement utiliser." }
        ],
        info: "L'énergie de la génération est déjà consommée, mais conserver des milliers d'images inutiles occupe des serveurs ou des disques dans la durée.",
        extra: "",
        source: ""
    },
    {
        question: "Lorsque vous partagez une image générée, sous quelle forme l'envoyez-vous ?",
        answers: [
            { text: "Dans un format compressé et à la bonne taille (JPEG, WebP…)" },
            { text: "Dans le fichier d'origine, sans y toucher", recommendation: "Convertissez vos images en WebP ou JPEG, à la taille utile, avant de les partager." },
            { text: "Je ne sais pas", recommendation: "Convertissez vos images en WebP ou JPEG, à la taille utile, avant de les partager." }
        ],
        info: "Une image générée est souvent un fichier PNG volumineux. La convertir dans un format compressé, à sa taille d'affichage, réduit les données transférées et stockées à chaque partage.",
        extra: "",
        source: ""
    }
];

// Nombre d'images générées par an = besoins par semaine × 52 × lancements par besoin × images par lancement.
function computeEstimate(answerIndexes) {
    const valueOf = key => {
        const index = questions.findIndex(question => question.key === key);
        return questions[index].answers[answerIndexes[index]].value;
    };

    const imagesPerYear = valueOf("needs") * 52 * valueOf("launches") * valueOf("perLaunch");

    return {
        imagesPerYear,
        energyWh: imagesPerYear * ENERGY.imageWh,
        energyWorstWh: imagesPerYear * ENERGY.imageWorstWh
    };
}

function formatNumber(value) {
    return value.toLocaleString("fr-FR", { maximumFractionDigits: value < 10 ? 1 : 0 });
}

function formatEnergy(wh) {
    return wh >= 1000 ? `${formatNumber(wh / 1000)} kWh` : `${formatNumber(wh)} Wh`;
}

if (typeof document !== "undefined") {
    let currentQuestionIndex = 0;
    let userAnswers = [];

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

    function loadQuestion(index) {
        const questionData = questions[index];

        updateProgress(index);

        questionContainer.innerHTML = `
            <h2 id="question-title" tabindex="-1">${questionData.question}</h2>
            <div class="answers-list" role="radiogroup" aria-labelledby="question-title">
                ${questionData.answers.map((answer, answerIndex) => `
                    <label class="answer-option">
                        <input type="radio" name="answer" value="${answerIndex}">
                        <span>${answer.text}</span>
                    </label>
                `).join("")}
            </div>
        `;

        questionContainer.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener("change", () => {
                validateButton.disabled = false;
            });
        });

        infoWrapper.style.display = "none";
        extraInfoWrapper.style.display = "none";
        infoText.innerHTML = "";
        extraInfoText.innerHTML = "";
        sourceText.innerHTML = "";

        validateButton.disabled = true;
        validateButton.style.display = "inline-block";
        nextButton.style.display = "none";
    }

    function validateAnswer() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');

        // Une seule validation par question : les réponses sont verrouillées ensuite.
        if (!selectedAnswer || userAnswers.length > currentQuestionIndex) {
            return;
        }

        userAnswers.push(Number(selectedAnswer.value));

        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.disabled = true;
        });

        showInformation(questions[currentQuestionIndex]);

        validateButton.style.display = "none";
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Voir mon résultat" : "Suivant";
        nextButton.style.display = "inline-block";
        nextButton.focus();
    }

    function showInformation(question) {
        infoText.innerHTML = `<p><strong>Information :</strong> ${question.info}</p>`;
        infoWrapper.style.display = "block";

        if (question.extra) {
            extraInfoText.innerHTML = `<p><strong class="strong-yellow">Comparaison :</strong> ${question.extra}</p>`;
            extraInfoWrapper.style.display = "block";
        }

        if (question.source) {
            sourceText.innerHTML = `<em>Source :</em> ${question.source}`;
        }
    }

    function loadNextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            showResults();
        }

        document.getElementById("question-title").focus();
    }

    function updateProgress(index) {
        progressText.textContent = `Question ${index + 1} sur ${questions.length}`;
        progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
    }

    function showResults() {
        const estimate = computeEstimate(userAnswers);
        const recommendations = [...new Set(userAnswers
            .map((answerIndex, questionIndex) => questions[questionIndex].answers[answerIndex].recommendation)
            .filter(Boolean))];

        infoWrapper.style.display = "none";
        extraInfoWrapper.style.display = "none";
        sourceText.innerHTML = "";
        validateButton.style.display = "none";
        nextButton.style.display = "none";

        progressText.textContent = "Quiz terminé";
        progressBar.style.width = "100%";

        const summary = estimate.imagesPerYear === 0
            ? `
                <h2 class="quiz-results-title" id="question-title" tabindex="-1">
                    Résultat : <strong>vous ne générez presque jamais d'images</strong>
                </h2>
                <p class="quiz-end-copy">
                    Votre consommation liée à la génération d'images est très faible.
                    Les bonnes pratiques ci-dessous restent utiles le jour où vous en aurez besoin.
                </p>
            `
            : `
                <h2 class="quiz-results-title" id="question-title" tabindex="-1">
                    Résultat du quiz :
                    <strong>environ ${formatEnergy(estimate.energyWh)} par an</strong>
                </h2>

                <div class="result-grid">
                    <div class="result-card">
                        <p class="result-value">${formatNumber(estimate.imagesPerYear)}</p>
                        <p class="result-label">images générées par an</p>
                    </div>

                    <div class="result-card">
                        <p class="result-value">${formatNumber(estimate.energyWh / ENERGY.smartphoneChargeWh)}</p>
                        <p class="result-label">recharges de smartphone</p>
                    </div>

                    <div class="result-card">
                        <p class="result-value">${formatNumber(estimate.energyWh / ENERGY.ledBulbW)}</p>
                        <p class="result-label">heures d'éclairage d'une ampoule LED de 10 W</p>
                    </div>

                    <div class="result-card">
                        <p class="result-value">${formatNumber(estimate.energyWh / ENERGY.textRequestWh)}</p>
                        <p class="result-label">requêtes de génération de texte</p>
                    </div>
                </div>

                <p class="quiz-end-copy">
                    Avec un modèle peu efficace, le même usage pourrait consommer jusqu'à
                    <strong>${formatEnergy(estimate.energyWorstWh)} par an</strong>.
                    Ces équivalences donnent un ordre de grandeur, pas une mesure de votre consommation réelle.
                </p>
            `;

        questionContainer.innerHTML = `
            ${summary}

            <div class="quiz-calculations quiz-recommendations">
                <h3>Recommandations personnalisées</h3>
                <ul>
                    ${(recommendations.length > 0
                        ? recommendations
                        : ["Vos habitudes sont déjà sobres : continuez à générer uniquement quand c'est utile, au bon format, et à réutiliser vos images."])
                        .map(recommendation => `<li>${recommendation}</li>`).join("")}
                </ul>
            </div>

            <details class="quiz-calculations">
                <summary>Voir les explications des calculs</summary>

                <ul>
                    <li>
                        Images par an = demandes par semaine × 52 semaines × lancements par demande × images par lancement.
                        Pour chaque tranche, la valeur retenue est le milieu de l'intervalle (par exemple 6,5 pour « 3 à 10 fois »)
                        et 15 ou 12 pour les réponses « plus de ».
                    </li>
                    <li>
                        Énergie moyenne par image : 2,9 Wh (2,907 kWh pour 1 000 images, moyenne de plusieurs modèles
                        mesurés sur un GPU NVIDIA A100). Modèle le moins efficace : 11,5 Wh par image.
                        <strong>Source :</strong> A. S. Luccioni, Y. Jernite et E. Strubell, FAccT 2024 [1].
                    </li>
                    <li>
                        Une recharge de smartphone : 22 Wh (US EPA, 2024, valeur reprise par la même étude).
                        Une requête de génération de texte : 0,047 Wh (même étude).
                        Une ampoule LED de 10 W consomme 10 Wh par heure.
                    </li>
                    <li>
                        Limites : l'estimation ne tient compte ni de la fabrication du matériel, ni du réseau, ni de l'entraînement
                        des modèles. Les services réels peuvent être plus ou moins efficaces que les modèles de l'étude, et les
                        émissions de CO₂ dépendent du mix électrique du lieu de calcul.
                    </li>
                    <li>${SOURCE_LUCCIONI}</li>
                </ul>
            </details>

            <div class="button-container quiz-results-actions">
                <button type="button" id="restart-btn" class="button">Recommencer le quiz</button>
                <a href="./quizz-access.html" class="button">Encore un quiz</a>
                <a href="./quelques-chiffres.html" class="button-secondary">Quelques chiffres</a>
            </div>
        `;

        document.getElementById("restart-btn").addEventListener("click", restartQuiz);
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        userAnswers = [];
        loadQuestion(0);
        document.getElementById("question-title").focus();
    }

    loadQuestion(currentQuestionIndex);
}

if (typeof module !== "undefined") {
    module.exports = { questions, computeEstimate, ENERGY };
}
