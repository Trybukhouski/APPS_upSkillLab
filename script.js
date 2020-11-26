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

//Start position
numberInDrop.innerText = 'Lets play';
navigationArea.classList.add('navigation-stop');

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
}


//Play Mode
function playMode() {
  numberInDrop.innerText = '0';
  navigationArea.classList.remove('navigation-stop')
  water.hidden = false;
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
let i = 0;
let operands = ['-', '+', '/', '*'];
let scoreLevel = 0;
let waterLevel = 0;

function result() {

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

// //Time
// fallenDrop.addEventListener('click', dropping);
// function dropping() {
//   let start = Date.now();

//   let timer = setInterval(function () {
//     let timePassed = Date.now() - start;

//     fallenDrop.style.top = timePassed / 600 + 'px';

//     if (timePassed > 6000) clearInterval(timer);

//   }, 1000);
// }