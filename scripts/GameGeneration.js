let snake;
let gameLoop;
let ui;
let ac;
let cc;

let score = 0;
let fruitsCollected = 0;
let highscore = 0;
let gameSpeed = 300;

let numRows = 25;
let numCols = 25;

window.onload = () => {
  initControllers();
  initCustomColors();
  initSnake();
  ui.generateGridCells(numRows, numCols);
  ui.drawSnake(snake);
  ui.drawFruit();
  initHighscore();
};

// document.addEventListener("keydown", function (e) {
//   if (e.key === "Enter") {
//     resetGame();
//     startGame();
//   }
// });

function initCustomColors() {
  let snake = cc.getSnakeColor();
  let spot = cc.getSpotColor();
  document.documentElement.style.setProperty("--snake-body", snake);
  document.documentElement.style.setProperty("--spot-color", spot);

  document.getElementById("snakeBodyColorSelector").value = snake !== null ? snake : getComputedStyle(document.documentElement).getPropertyValue("--snake-body").trim();
  document.getElementById("spotColorSelector").value = spot !== null ? spot : getComputedStyle(document.documentElement).getPropertyValue("--spot-color").trim();
}

function updateSnakeColor(color) {
  cc.setSnakeColor(color);
  document.documentElement.style.setProperty("--snake-body", cc.getSnakeColor());
}

function updateSpotColor(color) {
  cc.setSpotColor(color);
  document.documentElement.style.setProperty("--spot-color", cc.getSpotColor());
}

function initControllers() {
  cc = new CookieController();
  ui = new UIController(numRows, numCols);
  ac = new AudioController();
}

function startGame() {
  if (!gameLoop) {
    ac.startBackgroundMusic();
    snake.startSnakeControls();
    gameLoop = setInterval(() => {
      runGame();
    }, gameSpeed);
  }
}

function stopGame() {
  clearInterval(gameLoop);
  gameLoop = null;
}

function pauseGame() {
  clearInterval(gameLoop);
}

function unpauseGame() {
  gameLoop = setInterval(() => {
    runGame();
  }, gameSpeed);
}

function restartGame() {
  stopGame();
  resetGame();
  startGame();
}

function resetGame() {
  stopGame();
  initSnake();
  ui.drawFruit();
  gameSpeed = 300;
  score = 0;
  fruitsCollected = 0;
  ui.updateScore(score);
  ui.updateFruitsCollected(fruitsCollected);
}

function runGame() {
  snake.move();
  ui.drawSnake(snake);
}

function initSnake() {
  snake = new Snake(numRows, numCols, cc.getControls());
  detectSnakeDeath();
  detectFruitEaten();
}

function initHighscore() {
  highscore = cc.getHighScore();
  ui.updateHighscore(highscore);
}

function detectSnakeDeath() {
  document.addEventListener("died", () => {
    ui.showGameOver(score);
    ac.startGameOverMusic();
    stopGame();
  });
}

function detectFruitEaten() {
  document.addEventListener("fruit", () => {
    ac.itemPickupSound();
    increaseScore(10);
    updateGameSpeed();
    increaseFruitsCollected(1);
  });
}

function updateGameSpeed() {
  let prevSpeed = gameSpeed;
  gameSpeed = Math.round(4 / (1 - (74 * Math.exp(-0.0001 * score)) / 75));
  if (prevSpeed !== gameSpeed) {
    clearInterval(gameLoop);
    gameLoop = null;
    startGame();
  }
}

function checkNewHighscore() {
  if (score > highscore) {
    cc.setHighScore(score);
    ui.updateHighscore(score);
  }
}

function increaseScore(increase) {
  score += increase;
  ui.updateScore(score);
  checkNewHighscore();
}

function increaseFruitsCollected(increase) {
  fruitsCollected += increase;
  ui.updateFruitsCollected(fruitsCollected);
  ui.drawFruit();
}

function recordKeybind(directionId) {
  ui.openModal(directionId);
}
