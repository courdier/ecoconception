const tp05Data = (() => {
    const languages = {
        javascript: {
            name: 'JavaScript',
            division: '/',
            sum: `function somme(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) total += i;
    return total;
}`,
            contains: `function contient(n, cible) {
    for (let i = 1; i <= n; i++) {
        if (i === cible) return true;
    }
    return false;
}`,
            read: `function lire(valeurs, indice) {
    const copie = [];
    for (const valeur of valeurs) copie.push(valeur);
    return copie[indice];
}`,
        },
        python: {
            name: 'Python',
            division: '//',
            sum: `def somme(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total`,
            contains: `def contient(n, cible):
    for i in range(1, n + 1):
        if i == cible:
            return True
    return False`,
            read: `def lire(valeurs, indice):
    copie = []
    for valeur in valeurs:
        copie.append(valeur)
    return copie[indice]`,
        },
        php: {
            name: 'PHP',
            division: 'intdiv',
            sum: `function somme(int $n): int {
    $total = 0;
    for ($i = 1; $i <= $n; $i++) $total += $i;
    return $total;
}`,
            contains: `function contient(int $n, int $cible): bool {
    for ($i = 1; $i <= $n; $i++) {
        if ($i === $cible) return true;
    }
    return false;
}`,
            read: `function lire(array $valeurs, int $indice): int {
    $copie = [];
    foreach ($valeurs as $valeur) $copie[] = $valeur;
    return $copie[$indice];
}`,
        },
        rust: {
            name: 'Rust',
            division: '/',
            sum: `fn somme(n: i32) -> i32 {
    let mut total = 0;
    for i in 1..=n { total += i; }
    total
}`,
            contains: `fn contient(n: i32, cible: i32) -> bool {
    for i in 1..=n {
        if i == cible { return true; }
    }
    false
}`,
            read: `fn lire(valeurs: &[i32], indice: usize) -> i32 {
    let copie = valeurs.to_vec();
    copie[indice]
}`,
        },
        c: {
            name: 'C',
            division: '/',
            sum: `int somme(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}`,
            contains: `#include <stdbool.h>

bool contient(int n, int cible) {
    for (int i = 1; i <= n; i++) {
        if (i == cible) return true;
    }
    return false;
}`,
            read: `#include <stdlib.h>

int lire(const int valeurs[], size_t taille, size_t indice) {
    int *copie = malloc(taille * sizeof *copie);
    if (!copie) abort();
    for (size_t i = 0; i < taille; i++) copie[i] = valeurs[i];
    int resultat = copie[indice];
    free(copie);
    return resultat;
}`,
        },
        java: {
            name: 'Java',
            division: '/',
            sum: `static int somme(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}`,
            contains: `static boolean contient(int n, int cible) {
    for (int i = 1; i <= n; i++) {
        if (i == cible) return true;
    }
    return false;
}`,
            read: `static int lire(int[] valeurs, int indice) {
    int[] copie = valeurs.clone();
    return copie[indice];
}`,
        },
        dart: {
            name: 'Dart',
            division: '~/',
            sum: `int somme(int n) {
    var total = 0;
    for (var i = 1; i <= n; i++) total += i;
    return total;
}`,
            contains: `bool contient(int n, int cible) {
    for (var i = 1; i <= n; i++) {
        if (i == cible) return true;
    }
    return false;
}`,
            read: `int lire(List<int> valeurs, int indice) {
    final copie = List<int>.of(valeurs);
    return copie[indice];
}`,
        },
    };

    function sumReference({ n }) {
        let value = 0;
        for (let i = 1; i <= n; i++) value += i;
        return { value, operations: n, memory: 0 };
    }

    function containsReference({ n, cible }) {
        for (let i = 1; i <= n; i++) {
            if (i === cible) return { value: true, operations: i, memory: 0 };
        }
        return { value: false, operations: n, memory: 0 };
    }

    function readReference({ valeurs, indice }) {
        const copie = [...valeurs];
        return { value: copie[indice], operations: copie.length + 1, memory: copie.length };
    }

    const sizes = [0, 1, 2, 3, 4, 5, 7, 10, 17, 32, 91, 256, 997, 4096, 8191, 9999, 10000, 16383, 19999, 20000];
    function sample() {
        return Array.from({ length: 10000 }, (_, i) => (i * 73 % 251) - 125);
    }

    const exercises = {
        sum: {
            title: 'Remplacer des additions répétées',
            description: 'Calculez la somme des entiers de 1 à n. Quand n vaut 0, la somme vaut 0.',
            note: 'La boucle additionne un nombre à chaque tour, même lorsqu’un calcul direct suffit.',
            inputs: ['n'],
            resultType: 'number',
            domain: 'n est un entier de 0 à 20 000.',
            hint: 'Écrivez la suite dans les deux sens et additionnez les termes deux à deux. Quelle somme retrouve-t-on à chaque paire ?',
            solution: language => {
                if (language === 'php') return 'intdiv($n * ($n + 1), 2)';
                return `n * (n + 1) ${languages[language].division} 2`;
            },
            explanation: 'En additionnant la suite de 1 à n avec la même suite à l’envers, on obtient n paires de somme n + 1. On divise par deux pour retrouver la somme d’une seule suite.',
            cases: sizes.map(n => ({ n })),
            benchmark: { n: 10000 },
            reference: sumReference,
            measure: '10 000 entiers. On compte les additions de la boucle et les opérations de votre expression.',
        },
        contains: {
            title: 'Éviter un parcours inutile',
            description: 'Renvoyez vrai si cible appartient à la suite des entiers de 1 à n, bornes comprises. Renvoyez faux si n vaut 0.',
            note: 'La recherche compare la cible à chaque entier jusqu’à la trouver ou atteindre la fin.',
            inputs: ['n', 'cible'],
            resultType: 'boolean',
            domain: 'n est un entier de 0 à 20 000. La cible peut être négative ou hors de la suite.',
            hint: 'Il n’y a aucun trou entre 1 et n. Deux comparaisons de bornes suffisent.',
            solution: language => {
                if (language === 'python') return '1 <= cible <= n';
                if (language === 'php') return '$cible >= 1 && $cible <= $n';
                return 'cible >= 1 && cible <= n';
            },
            explanation: 'La suite contient exactement les entiers compris entre 1 et n. Vérifier les deux bornes suffit, y compris lorsque n vaut 0.',
            cases: sizes.flatMap(n => [-7, 0, 1, Math.ceil(n / 2), n, n + 1].map(cible => ({ n, cible }))),
            benchmark: { n: 10000, cible: 10001 },
            reference: containsReference,
            measure: 'Cible absente parmi 10 000 entiers. On compte les comparaisons de la boucle et les opérations de votre expression.',
        },
        read: {
            title: 'Lire une valeur sans recopier le tableau',
            description: 'Renvoyez l’élément situé à l’indice demandé. Le tableau d’origine est disponible en lecture.',
            note: 'La copie crée un tableau temporaire de même taille pour une seule lecture.',
            inputs: ['valeurs', 'indice'],
            resultType: 'number',
            domain: 'Le tableau contient des entiers. Le premier indice vaut 0 et l’indice demandé existe toujours.',
            hint: 'L’accès à un élément par son indice laisse le tableau intact. Vous pouvez lire l’élément directement dans le tableau d’origine.',
            solution: language => language === 'php' ? '$valeurs[$indice]' : 'valeurs[indice]',
            explanation: 'Lisez l’élément à l’indice demandé directement dans le tableau d’origine. Une seule lecture suffit et aucun tableau temporaire n’est nécessaire.',
            cases: [
                { valeurs: [0], indice: 0 },
                { valeurs: [-8, 5, 5, 11], indice: 0 },
                { valeurs: [10, 20, 10], indice: 2 },
                { valeurs: [1, -7, 2, 9], indice: 1 },
                { valeurs: [-25, -1, 0, 12, 25, 5, 20], indice: 5 },
            ],
            get benchmark() { return { valeurs: sample(), indice: 4321 }; },
            reference: readReference,
            measure: 'Une lecture dans un tableau de 10 000 éléments. On compte les lectures nécessaires à la copie et au résultat, puis les opérations de votre expression.',
        },
    };

    return { languages, exercises };
})();
