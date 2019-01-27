// Ciblage du DOM
const flagEn = document.getElementById('flagEn');
const flagIt = document.getElementById('flagIt');
const spansEn = document.getElementsByClassName('en');
const spansIt = document.getElementsByClassName('it');

// variable permettant de relier des flags et des spans
// variable utilisée par la fonction addEventsV2
let languages = [
  {flag: flagEn, spans: spansEn, active: false},
  {flag: flagIt, spans: spansIt, active: false}
];

// approche 1 : on copie les instructions pour chaque langue
// redondance
function addEvents() {
  flagEn.addEventListener('click', e => {
    for (let i=0; i<spansEn.length; i++) {
      spansEn[i].style.display = 'inline';
    }
  })

  flagIt.addEventListener('click', e => {
    for (let i=0; i<spansIt.length; i++) {
      spansIt[i].style.display = 'inline';
    }
  })
}

// approche 2, optimisation : on passe pour un tableau
// mettant en relation, sous forme d'objets, des drapeaux (images)
// et des spans. Pas de code redondant, il suffit de modifier
// la variable languages pour ajouter une langue, addEventsV2
// continuera de fonctionner sans besoin d'être modifiée
function addEventsV2() {
  languages.forEach(language => {
    language.flag.addEventListener('click', e => {
      // expression ternaire:
      //(expr. bool.) ? instr si Vrai : instr si Faux
      // si language.active vaut True, display est initialisée
      // avec la valeur 'none', sinon display reçoit 'inline'
      let display = (language.active) ? 'none' : 'inline';

      for (let i=0; i<language.spans.length; i++) {
        language.spans[i].style.display = display;
      }

      // changer l'opacité du drapeau
      language.flag.style.opacity = (language.active) ? 0.3 : 1;

      // bascule (toogle), on renverse la valeur de language.active
      // grâce à l'opérateur de négation (inverse) !
      language.active = !language.active;
    })
  })
}


function init() {
  addEventsV2();
}


init();
