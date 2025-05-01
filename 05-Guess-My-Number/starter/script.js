'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = "Please input Number ❌❌";
  } else if (guess === number) {
    document.querySelector(".number").textContent = number;
    document.querySelector('.message').textContent = "🔥🔥 Correct Number!";
    document.querySelector('.highscore').textContent = score;
    document.body.style.backgroundColor = "#42f545";
  } else if (guess < number) {
    if (score > 1) {
      document.querySelector('.message').textContent = "Too Low 📉";
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = "You Lose 😒";
      document.querySelector('.score').textContent = 0;
      document.body.style.backgroundColor = "#f5425a";
    }
  } else {
    if (score > 1) {
      document.querySelector('.message').textContent = "Too High 📉";
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = "You Lose 😒";
      document.querySelector('.score').textContent = 0;
      document.body.style.backgroundColor = "#f5425a";
    }
  }

  
});

  // Trigger "Check" button when Enter is pressed
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      document.querySelector('.check').click();
    }
  });

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.body.style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});


  // Trigger "Check" button when Enter is pressed
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelector('.again').click();
    }
  });