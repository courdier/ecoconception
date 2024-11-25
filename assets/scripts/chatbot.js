class Chatbot {
    constructor() {
        this.messages = [];
        this.suggestions = [
            {
                text: "Quels sont les TPs disponibles ?",
                links: [
                    { text: "TP 01 - SonarQube", url: "./pages/en-pratique/tp01.html" },
                    { text: "TP 02 - Ressources Web", url: "./pages/en-pratique/tp02.html" },
                    { text: "TP 03 - Scripts", url: "./pages/en-pratique/tp03.html" },
                    { text: "TP 04 - Polices Web", url: "./pages/en-pratique/tp04.html" }
                ]
            },
            {
                text: "Quel est l'impact de ChatGPT ?",
                links: [
                    { text: "Voir l'impact de ChatGPT", url: "./pages/fiches/chatgpt.html" }
                ]
            },
            {
                text: "Comment optimiser les ressources web ?",
                links: [
                    { text: "Voir les outils", url: "./pages/outils.html" },
                    { text: "TP Optimisation", url: "./pages/en-pratique/tp02.html" }
                ]
            }
        ];
        
        this.responses = {
            // Informations générales
            'accueil': 'Bonjour ! Je suis là pour vous aider à comprendre l\'éco-conception numérique. Voici les sujets sur lesquels je peux vous renseigner :\n- Les TPs pratiques\n- L\'impact des services numériques\n- Les outils d\'optimisation\n- Les bonnes pratiques\n\nQue souhaitez-vous savoir ?',
            
            // Éco-conception et bonnes pratiques
            'eco-conception': 'L\'éco-conception numérique est une approche qui vise à réduire l\'impact environnemental des services numériques dès leur conception. Cela inclut :\n- L\'optimisation des ressources\n- La réduction du code inutile\n- L\'amélioration des performances\n- La gestion efficace des données\n\nVoulez-vous en savoir plus sur les bonnes pratiques ?',
            
            'impact': 'Pour réduire l\'impact de votre site web, voici les principales actions à mettre en place :\n1. Optimiser les images (compression, dimensionnement)\n2. Minifier les fichiers CSS/JS\n3. Réduire les scripts inutilisés\n4. Optimiser les polices web\n5. Utiliser la mise en cache\n6. Choisir un hébergeur éco-responsable\n\nNous proposons des TPs pratiques pour apprendre ces techniques.',
            
            'bonnes pratiques': 'Les bonnes pratiques en éco-conception incluent :\n- Optimisation des ressources\n- Code propre et efficace\n- Gestion des dépendances\n- Choix d\'hébergement responsable\n- Mesure régulière de l\'impact\n\nSouhaitez-vous des détails sur une pratique en particulier ?',
            
            // TPs
            'tp': 'Nous proposons 4 TPs pratiques : \n1. Introduction à SonarQube \n2. Optimisation des Ressources Web \n3. Réduction des Scripts Inutilisés \n4. Optimisation des Polices Web',
            'tp1': 'Le TP1 porte sur SonarQube et Eco Code. Il vous permet d\'analyser et d\'améliorer la qualité de votre code.',
            'tp2': 'Le TP2 concerne l\'optimisation des ressources web comme la compression d\'images et la minification des fichiers.',
            'tp3': 'Le TP3 traite de la détection et réduction des scripts JavaScript inutilisés pour améliorer les performances.',
            'tp4': 'Le TP4 se concentre sur l\'optimisation des polices web pour réduire l\'impact environnemental.',
            
            // Services numériques
            'chatgpt': 'Une requête ChatGPT génère environ 1.54g de CO2. C\'est 4-5 fois plus qu\'une recherche classique. L\'entraînement du modèle a généré 502 tonnes de CO2.',
            'facebook': 'Facebook a un impact environnemental significatif avec ses centres de données et son infrastructure mondiale.',
            'steam': 'Steam est une plateforme de jeux vidéo qui consomme beaucoup de ressources, notamment pour le téléchargement et la mise à jour des jeux.',
            
            // Éco-conception
            'optimisation': 'Pour optimiser un site web, vous pouvez : \n- Compresser les images \n- Minifier les fichiers CSS/JS \n- Réduire les scripts inutilisés \n- Optimiser les polices web \n- Utiliser la mise en cache',
            
            // Message par défaut
            'default': 'Je ne suis pas sûr de comprendre votre demande. Voici les sujets sur lesquels je peux vous aider : \n- Éco-conception web \n- TPs pratiques \n- Impact des services numériques \n- Optimisation des ressources'
        };
    }

    processInput(message) {
        const lowercaseInput = message.toLowerCase();
        
        // Chercher une suggestion correspondante
        const suggestion = this.suggestions.find(s => 
            lowercaseInput.includes(s.text.toLowerCase())
        );

        if (suggestion) {
            const links = suggestion.links.map(link => 
                `<a href="${link.url}" class="chatbot-link">${link.text}</a>`
            ).join('\n');
            return `${this.responses[suggestion.text] || ''}\n\nLiens utiles:\n${links}`;
        }

        let response = this.responses.default;

        // Première interaction
        if (lowercaseInput.includes('bonjour') || lowercaseInput.includes('salut')) {
            return this.responses.accueil;
        }

        // Recherche de correspondance dans les réponses
        Object.keys(this.responses).forEach(key => {
            if (lowercaseInput.includes(key)) {
                response = this.responses[key];
            }
        });

        return response;
    }

    getSuggestions() {
        return this.suggestions;
    }
}

// Initialisation du chatbot
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new Chatbot();
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="chatbot-toggle">
            <i class="fas fa-comments"></i>
        </div>
        <div class="chatbot-container">
            <div class="chatbot-header">
                <span>Assistant Éco-conception</span>
                <span class="chatbot-close">&times;</span>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-suggestions"></div>
            <div class="chatbot-input">
                <input type="text" placeholder="Posez votre question...">
                <button>Envoyer</button>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    // Initialisation des éléments
    const messagesContainer = document.querySelector('.chatbot-messages');
    const suggestionsContainer = document.querySelector('.chatbot-suggestions');
    
    // Afficher le message d'accueil
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'message bot-message';
    welcomeDiv.textContent = chatbot.responses.accueil;
    messagesContainer.appendChild(welcomeDiv);

    // Afficher les suggestions
    chatbot.getSuggestions().forEach(suggestion => {
        const suggestionBtn = document.createElement('button');
        suggestionBtn.className = 'suggestion-btn';
        suggestionBtn.textContent = suggestion.text;
        suggestionBtn.onclick = () => {
            input.value = suggestion.text;
            sendMessage();
        };
        suggestionsContainer.appendChild(suggestionBtn);
    });

    // Gestion des événements
    const toggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeBtn = document.querySelector('.chatbot-close');
    const input = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-input button');

    toggle.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'none') {
            chatbotContainer.style.display = 'block';
            
            // Réinitialiser les conteneurs
            messagesContainer.innerHTML = '';
            suggestionsContainer.innerHTML = '';
            
            // Afficher le message d'accueil
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'message bot-message';
            welcomeDiv.textContent = chatbot.responses.accueil;
            messagesContainer.appendChild(welcomeDiv);

            // Afficher les suggestions
            chatbot.getSuggestions().forEach(suggestion => {
                const suggestionBtn = document.createElement('button');
                suggestionBtn.className = 'suggestion-btn';
                suggestionBtn.textContent = suggestion.text;
                suggestionBtn.onclick = () => {
                    input.value = suggestion.text;
                    sendMessage();
                };
                suggestionsContainer.appendChild(suggestionBtn);
            });
        } else {
            chatbotContainer.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    const sendMessage = () => {
        const message = input.value.trim();
        if (message) {
            // Afficher le message utilisateur
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = message;
            messagesContainer.appendChild(userDiv);

            // Obtenir et afficher la réponse du bot
            const response = chatbot.processInput(message);
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.innerHTML = response;
            messagesContainer.appendChild(botDiv);

            // Nettoyer l'input et scroll
            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Ajouter le style pour les liens dans les messages
    const style = document.createElement('style');
    style.textContent = `
        .chatbot-link {
            display: block;
            color: #4CAF50;
            text-decoration: none;
            margin: 5px 0;
            padding: 5px;
            border: 1px solid #4CAF50;
            border-radius: 5px;
        }
        .chatbot-link:hover {
            background-color: #4CAF50;
            color: white;
        }
    `;
    document.head.appendChild(style);
});