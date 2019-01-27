// ciblage du DOM
const btnTest = document.querySelector('#btnTest');
const box = document.querySelector('#box');

let interv = null; // globale pour la gestion de l'intervale

// Paramètres
const config = {
  speed: 20,
  step: 10,
  topStart: -140,
  topStop: -20,
  delay: 1500,
  direction: 'down'
}

// Fonctions
function addEvents() {
  btnTest.addEventListener('click', animBox);
}

function animBox() {
  if (interv == null) {
    if (config.direction == 'down') {
      interv = setInterval(moveDown, config.speed);
    } else {
      interv = setInterval(moveUp, config.speed);
    }
  }
}

function moveDown() {
  let topVal = getTopVal();
  if (topVal > config.topStop) {
    clearInterval(interv);
    interv = null;
    config.direction = 'up';
    setTimeout(animBox, config.delay);
  } else {
    box.style.top = (topVal + config.step) + 'px';
  }
}

function moveUp() {
  let topVal = getTopVal();
  if (topVal < config.topStart) {
    clearInterval(interv);
    interv = null;
    config.direction = 'down';
  } else {
    box.style.top = (topVal - config.step) + 'px';
  }
}

function getTopVal() {
  let currentVal = box.style.top;
  let numVal =
    parseInt(currentVal.substr(0, currentVal.length - 2));
  return numVal;
}

function init() {
  box.style.top = config.topStart + 'px';
  addEvents();
}

init();
