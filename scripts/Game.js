class Game {
  constructor(numRows, numCols) {
    const DEFAULT_GAME_SPEED = 300;
    const FRUIT_VALUE = 10;

    this.gameLoop;
    this.isExecuting = false;

    this.gameSpeed = 300;
    this.highScore = 0;
    this.score = 0;
    this.fruits = 0;

    this.numRows = numRows;
    this.numCols = numCols;

    this.audioController = new AudioController();
    this.uiController = new UIController();
    this.cookieController = new CookieController();
    this.snake = new Snake(numRows, numCols, this.cookieController.getControls());

    this.uiController.generateGridCells(numRows, numCols);
    this.uiController.drawSnake(this.snake);
    this.uiController.drawFruit();
  }

  start() {
    if (!this.isExecuting) {
      this.isExecuting = true;
      this.audioController.startBackgroundMusic();
      this.snake.start();
      gameLoop = setInterval(() => {
        this.run();
      }, gameSpeed);
    }
  }

  stop() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.isExecuting = false;
  }

  run() {
    this.snake.move();
    this.uiController.drawSnake(this.snake);
  }

  pause() {
    clearInterval(this.gameLoop);
    // this.gameLoop = null;
  }

  reset() {
    this.gameSpeed = DEFAULT_GAME_SPEED;
    this.score = 0;
    this.fruits = 0;
    this.isExecuting = false;

    this.snake = new Snake(this.numRows, this.numCols);
    this.uiController.updateScore(0);
    this.uiController.updateFruitsCollected(0);
  }

  resume() {
    if (this.isExecuting) {
      this.gameLoop = setInterval(() => {
        this.run();
      }, this.gameSpeed);
    }
  }

  gameOver() {
    this.uiController.showGameOver(this.score);
    this.audioController.startGameOverMusic();
    this.stop();
  }

  fruit() {
    this.audioController.itemPickupSound();
    this.incrementScore(FRUIT_VALUE);
    this.incrementFruits(1);
    this.upGameSpeed();
  }

  upGameSpeed() {
    let prevSpeed = this.gameSpeed;
    this.gameSpeed = Math.round(4 / (1 - (74 * Math.exp(-0.0001 * score)) / 75));
    if (prevSpeed !== this.gameSpeed) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
      this.resume();
    }
  }

  //SCORING-------------
  incrementScore(increment) {
    this.score += increment;
    this.uiController.updateScore(this.score);
    this.checkNewHighScore();
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

  initComponents() {
    console.log("test");
  }
}
