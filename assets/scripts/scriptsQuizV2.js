
        const questions = [
            {
                id: 'streaming',
                question: "Combien d'heures passez-vous à regarder des vidéos en streaming par jour ?",
                icon: '📺',
                options: [
                    { value: 1, label: "Moins d'1h", impact: 10 , info: "Un film HD émet environ 1 kg de CO2.", recommendation: "Limitez votre consommation de streaming." },
                    { value: 2, label: "1-3h", impact: 30 , info: "Le streaming est très énergivore.", recommendation: "Réduisez votre temps de streaming à moins de 2h par jour." },
                    { value: 3, label: "3-5h", impact: 50 , info: "Le streaming représente 34% de l'empreinte numérique.", recommendation: "Essayez de réduire votre temps de streaming." },
                    { value: 4, label: "Plus de 5h", impact: 80 , info: "Le streaming vidéo est l'activité la plus polluante du numérique.", recommendation: "Réduisez significativement votre temps de streaming." }
                ]
            },
            {
                id: 'email_storage',
                question: "Combien d'emails conservez-vous dans votre boîte mail ?",
                icon: '📧',
                options: [
                    { value: 1, label: "Moins de 1000", impact: 5 , info: "Chaque email conservé émet 10g de CO2 par an.", recommendation: "Nettoyez votre boîte mail régulièrement." },
                    { value: 2, label: "1000-5000", impact: 20 , info: "Les emails inutiles augmentent l'empreinte carbone.", recommendation: "Pensez à archiver ou supprimer les anciens emails." },
                    { value: 3, label: "5000-10000", impact: 40 , info: "Une boîte mail encombrée équivaut à 100 kg de CO2.", recommendation: "Faites un tri régulier de vos emails." },
                    { value: 4, label: "Plus de 10000", impact: 60 , info: "Une boîte mail surchargée a un impact important.", recommendation: "Effectuez un grand nettoyage de votre boîte mail." }
                ]
            },
            {
                id: 'cloud_storage',
                question: "Combien de fichiers stockez-vous sur des services de cloud (Google Drive, Dropbox, etc.) ?",
                icon: '☁️',
                options: [
                    { value: 1, label: "Moins de 100 fichiers", impact: 5 , info: "Chaque fichier stocké consomme de l'énergie pour les serveurs.", recommendation: "Supprimez les fichiers inutiles." },
                    { value: 2, label: "100-500 fichiers", impact: 20 , info: "Le cloud a un impact énergétique important.", recommendation: "Limitez le stockage en ligne." },
                    { value: 3, label: "500-1000 fichiers", impact: 50 , info: "Un grand nombre de fichiers augmente votre empreinte carbone.", recommendation: "Stockez localement si possible." },
                    { value: 4, label: "Plus de 1000 fichiers", impact: 100 , info: "Le stockage massif dans le cloud consomme beaucoup d'énergie.", recommendation: "Réduisez les fichiers non essentiels." }
                ]
            },
            {
                id: 'gaming',
                question: "Combien d'heures par semaine passez-vous à jouer à des jeux vidéo ?",
                icon: '🎮',
                options: [
                    { value: 1, label: "Moins de 5h", impact: 20 , info: "Les consoles consomment beaucoup d'énergie.", recommendation: "Continuez à limiter vos sessions de jeu." },
                    { value: 2, label: "5-10h", impact: 50 , info: "Un temps de jeu modéré est plus respectueux de l'environnement.", recommendation: "Réduisez légèrement votre temps de jeu." },
                    { value: 3, label: "10-20h", impact: 100 , info: "Les longues sessions augmentent l'empreinte carbone.", recommendation: "Essayez de réduire vos sessions de jeu." },
                    { value: 4, label: "Plus de 20h", impact: 150 , info: "Les jeux vidéo sont très énergivores.", recommendation: "Réduisez significativement votre temps de jeu." }
                ]
            },
            {
                id: 'dark_mode',
                question: "Utilisez-vous régulièrement le mode sombre sur vos appareils ?",
                icon: '🌑',
                options: [
                    { value: 1, label: "Toujours", impact: -5 , info: "Le mode sombre réduit la consommation énergétique sur les écrans OLED.", recommendation: "Continuez à utiliser le mode sombre." },
                    { value: 2, label: "Parfois", impact: 0, info: "Une utilisation occasionnelle est utile, mais peut être optimisée.", recommendation: "Activez plus souvent le mode sombre." },
                    { value: 3, label: "Rarement", impact: 10 , info: "Ne pas utiliser le mode sombre consomme plus d'énergie.", recommendation: "Essayez le mode sombre pour réduire votre impact." },
                    { value: 4, label: "Jamais", impact: 20 , info: "Les écrans lumineux consomment davantage d'énergie.", recommendation: "Utilisez le mode sombre pour économiser l'énergie." }
                ]
            },
            {
                id: 'updates',
                question: "À quelle fréquence mettez-vous à jour vos logiciels et applications ?",
                icon: '🔄',
                options: [
                    { value: 1, label: "Dès qu'une mise à jour est disponible", impact: 5 , info: "Des mises à jour fréquentes consomment de la bande passante et de l'énergie.", recommendation: "Évitez les mises à jour non essentielles si possible." },
                    { value: 2, label: "Une fois par mois", impact: 3 , info: "Des mises à jour régulières mais modérées réduisent l'impact.", recommendation: "Conservez cette bonne habitude." },
                    { value: 3, label: "Moins souvent", impact: 2 , info: "Moins de mises à jour peuvent réduire votre impact mais poser des problèmes de sécurité.", recommendation: "Équilibrez entre sécurité et impact environnemental." }
                ]
            },
            {
                id: 'data_downloads',
                question: "Combien de données téléchargez-vous par mois (jeux, films, etc.) ?",
                icon: '⬇️',
                options: [
                    { value: 1, label: "Moins de 10 Go", impact: 10 , info: "Chaque Go téléchargé émet environ 5g de CO2.", recommendation: "Continuez à limiter vos téléchargements." },
                    { value: 2, label: "10-50 Go", impact: 50 , info: "Les téléchargements fréquents augmentent votre impact.", recommendation: "Réduisez le téléchargement de fichiers volumineux." },
                    { value: 3, label: "50-100 Go", impact: 100 , info: "Une grande quantité de données téléchargées alourdit votre empreinte.", recommendation: "Limitez les téléchargements inutiles." },
                    { value: 4, label: "Plus de 100 Go", impact: 200 , info: "Les téléchargements massifs consomment beaucoup de bande passante et d'énergie.", recommendation: "Réduisez vos téléchargements pour l'environnement." }
                ]
            },
            {
                id: 'device_usage',
                question: "Combien de temps passez-vous sur votre smartphone chaque jour ?",
                icon: '📱',
                options: [
                    { value: 1, label: "Moins d'une heure", impact: 10, info: "Un usage limité réduit l'impact énergétique.", recommendation: "Continuez à modérer votre usage." },
                    { value: 2, label: "1-3 heures", impact: 30, info: "Une utilisation modérée consomme plus d'énergie.", recommendation: "Réduisez légèrement votre usage." },
                    { value: 3, label: "3-5 heures", impact: 50, info: "Les longues sessions sur smartphone augmentent l'empreinte carbone.", recommendation: "Essayez de diminuer votre temps d'écran." },
                    { value: 4, label: "Plus de 5 heures", impact: 80, info: "Une utilisation excessive consomme beaucoup d'énergie.", recommendation: "Réduisez votre temps d'écran quotidien." }
                ]
            },
            {
                id: 'video_calls',
                question: "Combien d'heures de visioconférence réalisez-vous par semaine ?",
                icon: '💻',
                options: [
                    { value: 1, label: "Moins d'une heure", impact: 10, info: "Les appels vidéo consomment environ 1 kg de CO2 par heure.", recommendation: "Utilisez les appels audio si possible." },
                    { value: 2, label: "1-5 heures", impact: 30, info: "Les appels vidéo réguliers augmentent l'empreinte numérique.", recommendation: "Essayez de réduire le nombre d'appels vidéo." },
                    { value: 3, label: "5-10 heures", impact: 60, info: "Les longues visioconférences consomment beaucoup d'énergie.", recommendation: "Préférez les réunions physiques lorsque c'est possible." },
                    { value: 4, label: "Plus de 10 heures", impact: 100, info: "Un usage excessif des visioconférences a un impact élevé.", recommendation: "Réduisez vos heures de visioconférence." }
                ]
            },
            {
                id: 'browser_tabs',
                question: "Combien d'onglets de navigateur laissez-vous ouverts en moyenne ?",
                icon: '🌐',
                options: [
                    { value: 1, label: "1-5", impact: 5, info: "Moins d'onglets consomment moins de ressources.", recommendation: "Continuez à limiter les onglets ouverts." },
                    { value: 2, label: "5-10", impact: 15, info: "Un nombre modéré d'onglets augmente l'utilisation des ressources.", recommendation: "Essayez de réduire le nombre d'onglets." },
                    { value: 3, label: "10-20", impact: 30, info: "Beaucoup d'onglets augmentent l'empreinte énergétique.", recommendation: "Fermez les onglets inutiles régulièrement." },
                    { value: 4, label: "Plus de 20", impact: 50, info: "Les onglets ouverts consomment des ressources système importantes.", recommendation: "Réduisez drastiquement les onglets ouverts." }
                ]
            },
            {
                id: 'wifi_on',
                question: "Laissez-vous votre Wi-Fi activé lorsque vous ne l'utilisez pas ?",
                icon: '📶',
                options: [
                    { value: 1, label: "Jamais", impact: 0, info: "Désactiver le Wi-Fi réduit l'énergie consommée en veille.", recommendation: "Continuez à éteindre le Wi-Fi inutilisé." },
                    { value: 2, label: "Parfois", impact: 10, info: "Un Wi-Fi actif en permanence consomme de l'énergie.", recommendation: "Pensez à désactiver le Wi-Fi la nuit." },
                    { value: 3, label: "Souvent", impact: 20, info: "Un Wi-Fi allumé tout le temps augmente l'empreinte énergétique.", recommendation: "Réduisez la consommation en désactivant le Wi-Fi." },
                    { value: 4, label: "Toujours", impact: 30, info: "Un Wi-Fi constamment actif consomme inutilement de l'énergie.", recommendation: "Éteignez le Wi-Fi lorsque vous ne l'utilisez pas." }
                ]
            },
            {
                id: 'device_replacement',
                question: "À quelle fréquence remplacez-vous vos appareils électroniques (smartphone, ordinateur, etc.) ?",
                icon: '🔄',
                options: [
                    { value: 1, label: "Tous les 5 ans ou plus", impact: 10, info: "Prolonger la durée de vie réduit l'impact de fabrication.", recommendation: "Continuez à conserver vos appareils longtemps." },
                    { value: 2, label: "Tous les 3-5 ans", impact: 30, info: "Des remplacements modérés limitent l'empreinte écologique.", recommendation: "Essayez d'allonger encore leur durée de vie." },
                    { value: 3, label: "Tous les 2-3 ans", impact: 50, info: "Changer souvent augmente l'impact environnemental.", recommendation: "Conservez vos appareils plus longtemps." },
                    { value: 4, label: "Tous les 1-2 ans", impact: 80, info: "Des remplacements fréquents alourdissent l'empreinte carbone.", recommendation: "Réduisez la fréquence de remplacement." }
                ]
            },
            {
                id: 'file_backup',
                question: "Combien de fois sauvegardez-vous vos données (photos, vidéos, etc.) par mois ?",
                icon: '💾',
                options: [
                    { value: 1, label: "Moins de 1 fois", impact: 5, info: "Une fréquence de sauvegarde modérée est optimale.", recommendation: "Continuez à sauvegarder raisonnablement." },
                    { value: 2, label: "1-3 fois", impact: 20, info: "Des sauvegardes fréquentes consomment plus d'énergie.", recommendation: "Évitez les sauvegardes non nécessaires." },
                    { value: 3, label: "4-10 fois", impact: 50, info: "Les sauvegardes intensives consomment des ressources.", recommendation: "Réduisez la fréquence si possible." },
                    { value: 4, label: "Plus de 10 fois", impact: 100, info: "Un excès de sauvegardes alourdit l'empreinte carbone.", recommendation: "Limitez vos sauvegardes." }
                ]
            },
            {
                id: 'online_shopping',
                question: "Combien d'achats en ligne réalisez-vous chaque mois ?",
                icon: '🛒',
                options: [
                    { value: 1, label: "Moins de 5", impact: 10, info: "Chaque achat nécessite un transport énergivore.", recommendation: "Continuez à limiter vos achats en ligne." },
                    { value: 2, label: "5-10", impact: 30, info: "Des achats fréquents augmentent les émissions de CO2.", recommendation: "Essayez de regrouper vos commandes." },
                    { value: 3, label: "10-20", impact: 60, info: "Les commandes multiples augmentent l'empreinte carbone.", recommendation: "Limitez vos achats." },
                    { value: 4, label: "Plus de 20", impact: 100, info: "Les achats intensifs en ligne ont un impact élevé.", recommendation: "Réduisez significativement vos commandes." }
                ]
            },
            {
                id: 'vpn_usage',
                question: "Utilisez-vous un VPN pour naviguer sur Internet ?",
                icon: '🔒',
                options: [
                    { value: 1, label: "Jamais", impact: 0, info: "Ne pas utiliser de VPN réduit la consommation énergétique.", recommendation: "Activez un VPN uniquement si nécessaire." },
                    { value: 2, label: "Parfois", impact: 10, info: "Les VPN augmentent légèrement la consommation de bande passante.", recommendation: "Utilisez un VPN lorsque c'est indispensable." },
                    { value: 3, label: "Souvent", impact: 30, info: "Une utilisation fréquente du VPN consomme davantage de ressources.", recommendation: "Réduisez l'usage du VPN lorsque ce n'est pas nécessaire." },
                    { value: 4, label: "Toujours", impact: 50, info: "Un VPN actif en permanence consomme beaucoup d'énergie.", recommendation: "Désactivez le VPN quand il n'est pas indispensable." }
                ]
            },
            {
                id: 'search_engine',
                question: "Combien de recherches en ligne effectuez-vous par jour ?",
                icon: '🔍',
                options: [
                    { value: 1, label: "Moins de 10", impact: 5, info: "Chaque recherche génère environ 0,2 g de CO2.", recommendation: "Utilisez des moteurs de recherche écoresponsables." },
                    { value: 2, label: "10-30", impact: 15, info: "Un usage modéré augmente légèrement l'empreinte numérique.", recommendation: "Limitez les recherches répétitives." },
                    { value: 3, label: "30-50", impact: 30, info: "De nombreuses recherches consomment plus de ressources.", recommendation: "Réduisez les recherches non essentielles." },
                    { value: 4, label: "Plus de 50", impact: 50, info: "Un usage excessif des moteurs de recherche alourdit l'empreinte carbone.", recommendation: "Favorisez des recherches optimisées." }
                ]
            },
            {
                id: 'e-waste_disposal',
                question: "Que faites-vous de vos appareils électroniques usagés ?",
                icon: '♻️',
                options: [
                    { value: 1, label: "Recyclés ou donnés", impact: 0, info: "Le recyclage permet de réduire l'empreinte écologique.", recommendation: "Continuez à recycler vos appareils." },
                    { value: 2, label: "Stockés à la maison", impact: 20, info: "Les appareils inutilisés continuent d'impacter l'environnement.", recommendation: "Recyclez ou donnez les appareils inutiles." },
                    { value: 3, label: "Jetés à la poubelle", impact: 50, info: "Jeter des appareils électroniques pollue énormément.", recommendation: "Recyclez toujours vos appareils usagés." },
                    { value: 4, label: "Je ne sais pas", impact: 30, info: "Ne pas gérer correctement les déchets électroniques a un impact élevé.", recommendation: "Informez-vous sur les points de recyclage." }
                ]
            },
            {
                id: 'ad_blockers',
                question: "Utilisez-vous un bloqueur de publicités dans votre navigateur ?",
                icon: '🚫',
                options: [
                    { value: 1, label: "Toujours", impact: -5, info: "Les bloqueurs réduisent le téléchargement de contenus inutiles.", recommendation: "Continuez à utiliser un bloqueur de publicités." },
                    { value: 2, label: "Parfois", impact: 10, info: "Bloquer certaines publicités réduit l'empreinte numérique.", recommendation: "Essayez d'activer un bloqueur plus souvent." },
                    { value: 3, label: "Rarement", impact: 20, info: "Un usage limité ne limite pas suffisamment les requêtes inutiles.", recommendation: "Installez un bloqueur pour réduire l'impact." },
                    { value: 4, label: "Jamais", impact: 30, info: "Les publicités consomment beaucoup de bande passante.", recommendation: "Utilisez un bloqueur de publicités pour limiter l'impact." }
                ]
            },
            {
                id: 'smart_home',
                question: "Utilisez-vous des appareils connectés dans votre maison (ampoules, thermostats, etc.) ?",
                icon: '🏠',
                options: [
                    { value: 1, label: "Pas du tout", impact: 0, info: "Ne pas utiliser d'appareils connectés réduit la consommation énergétique.", recommendation: "Continuez à limiter l'usage des appareils connectés." },
                    { value: 2, label: "Quelques-uns", impact: 15, info: "Les appareils connectés consomment de l'énergie même en veille.", recommendation: "Désactivez les appareils inutilisés." },
                    { value: 3, label: "Plusieurs", impact: 30, info: "Un grand nombre d'appareils connectés augmente l'empreinte énergétique.", recommendation: "Limitez le nombre d'appareils connectés utilisés." },
                    { value: 4, label: "Beaucoup", impact: 50, info: "Les maisons connectées peuvent consommer beaucoup d'énergie.", recommendation: "Débranchez les appareils inutilisés ou utilisez des prises intelligentes." }
                ]
            },
            {
                id: 'auto_backup',
                question: "Activez-vous la sauvegarde automatique sur vos appareils (photos, vidéos, etc.) ?",
                icon: '📂',
                options: [
                    { value: 1, label: "Non", impact: 0, info: "Ne pas activer la sauvegarde automatique réduit l'usage des serveurs.", recommendation: "Continuez à sauvegarder manuellement." },
                    { value: 2, label: "Oui, sur un seul appareil", impact: 10, info: "Une sauvegarde modérée limite l'impact.", recommendation: "Assurez-vous de n'activer la sauvegarde que sur l'essentiel." },
                    { value: 3, label: "Oui, sur plusieurs appareils", impact: 30, info: "Des sauvegardes automatiques multiples augmentent la consommation.", recommendation: "Désactivez la sauvegarde sur les appareils secondaires." },
                    { value: 4, label: "Oui, sur tous les appareils", impact: 50, info: "Des sauvegardes fréquentes sur tous les appareils consomment beaucoup d'énergie.", recommendation: "Réduisez le nombre d'appareils sauvegardant automatiquement." }
                ]
            },
            {
                id: 'music_streaming',
                question: "Streamez-vous régulièrement de la musique ?",
                icon: '🎶',
                options: [
                    { value: 1, label: "Pas du tout, je télécharge toutes mes playlists.", impact: 0, info: "Télécharger ses musiques préférée, c'est réduire son impact de 3%.", recommendation: "Continuez à télécharger les morceaux que vous écoutez régulièrement." },
                    { value: 2, label: "De temps en temps sur les trajets", impact: 10, info: "Télécharger ses musiques préférée, c'est réduire son impact de 3%.", recommendation: "Si vous écoutez les mêmes morceaux en boucles, vous devriez les télécharger." },
                    { value: 3, label: "Oui, régulièrement.", impact: 20, info: "En moyenne, chaque utilisateur laisse derrière lui 276 grammes de CO2 chaque année.", recommendation: "Si possible, envisagez de télécharger les morceaux que vous écoutez régulièrement." },
                    { value: 4, label: "Oui, je streame Spotify en permanence !", impact: 30, info: "L'empreinte carbone du streaming musical est d'environ 1,04 grammes de CO2 par heure d'écoute.", recommendation: "Si vous ne souhaitez pas réduire votre temps d'écoute, envisagez de télécharger les morceaux que vous écoutez régulièrement." }
                ]
            }
        ];

        let currentStep = 0;
        let userAnswers = {};
        let selectedOption = null;

        const startQuizButton = document.querySelector('.start-quiz-button');
        const welcomeContainer = document.querySelector('.welcome-container');
        const quizContainer = document.querySelector('.quiz-container');
        const quizCard = document.querySelector('.card_');
        
        // Met à jour la question actuelle
        function updateQuestion() {
            const question = questions[currentStep];
            selectedOption = null;

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
            quizCard.classList.remove('question-mode');

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

        // Fonction pour démarrer le quiz
        function startQuiz() {
            welcomeContainer.style.display = 'none';
            quizContainer.style.display = 'block';

            quizCard.classList.add('question-mode');

            updateQuestion();
        }

        // Redémarre le quiz
        function restartQuiz() {
            currentStep = 0;
            userAnswers = {};
            quizContainer.style.display = 'block';
            document.querySelector('.results').classList.remove('visible');
            quizCard.classList.add('question-mode');
            updateQuestion();
        }

        // Gestionnaires de boutons
        startQuizButton.addEventListener('click', startQuiz);
        document.querySelector('.validate-button').addEventListener('click', validateAnswer);
        document.querySelector('.next-button').addEventListener('click', goToNextQuestion);