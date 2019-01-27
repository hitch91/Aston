// Ciblage du DOM
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnValid = document.getElementById('valid');
const message = document.getElementById('message');

let config = {
  password: {
    minLength: 6
  },
  errors: [
    {id: 1, message: 'Format de l\'email incorrect'},
    {id: 2, message: 'Password doit comporter au moins '+this.password.minLength+' caractères'},
  ]
}

let errors = []; // tableau des erreurs de validation rencontrées

function addEvents() {
  let index = null;

  btnValid.addEventListener('click', e => {

    // email
    index = search(1);
    if (email.value.indexOf('@') == -1) { // erreur
      if (index == -1) errors.push(1);
    } else {
      if (index != -1) errors.splice(index,1);
    }

    // password
    index = search(2);
    if (password.value.length < config.password.minLength) { // erreur
      if (index == -1) errors.push(2);
    } else {
      if (index != -1) errors.splice(index,1);
    }

    displayErrors();

  })
}

function displayErrors() {
  let html = '';
  errors.forEach(error => {
    html += '<li>'+getErrorMessage(error)+'</li>'
  })
  message.innerHTML = html;
}

function getErrorMessage(id) {
  let message = null;
  for (let i=0; i<config.errors.length; i++) {
    if (id == config.errors[i].id) {
      message = config.errors[i].message;
      break;
    }
  }
  return message;
}

function search(id) {
  let index = -1; // par défaut, indice vaut -1
  for (let i=0; i<errors.length; i++) {
    if (id == errors[i]) {
      index = i;
      break; // sortie de boucle (élément recherché trouvé)
    }
  }
  // on renvoie l'indice (position dans le tableau)
  // de l'élément trouvé. -1 si l'élément n'a pas été trouvé
  return index;
}

function init() {
  addEvents();
}

init();
