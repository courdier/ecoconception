//**************************************************/
// Auteur: Adrien Kenny
// Dernière modification: Adrien Kenny - 14/11/2025
//**************************************************/

// Script qui permet de gérer l'indice des bibliographies automatiquement si la bonne syntaxe est utilisée
// Si le format est correct, l'indice est ajouté au texte avec une sécurité sur le nombre de caractère supprimé.
// S'il y a un problème dans le format, la référence biblio reste intouché et l'indice des autres références continu normalement.  


// On attend le chargement de la fenêtre
document.addEventListener('DOMContentLoaded', () => {
    // On récupère la liste de li contenu dans les ul de class "bibliography-list"
    const liElts = document.querySelectorAll('ul.bibliography-list li:not(.ignoreAutoIndex)');

    // Regex qui detecte normalement les x premiers caractères qui ne sont pas des lettres ni ", ni '
    const regex = /^(.*?)(?=[a-zA-Z"'])/;

    // On parse le contenu du li
    function parseIndexIfPresent() {
        
        // Parcours tout les li (dans l'ordre d'apparition)
        for (let i = 0; i < liElts.length; i++) {
            // On récupère le contenu du li courant
            let currentTxt = liElts[i].innerHTML.trim();

            // On supprime tout ce qui a été trouvé dans le regex et on le remplace par l'indice courant
            const newTxt = "[" + (i + 1) + "] " + currentTxt.replace(regex, "").trim();

            // On vérifie si le regex n'a pas anormalement supprimé trop de caractères  
            if (Math.abs(newTxt.length - currentTxt.length)<=(3+(""+(i+1)).length)){
                // Si non on peut remplacer le contenu du li
                liElts[i].innerHTML = newTxt;
            }else{
                // Envois un message d'erreur et ne change rien au li courant
                console.warn("Error in Biblio format:", currentTxt);
            }
        }
    }
    parseIndexIfPresent();
});
