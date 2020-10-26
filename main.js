const numbers = document.querySelectorAll(".number"),
  operations = document.querySelectorAll(".operation"),
  decimalBtn = document.getElementById("decimal"),
  clearBtns = document.querySelectorAll(".clear-Btn"),
  resultBtn = document.getElementById("result"),
  display = document.getElementById("display");
let memoryCurrentNumber = 0,
  memoryNewNumber = false,
  memoryPendingOperation = "";

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
};

for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operation(e.target.textContent);
  });
};

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.target.id);
  });
};

resultBtn.addEventListener("click", result);

decimalBtn.addEventListener("click", decimal);

function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    };
  };
};

function operation(op) {
  let localOperationmemory = display.value
  if (memoryNewNumber && memoryPendingOperation !== "=") {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === "+") {
      memoryCurrentNumber += parseFloat(localOperationmemory);
    } else if (memoryPendingOperation === "-") {
      memoryCurrentNumber -= parseFloat(localOperationmemory);
    } else if (memoryPendingOperation === "*") {
      memoryCurrentNumber *= parseFloat(localOperationmemory);
    } else if (memoryPendingOperation === "/") {
      memoryCurrentNumber /= parseFloat(localOperationmemory);
    } else {
      memoryCurrentNumber = parseFloat(localOperationmemory);
    };
    display.value = memoryCurrentNumber;
    memoryPendingOperation = op;
  };
};

function decimal() {
  let localDecimalMemory = display.value;
  if (memoryNewNumber) {
    localDecimalMemory = "0.";
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    };
  };
  display.value = localDecimalMemory;
};

function clear(id) {
  if (id === "ce") {
    display.value = "0";
    memoryNewNumber = true;
  } else if (id === "c") {
    display.value = "0";
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = "";
  };
};