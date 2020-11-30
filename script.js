let navigationArea = document.querySelector('.navigation')
let numbers = document.querySelectorAll('.number');
let displayArea = document.querySelector('.textarea');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.enter');
let task = document.querySelector('.drop');
let scoreArea = document.querySelector('.score');
let water = document.querySelector('.water');
let playBtn = document.querySelector('.play');
let fallenDrop = document.querySelector('.fallen-drop');
let gameScreen = document.querySelector('.game-screen');
let header = document.querySelector('.header');
let countdown = document.querySelector('.countdown');
let operationType = document.querySelector('.operation-type');
let audioAuto = document.querySelector('.backgroundMusic');
let audioSuccess = document.querySelector('.success');
let audioFail = document.querySelector('.fail');

//Keyboard and Display
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function (a) {
    display(a.target.textContent);
  });
};
function display(number) {
  displayArea.value === "0" ? displayArea.value = number : displayArea.value += number;
};

//Start position
task.innerText = 'Lets play';
navigationArea.classList.add('navigation-stop');
fallenDrop.hidden = true;
operationType.hidden = true;
countdown.hidden = true;


//Memory
let lastTaskRes = 0;
let ErrorReserve = 3;
let waterLevel = 0;
let scoreLevel = 0;
let gameOver = false;
let indexOfOperandsArr = 0;
let arithmeticProgressionNumber = 1;

//Mode Select
playBtn.addEventListener('click', gameMode);
function gameMode() {
  playBtn.innerText === '►' ? playBtn.innerText = '❙❙' : playBtn.innerText = '►';
  playBtn.innerText === '►' ? stopMode() : playMode();
}


//Stop Mode
function stopMode() {
  audioAuto.pause();
  task.innerText = 'Lets play';
  navigationArea.classList.add('navigation-stop');
  water.hidden = true;
  fallenDrop.hidden = true;
  countdown.hidden = true;
  operationType.hidden = true;
  scoreLevel = 0;
  scoreArea.value = scoreLevel;
  ErrorReserve = 3;
}

//Play Mode
function playMode() {
  audioAuto.play();
  task.innerText = '0';
  navigationArea.classList.remove('navigation-stop')
  water.hidden = false;
  fallenDrop.hidden = false;
  countdown.hidden = false;
  operationType.hidden = false;
  // scoreLevel = 0;
  // scoreArea.value = scoreLevel;
  return result;
}

//Add clear button
clearBtn.addEventListener('click', letClear);
function letClear() {
  displayArea.value = "0";
}

//Add result check
enterBtn.addEventListener('click', result);


function result() {

  // RANDOM TASK

  let operands = ['-', '+', '/', '*'];
  function highLevel() {
    let high = 10;
    if (scoreLevel <= 0) {
      high = 10;
    } else if (scoreLevel <= 10) {
      high = 100;
    } else if (scoreLevel <= 20) {
      high = 1000;
    } else if (scoreLevel <= 30) {
      high = 10000;
    };
    return high;
  }
  let newTaskRes = Math.round(Math.random(0, 1) * highLevel());
  let a = newTaskRes / 2;
  indexOfOperandsArr < operands.length - 1 ? indexOfOperandsArr++ : indexOfOperandsArr = 0;
  function RandomTask() {
    switch (operands[indexOfOperandsArr]) {
      case '-': return `${newTaskRes + a} - ${a}`;
      case '+': return `${newTaskRes - a} + ${a}`;
      case '/': return `${newTaskRes * a} / ${a}`;
      case '*': return `${newTaskRes / a} * ${a}`;
    }
  }

  // OPERATION TYPE
  function showOperationType() {
    switch (operands[indexOfOperandsArr]) {
      case '-': return 'subtraction operation:';
      case '+': return 'addition operation:';
      case '/': return 'division operation:';
      case '*': return 'multiplication operation:';
    }
  }

  // STATUS CHECK

  //    Game Over?
  ErrorReserve === 0 ? gameOver = true : gameOver = false;

  // MAIN SCREEN

  //    Countdown screen
  gameOver === true ? countdown.innerText = `Result: ${scoreLevel}` : console.log('Play');
  //    Task screen
  gameOver === true ? task.innerText = `Game over` : task.innerText = RandomTask();
  console.log(newTaskRes);
  //    Operation type
  gameOver === true ? operationType.innerText = '' : operationType.innerText = showOperationType();
  //    Navigation
  gameOver === true ? navigationArea.classList.add('navigation-stop') : navigationArea.classList.remove('navigation-stop');


  //    Timer

  // let timer;
  // let x = 10;
  // function letCountdown() {
  //   countdown.innerHTML = x;
  //   x--;
  //   if (x < 0) {
  //     countdown.innerHTML = 'Time out';
  //   } else if (+displayArea.value - lastTaskRes === 0) {
  //     countdown.innerHTML = '';
  //   } else {
  //     timer = setTimeout(letCountdown, 1000);
  //   }
  // }
  // letCountdown()

  // SCORE AND WATER LEVELS
  function arithmeticProgression() {
    arithmeticProgressionNumber += 1;
    return arithmeticProgressionNumber;
  }
  if (+displayArea.value - lastTaskRes === 0) {
    audioSuccess.play();
    scoreLevel += arithmeticProgression();
    waterLevel;
    ErrorReserve = ErrorReserve;
  } else {
    audioFail.play();
    scoreLevel -= 1;
    waterLevel += 10;
    ErrorReserve -= 1;
  }
  scoreArea.value = scoreLevel;
  displayArea.value = "0";
  lastTaskRes = newTaskRes;

  water.style.cssText = `height: ${waterLevel}px`;
  ;
}

