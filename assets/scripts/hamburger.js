document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navbar = document.getElementById('navbar');
    
    if (hamburger && navbar) {
        // Logique du hamburger
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }
});

// Chargement du compteur d'empreinte EcoIndex (empreinte.js) une fois la page chargée
(() => {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return;

    window.addEventListener('load', () => {
        // Pas de footer (pages d'exercice bde-esiroi) : pas de compteur
        if (!document.querySelector('footer')) return;
        const charger = () => {
            const script = document.createElement('script');
            script.src = new URL('empreinte.js', src).href;
            document.body.appendChild(script);
        };
        if (window.requestIdleCallback) window.requestIdleCallback(charger, { timeout: 3000 });
        else setTimeout(charger, 1);
    }, { once: true });
})();

// Bouton du chatbot : le chatbot (script, styles et modèle) n'est téléchargé qu'au premier clic
(() => {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return;

    // Le bouton se place juste au-dessus du footer quand celui-ci reste fixé en bas de l'écran
    const placer = () => {
        const footers = document.getElementsByTagName('footer');
        const footer = footers[footers.length - 1];
        const fixe = getComputedStyle(footer).position === 'fixed';
        document.documentElement.style.setProperty('--chatbot-bas', (fixe ? footer.offsetHeight + 12 : 16) + 'px');
    };

    const creer = () => {
        // Pas de footer (pages d'exercice bde-esiroi) : pas de chatbot
        if (!document.querySelector('footer') || document.querySelector('.chatbot-lanceur')) return;
        placer();
        // Le footer change de taille quand le badge EcoIndex s'y ajoute ou quand l'écran change de largeur
        const footers = document.getElementsByTagName('footer');
        if (window.ResizeObserver) new ResizeObserver(placer).observe(footers[footers.length - 1]);
        else window.addEventListener('resize', placer, { passive: true });
        const bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'chatbot-lanceur';
        bouton.setAttribute('aria-expanded', 'false');
        bouton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5h16v11H10l-6 4z"/></svg><span>Une question ?</span>';
        bouton.addEventListener('click', () => {
            if (window.chatbotEco) return window.chatbotEco.basculer();
            if (bouton.hasAttribute('aria-busy')) return;
            bouton.setAttribute('aria-busy', 'true');
            const fin = () => bouton.removeAttribute('aria-busy');
            window.chargerChatbot().then(() => { fin(); window.chatbotEco.basculer(); }, fin);
        });
        document.body.appendChild(bouton);
    };

    // Télécharge le chatbot une seule fois (aussi utilisé par la page Atelier ChatBot)
    let chargement = null;
    window.chargerChatbot = () => {
        if (!chargement) {
            chargement = new Promise((ok, echec) => {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = new URL('../styles/chatbot-eco.css', src).href;
                css.setAttribute('data-chatbot', '');
                document.head.appendChild(css);
                const script = document.createElement('script');
                script.src = new URL('chatbot-eco.js', src).href;
                script.onerror = () => { chargement = null; echec(); };
                document.addEventListener('chatbot-pret', ok, { once: true });
                document.body.appendChild(script);
            });
        }
        return chargement;
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', creer, { once: true });
    else creer();
})();
