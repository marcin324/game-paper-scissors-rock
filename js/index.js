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



/* NASŁUCHIWACZE */

newGameButton.addEventListener('click', newGame);

/* Nasłuchiwacze do modala kończącego grę */
closeButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
modal.addEventListener('click', function(event){
    event.stopPropagation();
});


/* Pętla przechodząca przez wszystkie elementy z klasą 'player-move' (guziki); potem w zmiennej 'dataMove' zapisywana jest wartość atrybutu
'data-move' za pomocą 'getAttribute'; potem guzik przypisany jest do funkcji checkWinner z argumentem dataMove, tzn. argumentem jest wartość
atrybutu 'data-move' */
for(var i = 0; i < gameButtons.length; i++){
    var dataMove = gameButtons[i].getAttribute('data-move');
    gameButtons[i].addEventListener('click', function(){
        checkWinner(dataMove)
    })
};

/* OBIEKTY */

var params = {
    player: {score: 0},
    computer: {score: 0},
    roundNumber: 0,
};

/* FUNKCJE */

function log(elem, text){
    elem.innerHTML = text + '<br><br>';
};


function randomChoice(){
    var choices = ['paper', 'rock', 'scissors'];
    return choices[Math.round(Math.random() * 2)];
};

function setGamePoints(){
    log(gameResult, 'GRACZ: ' + params.player.score + '-' + params.computer.score + ' :KOMPUTER')
};

/*Funkcja zamykająca modal*/

function hideModal(){
    overlay.classList.remove('show')
};


/* ROZPOCZĘCIE GRY */

function newGame(){
    params.roundNumber = window.prompt('Podaj liczbę wygranych rund, po której kończy się gra');
    
    for(var i = 0; i < gameBtns.length; i++){
        gameBtns[i].style.display = 'inline-block';
    };
  
    newGameButton.style.display = 'none';

    log(roundNmb, 'GRA KOŃCZY SIĘ PO ' + params.roundNumber + ' ZWYCIĘSKICH RUNDACH')
};

/* KONIEC GRY */

function endOfTheGame(){
    if (params.player.score == params.roundNumber || params.computer.score == params.roundNumber ){
        if (params.player.score == params.roundNumber){
            setTimeout(function(){
                modalContent.innerHTML = 'Wygrałeś! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
            }, 500)
        }
        else {
            setTimeout(function(){
                modalContent.innerHTML = 'Komputer wygrał! Wynik: ' + params.player.score + '-' + params.computer.score;
                params.player.score = 0;
                params.computer.score = 0;
            }, 500)
        }
       
        gameResult.innerHTML = '';
        gameOutput.innerHTML = '';
        roundNmb.innerHTML = '';
        
        
        for(var i = 0; i < gameBtns.length; i++){
            gameBtns[i].style.display = 'none';
        }
    
        newGameButton.style.display = 'inline-block';
        
        overlay.classList.add('show'); // Po skończeniu gry pojawia sie modal
    }; 
};

/* SPRAWDZANIE, KTO WYGRAŁ RUNDĘ GRY */

function checkWinner(playerPick){
    var computerPick = randomChoice();
    var output = 'Twój wybór: ' + playerPick + '. Wybór komputera: ' + computerPick + '.<br>';
  
    if  ((playerPick == 'paper' && computerPick == 'rock') ||
        (playerPick == 'rock' && computerPick == 'scissors') ||
        (playerPick == 'scissors' && computerPick == 'paper')) {
            output += 'Wygrałeś!';
            params.player.score++;
    }
  
    else if (playerPick == computerPick) {
        output += 'Remis!';
    }
  
    else {
        output += 'Komputer wygrał!';
        params.computer.score++;
    }

    log(gameOutput, output);
    setGamePoints();
    endOfTheGame();
}