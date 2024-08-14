const questions = [
    {
        question: "Qu'est-ce que l'informatique responsable ?",
        answers: [
            "Une approche qui vise à maximiser les performances des applications.",
            "Une méthode de gestion des ressources informatiques en entreprise.",
            "Une démarche visant à réduire l'impact environnemental et social des technologies numériques.",
            "Un ensemble de règles pour la sécurité informatique.",
        ],
        correctAnswer: 2
    },
    {
        question: "Quel est l'objectif principal de l'éco-conception dans le développement web ?",
        answers: [
            "Augmenter le nombre de fonctionnalités d'un site web.",
            "Réduire le temps de développement des applications.",
            "Minimiser l'empreinte écologique tout en assurant la performance du site.",
            "Maximiser l'utilisation de ressources serveur.",
        ],
        correctAnswer: 2
    },
    {
        question: "Quel est le rôle de SonarQube dans le développement logiciel ?",
        answers: [
            "Compiler le code source.",
            "Analyser la qualité du code et identifier les bugs, vulnérabilités, et mauvaises pratiques.",
            "Héberger des projets web.",
            "Générer des sites web statiques.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quels sont les avantages de l'utilisation du format WebP pour les images ?",
        answers: [
            "Meilleure qualité d'image sans réduction de taille.",
            "Réduction significative de la taille des fichiers d'image tout en conservant une bonne qualité visuelle.",
            "Augmentation de la compatibilité avec tous les navigateurs.",
            "Amélioration de la sécurité des images.",
        ],
        correctAnswer: 1
    },
    {
        question: "Qu'est-ce que le RGESN (Référentiel Général d'Écoconception des Services Numériques) ?",
        answers: [
            "Un logiciel de gestion de projet.",
            "Un outil de développement web.",
            "Un référentiel de bonnes pratiques pour l'éco-conception des services numériques.",
            "Un protocole de sécurité pour les applications web.",
        ],
        correctAnswer: 2
    },
    {
        question: "Quel est le cycle de vie d'un service numérique ?",
        answers: [
            "Développement, Test, Lancement, Maintenance.",
            "Conception, Développement, Utilisation, Fin de vie.",
            "Idéation, Prototypage, Production, Support.",
            "Conception, Déploiement, Monétisation, Retraite.",
        ],
        correctAnswer: 1
    },
    {
        question: "Que signifie le terme 'site web zombie' ?",
        answers: [
            "Un site web qui se remet en ligne après avoir été supprimé.",
            "Un site web obsolète qui n'est plus mis à jour mais qui reste hébergé et consomme des ressources.",
            "Un site web infecté par un virus ou un malware.",
            "Un site web qui change de contenu automatiquement.",
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi est-il important de prendre en compte le cycle de vie des équipements dans l'informatique responsable ?",
        answers: [
            "Pour maximiser les profits de l'entreprise.",
            "Pour réduire les coûts de maintenance.",
            "Pour minimiser l'impact environnemental à chaque étape, de la fabrication à la fin de vie.",
            "Pour améliorer la vitesse des équipements.",
        ],
        correctAnswer: 2
    },
    {
        question: "Quelle est la différence entre l'empreinte écologique et l'empreinte carbone ?",
        answers: [
            "L'empreinte écologique se réfère uniquement aux émissions de CO2.",
            "L'empreinte carbone est une partie de l'empreinte écologique, qui inclut également l'utilisation des ressources naturelles.",
            "L'empreinte écologique est plus précise que l'empreinte carbone.",
            "Les deux termes sont interchangeables.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel outil permet de mesurer l'empreinte carbone d'un site web ?",
        answers: [
            "EcoIndex",
            "Google Lighthouse",
            "SonarQube",
            "Website Carbon Calculator",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 3
    },
    {
        question: "Quelle pratique contribue le plus à réduire l'empreinte écologique des services numériques ?",
        answers: [
            "Ajouter plus de serveurs pour répartir la charge.",
            "Optimiser le code pour réduire la consommation de ressources.",
            "Augmenter la résolution des images.",
            "Ignorer les mises à jour logicielles pour économiser du temps.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quelle est l'utilité de la minification des fichiers CSS et JavaScript ?",
        answers: [
            "Augmenter la taille des fichiers pour une meilleure performance.",
            "Réduire la taille des fichiers en supprimant les espaces, commentaires, et autres éléments non essentiels.",
            "Améliorer la lisibilité du code pour les développeurs.",
            "Ajouter de nouvelles fonctionnalités au site.",
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi est-il important de configurer la mise en cache pour les ressources d'un site web ?",
        answers: [
            "Pour ralentir le chargement des pages.",
            "Pour réduire les requêtes serveur et améliorer les temps de chargement pour les utilisateurs.",
            "Pour augmenter la complexité du site web.",
            "Pour désactiver temporairement les scripts JavaScript.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est l'avantage principal de l'utilisation de sous-ensembles de polices (font subsetting) ?",
        answers: [
            "Augmenter le nombre de caractères disponibles dans une police.",
            "Améliorer la compatibilité des polices avec les anciens navigateurs.",
            "Améliorer la sécurité des fichiers de polices.",
            "Réduire la taille des fichiers de polices en incluant uniquement les caractères nécessaires.",
        ],
        correctAnswer: 3
    },
    {
        question: "Pourquoi est-il conseillé d'utiliser des formats modernes comme WebP ou AVIF pour les images ?",
        answers: [
            "Ils offrent une meilleure compatibilité avec les anciens navigateurs.",
            "Ils permettent une compression plus efficace tout en maintenant une bonne qualité d'image, ce qui réduit la taille des fichiers.",
            "Ils augmentent la résolution des images pour un affichage plus net",
            "Ils améliorent la sécurité des images.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est l'impact des sites web non utilisés mais toujours hébergés ?",
        answers: [
            "Ils n'ont aucun impact car ils ne sont pas visités.",
            "Ils améliorent la performance des serveurs en les maintenant actifs.",
            "Ils libèrent des ressources pour d'autres sites.",
            "Ils continuent de consommer des ressources serveur, ce qui augmente l'empreinte écologique.",
        ],
        correctAnswer: 3
    },
    {
        question: "Qu'est-ce que la sobriété numérique ?",
        answers: [
            "Réduire l'utilisation des appareils numériques pour minimiser l'impact environnemental.",
            "Utiliser des appareils numériques uniquement pendant les heures de travail.",
            "Développer des logiciels plus rapidement et efficacement.",
            "Minimiser l'empreinte carbone des entreprises en réduisant le nombre de serveurs.",
        ],
        correctAnswer: 0
    },
    {
        question: "Quel est le principal défi lié à l'éco-conception dans le développement web ?",
        answers: [
            "Maintenir un équilibre entre performance et durabilité.",
            "Augmenter les coûts de développement.",
            "Réduire le nombre de fonctionnalités.",
            "Diminuer le temps de développement.",
        ],
        correctAnswer: 0
    },
    {
        question: "Quel est l'impact des scripts JavaScript non utilisés sur un site web ?",
        answers: [
            "Ils n'ont aucun impact si le code n'est pas appelé.",
            "Ils ralentissent le temps de chargement et consomment des ressources inutiles.",
            "Ils améliorent la sécurité du site.",
            "Ils augmentent la complexité du développement.",
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi est-il important de limiter la taille des images sur un site web ?",
        answers: [
            "Pour économiser l'espace disque sur le serveur.",
            "Pour réduire les temps de chargement et améliorer l'expérience utilisateur. ",
            "Pour diminuer la qualité visuelle.",
            "Pour compliquer la gestion du site.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est l'intérêt de l'audit d'un site web pour l'éco-conception ?",
        answers: [
            "Identifier les points forts du site.",
            "Détecter les points de non-conformité et proposer des améliorations pour réduire l'empreinte écologique. ",
            "Mesurer la popularité du site.",
            "Augmenter le nombre de pages du site.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quelle stratégie peut réduire l'impact environnemental des serveurs web ?",
        answers: [
            "Augmenter la fréquence de sauvegarde des données.",
            "Utiliser des serveurs alimentés par des énergies renouvelables. ",
            "Ajouter plus de fonctionnalités sur le site.",
            "Ignorer les mises à jour de sécurité.",
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi la gestion des dépendances est-elle importante en éco-conception ?",
        answers: [
            "Pour s'assurer que toutes les fonctionnalités sont présentes.",
            "Pour éviter l'utilisation excessive de bibliothèques inutilisées, réduisant ainsi la taille des fichiers et l'empreinte écologique. ",
            "Pour augmenter la complexité du projet.",
            "Pour réduire les coûts de développement.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est le rôle de l'éco-conception dans le cycle de vie des produits numériques ?",
        answers: [
            "Optimiser uniquement la phase de conception.",
            "Intégrer des pratiques durables à chaque étape, de la conception à la fin de vie, pour minimiser l'impact environnemental. ",
            "Réduire le coût des produits numériques.",
            "Augmenter la complexité des systèmes.",
        ],
        correctAnswer: 1
    },
    {
        question: "Comment la virtualisation contribue-t-elle à l'efficacité énergétique dans les centres de données ?",
        answers: [
            "En augmentant le nombre de serveurs physiques nécessaires.",
            "En permettant de regrouper plusieurs systèmes d'exploitation sur un seul serveur physique, réduisant ainsi la consommation d'énergie globale.",
            "En augmentant la consommation d'énergie pour chaque machine virtuelle.",
            "En diminuant la sécurité des données.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quelle est la différence entre l'approvisionnement en énergie renouvelable et l'achat de crédits carbone pour les centres de données ?",
        answers: [
            "L'approvisionnement en énergie renouvelable implique l'utilisation directe d'énergie verte, tandis que les crédits carbone compensent les émissions sans changer la source d'énergie.",
            "Les crédits carbone sont plus coûteux.",
            "L'énergie renouvelable est utilisée uniquement pour les serveurs de production.",
            "Les crédits carbone réduisent les besoins en énergie des centres de données.",
        ],
        correctAnswer: 0
    },
    {
        question: "Quel est l'impact de l'obsolescence programmée sur l'environnement numérique ?",
        answers: [
            "Elle réduit la demande de nouveaux appareils.",
            "Elle entraîne un cycle de remplacement rapide des équipements, augmentant les déchets électroniques.",
            "Elle améliore la durabilité des équipements.",
            "Elle réduit les coûts pour les consommateurs.",
        ],
        correctAnswer: 1
    },
    {
        question: "Comment l'économie circulaire peut-elle être appliquée aux produits numériques ?",
        answers: [
            "En améliorant uniquement la phase de conception des produits.",
            "En intégrant des pratiques telles que le recyclage, la réutilisation et la réparation, prolongeant ainsi la durée de vie des produits numériques.",
            "En augmentant le taux de remplacement des équipements.",
            "En réduisant le nombre de composants dans chaque produit.",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est le rôle des certifications environnementales pour les produits numériques ?",
        answers: [
            "Elles garantissent uniquement la conformité légale.",
            "Elles assurent que les produits répondent à des normes élevées en matière d'efficacité énergétique, de durabilité et de réduction des impacts environnementaux.",
            "Elles sont utilisées pour augmenter le prix de vente des produits.",
            "Elles n'ont aucun impact sur la conception des produits.",
        ],
        correctAnswer: 1
    },
    {
        question: "Qu'est-ce que l'empreinte écologique numérique d'une entreprise ?",
        answers: [
            "Le montant d'argent dépensé en technologies numériques.",
            "La mesure de l'impact environnemental total des activités numériques de l'entreprise, y compris l'utilisation de l'énergie, les émissions de CO2, et les déchets électroniques.",
            "Le nombre d'ordinateurs utilisés par l'entreprise.",
            "La quantité de données stockées par l'entreprise.",
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi l'accessibilité web est-elle importante dans le cadre de l'éco-conception ?",
        answers: [
            "Elle permet de réduire les coûts de développement.",
            "Elle garantit que les services numériques sont utilisables par tous, réduisant ainsi le besoin de services alternatifs et l'empreinte numérique globale.",
            "Elle augmente la complexité des sites web.",
            "Elle n'a aucun impact sur l'éco-conception.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Quelle est l'importance de la gestion de la fin de vie des produits numériques ?",
        answers: [
            "Elle n'a pas d'impact significatif sur l'environnement.",
            "Elle est cruciale pour réduire les déchets électroniques et assurer que les matériaux sont recyclés ou éliminés de manière responsable.",
            "Elle se concentre uniquement sur la revente des équipements.",
            "Elle réduit la durée de vie des produits.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les plateformes de cloud computing peuvent-elles être optimisées pour l'éco-conception ?",
        answers: [
            "En augmentant la puissance de calcul pour chaque utilisateur.",
            "En utilisant des data centers alimentés par des énergies renouvelables et en optimisant l'utilisation des ressources pour minimiser le gaspillage.",
            "En limitant l'accès aux services cloud.",
            "En augmentant le nombre de serveurs dans chaque data center.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Quels sont les principes clés du RGPD (Règlement Général sur la Protection des Données) en lien avec l'éco-conception ?",
        answers: [
            "Le RGPD se concentre uniquement sur la protection des données personnelles.",
            "Le RGPD encourage la minimisation des données collectées, ce qui peut réduire l'empreinte environnementale associée à la gestion et au stockage des données.",
            "Le RGPD impose l'utilisation d'énergie renouvelable pour les data centers.",
            "Le RGPD n'a aucun lien avec l'éco-conception.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les réglementations européennes influencent-elles l'éco-conception des produits numériques ?",
        answers: [
            "Elles imposent des normes strictes sur l'efficacité énergétique et les matériaux utilisés, encourageant ainsi des pratiques plus durables.",
            "Elles augmentent les coûts de production.",
            "Elles n'ont pas d'impact significatif sur l'éco-conception.",
            "Elles favorisent l'obsolescence programmée.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 0
    },
    {
        question: "Quelle est la signification du label 'Energy Star' pour les équipements informatiques ?",
        answers: [
            "Il indique que l'équipement est conçu pour maximiser les performances.",
            "Il certifie que l'équipement répond à des critères stricts d'efficacité énergétique, contribuant à la réduction de l'empreinte carbone.",
            "Il garantit que l'équipement est fabriqué à partir de matériaux recyclés.",
            "Il n'a aucun impact sur la consommation d'énergie.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les politiques de Green IT peuvent-elles être intégrées dans une entreprise ?",
        answers: [
            "En imposant des quotas de réduction des coûts.",
            "En développant des stratégies de réduction de l'empreinte carbone, incluant l'efficacité énergétique, l'utilisation de matériaux durables, et la gestion responsable des déchets.",
            "En augmentant le budget informatique.",
            "En encourageant l'obsolescence rapide des équipements.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi les entreprises doivent-elles se conformer aux normes ISO en matière d'éco-conception ?",
        answers: [
            "Pour réduire les coûts de production.",
            "Pour s'assurer que leurs produits et services répondent à des standards internationaux de durabilité, améliorant ainsi leur compétitivité et réduisant leur impact environnemental.",
            "Pour augmenter le temps de développement des produits.",
            "Pour simplifier les processus de fabrication.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Quel est l'impact des restrictions sur l'utilisation des substances dangereuses (RoHS) sur l'éco-conception ?",
        answers: [
            "Elles augmentent les coûts de production.",
            "Elles limitent l'utilisation de matériaux toxiques dans les équipements électroniques, contribuant à la réduction de l'impact environnemental.",
            "Elles réduisent la durabilité des produits.",
            "Elles ne concernent que les produits non électroniques.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les principes de l'économie circulaire sont-ils appliqués dans l'éco-conception ?",
        answers: [
            "En réduisant la durée de vie des produits.",
            "En promouvant la réutilisation, la réparation, le recyclage, et l'utilisation de matériaux renouvelables, réduisant ainsi l'empreinte écologique globale des produits.",
            "En augmentant le taux de remplacement des équipements.",
            "En favorisant la production en masse sans considération pour la durabilité.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Quelle est la différence entre la norme ISO 14001 et ISO 50001 dans le contexte de l'éco-conception ?",
        answers: [
            "ISO 14001 concerne la gestion environnementale globale, tandis qu'ISO 50001 se concentre spécifiquement sur la gestion de l'énergie.",
            "ISO 50001 concerne la gestion des ressources humaines.",
            "ISO 14001 est uniquement applicable aux grandes entreprises.",
            "ISO 14001 se concentre sur la sécurité des produits.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 0
    },
    {
        question: "Comment les lois sur le droit à la réparation influencent-elles l'éco-conception des produits numériques ?",
        answers: [
            "Elles encouragent les entreprises à rendre leurs produits plus facilement réparables, ce qui peut prolonger la durée de vie des produits et réduire les déchets électroniques.",
            "Elles augmentent le coût des réparations.",
            "Elles réduisent l'efficacité énergétique des produits.",
            "Elles n'ont pas d'impact significatif sur l'éco-conception.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 0
    },
    {
        question: "Quelle est l'importance de la gestion de l'obsolescence pour les entreprises qui adoptent des pratiques Green IT ?",
        answers: [
            "L'obsolescence programmée est un outil clé pour la durabilité.",
            "La gestion de l'obsolescence permet de prolonger la durée de vie des équipements et de réduire les coûts liés au remplacement fréquent, contribuant ainsi à une réduction de l'empreinte écologique.",
            "Elle favorise l'augmentation des ventes à court terme.",
            "Elle est négligeable pour la stratégie Green IT.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment la législation REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) affecte-t-elle la production des équipements informatiques ?",
        answers: [
            "Elle n'a aucun effet sur les équipements informatiques.",
            "Elle impose des restrictions sur l'utilisation de substances chimiques dangereuses dans les processus de production, influençant ainsi les matériaux et composants utilisés.",
            "Elle simplifie les processus de fabrication.",
            "Elle augmente la complexité des produits sans avantage écologique.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les Green Data Centers contribuent-ils à la stratégie globale d'une entreprise en matière de durabilité ?",
        answers: [
            "En augmentant la consommation énergétique pour soutenir plus de services numériques.",
            "En utilisant des technologies d'efficacité énergétique, des énergies renouvelables et des pratiques de gestion responsable, réduisant ainsi l'empreinte carbone des opérations numériques.",
            "En réduisant la sécurité des données.",
            "En augmentant le coût de maintenance.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Pourquoi la transparence dans les rapports environnementaux est-elle cruciale pour les entreprises ?",
        answers: [
            "Elle n'est pas nécessaire, tant que les produits sont conformes aux normes.",
            "Elle renforce la confiance des consommateurs, améliore la réputation de l'entreprise, et encourage l'amélioration continue des pratiques environnementales.",
            "Elle permet de cacher les impacts environnementaux négatifs.",
            "Elle complique les relations avec les investisseurs.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Quels sont les avantages de la mise en œuvre d'une politique de 'zéro déchet' dans les centres de données ?",
        answers: [
            "Aucun avantage tangible.",
            "Réduction des coûts liés à la gestion des déchets, amélioration de l'efficacité opérationnelle et contribution à la durabilité environnementale globale.",
            "Augmentation de la complexité de la gestion des centres de données.",
            "Réduction de la disponibilité des services.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    },
    {
        question: "Comment les initiatives de 'Green Software' peuvent-elles aider les entreprises à atteindre leurs objectifs de durabilité ?",
        answers: [
            "En améliorant la rapidité de développement des logiciels.",
            "En optimisant les logiciels pour réduire la consommation d'énergie pendant leur utilisation, ce qui réduit l'empreinte environnementale associée aux opérations numériques.",
            "En augmentant la demande de nouveaux matériels.",
            "En réduisant la qualité des logiciels pour économiser des ressources.",
            "Je n'ai pas encore la connaissance pour répondre à cette question."
        ],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
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
                        ${answer}
                    </label>
                </li>
            `).join('')}
        </ul>
    `;
}

document.getElementById('next-btn').addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
        if (parseInt(selectedAnswer.value) === questions[currentQuestionIndex].correctAnswer) {
            correctAnswers++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    } else {
        alert("Veuillez sélectionner une réponse avant de passer à la question suivante.");
    }
});

function showResults() {
    document.getElementById("next-btn").style.display = "none";
    const quizContainer = document.getElementById('quiz-container');
    const totalQuestions = questions.length;

    let resultsHTML = `
        <h2>Résultats du Quiz : <strong>${correctAnswers}</strong> sur ${totalQuestions} questions.</h2>
        <div id="detailed-results">
    `;

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const answerClass = isCorrect ? 'correct' : 'incorrect';
        const icon = isCorrect ? '✔️' : '❌';

        resultsHTML += `
            <div class="question ${answerClass}">
                <h3>${icon} ${question.question}</h3>
                <p>Votre réponse :${question.answers[userAnswer]}</p>
                ${!isCorrect ? `<p><strong>Réponse correcte : </strong> ${question.answers[question.correctAnswer]}</p>` : ''}
                ${!isCorrect ? `<p class="explanation">Pensez à revoir ce concept pour mieux comprendre l'importance de ${question.answers[question.correctAnswer].toLowerCase()}.</p><br><br>` : ''}
                <br>
            </div>
        `;
    });

    resultsHTML += `
        </div>
    `;

    quizContainer.innerHTML = resultsHTML;
}

showQuestion(currentQuestionIndex);