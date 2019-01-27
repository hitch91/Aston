// ciblage du DOM
const btnTest = document.querySelector('#btnTest');
const images = document.querySelector('#images');
const animSpeed = document.querySelector('#animSpeed');

const config = {
  step: .1
}

let interv = null;

// Fonctions
function addEvents() {
  btnTest.addEventListener('click', hideImages)
}

function hideImages() {
  interv = setInterval(() => {

    let currentOpa = images.style.opacity;
    images.style.opacity = currentOpa - config.step;

    if (currentOpa <= 0) clearInterval(interv);

  }, animSpeed.value)
}

function init() {
  images.style.opacity = 1;
  animSpeed.value = 50
  addEvents();
}

init();
