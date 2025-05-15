'use strict';
const player0E1=document.querySelector('.player--0');
const player1E1=document.querySelector('.player--1');

const score0E1=document.querySelector('#score--0');
const score1E1=document.querySelector('#score--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const switchPlayer=function()
{
    document.getElementById(`current--${activePlayer}`).textContent=0;
        activePlayer=activePlayer===0? 1:0;
         currentScore=0;
        player0E1.classList.toggle('player--active');
        player1E1.classList.toggle('player--active');
};
score0E1.textContent=0;
score1E1.textContent=0;
diceEl.classList.add('hidden');
const scores=[0,0];
let currentScore=0;
let activePlayer=0;
let playing=true;

btnRoll.addEventListener('click',function(){
    if(playing){
    const dice=Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;
    if(dice!==1)
    {
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore
       

    }
    else
    {    

        switchPlayer();
    }
    }
});

// score0E1.textContent=0;
// score1E1.textContent=0;


btnHold.addEventListener('click',function(){
    if(playing){
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=
    scores[activePlayer];
    if(scores[activePlayer]>=100)
    { playing=false;
        diceEl.remove();
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
       

    }
    else{
     switchPlayer();}
    }
});
btnNew.addEventListener('click', function () {
  // Reset game state
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;

  score0E1.textContent = 0;
  score1E1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0E1.classList.remove('player--winner');
  player1E1.classList.remove('player--winner');
  player0E1.classList.add('player--active');
  player1E1.classList.remove('player--active');
});


