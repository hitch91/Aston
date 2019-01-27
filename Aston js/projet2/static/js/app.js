// Ciblage du DOM
const imagesSmall = document.getElementById('imagesSmall').children;
const imagesBig = document.getElementById('imagesBig').children;
const imagesSmall2 = document.getElementById('imagesSmall2').children;
const imageBig = document.getElementById('imageBig');

// Fonctions
function addEventsV1() {
  for (let i=0; i<imagesSmall.length; i++) {
    imagesSmall[i].addEventListener('mouseover', e => {
      // e.target.src contient l'url de l'image survolée (petit format)

      // approche 1 : valable si les images sont dans une ordre différent
      displayImageBig(e.target.src);

      // approche 2 : valable si les images sont dans le même ordre
      //imagesBig[i].style.display = 'inline';
    })
    imagesSmall[i].addEventListener('mouseout', e => {
      reset();
    })
  }
}

function addEventsV2() {
  // ajoute un écouteur d'événement à chaque miniature
  for (let i=0; i<imagesSmall2.length; i++) {
    imagesSmall2[i].addEventListener('mouseover', e => {
      displayImageBigV2(e.target.src);
     })
  }
}

function displayImageBig(imageSrc) {
  // parcourt l'ensemble des images grand format
  for (let i=0; i<imagesBig.length; i++) {
    // si les propriétés src des deux formats correspondent
    if (imageSrc == imagesBig[i].src) {
      // on affiche l'image grand formant en modifiant sa prop
      // style.display
      imagesBig[i].style.display = 'inline';
    } else {
      // sinon on masque l'image grand format qui était
      // éventuellement restée visible
      imagesBig[i].style.display = 'none';
    }
  }
}

function displayImageBigV2(imageSrc) {
  let indiceSmall = imageSrc.indexOf('small/');
  let baseUrl = imageSrc.substr(0, indiceSmall);
  let filename = imageSrc.substr(indiceSmall + 6);
  let finalUrl = baseUrl + filename;
  imageBig.innerHTML = '<img id="big" src="'+ finalUrl +'" alt="" />';

  // APRES injection de l'image de le DOM
  // ajout d'un écouteur d'événement click
  // permettant de supprimer m'image lorsque l'on clique dessus
  document
    .getElementById('big')
    .addEventListener('click', e => imageBig.innerHTML = '')
}

function reset() {
  for (let i=0; i<imagesBig.length; i++) {
    imagesBig[i].style.display = 'none';
  }
}

function init() {
  //addEventsV1();
  addEventsV2();
}

init();
