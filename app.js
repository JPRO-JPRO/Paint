
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50; // Adjust for toolbar heig

let drawing = false;
let tool = 'crayon'; // Default tool
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Prevents lines between unconnected points
}

function draw(e) {
  if (!drawing) return;

  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = tool === 'painseau' ? 10 : 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = tool === 'spray' ? 20 : 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearButton.addEventListener('click', clearCanvas);

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'p') tool = 'crayon';
  if (e.key === 'b') tool = 'painseau';
  if (e.key === 's') tool = 'spray';
  if (e.key === 'c') clearCanvas();
});