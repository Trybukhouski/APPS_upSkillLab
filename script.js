let numbers = document.querySelectorAll('.number');
let displayArea = document.querySelector('.textarea');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.enter');
let numberInDrop = document.querySelector('.drop');
let scoreArea = document.querySelector('.score');
let water = document.querySelector('.water');

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

// +displayArea.value - lastRes === 0 ? scoreLevel += 1 : scoreLevel -= 1;
// scoreArea.value = scoreLevel;
// displayArea.value = "0";
// lastRes = res;