const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
context.strokeStyle = '#55DACA';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 10;

let isDrawing = false;
let direction = true;
let lastX = 0;
let lastY = 0;
let hue = 0;

function toDraw(el) {
  if (!isDrawing) return; // stop - when mouse up
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`; // add stroke style
  context.beginPath(); // begin to draw the path
  context.moveTo(lastX, lastY);   // start
  context.lineTo(el.offsetX, el.offsetY);  // go to
  context.stroke(); // to draw the path
  [lastX, lastY] = [el.offsetX, el.offsetY]; // to define the path

  // Add line width
  hue += 1;
  if (hue >= 360) {
    hue = 0;
  } else if (context.lineWidth >= 50 || context.lineWidth <= 1) {
    direction = !direction;
  } else if (direction) {
    context.lineWidth += 1;
  } else {
    context.lineWidth -= 1;
  }
};

// Add mouse events
canvas.addEventListener('mousedown', (el) => {
  isDrawing = true;
  [lastX, lastY] = [el.offsetX, el.offsetY];
});
canvas.addEventListener('mousemove', toDraw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);