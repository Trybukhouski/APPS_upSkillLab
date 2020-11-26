let numbers = document.querySelectorAll('.number');
let displayArea = document.querySelector('.textarea');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.enter');
let numberInDrop = document.querySelector('.drop');
let scoreArea = document.querySelector('.score');

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
let i = 0;
let operands = ['-', '+', '/', '*'];

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

  // Score level
  + displayArea.value - numberInDrop.innerText === 0 ? plus() : minus();
  displayArea.value = "0";
  function plus() {
    scoreArea.innerText = '+';
  }
  function minus() {
    scoreArea.innerText = '-';
  }
}

