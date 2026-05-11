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
