// Base de connaissances du chatbot : une intention = un sujet que le chatbot sait traiter.
//
// Champs :
//   id       identifiant unique
//   titre    texte court affiché sur les boutons de suggestion
//   modele   phrases types complétées avec chaque "sujet" (voir MODELES plus bas)
//   sujets   mots ou expressions qui désignent le sujet
//   exemples questions d'entraînement écrites à la main
//   reponse  paragraphes de la réponse ; une ligne qui commence par "• " devient un élément de liste
//   liens    [texte, adresse depuis la racine du site]
//   suite    intentions proposées après la réponse
//
// Les réponses sont rédigées à partir du contenu du site et vérifiées une fois :
// le chatbot ne génère aucun texte, il choisit la bonne réponse.
// Après une modification : node chatbot/entrainer.mjs

export const MODELES = {
    service: [
        "impact de {s}",
        "impact environnemental de {s}",
        "empreinte carbone de {s}",
        "{s} pollue t il",
        "est ce que {s} pollue beaucoup",
        "combien de co2 pour {s}",
        "{s} et l'environnement",
        "consommation de {s}",
        "fiche {s}",
        "une heure de {s} ça émet combien",
        "{s} c'est écologique",
        "{s}"
    ],
    notion: [
        "c'est quoi {s}",
        "qu'est ce que {s}",
        "définition de {s}",
        "{s} ça veut dire quoi",
        "explique moi {s}",
        "que signifie {s}",
        "parle moi de {s}",
        "{s}"
    ],
    page: [
        "où trouver {s}",
        "page {s}",
        "je cherche {s}",
        "montre moi {s}",
        "{s} sur le site",
        "accéder à {s}",
        "{s}"
    ],
    langage: [
        "{s} est il économe en énergie",
        "écoconception en {s}",
        "règles d'écoconception {s}",
        "optimiser du code {s}",
        "{s} consomme beaucoup d'énergie",
        "bonnes pratiques {s}",
        "coder en {s} de façon sobre",
        "{s}"
    ]
};

export const INTENTIONS = [

    /* CONVERSATION */

    {
        id: "salutation",
        titre: "Bonjour",
        sujets: [],
        exemples: [
            "bonjour", "salut", "bonsoir", "hello", "coucou", "hey", "bonjour à toi",
            "salut le bot", "bonjour assistant", "yo", "re bonjour", "bonjour ça va",
            "salut comment ça va", "comment vas tu", "ça va"
        ],
        reponse: [
            "Bonjour ! Je réponds aux questions sur l’écoconception numérique et sur ce site : chiffres, fiches des services, outils, langages, ateliers…",
            "Posez votre question avec vos mots ou choisissez une suggestion."
        ],
        liens: [],
        suite: ["ecoconception", "chiffres_monde", "chatgpt"]
    },
    {
        id: "remerciement",
        titre: "Merci",
        sujets: [],
        exemples: [
            "merci", "merci beaucoup", "super merci", "génial merci", "parfait", "top",
            "ok merci", "c'est clair merci", "merci pour l'info", "cool", "d'accord merci",
            "trop bien", "merci bien", "nickel"
        ],
        reponse: [
            "Avec plaisir ! Une autre question ?"
        ],
        liens: [],
        suite: ["aide", "quiz"]
    },
    {
        id: "au_revoir",
        titre: "Au revoir",
        sujets: [],
        exemples: [
            "au revoir", "bye", "à plus", "a bientôt", "salut à plus", "ciao", "bonne journée",
            "bonne soirée", "c'est tout", "je n'ai plus de question", "fin", "à la prochaine"
        ],
        reponse: [
            "Au revoir ! Pensez à fermer cette fenêtre : le chatbot ne travaille plus du tout une fois fermé."
        ],
        liens: [],
        suite: []
    },
    {
        id: "aide",
        titre: "Que sais-tu faire ?",
        sujets: [],
        exemples: [
            "quel genre de question je peux te poser", "tu comprends quoi comme questions", "quels types de questions", "exemples de questions",
            "que sais tu faire", "aide", "help", "à quoi tu sers", "tu sers à quoi",
            "quelles questions je peux poser", "que peux tu faire", "comment ça marche ce chat",
            "je ne sais pas quoi demander", "donne moi des idées de questions", "menu",
            "quels sujets connais tu", "sur quoi peux tu répondre", "tu connais quoi",
            "par où commencer", "je découvre le site", "guide moi",
            "tu réponds à quels genres de sujets", "quelles questions comprends tu"
        ],
        reponse: [
            "Je connais le contenu de ce site et je peux vous orienter vers la bonne page. Par exemple :",
            "• l’empreinte du numérique (monde, France, par personne) ;",
            "• l’impact de services comme Netflix, TikTok, ChatGPT ou Google ;",
            "• l’écoconception web, les outils de mesure et les langages ;",
            "• les quiz, le simulateur et les ateliers pratiques.",
            "Je ne connais que ce site : pour le reste, je vous le dirai franchement."
        ],
        liens: [["Page d’accueil", "index.html"]],
        suite: ["chiffres_monde", "services_comparaison", "bonnes_pratiques_web"]
    },
    {
        id: "chatbot_fonctionnement",
        titre: "Comment fonctionnes-tu ?",
        sujets: ["ce chatbot", "ton fonctionnement", "ce bot"],
        modele: "notion",
        exemples: [
            "tu es un modèle de langage", "mes questions sont elles envoyées sur un serveur", "comment as tu appris", "comment tu comprends mes questions", "que se passe t il quand je pose une question", "tu marches sans internet", "tu es un petit modèle", "es tu entraîné sur le site",
            "comment tu fonctionnes", "tu es une ia", "es tu chatgpt", "tu utilises chatgpt",
            "tu es un llm", "es tu un humain", "tu es un robot", "qui t'a créé", "qui t'a programmé",
            "comment tu as été entraîné", "est ce que tu envoies mes questions sur internet",
            "mes données sont elles envoyées", "est ce que tu consommes beaucoup d'énergie",
            "quelle est ton empreinte", "tu es écoconçu", "pourquoi tu ne génères pas de texte",
            "es tu une intelligence artificielle", "tu es intelligent", "tu stockes mes questions",
            "comment marche ce chatbot", "pourquoi un petit modèle", "tu tournes sur un serveur"
        ],
        reponse: [
            "Je suis une IA frugale : un petit modèle de classification qui tourne directement dans votre navigateur. Il reconnaît le sujet de votre question, puis affiche une réponse rédigée et vérifiée à l’avance à partir du site.",
            "Aucun grand modèle de langage, aucun serveur : votre question n’est envoyée nulle part. Je n’ai été téléchargé qu’à l’ouverture de cette fenêtre, en un seul petit fichier.",
            "Si je ne suis pas sûr de comprendre, je le dis au lieu d’inventer une réponse."
        ],
        liens: [["Atelier ChatBot éco-conçu", "pages/en-pratique/atelier-chatbot.html"]],
        suite: ["ia_frugale", "ia_impact"]
    },
    {
        id: "contact",
        titre: "Contacter l’équipe",
        sujets: ["contact", "l'équipe du site", "les auteurs"],
        modele: "page",
        exemples: [
            "j'ai trouvé une faute", "signaler un problème sur le site", "écrire aux créateurs du site", "qui a réalisé le site", "je veux joindre l'équipe",
            "je veux parler à un humain", "contacter quelqu'un", "comment vous contacter",
            "qui a fait ce site", "qui sont les auteurs", "parler à une vraie personne",
            "je veux contacter le professeur", "contacter rémy courdier", "signaler une erreur",
            "il y a une erreur sur le site", "comment contribuer au site", "je veux participer au projet",
            "où est le github du projet", "proposer une amélioration", "à propos du site",
            "qui est derrière ce site", "pourquoi ce site existe", "objectif du site"
        ],
        reponse: [
            "Le site est un projet pédagogique de Rémy Courdier et des étudiants en informatique de l’Université de La Réunion. Il vise à sensibiliser à l’empreinte écologique du numérique et à appliquer lui-même l’écoconception.",
            "Pour une question que je ne sais pas traiter, signaler une erreur ou contribuer, la page « À propos » donne le contact et le lien vers le GitHub du projet."
        ],
        liens: [["À propos et contact", "pages/a-propos.html"]],
        suite: ["aide"]
    },
    {
        id: "hors_sujet",
        titre: "Hors sujet",
        sujets: [],
        exemples: [
            "combien font 3 plus 5", "résous cette équation", "calcule la racine carrée de 16", "qui va gagner le match", "quel est le score du match", "conseille moi un livre", "quel roman lire", "je suis triste", "raconte moi une histoire", "quelle est la hauteur du mont blanc", "quand a eu lieu la révolution française", "écris ma lettre de motivation", "où acheter des vêtements pas chers", "trouve moi un appartement", "va t il pleuvoir demain",
            "quel temps fait il", "quelle est la météo demain", "raconte moi une blague",
            "donne moi une recette de cuisine", "comment faire des crêpes", "qui a gagné le match hier",
            "résultat du foot", "combien font 2 plus 2", "calcule 15 fois 3", "écris moi un poème",
            "traduis ce texte en anglais", "quelle est la capitale de l'australie",
            "aide moi pour mon devoir de maths", "écris un code python pour trier une liste",
            "quel jour sommes nous", "quelle heure est il", "conseille moi un film",
            "qui est le président", "je m'ennuie", "chante une chanson", "quel est ton film préféré",
            "comment draguer", "recommande moi un restaurant", "horoscope du jour",
            "combien coûte un iphone", "comment réparer ma voiture", "quel est le prix du bitcoin",
            "fais moi un résumé de harry potter", "comment perdre du poids", "joue avec moi",
            "t'es nul", "tu sers à rien", "dis un gros mot", "achète moi des chaussures"
        ],
        reponse: [
            "Je ne peux pas répondre à cela : je ne connais que le contenu de ce site sur l’écoconception numérique. Plutôt que d’inventer une réponse, je préfère vous le dire.",
            "Je peux en revanche vous parler de l’empreinte du numérique, des services du quotidien ou des bonnes pratiques."
        ],
        liens: [],
        suite: ["aide", "chiffres_monde", "services_comparaison"]
    },

    /* NOTIONS */

    {
        id: "ecoconception",
        titre: "C’est quoi l’écoconception ?",
        modele: "notion",
        sujets: ["l'écoconception", "écoconception numérique", "l'éco conception", "eco conception web", "écoconception de services numériques", "la conception responsable"],
        exemples: [
            "pourquoi faire de l'écoconception", "à quoi sert l'écoconception", "écoconcevoir un site",
            "comment écoconcevoir un service numérique", "principe de l'écoconception",
            "c'est quoi un site écoconçu", "numérique responsable c'est quoi", "green it",
            "green it c'est quoi", "informatique responsable"
        ],
        reponse: [
            "L’écoconception consiste à intégrer des critères environnementaux dès la conception d’un produit ou d’un service, pour réduire son impact sur tout son cycle de vie.",
            "Pour un service numérique, cela veut dire : ne garder que les fonctionnalités utiles, alléger les pages, et faire en sorte qu’il fonctionne bien sur des appareils anciens, pour ne pas pousser à les renouveler."
        ],
        liens: [["Terminologie", "pages/terminologie.html"], ["Supports de cours", "pages/ressources.html"]],
        suite: ["bonnes_pratiques_web", "sobriete", "cycle_de_vie"]
    },
    {
        id: "sobriete",
        titre: "La sobriété numérique",
        modele: "notion",
        sujets: ["la sobriété numérique", "sobriété", "être sobre en numérique", "la frugalité numérique"],
        exemples: [
            "comment moins polluer au quotidien", "polluer moins avec mes appareils", "gestes du quotidien pour le numérique", "que faire pour réduire ma pollution numérique",
            "comment réduire mon empreinte numérique", "comment polluer moins avec le numérique",
            "gestes simples pour le numérique", "conseils pour un usage responsable du numérique",
            "que puis je faire à mon niveau", "réduire son impact numérique au quotidien",
            "être plus responsable avec mon téléphone", "consommer moins de numérique"
        ],
        reponse: [
            "La sobriété numérique consiste à réduire l’impact environnemental du numérique en limitant les ressources, l’énergie et les déchets électroniques.",
            "Le geste le plus efficace : garder ses appareils plus longtemps et en posséder moins, car leur fabrication pèse le plus. Viennent ensuite : baisser la qualité vidéo, préférer le Wi-Fi aux données mobiles et désactiver la lecture automatique."
        ],
        liens: [["Terminologie", "pages/terminologie.html"], ["Simulateur d’équipements", "pages/simulateur-equipements.html"]],
        suite: ["faire_durer", "streaming_conseils", "quiz"]
    },
    {
        id: "cycle_de_vie",
        titre: "Cycle de vie et ACV",
        modele: "notion",
        sujets: ["le cycle de vie", "l'analyse du cycle de vie", "acv", "analyse de cycle de vie", "iso 14040"],
        exemples: [
            "quelles sont les étapes du cycle de vie", "étapes de vie d'un produit numérique",
            "comment mesurer l'impact d'un produit sur toute sa vie", "de la fabrication à la fin de vie",
            "cycle de vie d'un smartphone"
        ],
        reponse: [
            "Le cycle de vie d’un produit numérique comprend 5 étapes (norme ISO 14040) : conception, fabrication, distribution, utilisation et fin de vie.",
            "L’Analyse du Cycle de Vie (ACV) mesure les impacts sur toutes ces étapes. Pour le numérique, deux étapes dominent : la fabrication (extraction des métaux, composants), puis l’utilisation (électricité)."
        ],
        liens: [["Où se situe vraiment l’impact ?", "pages/quelques-chiffres.html#where-title"], ["Terminologie", "pages/terminologie.html"]],
        suite: ["fabrication", "indicateurs"]
    },
    {
        id: "indicateurs",
        titre: "Les 4 indicateurs",
        modele: "notion",
        sujets: ["les indicateurs d'impact", "gwp", "ped", "adp", "wd", "énergie primaire", "ressources abiotiques", "eau douce", "potentiel de réchauffement global", "équivalent antimoine", "kg eq co2"],
        exemples: [
            "quels sont les 4 indicateurs", "le co2 ne dit pas tout", "comment mesurer l'impact environnemental",
            "unités pour mesurer l'impact du numérique", "c'est quoi kg équivalent co2",
            "pourquoi parler d'eau et de métaux", "quelle unité pour l'eau"
        ],
        reponse: [
            "Les études d’impact du numérique utilisent quatre indicateurs :",
            "• GWP, réchauffement global, en kg équivalent CO₂ ;",
            "• PED, énergie primaire, l’énergie brute puisée dans la nature, en MJ ou kWh ;",
            "• WD, eau douce consommée, en litres ;",
            "• ADP, épuisement des ressources abiotiques (métaux, minerais), en kg équivalent antimoine.",
            "Le CO₂ ne dit donc pas tout : l’eau et les métaux comptent aussi."
        ],
        liens: [["Les 4 indicateurs", "pages/quelques-chiffres.html#indicators-title"], ["Terminologie", "pages/terminologie.html"]],
        suite: ["chiffres_utilisateur", "cycle_de_vie"]
    },
    {
        id: "terminologie",
        titre: "Lexique du site",
        modele: "page",
        sujets: ["la terminologie", "le lexique", "le glossaire", "les définitions", "le vocabulaire"],
        exemples: [
            "que veut dire ce mot", "signification d'un terme", "définitions des termes du numérique responsable",
            "définition d'un mot", "je ne comprends pas un terme", "c'est quoi l'empreinte carbone",
            "définition empreinte carbone", "c'est quoi l'économie circulaire", "réparabilité définition",
            "recyclabilité c'est quoi", "technologie zombie", "c'est quoi une technologie zombie",
            "transition écologique définition", "énergie renouvelable définition", "impact environnemental définition"
        ],
        reponse: [
            "La page Terminologie définit les termes clés : écoconception, empreinte carbone, énergie primaire, analyse du cycle de vie, économie circulaire, réparabilité, recyclabilité, technologie zombie, sobriété numérique…",
            "Par exemple, l’empreinte carbone mesure les gaz à effet de serre émis, directement ou indirectement, sur tout le cycle de vie d’un produit ou d’un service."
        ],
        liens: [["Terminologie", "pages/terminologie.html"]],
        suite: ["indicateurs", "ecoconception"]
    },

    /* CHIFFRES */

    {
        id: "chiffres_monde",
        titre: "Empreinte du numérique mondial",
        modele: "notion",
        sujets: ["l'empreinte du numérique", "l'impact du numérique", "la pollution numérique", "l'empreinte du numérique mondial", "le numérique dans le monde", "les chiffres du numérique"],
        exemples: [
            "part du numérique dans le réchauffement climatique", "le numérique et le changement climatique", "pourcentage des gaz à effet de serre dus au numérique",
            "combien pollue le numérique", "le numérique pollue t il", "part du numérique dans les émissions mondiales",
            "combien de co2 émet internet", "internet pollue combien", "émissions du numérique en europe",
            "pourcentage des émissions dues au numérique", "le numérique est il immatériel",
            "quelques chiffres", "donne moi des chiffres", "chiffres clés du numérique"
        ],
        reponse: [
            "Ordres de grandeur, sur un an : le numérique mondial représente environ 1 600 millions de tonnes eq. CO₂, soit près de 400 kg par utilisateur, et 8 milliards de m³ d’eau douce.",
            "Sa part dans les émissions mondiales est souvent estimée entre 1,8 % et 2,8 %, et plutôt entre 2,1 % et 3,9 % selon Freitag et al. (2021). En Europe, il pèse 4,2 % des émissions.",
            "Ce sont des estimations : elles servent à comparer et à fixer des priorités."
        ],
        liens: [["Quelques chiffres", "pages/quelques-chiffres.html"], ["Le débat sur les responsabilités", "pages/responsable_impact_numerique.html#introduction"]],
        suite: ["chiffres_france", "fabrication", "indicateurs"]
    },
    {
        id: "chiffres_france",
        titre: "Le numérique en France",
        modele: "notion",
        sujets: ["le numérique en france", "l'empreinte du numérique en france", "étude ademe arcep", "ademe arcep", "l'arcep"],
        exemples: [
            "quel pourcentage de l'empreinte française", "part du numérique en france", "répartition de l'empreinte en france", "combien de pourcent pour le numérique en france",
            "combien pollue le numérique en france", "part du numérique dans l'empreinte de la france",
            "chiffres ademe 2025", "mise à jour 2025 ademe", "29,5 millions de tonnes",
            "empreinte carbone numérique française", "terminaux data centers réseaux répartition en france"
        ],
        reponse: [
            "Selon l’ADEME et l’Arcep (janvier 2025, données 2022), l’empreinte carbone du numérique en France atteint 29,5 millions de tonnes eq. CO₂, soit 4,4 % de l’empreinte du pays.",
            "Répartition : terminaux 50 %, centres de données 46 %, réseaux 4 %. Le poids des centres de données augmente, notamment avec l’essor de l’IA.",
            "L’évaluation précédente (17,2 Mt) ne comptait que les centres de données situés en France : les deux études ne se comparent pas directement."
        ],
        liens: [["Mise à jour 2025", "pages/quelques-chiffres.html#update-title"]],
        suite: ["chiffres_utilisateur", "data_centers", "fabrication"]
    },
    {
        id: "chiffres_utilisateur",
        titre: "Mon empreinte numérique",
        modele: "notion",
        sujets: ["mon empreinte numérique", "l'empreinte d'un utilisateur", "l'empreinte par personne", "l'empreinte d'un français"],
        exemples: [
            "combien je pollue avec le numérique", "empreinte numérique par habitant",
            "combien d'équipements par personne", "420 kg", "budget carbone soutenable",
            "combien de co2 par français pour le numérique", "mon impact numérique par an",
            "calculer mon empreinte numérique", "combien d'appareils j'ai en moyenne"
        ],
        reponse: [
            "Pour un utilisateur français, le numérique représente environ 420 kg eq. CO₂ par an : autant qu’environ 3 750 km en voiture thermique, soit un quart du budget carbone soutenable d’une personne (1,7 tonne par an).",
            "Cela correspond aussi à environ 9 700 litres d’eau douce et à environ 11 équipements numériques par personne.",
            "Pour estimer la part de vos propres appareils, essayez le simulateur."
        ],
        liens: [["Pour un utilisateur français", "pages/quelques-chiffres.html#global-title"], ["Simulateur d’équipements", "pages/simulateur-equipements.html"]],
        suite: ["simulateur", "faire_durer", "quiz"]
    },
    {
        id: "fabrication",
        titre: "D’où vient l’impact ?",
        modele: "notion",
        sujets: ["la fabrication des appareils", "l'impact de la fabrication", "la part des terminaux", "la fabrication des équipements"],
        exemples: [
            "les écrans pèsent combien", "part des télévisions dans l'empreinte", "les télés et les box pèsent combien",
            "qu'est ce qui pollue le plus dans le numérique", "où se situe vraiment l'impact",
            "les serveurs polluent ils le plus", "pourquoi la fabrication pollue", "les équipements utilisateurs pèsent combien",
            "smartphone ou data center qui pollue le plus", "quel appareil pollue le plus",
            "télévision empreinte fabrication", "la télé pollue t elle", "premier poste d'impact du numérique",
            "les trois tiers du numérique"
        ],
        reponse: [
            "On pense d’abord aux serveurs, mais le premier poste est la fabrication de nos propres équipements : extraction des métaux et production des composants.",
            "Selon l’indicateur, les équipements des utilisateurs pèsent 64 % à 91 % de l’empreinte, devant les réseaux et les centres de données. Parmi eux, télévisions, box et décodeurs pèsent 22 % à 65 %.",
            "Fabriquer une télévision de 47 pouces émet 479 kg eq. CO₂ et nécessite 26 000 litres d’eau."
        ],
        liens: [["Où se situe vraiment l’impact ?", "pages/quelques-chiffres.html#where-title"], ["Les fabricants (débat)", "pages/responsable_impact_numerique.html#fabricants"]],
        suite: ["faire_durer", "simulateur", "cycle_de_vie"]
    },
    {
        id: "faire_durer",
        titre: "Faire durer ses appareils",
        modele: "notion",
        sujets: ["faire durer ses appareils", "le reconditionné", "la réparation", "l'allongement de la durée de vie", "garder son smartphone"],
        exemples: [
            "mon téléphone a 4 ans je le change", "faut il changer un téléphone qui marche encore",
            "je change de téléphone chaque année", "changer souvent de téléphone c'est grave", "est ce grave de changer de smartphone souvent",
            "combien de temps garder mon téléphone", "faut il acheter reconditionné", "réparer plutôt que racheter",
            "changer de smartphone tous les deux ans", "acheter un téléphone d'occasion", "que faire de mes vieux appareils",
            "remplacer la batterie", "indice de réparabilité", "garder son ordinateur plus longtemps",
            "pourquoi garder ses appareils longtemps", "occasion ou neuf"
        ],
        reponse: [
            "C’est le levier le plus efficace : un appareil émet l’essentiel de son CO₂ à sa fabrication. Plus on le garde, plus ce coût se répartit sur de nombreuses années.",
            "Passer d’un smartphone tous les 2 ans à tous les 3 ans réduit son empreinte carbone de 23 % à 30 % ; choisir un appareil d’occasion plutôt que neuf, de 52 % à 79 % (Cordella et al., 2021).",
            "• protéger l’appareil et changer la batterie plutôt que l’appareil ;",
            "• faire réparer, en s’aidant de l’indice de réparabilité ;",
            "• acheter reconditionné, et donner ou déposer en collecte les appareils qui dorment."
        ],
        liens: [["Simulateur d’équipements", "pages/simulateur-equipements.html"], ["Les particuliers (débat)", "pages/responsable_impact_numerique.html#utilisateurs"]],
        suite: ["simulateur", "obsolescence", "dechets"]
    },
    {
        id: "simulateur",
        titre: "Le simulateur d’équipements",
        modele: "page",
        sujets: ["le simulateur", "le simulateur d'équipements", "le calculateur d'empreinte", "simuler mon empreinte"],
        exemples: [
            "co2 pour fabriquer un téléphone", "fabriquer un smartphone émet combien", "fabrication d'un smartphone co2", "combien pèse la fabrication d'une tablette",
            "calculer l'empreinte de mes appareils", "empreinte de mon smartphone par an",
            "combien émet la fabrication d'un smartphone", "empreinte d'un ordinateur portable",
            "calculer le gain si je garde mon téléphone plus longtemps", "outil pour calculer l'empreinte de mes équipements",
            "combien pollue un ordinateur", "fabrication d'un ordinateur portable co2", "lancer le calcul"
        ],
        reponse: [
            "Le simulateur calcule l’empreinte carbone annuelle de vos équipements et ce que vous gagnez à les garder plus longtemps. Le calcul se fait dans votre navigateur : rien n’est envoyé.",
            "Exemple de données ADEME : un smartphone émet 79,3 kg eq. CO₂ à sa fabrication, soit 99 % de son empreinte sur 2,5 ans ; un ordinateur portable, 182 kg."
        ],
        liens: [["Lancer le simulateur", "pages/simulateur-equipements.html"]],
        suite: ["faire_durer", "chiffres_utilisateur"]
    },
    {
        id: "data_centers",
        titre: "Les centres de données",
        modele: "notion",
        sujets: ["les data centers", "les centres de données", "les datacenters", "les serveurs", "le cloud"],
        exemples: [
            "combien consomment les data centers", "électricité des data centers dans le monde",
            "les data centers consomment de l'eau", "consommation électrique des serveurs",
            "le cloud pollue t il", "data centers et intelligence artificielle", "945 twh",
            "stress hydrique data center", "refroidissement des serveurs"
        ],
        reponse: [
            "Les centres de données consomment environ 415 TWh d’électricité en 2024, soit environ 1,5 % de l’électricité mondiale. L’Agence internationale de l’énergie prévoit environ 945 TWh en 2030, notamment avec l’IA.",
            "Entre 2010 et 2018, leur consommation n’a augmenté que d’environ 6 % alors que la puissance de calcul a été multipliée par plus de six : les gains d’efficacité ont compensé la demande. Rien ne garantit que cela continue.",
            "L’eau compte aussi : aux États-Unis, une part importante des serveurs se trouve dans des régions en stress hydrique."
        ],
        liens: [["Infrastructures (débat)", "pages/responsable_impact_numerique.html#infrastructures"], ["Langages : pourquoi cette section", "pages/langages.html"]],
        suite: ["ia_impact", "chiffres_france", "reseaux"]
    },
    {
        id: "reseaux",
        titre: "Les réseaux et la 5G",
        modele: "notion",
        sujets: ["les réseaux", "la 5g", "les opérateurs télécom", "la box internet", "le réseau mobile"],
        exemples: [
            "la 5g pollue t elle", "impact de la 5g", "les réseaux consomment combien",
            "part des réseaux dans l'empreinte", "fibre ou 4g", "les box internet polluent"
        ],
        reponse: [
            "Les réseaux pèsent une petite part de l’empreinte du numérique en France : 4 % à 5 % selon les études ADEME-Arcep.",
            "Les opérateurs influencent pourtant les terminaux quand ils lancent une nouvelle génération de réseau. Le Haut Conseil pour le Climat estime que la 5G pourrait ajouter 2,7 à 6,7 millions de tonnes eq. CO₂ par an en France d’ici 2030, faute de mesures."
        ],
        liens: [["Opérateurs télécom (débat)", "pages/responsable_impact_numerique.html#infrastructures"]],
        suite: ["wifi_mobile", "data_centers"]
    },
    {
        id: "wifi_mobile",
        titre: "Wi-Fi ou données mobiles ?",
        modele: "notion",
        sujets: ["le wifi", "la 4g", "les données mobiles", "wifi ou 4g"],
        exemples: [
            "vaut il mieux utiliser le wifi", "la 4g consomme plus que le wifi", "pourquoi préférer le wifi",
            "regarder des vidéos en 4g pollue", "données mobiles ou wifi pour l'environnement",
            "le réseau mobile consomme plus"
        ],
        reponse: [
            "Préférez le Wi-Fi quand c’est possible : les fiches du site rappellent que la 4G consomme beaucoup plus d’énergie que le Wi-Fi (jusqu’à 23 fois plus selon la fiche ChatGPT).",
            "Ce conseil revient sur presque toutes les fiches des services vidéo et réseaux sociaux."
        ],
        liens: [["Fiche ChatGPT", "pages/fiches/chatgpt.html"], ["Fiche Netflix", "pages/fiches/netflix.html"]],
        suite: ["streaming_conseils", "reseaux"]
    },
    {
        id: "effet_rebond",
        titre: "L’effet rebond",
        modele: "notion",
        sujets: ["l'effet rebond", "l'effet rebond numérique", "le paradoxe de jevons"],
        exemples: [
            "pourquoi l'efficacité ne suffit pas", "les gains d'efficacité sont annulés",
            "la dématérialisation réduit elle la pollution", "plus efficace donc plus utilisé"
        ],
        reponse: [
            "L’effet rebond numérique (Coroamă et Mattern, 2019) : les gains d’efficacité ou de dématérialisation peuvent être annulés par l’augmentation des usages.",
            "Un service plus léger ou moins cher à utiliser peut donc être utilisé beaucoup plus, et l’empreinte totale ne baisse pas. D’où l’importance de la sobriété, pas seulement de l’efficacité."
        ],
        liens: [["Les utilisateurs (débat)", "pages/responsable_impact_numerique.html#utilisateurs"]],
        suite: ["sobriete", "responsabilite"]
    },
    {
        id: "obsolescence",
        titre: "Obsolescence et obésiciel",
        modele: "notion",
        sujets: ["l'obsolescence", "l'obsolescence programmée", "l'obsolescence logicielle", "l'obésiciel", "les logiciels obèses"],
        exemples: [
            "pourquoi mon téléphone devient lent", "les mises à jour rendent les appareils obsolètes",
            "les logiciels de plus en plus lourds", "obsolescence psychologique", "pourquoi on change de téléphone"
        ],
        reponse: [
            "Un logiciel qui n’est plus mis à jour, ou qui exige toujours plus de ressources, raccourcit la vie du matériel. On parle d’« obésiciel » pour les logiciels qui grossissent de version en version.",
            "Sur les smartphones récents, les limites logicielles et la réparabilité pèsent de plus en plus dans le remplacement (Corrocher et Paganuzzi, 2025). L’obsolescence psychologique, l’envie du dernier modèle, reste aussi un moteur important."
        ],
        liens: [["Les concepteurs (débat)", "pages/responsable_impact_numerique.html#concepteurs"]],
        suite: ["faire_durer", "bonnes_pratiques_web"]
    },
    {
        id: "dechets",
        titre: "Déchets électroniques",
        modele: "notion",
        sujets: ["les déchets électroniques", "les deee", "le recyclage", "la fin de vie des appareils", "les e-déchets"],
        exemples: [
            "que deviennent les téléphones jetés", "jeter son téléphone", "où jeter un vieux téléphone", "que deviennent les appareils usagés",
            "combien de déchets électroniques", "où vont nos vieux téléphones", "recycler son smartphone",
            "taux de recyclage des appareils", "déchets électroniques exportés en afrique"
        ],
        reponse: [
            "Selon le Global E-waste Monitor 2024, le monde a produit 62 millions de tonnes de déchets électroniques en 2022. Seulement 22,3 % ont été collectés et recyclés de façon documentée (42,8 % en Europe, moins de 1 % en Afrique).",
            "Environ 3,3 millions de tonnes partent de pays riches vers des pays à revenu moyen ou faible par des circuits non contrôlés. Le premier geste reste de faire durer et de donner ses appareils."
        ],
        liens: [["Fin de vie (débat)", "pages/responsable_impact_numerique.html#pouvoirs-publics"]],
        suite: ["faire_durer", "lois"]
    },
    {
        id: "lois",
        titre: "Lois et référentiels",
        modele: "notion",
        sujets: ["la loi agec", "la loi reen", "la réglementation", "les lois sur le numérique", "le rgesn", "le référentiel d'écoconception"],
        exemples: [
            "quelles lois existent en france", "loi pour réduire l'impact du numérique", "que dit la loi sur le numérique responsable", "législation numérique responsable",
            "quelle loi encadre le numérique", "obligations légales écoconception", "référentiel général d'écoconception",
            "rgesn c'est quoi", "loi anti gaspillage", "que fait l'état pour le numérique", "pouvoirs publics numérique"
        ],
        reponse: [
            "En France :",
            "• la loi AGEC (2020) impose l’indice de réparabilité et des achats publics issus du réemploi ;",
            "• la loi REEN (2021) vise à réduire l’empreinte du numérique : observatoire, sensibilisation, stratégie numérique responsable pour les grandes communes ;",
            "• le RGESN (Arcep, ADEME, 2024) propose des critères pour écoconcevoir un service dès sa définition.",
            "Une commission de l’Assemblée nationale a jugé l’application de la loi REEN encore partielle."
        ],
        liens: [["Pouvoirs publics (débat)", "pages/responsable_impact_numerique.html#pouvoirs-publics"], ["Ressources", "pages/ressources.html"]],
        suite: ["responsabilite", "dechets"]
    },
    {
        id: "responsabilite",
        titre: "Qui est responsable ?",
        modele: "page",
        sujets: ["le débat", "la page débat", "qui est responsable de l'impact du numérique", "la responsabilité"],
        exemples: [
            "qui est responsable de la pollution numérique", "c'est la faute des fabricants ou des utilisateurs",
            "qui doit agir en premier", "responsabilité des développeurs", "responsabilité des plateformes",
            "le modèle publicitaire pollue", "économie de l'attention", "autoplay et défilement infini",
            "les designers ont ils une responsabilité"
        ],
        reponse: [
            "Aucun acteur ne porte seul la responsabilité. La page Débat suit le cycle de vie, acteur par acteur : fabricants, opérateurs, data centers, développeurs, designers, plateformes, utilisateurs, pouvoirs publics.",
            "Idée clé : il faut se demander « qui décide ? » plutôt que « qui consomme ? ». Plus un acteur décide tôt dans le cycle de vie, plus ses choix engagent les autres."
        ],
        liens: [["Lire l’analyse", "pages/responsable_impact_numerique.html"], ["Page Débat", "pages/debat.html"]],
        suite: ["effet_rebond", "lois", "fabrication"]
    },

    /* INTELLIGENCE ARTIFICIELLE */

    {
        id: "ia_impact",
        titre: "Impact de l’IA",
        modele: "notion",
        sujets: ["l'impact de l'ia", "l'intelligence artificielle", "l'ia générative", "les llm", "l'empreinte de l'ia", "l'ia et l'environnement"],
        exemples: [
            "énergie pour entraîner un modèle", "entraîner une ia consomme combien", "coût énergétique de l'entraînement des ia", "les ia consomment elles beaucoup d'eau",
            "l'ia pollue t elle", "combien consomme une ia", "l'ia consomme beaucoup d'énergie",
            "énergie d'une requête à une ia", "l'ia générative est elle écologique", "pourquoi l'ia consomme autant",
            "entraînement d'un modèle d'ia co2", "gpt 3 entraînement", "inférence ia énergie",
            "combien d'eau consomme l'ia", "la génération de texte consomme combien"
        ],
        reponse: [
            "L’IA générative coûte à l’entraînement (l’entraînement de GPT-3 aurait émis environ 502 tonnes de CO₂ selon la fiche ChatGPT) puis à chaque utilisation, appelée inférence.",
            "Pour 1 000 requêtes, une étude de Luccioni et al. (2024) mesure en moyenne 0,002 kWh pour classer un texte, 0,047 kWh pour générer du texte et 2,9 kWh pour générer des images : les modèles génératifs consomment bien plus que les modèles spécialisés.",
            "Le site détaille ChatGPT, Claude et la génération d’images."
        ],
        liens: [["Fiche ChatGPT", "pages/fiches/chatgpt.html"], ["Quiz génération d’images", "pages/quizIA.html"], ["Atelier ChatBot éco-conçu", "pages/en-pratique/atelier-chatbot.html"]],
        suite: ["ia_bien_utiliser", "ia_frugale", "chatgpt"]
    },
    {
        id: "chatgpt",
        titre: "ChatGPT",
        modele: "service",
        sujets: ["chatgpt", "chat gpt", "openai", "gpt"],
        exemples: [
            "combien de co2 par requête chatgpt", "une question à chatgpt consomme combien",
            "chatgpt ou google qui pollue le plus", "chatgpt consomme plus qu'une recherche google"
        ],
        reponse: [
            "Selon la fiche du site, une requête ChatGPT émet environ 1,54 g de CO₂ : il faudrait environ 100 questions pour égaler 1 km en voiture.",
            "Une requête demande 4 à 5 fois plus de calcul qu’une recherche classique. L’entraînement de GPT-3 aurait nécessité 5,4 millions de litres d’eau et émis 502 tonnes de CO₂.",
            "Conseils : des demandes précises, pas de générations inutiles, et une nouvelle discussion plutôt qu’une conversation interminable.",
            "La fiche compte plus de 10 millions de requêtes par jour, dans 161 pays."
        ],
        liens: [["Fiche ChatGPT", "pages/fiches/chatgpt.html"]],
        suite: ["ia_bien_utiliser", "claude", "google"]
    },
    {
        id: "claude",
        titre: "Claude (Anthropic)",
        modele: "service",
        sujets: ["claude", "anthropic", "claude sonnet", "claude opus", "claude haiku"],
        exemples: [
            "combien consomme claude", "empreinte d'un échange avec claude", "claude ou chatgpt lequel pollue le moins"
        ],
        reponse: [
            "Une estimation (SOMA AI, non mesurée par Anthropic) attribue environ 0,036 g CO₂e et 0,099 Wh à un échange de 1 210 jetons avec Claude Sonnet. Entre les modèles Haiku et Opus, la fourchette va d’environ 0,01 à 0,13 g.",
            "Le chiffre dépend du modèle, de la longueur de la conversation et du lieu de calcul. Conseil principal : choisir le modèle le plus léger adapté à la tâche."
        ],
        liens: [["Fiche Claude", "pages/fiches/claude.html"]],
        suite: ["chatgpt", "ia_bien_utiliser"]
    },
    {
        id: "ia_images",
        titre: "Générer des images par IA",
        modele: "notion",
        sujets: ["la génération d'images", "les images générées par ia", "midjourney", "dall e", "stable diffusion", "générer une image"],
        exemples: [
            "combien consomme une image générée par ia", "générer une image pollue t il",
            "énergie pour créer une image avec l'ia", "quiz ia images", "quiz 3", "image ia recharge de smartphone"
        ],
        reponse: [
            "Générer une image par IA demande en moyenne environ 2,9 Wh (2,907 kWh pour 1 000 images, Luccioni et al., 2024), et jusqu’à 11,5 Wh pour le modèle le moins efficace testé.",
            "C’est environ 60 fois plus que générer du texte. Le quiz n°3 estime l’énergie de vos propres habitudes et donne des conseils pour la réduire."
        ],
        liens: [["Quiz : génération d’images par IA", "pages/quizIA.html"], ["Atelier : à quel coût ?", "pages/en-pratique/atelier-ia-images.html"]],
        suite: ["atelier_ia_images", "ia_bien_utiliser", "ia_impact"]
    },
    {
        id: "atelier_ia_images",
        titre: "Atelier : images par IA",
        modele: "page",
        sujets: ["l'atelier génération d'images", "l'atelier images par ia", "l'atelier ia images", "les modèles de diffusion", "la diffusion", "le débruitage", "l'atelier à quel coût"],
        exemples: [
            "comment fonctionne un modèle de diffusion", "pourquoi la résolution change la consommation d'une image", "réduire le nombre d'étapes de génération",
            "combien de wh pour générer une image en 1024", "rôle du gpu dans la génération d'images", "c'est quoi un modèle accéléré lcm",
            "mesurer l'énergie d'une génération d'image", "512 ou 1024 pixels pour une image ia", "atelier interactif sur l'ia générative",
            "pourquoi un gpu consomme autant", "du bruit à l'image", "comparer trois configurations de génération",
            "comment une ia diffusion fabrique une image"
        ],
        reponse: [
            "L’atelier « Générer une image par IA : à quel coût ? » (30 min, sans prérequis) explique comment un modèle de diffusion part d’un bruit aléatoire et le nettoie étape par étape, sur une carte graphique (GPU).",
            "Il compare trois générations réellement mesurées sur un même GPU, avec la même demande :",
            "• 1024 × 1024 px en 30 étapes : environ 0,78 Wh par image ;",
            "• 512 × 512 px en 15 étapes : environ 0,078 Wh, 10 fois moins ;",
            "• 512 × 512 px en 5 étapes avec un modèle accéléré : environ 0,030 Wh.",
            "Moins de pixels et d’étapes, c’est souvent moins de détails : le but est la qualité suffisante pour le besoin, et ne générer que si c’est utile."
        ],
        liens: [["Atelier génération d’images", "pages/en-pratique/atelier-ia-images.html"]],
        suite: ["ia_images", "ia_bien_utiliser", "ateliers"]
    },
    {
        id: "ia_bien_utiliser",
        titre: "Utiliser l’IA sobrement",
        modele: "notion",
        sujets: ["utiliser l'ia sobrement", "bien utiliser chatgpt", "réduire l'impact de l'ia", "un usage responsable de l'ia"],
        exemples: [
            "utiliser chatgpt de façon plus écologique", "chatgpt de manière responsable", "réduire l'impact de mes questions à l'ia",
            "comment moins polluer avec chatgpt", "conseils pour utiliser l'ia", "comment réduire l'empreinte de mes prompts",
            "faut il arrêter d'utiliser l'ia", "écrire un bon prompt pour consommer moins", "quel modèle d'ia choisir",
            "bonnes pratiques pour utiliser une ia"
        ],
        reponse: [
            "Les fiches ChatGPT et Claude donnent les mêmes conseils :",
            "• se demander si l’IA est utile : une recherche ou une page de référence suffit souvent ;",
            "• écrire une demande complète et précise dès le départ, pour éviter les allers-retours ;",
            "• choisir le modèle le plus léger adapté à la tâche ;",
            "• ouvrir une nouvelle discussion plutôt que prolonger une conversation très longue ;",
            "• éviter les images et les longues sorties sans besoin réel."
        ],
        liens: [["Fiche ChatGPT", "pages/fiches/chatgpt.html"], ["Fiche Claude", "pages/fiches/claude.html"]],
        suite: ["ia_frugale", "ia_images"]
    },
    {
        id: "ia_frugale",
        titre: "L’IA frugale",
        modele: "notion",
        sujets: ["l'ia frugale", "l'ia sobre", "l'atelier chatbot", "l'ia éco conçue", "un chatbot écoconçu", "l'ia verte", "afnor spec 2314"],
        exemples: [
            "comment écoconcevoir une ia", "règles d'écoconception pour l'ia", "comment faire un chatbot écologique",
            "juste assez d'intelligence", "quand utiliser un llm", "faut il un llm pour un chatbot",
            "comment rendre une ia plus sobre", "petit modèle ou grand modèle", "quantification élagage distillation",
            "atelier chatbot éco conçu", "référentiel ia frugale"
        ],
        reponse: [
            "L’IA frugale consiste à utiliser « juste assez d’intelligence » : la plus petite technique qui répond au besoin, et seulement quand elle est utile. Le référentiel AFNOR Spec 2314 (2024) en propose une méthode et des bonnes pratiques.",
            "C’est le principe de ce chatbot : un petit classifieur dans votre navigateur et des réponses rédigées une fois, plutôt qu’un grand modèle qui génère du texte à chaque question.",
            "L’atelier ChatBot éco-conçu détaille ces règles et propose de modifier le chatbot vous-même."
        ],
        liens: [["Atelier ChatBot éco-conçu", "pages/en-pratique/atelier-chatbot.html"], ["Cours partie 5 (Ressources)", "pages/ressources.html"]],
        suite: ["chatbot_fonctionnement", "ia_impact"]
    },

    /* SERVICES */

    {
        id: "services_comparaison",
        titre: "Comparer les services",
        modele: "page",
        sujets: ["les fiches des services", "les applications analysées", "les applis", "la comparaison des services", "les réseaux sociaux"],
        exemples: [
            "quel service pollue le plus", "quelle application pollue le plus", "quel réseau social pollue le plus",
            "comparer netflix et youtube", "classement des applications les plus polluantes",
            "les réseaux sociaux polluent ils", "quelles applications sont analysées", "liste des fiches",
            "réseau social le moins polluant", "vidéo ou réseau social qui pollue le plus"
        ],
        reponse: [
            "Les fiches donnent des ordres de grandeur par heure d’utilisation : TikTok 57 g de CO₂, Netflix 55 g, Instagram et YouTube 52 g, Facebook 38 g, X et Twitch 31 g. Pour une requête : ChatGPT environ 1,5 g, Google environ 0,03 g.",
            "Les sources et méthodes diffèrent d’une fiche à l’autre : comparez les ordres de grandeur, pas les décimales."
        ],
        liens: [["Applications analysées", "pages/quelques-chiffres.html#apps-title"]],
        suite: ["streaming_conseils", "tiktok", "netflix"]
    },
    {
        id: "streaming_conseils",
        titre: "Regarder des vidéos sobrement",
        modele: "notion",
        sujets: ["le streaming", "la vidéo en ligne", "la qualité vidéo", "la 4k", "le streaming vidéo"],
        exemples: [
            "réduire l'impact de mes séries", "regarder des films en polluant moins", "polluer moins en regardant des vidéos", "les vidéos en ligne polluent combien",
            "la vidéo pollue t elle", "regarder en hd ou en 4k", "la 4k consomme combien",
            "réduire l'impact du streaming", "télécharger ou streamer", "basse définition consomme moins",
            "comment regarder des séries en polluant moins", "part de la vidéo dans le trafic internet",
            "désactiver la lecture automatique", "smart tv ou smartphone pour regarder des vidéos"
        ],
        reponse: [
            "La qualité change tout : une heure de streaming émet environ 10,2 g de CO₂ en basse définition, 31,7 g en HD et 69,2 g en 4K. La vidéo représente environ 60 % du flux mondial de données.",
            "• baisser la qualité quand c’est possible ;",
            "• télécharger pour regarder hors ligne ;",
            "• préférer le Wi-Fi et un petit écran : sur YouTube, une heure sur smartphone émet 0,56 g contre 55,56 g sur Smart TV (hors réseaux et serveurs) ;",
            "• désactiver la lecture automatique."
        ],
        liens: [["Fiche Netflix", "pages/fiches/netflix.html"], ["Fiche YouTube", "pages/fiches/youtube.html"]],
        suite: ["netflix", "youtube", "wifi_mobile"]
    },
    {
        id: "netflix",
        titre: "Netflix",
        modele: "service",
        sujets: ["netflix", "les séries netflix"],
        exemples: ["regarder netflix pollue", "netflix bande passante mondiale", "netflix en 4k pollue"],
        reponse: [
            "Une heure de streaming sur Netflix émet environ 55 g de CO₂, autant qu’environ 275 m en voiture. En basse définition, on descend vers 10 g par heure ; en 4K, on monte vers 69 g.",
            "Netflix représenterait environ 30 % de la bande passante mondiale en HD et 4K. Conseils : baisser la qualité, télécharger hors ligne, préférer le Wi-Fi.",
            "Netflix compte plus de 300 millions d’abonnés dans plus de 190 pays."
        ],
        liens: [["Fiche Netflix", "pages/fiches/netflix.html"]],
        suite: ["streaming_conseils", "amazon_prime", "youtube"]
    },
    {
        id: "youtube",
        titre: "YouTube",
        modele: "service",
        sujets: ["youtube", "les vidéos youtube"],
        exemples: ["youtube smartphone ou télé", "regarder youtube pollue", "écouter de la musique sur youtube"],
        reponse: [
            "Une heure de visionnage sur YouTube émet environ 52 g de CO₂. Le support compte beaucoup : 0,56 g par heure sur smartphone contre 55,56 g sur Smart TV (hors centres de données et réseaux).",
            "Conseils : baisser la qualité, télécharger hors ligne, et écouter plutôt que regarder quand le contenu est surtout audio.",
            "YouTube compte plus de 2,5 milliards d’utilisateurs actifs par mois."
        ],
        liens: [["Fiche YouTube", "pages/fiches/youtube.html"]],
        suite: ["streaming_conseils", "netflix", "twitch"]
    },
    {
        id: "tiktok",
        titre: "TikTok",
        modele: "service",
        sujets: ["tiktok", "tik tok", "les vidéos courtes"],
        exemples: ["scroller sur tiktok pollue", "tiktok le plus polluant", "une heure sur tiktok"],
        reponse: [
            "Une heure sur TikTok émet environ 57 g de CO₂, le chiffre le plus élevé des fiches réseaux sociaux du site. Sur 10 kg émis, 6 à 9 viennent du téléphone de l’utilisateur.",
            "Une heure correspond aussi à environ 16 litres d’eau. Conseils : limiter le temps passé, préférer le Wi-Fi, baisser la résolution, activer les rappels de temps d’écran.",
            "TikTok compte environ 1,94 milliard d’utilisateurs actifs (2025), dans 155 pays."
        ],
        liens: [["Fiche TikTok", "pages/fiches/tiktok.html"]],
        suite: ["services_comparaison", "instagram", "streaming_conseils"]
    },
    {
        id: "instagram",
        titre: "Instagram",
        modele: "service",
        sujets: ["instagram", "insta", "les stories"],
        exemples: ["poster sur instagram pollue", "une heure sur instagram"],
        reponse: [
            "Une heure sur Instagram émet environ 52 g de CO₂, autant qu’environ 260 m en voiture. Elle consomme aussi environ 7,2 litres d’eau et 13 % de la batterie d’un smartphone de 4 000 mAh.",
            "Conseils : limiter le temps passé, préférer la basse définition, désactiver le chargement automatique des vidéos. La fiche permet de calculer l’impact de votre propre usage quotidien.",
            "Instagram compte plus de 2 milliards d’utilisateurs actifs par mois et plus de 95 millions de photos et vidéos publiées chaque jour."
        ],
        liens: [["Fiche Instagram", "pages/fiches/instagram.html"]],
        suite: ["facebook", "tiktok", "services_comparaison"]
    },
    {
        id: "facebook",
        titre: "Facebook",
        modele: "service",
        sujets: ["facebook", "meta", "fb"],
        exemples: ["une heure sur facebook", "facebook sur smartphone ou ordinateur"],
        reponse: [
            "Une heure sur Facebook émet environ 38 g de CO₂, autant qu’environ 190 m en voiture. Côté appareil seul, un smartphone émet bien moins (0,45 g par heure) qu’un ordinateur de bureau (15 g).",
            "Conseils : privilégier le texte et les images aux vidéos, éviter le défilement infini, désactiver la lecture automatique.",
            "Facebook compte 3,07 milliards d’utilisateurs actifs par mois."
        ],
        liens: [["Fiche Facebook", "pages/fiches/facebook.html"]],
        suite: ["instagram", "x_twitter", "services_comparaison"]
    },
    {
        id: "x_twitter",
        titre: "X (Twitter)",
        modele: "service",
        sujets: ["x", "twitter", "un tweet", "les tweets"],
        exemples: ["combien pollue un tweet", "un tweet c'est combien de co2", "twitter pollue t il"],
        reponse: [
            "Une heure sur X (Twitter) émet environ 31 g de CO₂. Un tweet représenterait environ 0,026 g de CO₂, soit 26 kg par million de tweets.",
            "Conseils : limiter les vidéos et GIF, rafraîchir le fil moins souvent, désactiver la lecture automatique, utiliser le Wi-Fi.",
            "X compte environ 335 millions d’utilisateurs actifs par mois et près de 500 millions de tweets par jour."
        ],
        liens: [["Fiche X (Twitter)", "pages/fiches/x.html"]],
        suite: ["facebook", "services_comparaison"]
    },
    {
        id: "google",
        titre: "Google",
        modele: "service",
        sujets: ["google", "une recherche google", "le moteur de recherche", "gemini"],
        exemples: ["combien pollue une recherche sur internet", "une recherche google émet combien", "google énergie renouvelable"],
        reponse: [
            "Une requête Google émet environ 0,03 g de CO₂ (2025), à peu près la masse d’un grain de riz : environ 50 fois moins qu’une requête ChatGPT selon les fiches du site.",
            "Avec 16,4 milliards de requêtes par jour, l’impact cumulé reste important : 11,5 millions de tonnes CO₂e en 2024 pour l’entreprise. Conseils : des recherches précises et des favoris pour les sites habituels.",
            "Google traite environ 16,4 milliards de requêtes par jour, dans 190 pays."
        ],
        liens: [["Fiche Google", "pages/fiches/google.html"]],
        suite: ["chatgpt", "data_centers"]
    },
    {
        id: "twitch",
        titre: "Twitch",
        modele: "service",
        sujets: ["twitch", "le live", "le streaming en direct"],
        exemples: ["regarder un live pollue", "twitch 1080p ou 480p"],
        reponse: [
            "Une heure sur Twitch émet environ 31 g de CO₂. La qualité change tout : de 1 g par heure en 480p à 30 g en 4K selon la fiche.",
            "Conseils : baisser la qualité, éteindre l’écran quand on écoute seulement, préférer le Wi-Fi.",
            "Twitch compte plus de 35 millions de spectateurs actifs par jour."
        ],
        liens: [["Fiche Twitch", "pages/fiches/twitch.html"]],
        suite: ["youtube", "streaming_conseils"]
    },
    {
        id: "steam",
        titre: "Steam et jeux vidéo",
        modele: "service",
        sujets: ["steam", "les jeux vidéo", "le gaming", "le cloud gaming", "télécharger un jeu"],
        exemples: ["les jeux vidéo polluent ils", "télécharger un jeu de 50 go pollue", "le cloud gaming consomme plus"],
        reponse: [
            "Télécharger 1 Go émet en moyenne 4,1 g de CO₂ : un jeu de 50 Go, environ 205 g. Sur 10 kg émis par Steam, 7 à 8 viennent de l’ordinateur ou de la console du joueur.",
            "Conseils : privilégier les jeux légers, limiter les mises à jour automatiques, éviter le cloud gaming, qui peut consommer jusqu’à 3 fois plus d’énergie que le jeu en local.",
            "Steam a dépassé 42 millions de joueurs connectés en même temps."
        ],
        liens: [["Fiche Steam", "pages/fiches/steam.html"]],
        suite: ["twitch", "fabrication"]
    },
    {
        id: "amazon_prime",
        titre: "Amazon Prime Video",
        modele: "service",
        sujets: ["amazon prime video", "prime video", "amazon", "l'audiovisuel"],
        exemples: ["l'audiovisuel pollue combien", "prime video en hd"],
        reponse: [
            "Une heure sur Prime Video émet de 32 à 69 g de CO₂ selon la qualité (HD ou 4K). En France, l’audiovisuel pèse environ un tiers de l’empreinte carbone du numérique.",
            "Conseils : éviter de laisser tourner des vidéos inutilement, télécharger pour regarder hors ligne, préférer le Wi-Fi.",
            "Prime Video compte plus de 210 millions d’abonnés (2023), dans plus de 200 pays."
        ],
        liens: [["Fiche Amazon Prime Video", "pages/fiches/amazonprimevideo.html"]],
        suite: ["netflix", "streaming_conseils"]
    },

    /* ÉCOCONCEPTION WEB ET OUTILS */

    {
        id: "bonnes_pratiques_web",
        titre: "Alléger un site web",
        modele: "notion",
        sujets: ["les bonnes pratiques web", "un site web sobre", "l'écoconception web", "alléger un site", "optimiser un site web"],
        exemples: [
            "comment rendre mon site plus léger", "comment réduire le poids d'une page", "site web écologique",
            "réduire l'empreinte d'un site", "optimiser les performances d'un site", "conseils pour développeur web",
            "minifier css et javascript", "mise en cache", "réduire les requêtes http", "lazy loading",
            "mon site est trop lourd", "accélérer le chargement d'une page"
        ],
        reponse: [
            "Les gestes clés pour un site plus sobre, travaillés dans les ateliers :",
            "• ne charger que les polices utiles, en WOFF2 et en sous-ensemble (TP 01) ;",
            "• supprimer les scripts inutilisés (TP 02) ;",
            "• compresser les images, minifier CSS et JavaScript, regrouper les fichiers et activer le cache (TP 03) ;",
            "• analyser le code avec SonarQube et ecoCode (TP 04).",
            "Mesurez avant et après avec EcoIndex ou Lighthouse."
        ],
        liens: [["Ateliers", "pages/en-pratique.html"], ["Outils", "pages/outils.html"]],
        suite: ["ecoindex", "ateliers", "langages"]
    },
    {
        id: "ecoindex",
        titre: "EcoIndex et le badge",
        modele: "notion",
        sujets: ["ecoindex", "eco index", "le score ecoindex", "le badge ecoindex", "le compteur d'empreinte"],
        exemples: [
            "comment fonctionne ecoindex", "comment marche le score ecoindex", "à quoi sert ecoindex", "ecoindex calcul",
            "c'est quoi le badge en bas de page", "que veut dire la note a en bas", "le badge dans le footer",
            "comment est calculé le score ecoindex", "note de a à g", "mesurer l'empreinte d'une page web",
            "quelle est l'empreinte de cette page", "score de cette page", "pourquoi la note change"
        ],
        reponse: [
            "EcoIndex mesure la performance environnementale d’une page web avec trois critères : le nombre d’éléments de la page (DOM), le nombre de requêtes et le poids transféré. Il donne un score sur 100 et une note de A à G.",
            "Le badge en bas de chaque page affiche une estimation EcoIndex de la page consultée : cliquez dessus pour voir le détail."
        ],
        liens: [["Outils", "pages/outils.html"]],
        suite: ["outils", "bonnes_pratiques_web"]
    },
    {
        id: "outils",
        titre: "Les outils de mesure",
        modele: "page",
        sujets: ["les outils", "les outils de mesure", "les outils d'écoconception", "la page outils"],
        exemples: [
            "mesurer le co2 d'un programme", "codecarbon pour python", "outil pour mesurer l'énergie d'un script", "mesurer la consommation de mon code",
            "quel outil pour mesurer mon site", "comment mesurer l'empreinte d'un site", "outil pour mesurer le co2 de mon code",
            "outil d'audit de performance", "par où commencer pour analyser un site", "sensibiliser une équipe au numérique responsable",
            "mesurer la consommation d'un programme python", "outil gratuit écoconception"
        ],
        reponse: [
            "La page Outils présente 11 outils, à filtrer selon votre besoin. Pour un premier diagnostic : EcoIndex, Website Carbon ou Lighthouse.",
            "• performance web : PageSpeed Insights, GTmetrix, WebPageTest ;",
            "• énergie et carbone : GreenFrame, CO2.js, CodeCarbon (pour mesurer du code, par exemple en machine learning) ;",
            "• qualité du code : SonarQube ;",
            "• sensibilisation : la Fresque du Numérique, un atelier collaboratif."
        ],
        liens: [["Outils", "pages/outils.html"]],
        suite: ["ecoindex", "sonarqube", "bonnes_pratiques_web"]
    },
    {
        id: "ateliers",
        titre: "Les ateliers pratiques",
        modele: "page",
        sujets: ["les ateliers", "les tp", "les travaux pratiques", "le parcours des ateliers", "la mise en pratique", "le site du bde esiroi"],
        exemples: [
            "quels sont les tp", "par quel atelier commencer", "prérequis des ateliers", "il faut docker pour les tp",
            "c'est quoi le cas d'étude", "site de l'association étudiante esiroi", "rapport des tp",
            "combien de temps durent les tp", "livrable des tp"
        ],
        reponse: [
            "Le parcours commence par un QCM, puis quatre TP sur le site de l’association étudiante ESIROI : polices web (1h30), scripts inutilisés (2h), ressources web (2h30), SonarQube et ecoCode (3h). Prérequis : HTML, CSS, JavaScript, Git, Docker et Docker Compose ; chaque TP alimente un rapport individuel de 10 pages maximum.",
            "Le TP 05 fait optimiser du code dans 7 langages, directement dans le navigateur.",
            "Deux ateliers portent sur l’IA : construire un chatbot éco-conçu (2h) et comprendre le coût de la génération d’images (30 min)."
        ],
        liens: [["Ateliers", "pages/en-pratique.html"], ["TP 05 : optimiser du code", "pages/en-pratique/tp05.html"], ["Atelier ChatBot éco-conçu", "pages/en-pratique/atelier-chatbot.html"], ["Atelier génération d’images", "pages/en-pratique/atelier-ia-images.html"]],
        suite: ["qcm", "tp_polices", "tp_code", "atelier_ia_images"]
    },
    {
        id: "qcm",
        titre: "Le QCM",
        modele: "page",
        sujets: ["le qcm", "le questionnaire", "le qcm informatique responsable"],
        exemples: ["tester mes connaissances avant les tp", "auto évaluation informatique responsable", "réviser les notions clés"],
        reponse: [
            "Le QCM « Connaissances générales en informatique responsable » (20 minutes) évalue vos connaissances et prépare les notions des travaux pratiques. C’est le point de départ du parcours des ateliers."
        ],
        liens: [["Commencer le QCM", "pages/en-pratique/qcm.html"]],
        suite: ["ateliers", "quiz"]
    },
    {
        id: "tp_polices",
        titre: "TP 01 : polices web",
        modele: "notion",
        sujets: ["les polices web", "les polices", "woff2", "google fonts", "les fonts", "le tp 1", "le tp01"],
        exemples: ["optimiser les polices", "réduire le poids des polices", "sous ensemble de police", "subsetting"],
        reponse: [
            "Le TP 01 (1h30) optimise les polices du site du BDE : supprimer les polices et graisses inutiles, créer un sous-ensemble avec seulement les caractères utiles, utiliser le format WOFF2, plus léger que TTF ou OTF, et mettre les polices en cache.",
            "On mesure avant et après avec Lighthouse ou WebPageTest."
        ],
        liens: [["TP 01", "pages/en-pratique/tp01.html"]],
        suite: ["tp_scripts", "bonnes_pratiques_web"]
    },
    {
        id: "tp_scripts",
        titre: "TP 02 : scripts inutilisés",
        modele: "notion",
        sujets: ["les scripts inutilisés", "le javascript inutilisé", "l'onglet coverage", "le tp 2", "le tp02", "le code mort"],
        exemples: [
            "supprimer le javascript non utilisé", "javascript inutile sur mon site", "repérer le code javascript non exécuté", "scripts inutiles","trouver le javascript inutile", "supprimer les scripts inutiles", "coverage chrome devtools"],
        reponse: [
            "Le TP 02 (2h) repère les scripts inutilisés avec l’outil Coverage de Chrome DevTools (F12, puis Sources, puis Coverage), les supprime ou les allège, puis vérifie que le site fonctionne toujours.",
            "Un tableau avant/après aide à présenter les gains : taille, temps de chargement, score écologique."
        ],
        liens: [["TP 02", "pages/en-pratique/tp02.html"]],
        suite: ["tp_ressources", "lang_javascript"]
    },
    {
        id: "tp_ressources",
        titre: "TP 03 : images et ressources",
        modele: "notion",
        sujets: ["l'optimisation des images", "compresser les images", "la minification", "le tp 3", "le tp03", "tinypng", "le cache"],
        exemples: ["réduire le poids des images", "comment compresser une image", "concaténer les fichiers css", "activer la mise en cache"],
        reponse: [
            "Le TP 03 (2h30) allège le site : compression des images (TinyPNG, ImageOptim), minification du CSS (cssnano) et du JavaScript (UglifyJS), regroupement des fichiers pour réduire les requêtes, et mise en cache des ressources statiques.",
            "Les gains sont mesurés avec Google Lighthouse avant et après."
        ],
        liens: [["TP 03", "pages/en-pratique/tp03.html"]],
        suite: ["sonarqube", "ecoindex"]
    },
    {
        id: "sonarqube",
        titre: "TP 04 : SonarQube et ecoCode",
        modele: "notion",
        sujets: ["sonarqube", "ecocode", "eco code", "le tp 4", "le tp04", "sonar scanner", "green code initiative"],
        exemples: ["analyser mon code avec sonarqube", "installer sonarqube avec docker", "plugin ecocode", "règles ecocode"],
        reponse: [
            "SonarQube analyse automatiquement la qualité du code. ecoCode, de la Green Code Initiative, lui ajoute des règles pour réduire la consommation de ressources.",
            "Le TP 04 (3h) installe SonarQube avec Docker Compose, ajoute le plugin ecoCode, puis analyse le site du BDE avec SonarScanner pour repérer les pistes d’amélioration."
        ],
        liens: [["TP 04", "pages/en-pratique/tp04.html"], ["Outils", "pages/outils.html"]],
        suite: ["tp_code", "langages", "outils"]
    },
    {
        id: "tp_code",
        titre: "TP 05 : optimiser du code",
        modele: "notion",
        sujets: ["l'optimisation du code", "le tp 5", "le tp05", "le tp optimiser du code", "l'algorithmique sobre", "le correcteur de code"],
        exemples: [
            "réécrire du code pour faire moins de calculs", "éviter de recopier un tableau", "somme des entiers de 1 à n sans boucle",
            "compter les opérations de mon code", "exercices pour optimiser du code", "éviter un parcours inutile",
            "obtenir le même résultat avec moins d'opérations", "exercice d'algorithmique et sobriété", "rendre un algorithme plus sobre",
            "moins de copies en mémoire", "s'entraîner à optimiser un algorithme", "remplacer une boucle par un calcul direct"
        ],
        reponse: [
            "Le TP 05 fait réécrire des extraits de code pour obtenir le même résultat avec moins de calculs ou moins de copies, dans l’un des 7 langages du site : JavaScript, Python, PHP, Rust, C, Java ou Dart.",
            "Exercices : remplacer des additions répétées par un calcul direct, éviter un parcours inutile, lire une valeur sans recopier le tableau. Un correcteur, dans le navigateur, compte les opérations et les éléments copiés avant et après votre optimisation.",
            "Prérequis : connaître les variables, opérateurs et tableaux d’un des langages."
        ],
        liens: [["TP 05", "pages/en-pratique/tp05.html"], ["Langages", "pages/langages.html"]],
        suite: ["langages", "lang_python", "ateliers"]
    },
    {
        id: "quiz",
        titre: "Les quiz",
        modele: "page",
        sujets: ["les quiz", "le quiz", "un quiz", "surfeur responsable", "quiz green it", "accro au pixel"],
        exemples: [
            "je veux faire un quiz", "tester mes habitudes numériques", "jouer à un quiz", "quiz écologie numérique",
            "quel est mon profil numérique", "tester mes connaissances", "quiz 1", "quiz 2"
        ],
        reponse: [
            "Trois quiz sont disponibles :",
            "• n°1 « Surfeur responsable ou accro au pixel ? » : découvrir son profil d’utilisateur ;",
            "• n°2 « Quiz Green IT » : estimer l’impact de ses habitudes, avec des recommandations ;",
            "• n°3 « Génération d’images par IA » : estimer l’énergie de son usage."
        ],
        liens: [["Choisir un quiz", "pages/quizz-access.html"], ["Quiz 1 : surfeur responsable ?", "pages/quizV1.html"], ["Quiz 2 : Green IT", "pages/quizV2.html"], ["Quiz 3 : images par IA", "pages/quizIA.html"]],
        suite: ["qcm", "simulateur", "ia_images"]
    },
    {
        id: "ressources",
        titre: "Cours et ressources",
        modele: "page",
        sujets: ["les ressources", "les supports de cours", "le cours", "la bibliographie", "les références", "le mooc", "eco tic"],
        exemples: [
            "où trouver le cours", "les pdf du cours", "pour aller plus loin", "lectures recommandées",
            "partie 5 ia", "cours objets connectés iot", "ressources pour approfondir", "formations numérique responsable"
        ],
        reponse: [
            "La page Ressources rassemble les supports de cours en 5 parties : les enjeux du numérique, les bases de l’écoconception (normes, lois), les outils pour développeurs, les objets connectés et l’intelligence artificielle.",
            "Elle liste aussi des références : études, outils pour développeurs, communautés et formations (MOOC Numérique Responsable de l’INR…)."
        ],
        liens: [["Ressources", "pages/ressources.html"]],
        suite: ["ia_frugale", "outils"]
    },

    /* AUTRES SUJETS DU SITE */

    {
        id: "mode_sombre",
        titre: "Le mode sombre",
        modele: "notion",
        sujets: ["le mode sombre", "le thème sombre", "le dark mode", "le fond noir", "les écrans oled"],
        exemples: [
            "le mode sombre économise t il de l'énergie", "fond noir ou fond blanc", "pourquoi le site est sombre",
            "activer le mode sombre pour polluer moins", "le dark mode consomme moins", "écran oled et noir",
            "pourquoi un fond sombre sur ce site", "le thème sombre réduit il la consommation"
        ],
        reponse: [
            "Sur les écrans OLED, les pixels noirs sont éteints : un mode sombre réduit la consommation de l’écran. C’est l’un des conseils de la fiche Google.",
            "Le gain dépend donc de l’écran. Ce site utilise lui-même un fond sombre, par cohérence avec son message."
        ],
        liens: [["Fiche Google", "pages/fiches/google.html"], ["À propos du site", "pages/a-propos.html"]],
        suite: ["bonnes_pratiques_web", "sobriete"]
    },
    {
        id: "publicite",
        titre: "La publicité en ligne",
        modele: "notion",
        sujets: ["la publicité en ligne", "la publicité", "les pubs", "l'économie de l'attention", "le modèle publicitaire"],
        exemples: [
            "la pub sur internet pollue", "les pubs consomment de l'énergie", "publicités en ligne et climat",
            "la publicité pollue t elle", "combien consomme la publicité sur internet", "les pubs en ligne et l'énergie",
            "pourquoi les applications veulent qu'on reste longtemps", "empreinte des publicités", "les réseaux sociaux gratuits et la pub",
            "temps d'écran et publicité"
        ],
        reponse: [
            "Pärssinen et al. (2018) estiment l’énergie de la publicité en ligne entre 20 et 282 TWh en 2016, soit environ 60 millions de tonnes eq. CO₂ (entre 12 et 159 selon les incertitudes).",
            "Le modèle publicitaire pousse à maximiser le temps d’écran, d’où la lecture automatique et le défilement infini. Herbert Simon expliquait dès 1971 que l’attention est une ressource rare."
        ],
        liens: [["Les plateformes (débat)", "pages/responsable_impact_numerique.html#plateformes"]],
        suite: ["responsabilite", "services_comparaison"]
    },
    {
        id: "metaux",
        titre: "Métaux et extraction",
        modele: "notion",
        sujets: ["les métaux rares", "l'extraction des métaux", "le cobalt", "les terres rares", "les minerais", "l'indium", "les matières premières"],
        exemples: [
            "quels métaux dans un smartphone", "d'où viennent les métaux des téléphones", "l'extraction minière pour le numérique",
            "cobalt et batteries", "conditions de travail dans les mines", "les ressources minérales du numérique",
            "pourquoi les métaux posent problème"
        ],
        reponse: [
            "La fabrication des appareils commence par l’extraction de métaux et de minerais, ce que mesure l’indicateur ADP en kg équivalent antimoine. Un utilisateur français en mobilise environ 14 g eq. antimoine par an.",
            "Sovacool (2019) a étudié l’extraction du cobalt des batteries en République démocratique du Congo : elle fait vivre des communautés, mais avec des risques professionnels, de la pollution et des violences. Selon la fiche Netflix, la moitié de l’indium extrait dans le monde sert à fabriquer des téléviseurs."
        ],
        liens: [["Les fabricants (débat)", "pages/responsable_impact_numerique.html#fabricants"], ["Les 4 indicateurs", "pages/quelques-chiffres.html#indicators-title"]],
        suite: ["fabrication", "faire_durer"]
    },
    {
        id: "la_reunion",
        titre: "Électricité à La Réunion",
        modele: "notion",
        sujets: ["la réunion", "l'île de la réunion", "le mix électrique réunionnais", "l'électricité à la réunion", "l'université de la réunion"],
        exemples: [
            "à la réunion l'électricité pollue t elle plus", "combien de co2 par kwh à la réunion", "mix énergétique de la réunion",
            "pourquoi le site parle de la réunion", "économiser l'énergie à la réunion"
        ],
        reponse: [
            "La page C/C++ calcule ses équivalences avec le mix électrique de La Réunion : environ 573 g de CO₂ par kWh, car l’électricité y est surtout produite à partir d’énergies fossiles.",
            "Chaque kWh économisé sur l’île évite donc beaucoup de CO₂. Le site lui-même est un projet de l’Université de La Réunion."
        ],
        liens: [["C / C++ et IoT", "pages/langages/c.html"], ["À propos du site", "pages/a-propos.html"]],
        suite: ["lang_c", "contact"]
    },
    {
        id: "equivalences",
        titre: "Les équivalences",
        modele: "notion",
        sujets: ["les équivalences", "l'équivalence voiture", "les comparaisons avec la voiture", "les ordres de grandeur"],
        exemples: [
            "comment sont calculées les équivalences", "pourquoi comparer avec une voiture", "1 km en voiture c'est combien de co2",
            "d'où viennent les distances en voiture", "équivalence batterie de smartphone", "combien de co2 émet une voiture par kilomètre",
            "que représente un gramme de co2"
        ],
        reponse: [
            "Le site traduit ses chiffres en équivalences du quotidien pour donner des ordres de grandeur. Pour la voiture thermique, la page Chiffres utilise 112 g eq. CO₂ par km (Benchmark Green IT 2021) ; les fiches des services retiennent 150 g par km, soit environ 5 m par gramme de CO₂.",
            "Les fiches comptent aussi une batterie de smartphone de 4 000 mAh et une bouteille d’eau de 1,5 L. Le budget carbone soutenable d’une personne est de 1,7 tonne par an."
        ],
        liens: [["Les 4 indicateurs", "pages/quelques-chiffres.html#indicators-title"], ["Fiche Netflix", "pages/fiches/netflix.html"]],
        suite: ["chiffres_utilisateur", "services_comparaison"]
    },
    {
        id: "occupation_sols",
        titre: "L’occupation des sols",
        modele: "notion",
        sujets: ["l'occupation des sols", "la surface au sol", "les m² par minute", "la surface des infrastructures"],
        exemples: [
            "que veut dire occupation des sols dans les fiches", "pourquoi des mètres carrés dans les fiches", "m² par minute ça veut dire quoi",
            "surface mobilisée par le numérique"
        ],
        reponse: [
            "Plusieurs fiches donnent une « occupation des sols » en m² par minute : c’est la surface mobilisée par les infrastructures numériques pendant l’usage.",
            "Par exemple, une heure sur TikTok mobilise environ 113 m², près de la moitié d’un court de tennis ; une heure sur YouTube, environ 55 m²."
        ],
        liens: [["Fiche TikTok", "pages/fiches/tiktok.html"], ["Fiche YouTube", "pages/fiches/youtube.html"]],
        suite: ["indicateurs", "services_comparaison"]
    },
    {
        id: "outil_lighthouse",
        titre: "Lighthouse et la performance",
        modele: "notion",
        sujets: ["lighthouse", "pagespeed insights", "pagespeed", "gtmetrix", "webpagetest", "un audit de performance"],
        exemples: [
            "comment lancer lighthouse", "lighthouse c'est quoi", "mesurer la vitesse de mon site", "tester les performances d'une page",
            "outil google pour la performance", "audit de vitesse de chargement"
        ],
        reponse: [
            "Lighthouse, intégré à Chrome, analyse les performances, l’accessibilité et les bonnes pratiques d’une page. PageSpeed Insights fait de même sur mobile et ordinateur, GTmetrix détaille les ressources lourdes et WebPageTest teste depuis plusieurs lieux, navigateurs et réseaux.",
            "Les TP du site les utilisent pour mesurer avant et après chaque optimisation."
        ],
        liens: [["Outils", "pages/outils.html"], ["TP 03", "pages/en-pratique/tp03.html"]],
        suite: ["outil_carbone_web", "bonnes_pratiques_web"]
    },
    {
        id: "outil_carbone_web",
        titre: "Website Carbon, CO2.js, GreenFrame",
        modele: "notion",
        sujets: ["website carbon", "co2.js", "co2 js", "greenframe", "le carbone d'une page web"],
        exemples: [
            "estimer le co2 d'une page web", "mesurer l'énergie d'un parcours utilisateur", "bibliothèque javascript pour le co2",
            "calculer les émissions du transfert de données", "outil carbone pour site web"
        ],
        reponse: [
            "Website Carbon estime simplement les émissions liées à l’affichage d’une page. CO2.js est une bibliothèque JavaScript qui estime les émissions du transfert de données, à intégrer dans vos outils. GreenFrame mesure la consommation d’un parcours utilisateur, côté client et serveur."
        ],
        liens: [["Outils", "pages/outils.html"]],
        suite: ["ecoindex", "outil_lighthouse"]
    },
    {
        id: "outil_codecarbon",
        titre: "CodeCarbon",
        modele: "notion",
        sujets: ["codecarbon", "code carbon"],
        exemples: [
            "mesurer le co2 de mon code", "mesurer l'énergie d'un programme", "émissions d'un entraînement de machine learning",
            "outil pour mesurer un script python", "combien consomme mon programme"
        ],
        reponse: [
            "CodeCarbon estime les émissions de CO₂ liées à l’exécution de code, notamment pour le calcul ou l’apprentissage automatique. La page Python l’utilise pour mesurer les gains de ses 10 règles."
        ],
        liens: [["Outils", "pages/outils.html"], ["Python", "pages/langages/python.html"]],
        suite: ["lang_python", "outils"]
    },
    {
        id: "outil_fresque",
        titre: "La Fresque du Numérique",
        modele: "notion",
        sujets: ["la fresque du numérique", "la fresque", "un atelier de sensibilisation"],
        exemples: [
            "sensibiliser mon équipe au numérique responsable", "atelier pour comprendre les impacts du numérique",
            "jeu collaboratif sur le numérique", "former un groupe au numérique responsable"
        ],
        reponse: [
            "La Fresque du Numérique est un atelier collaboratif qui permet de comprendre les impacts environnementaux du numérique et de sensibiliser un groupe. Elle figure dans la page Outils, catégorie sensibilisation."
        ],
        liens: [["Outils", "pages/outils.html"]],
        suite: ["quiz", "ressources"]
    },

    /* LANGAGES */

    {
        id: "langages",
        titre: "Classement des langages",
        modele: "notion",
        sujets: ["les langages de programmation", "le classement des langages", "le langage le plus économe", "l'efficacité énergétique des langages"],
        exemples: [
            "quel langage consomme le moins", "quel est le langage le plus écologique", "langage compilé ou interprété",
            "étude université de minho", "pereira 2017", "le choix du langage compte t il", "python consomme 76 fois plus que c",
            "quel langage choisir pour l'environnement"
        ],
        reponse: [
            "Selon l’étude de Pereira et al. (2017) sur 27 langages, les langages compilés consomment bien moins : C (1,00), Rust (1,03), C++ (1,34), Java (1,98)… contre PHP (29,30) ou Python (75,88).",
            "À nuancer : une étude de 2024 (van Kempen et al.) montre que c’est surtout le temps d’exécution qui compte. Bien coder compte autant que le choix du langage : chaque page donne 10 règles concrètes."
        ],
        liens: [["Langages", "pages/langages.html"]],
        suite: ["lang_python", "lang_javascript", "lang_c"]
    },
    {
        id: "lang_python",
        titre: "Python",
        modele: "langage",
        sujets: ["python", "numpy", "codecarbon python"],
        exemples: ["python pollue t il", "générateurs python", "set ou list en python", "lru cache python"],
        reponse: [
            "Python est 26e sur 27 en efficacité énergétique dans l’étude de Pereira (environ 57 fois plus que C++). La page Python donne 10 règles mesurées avec CodeCarbon, par exemple :",
            "• un set plutôt qu’une liste pour chercher un élément ;",
            "• des générateurs pour les gros flux de données ;",
            "• NumPy pour le calcul numérique, la mémoïsation avec lru_cache, any() et all()."
        ],
        liens: [["Python", "pages/langages/python.html"]],
        suite: ["langages", "outils"]
    },
    {
        id: "lang_javascript",
        titre: "JavaScript",
        modele: "langage",
        sujets: ["javascript", "js", "node js", "node"],
        exemples: ["tree shaking", "debounce et throttle", "web worker", "réduire le bundle javascript"],
        reponse: [
            "JavaScript est 17e sur 27. Ses 10 règles visent à charger et exécuter moins de code :",
            "• réduire le JavaScript chargé au démarrage et utiliser le tree-shaking ;",
            "• limiter les manipulations du DOM et éviter le polling inutile ;",
            "• debounce et throttle sur les événements fréquents, Web Workers pour les calculs lourds ;",
            "• build de production, minification et compression."
        ],
        liens: [["JavaScript", "pages/langages/javascript.html"]],
        suite: ["tp_scripts", "langages"]
    },
    {
        id: "lang_php",
        titre: "PHP",
        modele: "langage",
        sujets: ["php", "opcache"],
        exemples: ["isset ou in_array", "implode ou concaténation"],
        reponse: [
            "PHP est 21e sur 27 : environ 29 fois plus d’énergie que C. Comme il fait tourner une grande part du web, de petites optimisations comptent :",
            "• activer OPcache en production (3 à 5 fois plus rapide) ;",
            "• isset() plutôt que in_array() pour chercher (jusqu’à 1 000 fois plus rapide) ;",
            "• implode() plutôt qu’une concaténation en boucle."
        ],
        liens: [["PHP", "pages/langages/php.html"]],
        suite: ["langages", "sonarqube"]
    },
    {
        id: "lang_java",
        titre: "Java",
        modele: "langage",
        sujets: ["java", "jvm"],
        exemples: ["stringbuilder java", "autoboxing java", "connection pooling"],
        reponse: [
            "Java est 5e sur 27 (environ 1,98 fois l’énergie du C). Ses règles : StringBuilder pour concaténer en boucle, collections pré-dimensionnées, HashSet pour les recherches, types primitifs plutôt que l’autoboxing, réglage de la JVM et réutilisation des connexions."
        ],
        liens: [["Java", "pages/langages/java.html"]],
        suite: ["langages", "sonarqube"]
    },
    {
        id: "lang_rust",
        titre: "Rust",
        modele: "langage",
        sujets: ["rust", "cargo"],
        exemples: ["mode release rust", "éviter les clones en rust"],
        reponse: [
            "Rust est 2e sur 27, à 1,03 fois l’énergie du C, sans ramasse-miettes. Règles phares : compiler en mode Release (jusqu’à 90 % d’énergie en moins), éviter les clones inutiles, pré-allouer la mémoire, réutiliser les buffers et désérialiser sans copie."
        ],
        liens: [["Rust", "pages/langages/rust.html"]],
        suite: ["langages", "lang_c"]
    },
    {
        id: "lang_c",
        titre: "C / C++ et IoT",
        modele: "langage",
        sujets: ["c", "c++", "le langage c", "l'iot", "les objets connectés", "esp32", "m5stack", "l'embarqué"],
        exemples: ["deep sleep esp32", "réduire la consommation d'un objet connecté", "optimiser un microcontrôleur", "système embarqué économe"],
        reponse: [
            "C est le langage de référence (1er sur 27), C++ est 3e. La page C/C++ applique 10 règles à un objet connecté (ESP32/M5Stack), mesurées à l’ampèremètre avec le mix électrique de La Réunion.",
            "Par exemple : mode veille profonde et luminosité progressive (−94 % de consommation), interruptions plutôt que polling (×20), désactiver Wi-Fi et Bluetooth inutilisés (−72 %)."
        ],
        liens: [["C / C++", "pages/langages/c.html"]],
        suite: ["langages", "lang_rust"]
    },
    {
        id: "lang_dart",
        titre: "Dart et Flutter",
        modele: "langage",
        sujets: ["dart", "flutter"],
        exemples: ["listview builder", "const widgets flutter", "compilation aot dart"],
        reponse: [
            "Dart, le langage de Flutter, gagne environ 30 % de vitesse grâce à la compilation AOT en production. Ses règles : widgets const, ListView.builder pour charger les listes à la demande, StringBuffer, images optimisées, tree-shaking et libération des ressources."
        ],
        liens: [["Dart", "pages/langages/dart.html"]],
        suite: ["langages", "lang_javascript"]
    }
];

// Chiffres des fiches, utilisés pour les comparaisons et les calculs
// co2 : grammes de CO₂ par heure ou par question ; eau : litres par heure
// quoi et par : façon de nommer les questions dans les réponses
export const FAITS = [
    { id: "tiktok", nom: "TikTok", noms: ["tiktok"], co2: 57, unite: "heure", eau: 16.2, page: "pages/fiches/tiktok.html" },
    { id: "netflix", nom: "Netflix", noms: ["netflix"], co2: 55, unite: "heure", page: "pages/fiches/netflix.html" },
    { id: "instagram", nom: "Instagram", noms: ["instagram", "insta"], co2: 52, unite: "heure", eau: 7.2, page: "pages/fiches/instagram.html" },
    { id: "youtube", nom: "YouTube", noms: ["youtube"], co2: 52, unite: "heure", eau: 4.8, page: "pages/fiches/youtube.html" },
    { id: "facebook", nom: "Facebook", noms: ["facebook", "fb"], co2: 38, unite: "heure", eau: 7.2, page: "pages/fiches/facebook.html" },
    { id: "x_twitter", nom: "X (Twitter)", noms: ["twitter", "tweet"], co2: 31, unite: "heure", eau: 6, page: "pages/fiches/x.html" },
    { id: "twitch", nom: "Twitch", noms: ["twitch"], co2: 31, unite: "heure", eau: 5.4, page: "pages/fiches/twitch.html" },
    { id: "amazon_prime", nom: "Prime Video (HD)", noms: ["prime", "amazon"], co2: 31.7, unite: "heure", page: "pages/fiches/amazonprimevideo.html" },
    { id: "chatgpt", nom: "ChatGPT", noms: ["chatgpt", "gpt"], co2: 1.54, unite: "question", quoi: "questions à ChatGPT", par: "question", page: "pages/fiches/chatgpt.html" },
    { id: "claude", nom: "Claude (Sonnet)", noms: ["claude"], co2: 0.036, unite: "question", quoi: "échanges avec Claude", par: "échange", page: "pages/fiches/claude.html" },
    { id: "google", nom: "Google", noms: ["google"], co2: 0.03, unite: "question", quoi: "recherches Google", par: "recherche", page: "pages/fiches/google.html" }
];
