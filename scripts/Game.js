const DEFAULT_GAME_SPEED = 300;
const FRUIT_VALUE = 10;

const STATE = {
  PLAYING: 1,
  ENDED: 2,
  PAUSED: 3,
  NEW: 4,
};
class Game {
  constructor(numRows, numCols) {
    this.gameLoop;
    this.state = STATE.NEW;
    this.isStarted = false;

    this.gameSpeed = 300;
    this.highScore = 0;
    this.score = 0;
    this.fruits = 0;

    this.numRows = numRows;
    this.numCols = numCols;

    this.initControllers(numRows, numCols);
    this.snake = new Snake(numRows, numCols, this.cookieController.getControls());
    this.updateSnakeAndSpotColors(this.cookieController.getSnakeColor(), this.cookieController.getSpotColor());

    this.initUI();
    this.listen__death();
    this.listen__fruit();
  }

  initUI() {
    this.uiController.generateGridCells();
    this.uiController.drawSnake(this.snake);
    this.uiController.drawFruit(this.snake.getHead().getX(), this.snake.getHead().getY());
    this.uiController.initControlButtons(this.cookieController.getControls());
    this.uiController.updateHighscore(this.cookieController.getHighScore());
  }

  initControllers(numRows, numCols) {
    this.audioController = new AudioController();
    this.uiController = new UIController(numRows, numCols);
    this.cookieController = new CookieController();
  }

  //Game States
  start() {
    if (this.state !== STATE.PAUSED && this.state !== STATE.PLAYING) {
      this.isStarted = true;
      this.setState(STATE.PLAYING);
      this.audioController.startBackgroundMusic();
      this.snake.start();
      this.gameLoop = setInterval(() => {
        this.run();
      }, this.gameSpeed);
    }
  }

  stop() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.setState(STATE.ENDED);
    this.isStarted = false;
  }

  run() {
    this.snake.move();
    this.uiController.drawSnake(this.snake);
  }

  pause() {
    clearInterval(this.gameLoop);
    this.setState(STATE.PAUSED);
  }

  restart() {
    this.reset();
    this.start();
  }

  reset() {
    this.gameSpeed = DEFAULT_GAME_SPEED;
    this.score = 0;
    this.fruits = 0;
    this.isStarted = false;

    this.snake = new Snake(this.numRows, this.numCols, this.cookieController.getControls());
    this.uiController.updateScore(0);
    this.uiController.updateFruitsCollected(0);
  }

  resume() {
    if (this.state === STATE.PAUSED && this.isStarted) {
      this.setState(STATE.PLAYING);
      this.gameLoop = setInterval(() => {
        this.run();
      }, this.gameSpeed);
    } else {
      this.setState(STATE.NEW);
    }
  }

  gameOver() {
    this.uiController.showGameOver(this.score);
    this.audioController.startGameOverMusic();
    this.stop();
  }

  //Miscellaneous Functions--------------------------------------
  fruit() {
    this.audioController.pickup();

    this.incrementScore(FRUIT_VALUE);
    this.incrementFruits(1);

    this.uiController.drawFruit(this.snake.getHead().getX(), this.snake.getHead().getY());

    this.updateGamespeed();
    this.checkNewHighScore();
  }

  initLoop() {
    this.gameLoop = setInterval(() => {
      this.run();
    }, this.gameSpeed);
  }

  updateGamespeed() {
    let prevSpeed = this.gameSpeed;
    this.gameSpeed = Math.round(4 / (1 - (74 * Math.exp(-0.0001 * this.score)) / 75));
    if (prevSpeed !== this.gameSpeed) {
      clearInterval(this.gameLoop);
      this.initLoop();
    }
  }

  //SCORING-------------
  incrementScore(increment) {
    this.score += increment;
    this.uiController.updateScore(this.score);
  }

  incrementFruits(increment) {
    this.fruits += increment;
    this.uiController.updateFruitsCollected(this.fruits);
  }

  checkNewHighScore() {
    if (this.score > this.highScore) {
      this.cookieController.setHighScore(this.score);
      this.uiController.updateHighscore(this.score);
    }
  }

  //LISTENERS----------------
  listen__death() {
    document.addEventListener(
      "died",
      function () {
        this.stop();
        this.uiController.showGameOver(this, this.score);
        this.audioController.startGameOverMusic();
      }.bind(this)
    );
  }

  listen__fruit() {
    document.addEventListener(
      "fruit",
      function () {
        this.fruit();
      }.bind(this)
    );
  }

  //UI STUFF

  recordKeybind(id) {
    this.uiController.openModal(this, id);
  }

  toggleSettings() {
    this.uiController.toggleSettings(this);
  }

  updateSnakeAndSpotColors(snakeColor, spotColor) {
    this.updateSnakeColor(snakeColor);
    this.updateSpotColor(spotColor);
  }

  updateSnakeColor(color) {
    this.uiController.setSnakeBodyColor(color);
    this.cookieController.setSnakeColor(color);
  }

  updateSpotColor(color) {
    this.uiController.setSpotColor(color);
    this.cookieController.setSpotColor(color);
  }

  //SETTERS
  setState(state) {
    this.state = state;
  }

  //KEYBINDS
  recordNextKeypress() {
    document.addEventListener("keydown", this.test);
  }

  test(e) {
    if (game.isValidKey(e.key)) {
      game.uiController.displayKey(e.key);
    }
  }

  updateKeybind() {
    let dId = document.querySelector(".modal").dataset.directionId;
    let key = document.querySelector(".key-bind").innerHTML;

    this.cookieController.updateControl(dId, key);
    this.snake.setControls(this.cookieController.getControls());
    this.uiController.closeModal();
    this.uiController.initControlButtons(this.cookieController.getControls());
    document.removeEventListener("keydown", this.test);
  }

  static isValidKey(key) {
    let alphaNumeric = /^\w$/;
    let arrows = /Arrow\w{2,5}/;
    if (alphaNumeric.test(key) || arrows.test(key)) return true;
    return false;
  }
}
