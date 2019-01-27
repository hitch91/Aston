// Ciblage d'éléments du DOM
const sectionPlayers = document.getElementById('players');
const selectTeam = document.getElementById('selectTeam');
const resultNumber = document.getElementById('resultNumber');
const cbActive = document.getElementById('cbActive');

// Source de données globales (accessibles à toutes les fonctions)
let players = [
  {active: true, photoUrl:'https://medias.lequipe.fr/img-photo-jpg/09-12-17-torino-allianz-stadium-serie-a-16a-giornata-juventus-inter-nella-foto-blaise-matuidi/1500000000891906/121:245,2417:1775-624-416-75/67f39.jpg', firstname: 'Blaise', lastname: 'Matuidi', num: 16, team: 'Juventus'},
  {active: false, photoUrl:'static/img/dybala.jpg', firstname: 'Paolo', lastname: 'Dybala', num: 10, team: 'Juventus'},
  {active: false, photoUrl:'static/img/bonucci.jpeg', firstname: 'Leo', lastname: 'Bonucci', num: 19, team: 'Juventus'},
  {active: true, photoUrl:'', firstname: 'Kylian', lastname: 'Mbappé', num: 7, team: 'PSG'}
];

// Déclaration d'événements
selectTeam.addEventListener('change', e => {
  //console.log(e.target.value);
  buildTable(e.target.value, false);
})

cbActive.addEventListener('click', e => {
  buildTable(null, e.target.checked);
})

// Fonctions
function test() {
  console.log('test');
}

function buildTable(selectedTeam, activePlayers) {
  //console.log(selectedTeam);
  let nbVisiblePlayers = players.length;
  let list = '<table class="table table-bordered table-striped">';
  list += '<thead><tr><th>Photo</th><th>Nom</th><th>Prénom</th><th>Equipe</th><th>Numéro</th</tr></thead>';

  // ES6 (arrow function)
  players.forEach(player => {

    if (selectedTeam != null && selectedTeam != '0') {
      if (player.team != selectedTeam) {
        list += '<tr style="display:none">';
        nbVisiblePlayers--; // décrémentation
      } else {
        list += '<tr>';
      }
    } else {
      if (player.active != activePlayers && activePlayers) {
        list += '<tr style="display:none">';
        nbVisiblePlayers--; // décrémentation
      } else {
        list += '<tr>';
      }
    }

    // if (player.lastname.indexOf('ci') != -1) {
    //   list += '<td style="color:red">' + player.lastname + '</td>';
    // } else {
    //   list += '<td>' + player.lastname + '</td>';
    // }

    if (player.photoUrl == '') {
      list += '<td><img class="player" alt="" src="static/img/unknown.png"/></td>';
    } else {
      list += '<td><img class="player" title="'+ player.lastname +'" src="'+ player.photoUrl +'"/></td>';
    }

    list += '<td>' + player.lastname + '</td>';
    list += '<td>' + player.firstname + '</td>';
    list += '<td>' + player.team + '</td>';
    list += '<td><div class="playerNumber">' + player.num + '</span></td>';
    list += '</tr>';
  })
  list += '</table>';
  sectionPlayers.innerHTML = list;
  resultNumber.innerText = nbVisiblePlayers + ' joueur(s) trouvé(s)';
}

function init() {
  buildTable(null, false);
}

// Initialisation
init();


//
