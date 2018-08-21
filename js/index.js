'use strict';

/* REFERENCJE DO HTML*/

var paperButton = document.getElementById('paper');
var rockButton = document.getElementById('rock');
var scissorsButton = document.getElementById('scissors');
var gameResult = document.getElementById('result');
var gameOutput = document.getElementById('output');
var roundNmb = document.getElementById('roundNmb');
var newGameButton = document.getElementById('new-game');
var gameButtons = document.querySelectorAll('.btn');


/* NASŁUCHIWACZE */

paperButton.addEventListener('click', function (){checkWinner('paper')});
rockButton.addEventListener('click', function (){checkWinner('rock')});
scissorsButton.addEventListener('click', function (){checkWinner('scissors')});
newGameButton.addEventListener('click', newGame);

/* OBIEKTY */

var player = {score: 0};
var computer = {score: 0};
var roundNumber = 0;

function log(elem, text){
    elem.innerHTML = text + '<br><br>';
};


function randomChoice(){
    var choices = ['paper', 'rock', 'scissors'];
    return choices[Math.round(Math.random() * 2)];
};

function setGamePoints(){
    log(gameResult, 'GRACZ: ' + player.score + '-' + computer.score + ' :KOMPUTER');
    log(roundNmb, 'GRA KOŃCZY SIĘ PO ' + roundNumber + ' ZWYCIĘSKICH RUNDACH')
};


/* ROZPOCZĘCIE GRY */
function newGame(){
    roundNumber = window.prompt('Podaj liczbę wygranych rund, po której kończy się gra');
    
    for(var i = 0; i < gameButtons.length; i++){
        gameButtons[i].style.display = 'inline-block';
    };
  
    newGameButton.style.display = 'none';
};

/* KONIEC GRY */

function endOfTheGame(){
    if (player.score == roundNumber  || computer.score == roundNumber ){
        if (player.score == roundNumber){
            setTimeout(function(){
                alert('Wygrałeś! Koniec gry! Wynik: ' + player.score + '-' + computer.score);
                player.score = 0;
                computer.score = 0;
            }, 500)
        }
        else {
            setTimeout(function(){
                alert('Komputer wygrał! Koniec gry! Wynik: ' + player.score + '-' + computer.score);
                player.score = 0;
                computer.score = 0;
            }, 500)
        }
       
        gameResult.innerHTML = '';
        gameOutput.innerHTML = '';
        roundNmb.innerHTML = '';
    
        for(var i = 0; i < gameButtons.length; i++){
            gameButtons[i].style.display = 'none';
        }
    
        newGameButton.style.display = 'inline-block';
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
            player.score++;
    }
  
    else if (playerPick == computerPick) {
        output += 'Remis!';
    }
  
    else {
        output += 'Komputer wygrał!';
        computer.score++;
    }
  
    log(gameOutput, output);
    setGamePoints();
    endOfTheGame();
}