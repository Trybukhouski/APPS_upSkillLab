const canvas = document.querySelector('#draw');
const color = document.getElementById('color');
const size = document.getElementById('size');
const del = document.getElementById('delete');
const controlPanel = document.querySelector('.control-panel');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - controlPanel.offsetHeight;
const context = canvas.getContext('2d');
context.strokeStyle = color.value;
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = size.value;

// Add Actual Settings
function addActualColor() {
  context.strokeStyle = this.value;
}
function addActualSize() {
  context.lineWidth = this.value;
}

// Add Drawing line
let isDrawing = false;
let lastX = 0;
let lastY = 0;
function toDraw(el) {
  if (!isDrawing) return; // stop - when mouse up
  context.beginPath(); // begin to draw the path
  context.moveTo(lastX, lastY);   // start
  context.lineTo(el.offsetX, el.offsetY);  // go to
  context.stroke(); // to draw the path
  [lastX, lastY] = [el.offsetX, el.offsetY]; // to define the path
}

// Add mouse events for drawing tools panel
color.addEventListener("blur", addActualColor);
size.addEventListener('mousemove', addActualSize);
del.addEventListener('click', () => context.clearRect(0, 0, canvas.width, canvas.height))

// Add mouse events for drawing
canvas.addEventListener('mousedown', (el) => {
  isDrawing = true;
  [lastX, lastY] = [el.offsetX, el.offsetY];
});
canvas.addEventListener('mousemove', toDraw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);