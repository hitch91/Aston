// Ciblage du DOM
const destination = document.getElementById('destination');
const suggestionList = document.getElementById('suggestionList');
const otherCities = document.getElementById('otherCities');

// Source de données
const cities = [
  {id:1, name: 'Turin', country: 'Italie'},
  {id:2, name: 'Paris', country: 'France'},
  {id:3, name: 'Milan', country: 'Italie'},
  {id:4, name: 'Arcueil', country: 'France'},
  {id:5, name: 'New-York', country: 'Etats-Unis'},
  {id:6, name: 'Cluj', country: 'Roumanie'},
  {id:7, name: 'Tanger', country: 'Maroc'},
  {id:8, name: 'Madrid', country: 'Espagne'},
  {id:9, name: 'Palerme', country: 'Italie'},
  {id:10, name: 'New-Delhi', country: 'Inde'},
  {id:11, name: 'Bergame', country: 'Italie'},
  {id:12, name: 'Tunis', country: 'Tunisie'},
  {id:13, name: 'Alger', country: 'Algérie'},
  {id:14, name: 'Oran', country: 'Algérie'}
]

// Paramètres
const config = {
  minLength: 2
}

// tableau des suggestions liées à la recherche
let suggestions = [];

// Fonctions
function addEvents() {
  destination.addEventListener('keyup', e => {

    clearSuggestions(); // purge des suggestions précédentes

    if (destination.value.length >= config.minLength) {
      getSuggestions(destination.value);
      displaySuggestions();
    }

  })
}

function getSuggestions(str) {
  // parcours des villes
  cities.forEach(city => {
    if (city.name.toLowerCase().indexOf(str.toLowerCase()) != -1) {
      suggestions.push(city);
    }
  })
}

function displaySuggestions() {
  // affiche dans le DOM les suggestions trouvées
  // dans le tableau suggestions
  let html = '';
  suggestions.forEach(suggestion => {
    html += '<li>'+ suggestion.name +'</li>';
  })
  // Affichage dans le DOM
  suggestionList.innerHTML = html;

  // ajout d'un écouteur sur les suggestions (li)
  let lis = suggestionList.querySelectorAll('li');
  for (let i=0; i<lis.length; i++) {
    lis[i].addEventListener('click', e => {
      clearSuggestions(); // nettoyage
      let cityName = e.target.textContent;
      destination.value = cityName;
      let country = getCountry(cityName);
      let foundCities = getCities(country, cityName);
      displayOtherCities(foundCities, country);
    })
  }
}

function clearSuggestions() {
  // purge
  suggestions = [];
  suggestionList.innerHTML = '';
  otherCities.innerText = '';
}

function getCountry(cityName) {
  // retourne le nom du pays par rapport à un
  // nom de ville fourni en entrée
  let country = null;

  for (let i=0; i<cities.length; i++) {
    if (cities[i].name == cityName) {
      country = cities[i].country;
      break;
    }
  }

  return country;
}

function getCities(countryName, excludeCity) {
  // retourne une collection de villes
  // par rapport au nom de pays fourni en entrée
  let foundCities = [];

  cities.forEach(city => {
    if (city.country == countryName &&
      city.name != excludeCity) {
      foundCities.push(city);
    }
  })

  return foundCities;
}

function displayOtherCities(others, country) {
  // affiche les autres villes pour le pays concerné
  // les autres villes et le pays sont fournis en entrée
  let info = 'Autres villes pour ' + country + ': ';

  others.forEach((city, index) => {
    //info += city.name + ', ';
    info += city.name;

    // si on parvient au dernier élément du tableau
    // on ajoute un point sinon une virgule suivi d'une espace
    info += (index == others.length-1) ? '.' : ', ';
  })

  // autre possibilité pour remplacer la virgule finale
  // par un point:
  //let indice = info.length - 2;
  //let info2 = info.substr(0, indice) + '.';
  //info = info2;

  otherCities.innerText = info;
}


function init() {
  addEvents();
}

init();
