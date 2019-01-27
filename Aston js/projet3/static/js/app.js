// Ciblage du DOM
const tabLinks = document.getElementsByClassName('tabLink');
const sections = document.getElementsByTagName('section');

// indice par défaut de la section et du lien actifs
let activeTabIndex = 0;

// Fonctions
function addEvents() {
  // on attribue à chaque lien un écouteur d'événement
  for (let i=0; i<tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', e => {
      //reset(); // approche "brutale", on boucle sur l'ensemble
      // des sections et des liens pour nettoyer

      // nettoyage précis
      // on cible précisément les éléments devant être
      // "nettoyés" grâce à l'indice mémorisé lors
      // du précédent clic
      sections[activeTabIndex].style.display = 'none';
      tabLinks[activeTabIndex].classList.remove('active');

      // on affiche la section correspondant au lien cliqué
      sections[i].style.display = 'block';

      // ajout de la classe 'active' sur l'élément cliqué
      tabLinks[i].classList.add('active');

      // mise à jour de l'index de la section active
      activeTabIndex = i;
    })
  }
}

function reset() {
  // masque toutes les sections
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }

  // retire la classe active sur tous les liens
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove('active');
  }
}

function init() {
  // on affiche la première section par défaut
  sections[activeTabIndex].style.display = 'block';
  // on rend actif le premier lien
  tabLinks[activeTabIndex].classList.add('active');
  addEvents();
}

init();
