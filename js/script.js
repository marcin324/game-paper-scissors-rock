'use strict';

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

newGameButton.addEventListener('click', newGame);

closeButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
modal.addEventListener('click', function (event) {
    event.stopPropagation();
});

for (var i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', function (e) {
        checkWinner(e.target.getAttribute('data-move'))
    })
};

var params = {
    player: {
        score: 0
    },
    computer: {
        score: 0
    },
    roundNumber: 0,
    round: 0,
    progress: []
};

var table = {
    tableRound: params.round,
    tablePlayer: playerPick,
    tableComputer: computerPick,
    tableScore: params.player.score + ' - ' + params.computer.score
};

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

function hideModal() {
    overlay.classList.remove('show');
    params.progress = [];
    modalTable.innerHTML = '';
};

function newGame() {
    params.roundNumber = window.prompt('Podaj liczbę wygranych rund, po której kończy się gra');
    if (params.roundNumber <= 0 || !params.roundNumber) {
        alert('nieprawidłowa wartość')
        return params.roundNumber
    }

    for (var i = 0; i < gameBtns.length; i++) {
        gameBtns[i].style.display = 'inline-block';
    };

    newGameButton.style.display = 'none';

    log(roundNmb, 'GRA KOŃCZY SIĘ PO ' + params.roundNumber + ' ZWYCIĘSKICH RUNDACH')

};

function endOfTheGame() {
    if (params.player.score == params.roundNumber || params.computer.score == params.roundNumber) {
        if (params.player.score == params.roundNumber) {
            setTimeout(function () {
                modalContent.innerHTML = 'Wygrałeś! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
                params.round = 0;
            }, 500)
        } else {
            setTimeout(function () {
                modalContent.innerHTML = 'Komputer wygrał! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
                params.round = 0;
            }, 500)
        }

        gameResult.innerHTML = '';
        gameOutput.innerHTML = '';
        roundNmb.innerHTML = '';


        for (var i = 0; i < gameBtns.length; i++) {
            gameBtns[i].style.display = 'none';
        }

        newGameButton.style.display = 'inline-block';

        overlay.classList.add('show');
        modal.classList.add('show');
    };
};

function checkWinner(playerPick) {
    var computerPick = randomChoice();
    var output = 'Twój wybór: ' + playerPick + '. Wybór komputera: ' + computerPick + '.<br>';

    if ((playerPick == 'paper' && computerPick == 'rock') ||
        (playerPick == 'rock' && computerPick == 'scissors') ||
        (playerPick == 'scissors' && computerPick == 'paper')) {
        output += 'Wygrałeś!';
        params.player.score++;
        params.round++;
    } else if (playerPick == computerPick) {
        output += 'Remis!';
        params.round++;
    } else {
        output += 'Komputer wygrał!';
        params.computer.score++;
        params.round++;
    }

    log(gameOutput, output);
    setGamePoints();
    endOfTheGame();
};