// variable

const citationContainer = document.getElementById('citation-container');
const texteCitation = document.getElementById('citation');
const auteurCitation = document.getElementById('auteur');
const btnNouvelleCitation = document.getElementById('nouvelle-citation');
const btnTwitter = document.getElementById('twitter');
const loader = document.getElementById('loader');


let apiCitation = [];

// fonction

function chargement(){
    loader.hidden = false;
    citationContainer.hidden = true;
}

function chargementComplet(){
    citationContainer.hidden = false;
    loader.hidden = true;
}

function nouvelleCitation(){

    chargement();
    
    const citation = apiCitation[Math.floor(Math.random() * apiCitation.length)];

    // Vérifier si l'auteur !== null
    if(!citation.author){
        auteurCitation.textContent = 'Inconnu';
    }else{
        auteurCitation.textContent = citation.author;
    }

    // Vérifier la taille de la citation pour determiner le style
    if(citation.text.length > 120){
        texteCitation.classList.add('longue-citation');
    }else{
        texteCitation.classList.remove('longue-citation');
    }    
    
    // Affiche la citation, cache le loader
    texteCitation.textContent = citation.text;

   
    chargementComplet();

}

async function getCitation(){

    chargement();


    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl); 
        apiCitation = await response.json(); 
        nouvelleCitation();

    }catch(error){
        // Récupérer l'erreur au cas où
    }

} 

function tweetCitation(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${texteCitation.textContent} - ${auteurCitation.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Evenement 

btnNouvelleCitation.addEventListener('click',() => {
    nouvelleCitation();
})

btnTwitter.addEventListener('click', () => {
    tweetCitation();
})

//chargement();

getCitation();


