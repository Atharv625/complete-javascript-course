'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent="correct Number🔥";


// document.querySelector(".number").textContent=13;
// document.querySelector('.score').textContent=20;

// document.querySelector(".guess").value=52;


document.querySelector('.check').addEventListener('click',function(){
 const guess=Number(document.querySelector('.guess').value);
    // document.querySelector('.message').textContent="correct Number🔥";

    console.log(guess,typeof guess);
    if(!guess){
        document.querySelector('.message').textContent="Please input Number ❌❌"
    }

});