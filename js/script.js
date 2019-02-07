'use strict';

/* REFERENCJE DO HTML*/

var paperButton = document.getElementById('paper');
var rockButton = document.getElementById('rock');
var scissorsButton = document.getElementById('scissors');
var gameResult = document.getElementById('result');
var gameOutput = document.getElementById('output');
var roundNmb = document.getElementById('roundNmb');
var newGameButton = document.getElementById('new-game');
var gameBtns = document.querySelectorAll('.btn');
var gameButtons = document.querySelectorAll('.player-move');
var modal = document.querySelector('.modal');
var modalContent = document.querySelector('.modal .content');
var overlay = document.getElementById('modal-overlay');
var closeButton = document.querySelector('.modal .close');
var modalTable = document.getElementById('modal-table');



/* NASŁUCHIWACZE */

newGameButton.addEventListener('click', newGame);

/* Nasłuchiwacze do modala kończącego grę */

closeButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
modal.addEventListener('click', function (event) {
    event.stopPropagation();
});


/* Pętla przechodząca przez wszystkie elementy z klasą 'player-move' (buttony) i przywiązująca do każdego przycisku funkcję wywołującą 
funkcję checkWinner,której argumentem jest odpowiednia wartość atrybutu 'data-move' wybrana za pomocą metody 'getAttribute' */

for (var i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', function (e) {
        checkWinner(e.target.getAttribute('data-move'))
    })
};

/* OBIEKTY */

var params = {
    player: {
        score: 0
    },
    computer: {
        score: 0
    },
    roundNumber: 0,
    round: 0, // Numer kolejnej rundy
    progress: [] // Tu dodaję pustą tablicę
};

var table = {
    tableRound: params.round,
    tablePlayer: playerPick,
    tableComputer: computerPick,
    tableScore: params.player.score + ' - ' + params.computer.score
};

/* FUNKCJE */

function log(elem, text) {
    elem.innerHTML = text + '<br><br>';
};


function randomChoice() {
    var choices = ['paper', 'rock', 'scissors'];
    return choices[Math.round(Math.random() * 2)];
};

function setGamePoints() {
    log(gameResult, 'GRACZ: ' + params.player.score + '-' + params.computer.score + ' :KOMPUTER')
};

/*Funkcja zamykająca modal*/

function hideModal() {
    overlay.classList.remove('show');
    params.progress = []; // Czyszczenie tablicy
    modalTable.innerHTML = ''; // Czyszczenie tabeli
};


/* ROZPOCZĘCIE GRY */

function newGame() {
    params.roundNumber = window.prompt('Podaj liczbę wygranych rund, po której kończy się gra');

    for (var i = 0; i < gameBtns.length; i++) {
        gameBtns[i].style.display = 'inline-block';
    };

    newGameButton.style.display = 'none';

    log(roundNmb, 'GRA KOŃCZY SIĘ PO ' + params.roundNumber + ' ZWYCIĘSKICH RUNDACH')
};

/* KONIEC GRY */

function endOfTheGame() {
    if (params.player.score == params.roundNumber || params.computer.score == params.roundNumber) {
        if (params.player.score == params.roundNumber) {
            setTimeout(function () {
                modalContent.innerHTML = 'Wygrałeś! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
                params.round = 0; // zerowanie licznika rund po skończonej grze
            }, 500)
        } else {
            setTimeout(function () {
                modalContent.innerHTML = 'Komputer wygrał! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
                params.round = 0; // zerowanie licznika rund po skończonej grze
            }, 500)
        }

        gameResult.innerHTML = '';
        gameOutput.innerHTML = '';
        roundNmb.innerHTML = '';


        for (var i = 0; i < gameBtns.length; i++) {
            gameBtns[i].style.display = 'none';
        }

        newGameButton.style.display = 'inline-block';

        overlay.classList.add('show'); // Po skończeniu gry pojawia sie modal
        modal.classList.add('show');

        /* Dane z tablicy params.progress wstawiam do modala */

        var resultTable = document.createElement('table');

        for (var i = 0; i < params.progress.length; i++) {
            resultTable.innerHTML += '<strong>Numer rundy: </strong>' + params.progress[i].tableRound + ', <strong>Wybór gracza: </strong>' +
                params.progress[i].tablePlayer + ', <strong>Wybór komputera: </strong>' + params.progress[i].tableComputer +
                ', <strong>Wynik rozgrywki: </strong>' + params.progress[i].tableScore + '<br>'
        };

        modalTable.appendChild(resultTable);
    };
};

/* SPRAWDZANIE, KTO WYGRAŁ RUNDĘ GRY */

function checkWinner(playerPick) {
    var computerPick = randomChoice();
    var output = 'Twój wybór: ' + playerPick + '. Wybór komputera: ' + computerPick + '.<br>';

    if ((playerPick == 'paper' && computerPick == 'rock') ||
        (playerPick == 'rock' && computerPick == 'scissors') ||
        (playerPick == 'scissors' && computerPick == 'paper')) {
        output += 'Wygrałeś!';
        params.player.score++;
        params.round++; // Licznik kolejnej rundy
    } else if (playerPick == computerPick) {
        output += 'Remis!';
        params.round++; // Licznik kolejnej rundy
    } else {
        output += 'Komputer wygrał!';
        params.computer.score++;
        params.round++; // Licznik kolejnej rundy
    }

    /* Obiekt z danymi do tablicy: numer kolejnej rundy, wybór gracza, wybór komputera i bieżący wynik gry */

    var table = {
        tableRound: params.round,
        tablePlayer: playerPick,
        tableComputer: computerPick,
        tableScore: params.player.score + ' - ' + params.computer.score
    };

    params.progress.push(table); // Obiekt 'table' wstawiany do tablicy

    log(gameOutput, output);
    setGamePoints();
    endOfTheGame();
}