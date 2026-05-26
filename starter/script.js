const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");

let gridSize = 16;
let cellSize = 0;
let grid = [];

let currentColor = "#000000";
let currentTool = "pen";
let isDrawing = false;
let hoveredCell = null;

const PRESET_COLORS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#888888",
  "#553322",
  "#ff6688",
  "#88ff66",
  "#6688ff",
  "#ffcc00",
];

// --- Step 1-a: Initialize the grid and canvas ---

function init() {
  for (let i = 0; i<gridSize; i++) {
    grid[i] = Array(gridSize).fill("#ffffff");
  }
  cellSize = Math.floor(480/gridSize);
  canvas.width = cellSize;
  canvas.height = cellSize;
  render();
}

// --- Step 1-b: Render the grid onto the canvas ---

function render() {
  for (let row = 0; row < gridSize;row++) {
    for(let col = 0; col < gridSize; col++) {

      //define the pattern used to fille the rectangle
      ctx.fillStyle = grid[row][col];

      //draw a filled rectangle
      ctx.fillRect(row*cellSize, col*cellSize, cellSize, cellSize);

      //define the color of the outline
      ctx.strokeStyle = "#000000";

      //draw the rectangle outline
      ctx.strokeRect(row*cellSize, col*cellSize, cellSize, cellSize);
    }
  }
  // TODO: Add hover preview
}

// --- Step 2-a: Map mouse position to grid cell ---

function getCellFromMouse(e) {
  
  //size of canvas + its relative position
  let rect = canvas.getBoundingClientRect();

  //we want the position of the mouse according to the canva
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  
  //convert to grid coordinates
  const row = Maths.floor(x/cellSize);
  const col = Maths.floor(y/cellSize);

  if (row>=0 && row<gridSize && col>=0 && col<gridSize) {
    return {row,col};
  }
  return null;
}

// --- Step 2-b: Paint a single cell ---

function paintCell(row, col) {
  grid[row][col] = currentColor;
  render();
}

// --- Step 2-c: Mouse event handlers ---

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const cell = getCellFromMouse(e);
  paintCell(cell.row, cell.col);
});

canvas.addEventListener("mousemove", (e) => {
  const cell = getCellFromMouse(e);
  if (isDrawing) {
    paintCell(cell.row, cell.col);
  }
  render();
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
  render();
});

// --- Step 3: Flood fill algorithm ---

function floodFill(row, col, newColor) {
}

// --- Step 4-a: Build the color palette ---

function buildPalette() {
}

// --- Step 4-b: Custom color picker ---


// --- Step 4-c: Tool button switching ---

buildPalette();

// --- Step 5: Grid size switching ---

// --- Step 6: PNG export ---

// --- Step 7: Start the app! ---

init();
