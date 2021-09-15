class Snake {
  constructor(numRows, numCols, controls) {
    this.body = new LinkedList();
    this.nextDirection = null;
    this.direction = Directions.RIGHT;
    this.numRows = numRows;
    this.numCols = numCols;
    this.controls = controls;
    this.ctrlFunc;
    this.initBody();
  }

  /*--------------- MOVEMENT --------------------*/
  move() {
    this.direction = this.nextMove();
    switch (this.direction) {
      case Directions.UP:
        this.moveUp();
        break;
      case Directions.DOWN:
        this.moveDown();
        break;
      case Directions.LEFT:
        this.moveLeft();
        break;
      case Directions.RIGHT:
        this.moveRight();
        break;
    }
    this.nextDirection = null;
    this.checkHeadPosition();
  }

  up() {
    if (this.nextDirection == null) {
      if (this.direction !== Directions.DOWN) this.nextDirection = Directions.UP;
    }
  }

  down() {
    if (this.nextDirection == null) {
      if (this.direction !== Directions.UP) this.nextDirection = Directions.DOWN;
    }
  }

  left() {
    if (this.nextDirection == null) {
      if (this.direction !== Directions.RIGHT) this.nextDirection = Directions.LEFT;
    }
  }

  right() {
    if (this.nextDirection == null) {
      if (this.direction !== Directions.LEFT) this.nextDirection = Directions.RIGHT;
    }
  }

  nextMove() {
    return this.nextDirection !== null ? this.nextDirection : this.direction;
  }

  moveUp() {
    if (this.getHead().getY() - 1 >= 0) {
      this.propogateBody();
      this.getHead().setY(this.getHead().getY() - 1);
      this.getHead().setDirection(Directions.UP);
    } else {
      this.die();
    }
  }

  moveDown() {
    if (this.getHead().getY() + 1 < this.numRows) {
      this.propogateBody();
      this.getHead().setY(this.getHead().getY() + 1);
      this.getHead().setDirection(Directions.DOWN);
    } else {
      this.die();
    }
  }

  moveLeft() {
    if (this.getHead().getX() - 1 >= 0) {
      this.propogateBody();
      this.getHead().setX(this.getHead().getX() - 1);
      this.getHead().setDirection(Directions.LEFT);
    } else {
      this.die();
    }
  }

  moveRight() {
    if ((this.getHead().getX() + 1) % this.numCols !== 0) {
      this.propogateBody();
      this.getHead().setX(this.getHead().getX() + 1);
      this.getHead().setDirection(Directions.RIGHT);
    } else {
      this.die();
    }
  }

  die() {
    document.removeEventListener("keydown", this.ctrlFunc);
    document.dispatchEvent(new Event("died"));
  }

  fruitEaten() {
    document.dispatchEvent(new Event("fruit"));
  }

  checkHeadPosition() {
    if (this.selfCollision()) {
      this.die();
    } else if (document.getElementById(this.getHead().getId()).classList.contains("fruit")) {
      this.eat();
    }
  }

  propogateBody() {
    let temp = this.getTail();
    while (temp.hasNext()) {
      if (temp.getDoUpdate()) {
        temp.setX(temp.getNext().getX());
        temp.setY(temp.getNext().getY());
        temp.setDirection(temp.getNext().getDirection());
        temp = temp.getNext();
      } else {
        temp.setDoUpdate(true);
      }
    }
  }

  selfCollision() {
    let headId = this.getHead().getId();
    let temp = this.getTail();
    let occurences = 0;
    while (temp.hasNext()) {
      if (temp.getId() == headId) occurences++;
      temp = temp.getNext();
    }
    return occurences > 0;
  }

  /*--------------- MISC ----------------------*/
  addToTail(x, y) {
    this.body.addToTail(new Node(x, y));
  }

  eat() {
    this.addToTail(this.getTail().getX(), this.getTail().getY());
    this.fruitEaten();
  }

  start() {
    let func = function (e) {
      switch (e.key) {
        case this.controls.UP.A:
        case this.controls.UP.B:
          this.up();
          break;

        case this.controls.DOWN.A:
        case this.controls.DOWN.B:
          this.down();
          break;

        case this.controls.LEFT.A:
        case this.controls.LEFT.B:
          this.left();
          break;

        case this.controls.RIGHT.A:
        case this.controls.RIGHT.B:
          this.right();
          break;

        case "spacebar":
        case " ":
          console.log(
            "%cYou found an easter egg! %cCongratulations!",
            "color: blue; font-weight: bold; font-size: 2em;",
            "color: red; text-transform: capitalize; font-weight: bolder; font-size: 4em;"
          );
          break;
        default:
          break;
      }
    }.bind(this);
    this.ctrlFunc = func;
    document.addEventListener("keydown", func);
  }

  /*--------------- GETTERS -------------------*/
  getDirection() {
    return this.direction;
  }

  getHead() {
    return this.body.getHead();
  }

  getTail() {
    return this.body.getTail();
  }

  getBody() {
    return this.body;
  }

  getLength() {
    return this.body.getLength();
  }

  getControls() {
    return this.controls;
  }

  /*---------------- SETTERS ---------------------*/
  setHead(x, y) {
    this.body.setHead(new Node(x, y));
  }

  setTail(x, y) {
    this.body.addToTail(new Node(x, y));
  }

  setControls(controls) {
    this.controls = JSON.parse(JSON.stringify(controls));
  }

  initBody() {
    this.addToTail(Math.floor(this.numCols / 2), Math.floor(this.numRows / 2));
    this.addToTail(this.getHead().getX() - 1, this.getHead().getY());
    this.addToTail(this.getHead().getX() - 2, this.getHead().getY());
    let temp = this.getTail();
    while (temp.hasNext()) {
      temp.setDirection(Directions.RIGHT);
      temp = temp.getNext();
    }
    temp.setDirection(Directions.RIGHT);
  }
}

const Directions = {
  UP: 1,
  DOWN: -1,
  LEFT: -2,
  RIGHT: 2,
};
