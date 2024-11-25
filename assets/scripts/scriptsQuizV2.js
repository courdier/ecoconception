
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
            },
            {
                id: 'devices_2',
                question: "Combien de temps passez-vous en moyenne par jour sur Internet sur un ordinateur (navigation web, réseaux sociaux, etc.) ?",
                icon: '📱',
                options: [
                    { value: 1, label: "Moins d'une heure", impact: 15, info: "Chaque appareil a un impact à la fabrication et à l'utilisation.", recommendation: "Conservez vos appareils le plus longtemps possible." },
                    { value: 2, label: "1 à 3 heures", impact: 35, info: "La multiplication des appareils augmente l'impact.", recommendation: "Limitez le nombre d'appareils au nécessaire." },
                    { value: 3, label: "3 à 5 heures", impact: 55, info: "Avoir beaucoup d'appareils augmente significativement l'impact.", recommendation: "Réduisez le nombre de vos appareils connectés." },
                    { value: 4, label: "Plus de 5 heures", impact: 85, info: "Un grand nombre d'appareils a un impact très important.", recommendation: "Diminuez drastiquement votre nombre d'appareils." }
                ]
            },
            {
                id: 'email_2',
                question: "Combien d'emails conservez-vous dans votre boîte mail ?",
                icon: '📧',
                options: [
                    { value: 1, label: "Moins de 1000", impact: 5, info: "Chaque email conservé émet environ 10g de CO2 par an.", recommendation: "Continuez à maintenir une boîte mail légère." },
                    { value: 2, label: "1000-5000", impact: 20, info: "Plus votre boîte mail contient d'emails, plus votre impact augmente.", recommendation: "Pensez à archiver ou supprimer les emails anciens." },
                    { value: 3, label: "5000-10000", impact: 40, info: "Une boîte mail avec 10 000 emails représente l'équivalent de 100 kg de CO2.", recommendation: "Faites un tri régulier de vos emails." },
                    { value: 4, label: "Plus de 10000", impact: 60, info: "Une boîte mail surchargée a un impact environnemental important.", recommendation: "Effectuez un grand nettoyage de votre boîte mail." }
                ]
            },
        ];

        let currentStep = 0;
        let userAnswers = {};
        let selectedOption = null;

        // Met à jour la question actuelle
        function updateQuestion() {
            const question = questions[currentStep];

            // Mise à jour du titre, de la barre de progression et du compteur
            document.querySelector('.question-title').textContent = question.question;
            document.querySelector('.progress-bar').style.width = `${((currentStep + 1) / questions.length) * 100}%`;
            document.querySelector('.question-count').textContent = `Question ${currentStep + 1} sur ${questions.length}`;

            // Affichage des options
            const optionsContainer = document.querySelector('.options');
            optionsContainer.innerHTML = '';

            question.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.innerHTML = `
                    <span class="option-icon">${question.icon}</span>
                    <span>${option.label}</span>
                `;
                button.addEventListener('click', () => handleAnswer(option, button));
                optionsContainer.appendChild(button);
            });

            // Réinitialisation des informations et des boutons
            document.querySelector('.info-box').classList.remove('visible');
            document.querySelector('.validate-button').style.display = 'block';
            document.querySelector('.next-button').style.display = 'none';
        }

        // Sélectionne une option
        function selectOption(option) {
            selectedOption = option;

            // Réinitialise la sélection visuelle
            document.querySelectorAll('.option-button').forEach(button => button.classList.remove('selected'));

            // Ajoute la classe `selected` au bouton correspondant
            const selectedButton = Array.from(document.querySelectorAll('.option-button')).find(btn => {
                return btn.querySelector('span:last-child').textContent.trim() === option.label;
            });

            if (selectedButton) {
                selectedButton.classList.add('selected');
            } else {
                console.error("Bouton correspondant introuvable pour l'option :", option);
            }
        }

        // Gère la réponse sélectionnée
        function handleAnswer(option, button) {
            selectOption(option); // Met à jour `selectedOption`
            console.log("Option sélectionnée :", option); // Pour débogage
        }

        // Valide la réponse sélectionnée
        function validateAnswer() {
            if (!selectedOption) {
                alert("Veuillez sélectionner une réponse !");
                return;
            }

            // Stocke la réponse
            userAnswers[questions[currentStep].id] = selectedOption.value;

            // Affiche les informations associées à l'option sélectionnée
            document.querySelector('.info-text').textContent = `Impact : ${selectedOption.impact} kg CO2`;
            document.querySelector('.recommendation-text').textContent = `Recommandation : ${selectedOption.recommendation}`;
            document.querySelector('.info-box').classList.add('visible');

            // Met à jour l'affichage des boutons
            document.querySelector('.validate-button').style.display = 'none';
            document.querySelector('.next-button').style.display = 'block';
        }

        // Passe à la question suivante
        function goToNextQuestion() {
            currentStep++;
            if (currentStep >= questions.length) {
                showResults();
            } else {
                updateQuestion();
            }
        }

        // Calcule l'impact total
        function calculateTotalImpact() {
            return Object.entries(userAnswers).reduce((total, [questionId, answerValue]) => {
                const question = questions.find(q => q.id === questionId);
                const option = question.options.find(opt => opt.value === answerValue);
                return total + option.impact;
            }, 0);
        }

        // Affiche les résultats
        function showResults() {
            const impact = calculateTotalImpact();
            const co2Impact = impact * 10; // Conversion en kg CO2
            const FRENCH_AVERAGE = 9900; // 9.9 tonnes en kg

            document.querySelector('.quiz-container').style.display = 'none';
            document.querySelector('.results').classList.add('visible');

            // Met à jour les valeurs d'impact
            document.getElementById('co2-impact').textContent = co2Impact.toFixed(1);
            document.getElementById('french-average').textContent = `${((co2Impact / FRENCH_AVERAGE) * 100).toFixed(1)}%`;

            // Affiche les recommandations
            const recommendationsList = document.getElementById('recommendations-list');
            recommendationsList.innerHTML = '';
            
            Object.entries(userAnswers).forEach(([questionId, answerValue]) => {
                const question = questions.find(q => q.id === questionId);
                const option = question.options.find(opt => opt.value === answerValue);
                const li = document.createElement('li');
                li.textContent = option.recommendation;
                recommendationsList.appendChild(li);
            });
        }

        // Redémarre le quiz
        function restartQuiz() {
            currentStep = 0;
            userAnswers = {};
            document.querySelector('.quiz-container').style.display = 'block';
            document.querySelector('.results').classList.remove('visible');
            updateQuestion();
        }

        // Gestionnaires de boutons
        document.querySelector('.validate-button').addEventListener('click', validateAnswer);
        document.querySelector('.next-button').addEventListener('click', goToNextQuestion);

        // Démarre le quiz
        updateQuestion();