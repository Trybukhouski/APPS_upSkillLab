let navigationArea = document.querySelector('.navigation')
let numbers = document.querySelectorAll('.number');
let displayArea = document.querySelector('.textarea');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.enter');
let numberInDrop = document.querySelector('.drop');
let scoreArea = document.querySelector('.score');
let water = document.querySelector('.water');
let playBtn = document.querySelector('.play');
let fallenDrop = document.querySelector('.fallen-drop');
let gameScreen = document.querySelector('.game-screen');
let header = document.querySelector('.header');
let countdown = document.querySelector('.countdown');

//Start position
numberInDrop.innerText = 'Lets play';
navigationArea.classList.add('navigation-stop');
fallenDrop.hidden = true;

//Mode Select
playBtn.addEventListener('click', gameMode);

function gameMode() {
  playBtn.innerText === '►' ? playBtn.innerText = '❙❙' : playBtn.innerText = '►';
  playBtn.innerText === '►' ? stopMode() : playMode();
}

//Stop Mode
function stopMode() {

  numberInDrop.innerText = 'Lets play';
  navigationArea.classList.add('navigation-stop');
  scoreArea.value = '';
  water.hidden = true;
  fallenDrop.hidden = true;
}


//Play Mode
function playMode() {
  // dropping()
  numberInDrop.innerText = '0';
  navigationArea.classList.remove('navigation-stop')
  water.hidden = false;
  fallenDrop.hidden = false;
  return result();
}

//Add numbers input
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function (a) {
    display(a.target.textContent);
  });
};

function display(number) {
  displayArea.value === "0" ? displayArea.value = number : displayArea.value += number;
};

//Add clear button
clearBtn.addEventListener('click', letClear);
function letClear() {
  displayArea.value = "0";
}

//Add result check
enterBtn.addEventListener('click', result);

//Add drop tack
let lastRes = 0;
let operands = ['-', '+', '/', '*'];
let scoreLevel = 0;
let waterLevel = 0;
let i = 0;

function result() {
  //Timer
  let timer;
  let x = 10;
  function letCountdown() {
    countdown.innerHTML = x;
    x--;
    if (x < 0) {
      countdown.innerHTML = 'Time out';
    }
    else {
      timer = setTimeout(letCountdown, 1000);
    }
  }
  letCountdown()


  //Task change
  let res = Math.round(Math.random(0, 1) * 100);
  let a = res / 2;

  i < operands.length - 1 ? i++ : i = 0;

  function taskInDrop() {
    switch (operands[i]) {
      case '-': return `${res + a} - ${a}`;
      case '+': return `${res - a} + ${a}`;
      case '/': return `${res * a} / ${a}`;
      case '*': return `${res / a} * ${a}`;
    }
  }

  numberInDrop.innerText = taskInDrop();
  console.log(res);

  // Score level & Water level
  if (+displayArea.value - lastRes === 0) {
    scoreLevel += 1;
    waterLevel;
  } else {
    scoreLevel -= 1;
    waterLevel += 10;
  }
  scoreArea.value = scoreLevel;
  displayArea.value = "0";
  lastRes = res;

  water.style.cssText = `height: ${waterLevel}px`;
}

