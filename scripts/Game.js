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
    this.snake = new Snake(numRows, numCols, Game.cookieController.getControls());
    this.updateSnakeAndSpotColors(Game.cookieController.getSnakeColor(), Game.cookieController.getSpotColor());

    this.initUI();
    this.listen__death();
    this.listen__fruit();
  }

  initUI() {
    Game.uiController.generateGridCells();
    Game.uiController.drawSnake(this.snake);
    Game.uiController.drawFruit(this.snake.getHead().getX(), this.snake.getHead().getY());
    Game.uiController.initControlButtons(Game.cookieController.getControls());
    Game.uiController.initVolumeSliders(Game.cookieController.getMusicVolume(), Game.cookieController.getEffectsVolume());
    Game.uiController.updateHighscore(Game.cookieController.getHighScore());
  }

  initControllers(numRows, numCols) {
    Game.audioController = new AudioController();
    Game.uiController = new UIController(numRows, numCols);
    Game.cookieController = new CookieController();
  }

  //Game States
  start() {
    if (this.state !== STATE.PAUSED && this.state !== STATE.PLAYING) {
      this.isStarted = true;
      this.setState(STATE.PLAYING);
      Game.audioController.startBackgroundMusic();
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
    Game.uiController.drawSnake(this.snake);
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

    this.snake = new Snake(this.numRows, this.numCols, Game.cookieController.getControls());
    Game.uiController.updateScore(0);
    Game.uiController.updateFruitsCollected(0);
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
    Game.uiController.showGameOver(this.score);
    Game.audioController.startGameOverMusic();
    this.stop();
  }

  //Miscellaneous Functions--------------------------------------
  fruit() {
    Game.audioController.pickup();

    this.incrementScore(FRUIT_VALUE);
    this.incrementFruits(1);

    Game.uiController.drawFruit(this.snake.getHead().getX(), this.snake.getHead().getY());

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

  //AUDIO CONTROLS---------
  setMusicVolume(volume) {
    Game.audioController.setMusicVolume(volume);
    Game.cookieController.setMusicVolume(volume);
  }

  setEffectsVolume(volume) {
    Game.audioController.setEffectsVolume(volume);
    Game.cookieController.setEffectsVolume(volume);
  }

  //SCORING-------------
  incrementScore(increment) {
    this.score += increment;
    Game.uiController.updateScore(this.score);
  }

  incrementFruits(increment) {
    this.fruits += increment;
    Game.uiController.updateFruitsCollected(this.fruits);
  }

  checkNewHighScore() {
    if (this.score > this.highScore) {
      Game.cookieController.setHighScore(this.score);
      Game.uiController.updateHighscore(this.score);
    }
  }

  //LISTENERS----------------
  listen__death() {
    document.addEventListener(
      "died",
      function () {
        this.stop();
        Game.uiController.showGameOver(this, this.score);
        Game.audioController.startGameOverMusic();
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
    Game.uiController.openModal(this, id);
  }

  toggleSettings() {
    Game.uiController.toggleSettings(this);
  }

  updateSnakeAndSpotColors(snakeColor, spotColor) {
    this.updateSnakeColor(snakeColor);
    this.updateSpotColor(spotColor);
  }

  updateSnakeColor(color) {
    Game.uiController.setSnakeBodyColor(color);
    Game.cookieController.setSnakeColor(color);
  }

  updateSpotColor(color) {
    Game.uiController.setSpotColor(color);
    Game.cookieController.setSpotColor(color);
  }

  //SETTERS
  setState(state) {
    this.state = state;
  }

  //KEYBINDS
  recordNextKeypress() {
    document.addEventListener("keydown", this.validateInput);
  }

  validateInput(e) {
    if (Game.isValidKey(e.key)) {
      Game.uiController.displayKey(e.key);
    }
  }

  updateKeybind() {
    let dId = document.querySelector(".modal").dataset.directionId;
    let key = document.querySelector(".key-bind").innerHTML;

    Game.cookieController.updateControl(dId, key);
    this.snake.setControls(Game.cookieController.getControls());
    Game.uiController.closeModal();
    Game.uiController.initControlButtons(Game.cookieController.getControls());
    document.removeEventListener("keydown", this.test);
  }

  static isValidKey(key) {
    let alphaNumeric = /^\w$/;
    let arrows = /Arrow\w{2,5}/;
    if (alphaNumeric.test(key) || arrows.test(key)) return true;
    return false;
  }
}
