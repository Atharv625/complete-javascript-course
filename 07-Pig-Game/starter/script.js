'use strict';

const score0E1=document.querySelector('#score--0');
const score1E1=document.querySelector('#score--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

score0E1.textContent=0;
score1E1.textContent=0;
diceEl.classList.add('hidden');
let currentScore=0;
btnRoll.addEventListener('click',function(){
    const dice=Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;
    if(dice!==1)
    {
        currentScore+=dice;
        current0El.textContent=currentScore;

    }
    else
    {

    }
})

score0E1.textContent=0;
score1E1.textContent=0;
