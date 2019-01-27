// Ciblage du DOM
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnValid = document.getElementById('valid');
const message = document.getElementById('message');

// Paramètres
const config = {
  password: {
    minLength: 6
  }
};

const errorList = [
  {id: 1, message: 'Format de l\'email incorrect'},
  {id: 2, message: 'Password doit comporter au moins '+config.password.minLength+' caractères'},
  {id: 3, message: 'Password doit contenir au moins 2 chiffres'},
];

let errors = []; // tableau des erreurs de validation rencontrées

// Fonctions
function addEvents() {
  btnValid.addEventListener('click', e => {
    let index = null;

    // email
    index = search(1); // recherche de la valeur 1
    if (email.value.indexOf('@') == -1) { // erreur
      // si la valeur 1 pas trouvée dans le tableau errors,
      // on l'ajoute grâce à push
      if (index == -1) errors.push(1);
    } else { // pas d'erreur
      // si la valeur existe dans le tableau, on la retire
      // grâce à splice
      if (index != -1) errors.splice(index,1);
    }

    // password longueur minimale
    index = search(2); // recherche de la valeur 2
    if (password.value.length < config.password.minLength) {
      if (index == -1) errors.push(2);
    } else {
      if (index != -1) errors.splice(index,1);
    }

    // password doit contenir au moins deux chiffres
    index = search(3);
    if (countNumericValues(password.value) < 2) { // erreur
      if (index == -1) errors.push(3);
    } else { // pas erreur
      if (index != -1) errors.splice(index,1);
    }

    displayErrors();

  })
}

function countNumericValues(str) {
  // renvoie le nombre de valeurs numériques
  // rencontrées dans une chaîne
  let nbNumericValues = 0;

  // on parcourt la totalité de la chaîne fournie en entrée
  for (let i=0; i<str.length; i++) {
    // si le caractère est compris entre 0 et 9
    if (str[i] >= 0 && str[i] <= 9) {
      nbNumericValues++;
    }
  }

  return nbNumericValues;
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

function displayErrors() {
  let html = '';
  errors.forEach(errorId => {
    html += '<li>'+getErrorMessage(errorId)+'</li>';
  })
  message.innerHTML = html;
}

function getErrorMessage(id) {
  // renvoie le message associée à l'identifiant d'erreur
  // passé en entrée
  let message = null;
  for (let i=0; i<errorList.length; i++) {
    if (id == errorList[i].id) {
      message = errorList[i].message;
      break;
    }
  }
  return message;
}


function init() {
  addEvents();
}

init();
