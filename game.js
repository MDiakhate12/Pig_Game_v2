
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

/*
game
----------------------------------
hide the dice in the begining
initialize all scores to 0
roll the dice 
display current score in red box
----------------------------------


switch player
----------------------------------
switch player if 1 is found
display 0 in previous red box
switch the gray background 
switch the red circle
----------------------------------


hold
----------------------------------
save the score
add the round score to the total score 
update the display of the total score
switch player
----------------------------------
*/
var scores, roundScore, activePlayer, winner, gamePlaying, winningScore , name0, name1, score;






const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
const diceDOM1 = document.querySelector('#dice-1');
const diceDOM2 = document.querySelector('#dice-2');

//hide the dice in the begining
diceDOM1.style.display = 'none';
diceDOM2.style.display = 'none';

//Initialize all variables
startGame();

//roll the dice
btnRoll.addEventListener('click', function () {
    if(gamePlaying){

        //generate random dice number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector('#go').classList.add('hide');
        document.querySelector('#go').classList.remove('show');

        // if (activePlayer != 2) diceDOM.style.display = 'block';
        // if (gamePlaying) diceDOM.style.display = 'block';

        //display the dice
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        
        diceDOM1.classList.remove('bad_dice');
        diceDOM2.classList.remove('bad_dice');    


        //if two six 
        if (dice1 === 6 && dice2 === 6) {
            
            diceDOM1.classList.add('bad_dice');
            diceDOM2.classList.add('bad_dice');

            
            roundScore = 0;

            scores[activePlayer] = 0;
            
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            document.querySelector('#current-'+activePlayer).textContent = roundScore;

            //hide the dice
            
            logs();

            switchPlayer();

        //if the dice is NOT 1
        } else if(dice1 === 1 || dice2 === 1) {

            dice1 === 1 ?   diceDOM1.classList.add('bad_dice') :
            dice2 === 1 ?   diceDOM2.classList.add('bad_dice') :
            
            //reset the round score
            roundScore = 0;

            //display 0 in current red box
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            //hide the dice

            logs();

            switchPlayer();

        } else {

            //update the round score 
            roundScore += dice1 + dice2;

            //display current score in red box
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            logs();   
        }

        function logs() {
            console.log('activePlayer : ' + activePlayer);
            console.log('dice1 : ' + dice1);
            console.log('dice2 : ' + dice2);
            console.log('roundScore : ' + roundScore);
            console.log('score[' + activePlayer + '] : ' + scores[activePlayer]);
        }
    }
});


// hold
btnHold.addEventListener('click', function () {
    if(gamePlaying){
        //add the round score to the total score
        scores[activePlayer] = parseInt(document.querySelector('#score-' + activePlayer).textContent) + roundScore;

        //update the display of the total score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            diceDOM1.style.display = 'none';
            diceDOM2.style.display = 'none';
            winner = activePlayer;
            //activePlayer = 2;
            gamePlaying = false;
            return;
        }

        switchPlayer();

        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
});
 /** */
btnNew.addEventListener('click', startGame);
/**/

function switchPlayer() {
    roundScore = 0;

    document.querySelector('#current-' + activePlayer).textContent = 0;

    //switch player
    activePlayer = 1 - activePlayer;

    //switch the active gray background
    //document.querySelector('.player-' + (1 - activePlayer) + '-panel').classList.remove('active');
    //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function startGame(){
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';

    function get(name){
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
           return decodeURIComponent(name[1]);
     }
    
    name0 = get('name0');
    name1 = get('name1');
    score = get('score');

    if(name0.trim() !== "" && name1.trim() !== "" && name0 && name1) {
        document.querySelector("#name-0").innerHTML = name0;
        document.querySelector("#name-1").innerHTML = name1;
        console.log(name0);
    }

    score ? winningScore = score : winningScore = 30;

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    //initialize all scores to 0
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('#go').classList.remove('hide');
    document.querySelector('#go').classList.add('show');

    //initialize the winner name
    if(winner !== undefined) {
        document.querySelector('.player-'+winner+'-panel').classList.remove('winner');
        document.querySelector('#name-'+winner).textContent = window['name'+winner];
        // document.querySelector('#name-'+winner).textContent = 'player '+(1+winner);
    }
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}