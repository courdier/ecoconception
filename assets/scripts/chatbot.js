class Chatbot {
    constructor() {
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
            accueil: 'Bonjour ! Je suis là pour vous aider à comprendre l\'éco-conception numérique.',
            default: 'Je ne suis pas sûr de comprendre votre demande. Voici les sujets sur lesquels je peux vous aider.',
        };
    }

    getSuggestions() {
        return this.suggestions;
    }

    processInput(input) {
        const suggestion = this.suggestions.find(s =>
            input.toLowerCase().includes(s.text.toLowerCase())
        );

        if (suggestion) {
            const links = suggestion.links
                .map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`)
                .join('<br>');
            return `Voici les ressources associées :<br>${links}`;
        }

        return this.responses.default;
    }
}

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
            <div class="chatbot-suggestions-toggle">
                <button id="suggestion-toggle-btn"><i class="fas fa-lightbulb"></i> Suggestions</button>
                <div id="suggestion-list" style="display: none;"></div>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-input">
                <input type="text" placeholder="Posez votre question...">
                <button>Envoyer</button>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    const chatbotContainer = document.querySelector('.chatbot-container');
    const toggle = document.querySelector('.chatbot-toggle');
    const closeBtn = document.querySelector('.chatbot-close');
    const suggestionsToggleBtn = document.getElementById('suggestion-toggle-btn');
    const suggestionList = document.getElementById('suggestion-list');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const input = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-input button');

    toggle.addEventListener('click', () => {
        chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Toggle suggestions list visibility
    suggestionsToggleBtn.addEventListener('click', () => {
        suggestionList.style.display = suggestionList.style.display === 'none' ? 'block' : 'none';
    });

    // Generate the suggestions list
    chatbot.getSuggestions().forEach(suggestion => {
        const suggestionItem = document.createElement('button');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = suggestion.text;

        suggestionItem.addEventListener('click', () => {
            input.value = suggestion.text;
            sendMessage(); // Simulate sending message
        });

        suggestionList.appendChild(suggestionItem);
    });

    const addBotMessage = (text) => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-message';
        botDiv.innerHTML = text;
        messagesContainer.appendChild(botDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    addBotMessage(chatbot.responses.accueil);

    const sendMessage = () => {
        const message = input.value.trim();
        if (message) {
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = message;
            messagesContainer.appendChild(userDiv);
            const response = chatbot.processInput(message);
            addBotMessage(response);

            input.value = '';
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});

