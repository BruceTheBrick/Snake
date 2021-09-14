class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.tail = head;
    this.length = head ? 1 : 0;
  }

  addToTail(newNode) {
    newNode.setNum(this.getLength());
    if (this.length > 0) {
      newNode.setNext(this.getTail());
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /*---------------------- GETTERS ----------------------*/
  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getLength() {
    return this.length;
  }
}

// Percentage of nodes to have a spot
const SPOT_DENSITY = 0.4;
const NUM_SPOTS = 1;
class Node {
  constructor(x, y, nextNode, direction) {
    this.id = getIdFromXY(x, y);
    this.x = x;
    this.y = y;
    this.num = 0;
    this.next = nextNode;
    this.direction = direction;
    this.doUpdate = true;

    this.spots = this.initSpots();
  }

  /*---------------------- SETTERS ----------------------*/
  setId(id) {
    this.id = id;
  }

  setX(x) {
    this.x = x;
    this.setId(getIdFromXY(this.x, this.y));
  }

  setY(y) {
    this.y = y;
    this.setId(getIdFromXY(this.x, this.y));
  }

  setNext(next) {
    this.next = next;
  }

  setDoUpdate(doUpdate) {
    this.doUpdate = doUpdate;
  }

  setDirection(direction) {
    if (this.direction !== direction) {
      this.direction = direction;
      this.updateSpots();
    }
  }

  setNum(num) {
    this.num = num;
  }

  /*---------------------- GETTERS ----------------------*/
  getId() {
    return this.id;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getNext() {
    return this.next;
  }

  getDoUpdate() {
    return this.doUpdate;
  }

  getDirection() {
    return this.direction;
  }

  getNum() {
    return this.num;
  }

  getSpots() {
    return this.spots;
  }

  hasNext() {
    return this.next;
  }

  initSpots() {
    let spots = [];
    if (this.allowSpots()) {
      for (let i = 0; i < NUM_SPOTS; i++) {
        let d = this.randomNum(10, 20);
        let tx = this.randomNum(d, 100 - d);
        let ty = this.randomNum(d, 100 - d);
        let newSpot = {
          diameter: d,
          x: tx,
          y: ty,
          currentX: this.x,
          currentY: this.y,
        };
        spots.push(newSpot);
      }
    }
    return spots;
  }

  allowSpots() {
    return Math.random() < SPOT_DENSITY;
  }

  updateSpots() {
    for (let i = 0; i < this.spots.length; i++) {
      switch (this.direction) {
        case Directions.RIGHT: {
          this.spots[i].currentX = this.spots[i].x;
          this.spots[i].currentY = this.spots[i].y;
          break;
        }
        case Directions.LEFT: {
          this.spots[i].currentX =
            100 - this.spots[i].x - this.spots[i].diameter;
          this.spots[i].currentY =
            100 - this.spots[i].y - this.spots[i].diameter;
          break;
        }

        case Directions.UP: {
          this.spots[i].currentX = this.spots[i].y;
          this.spots[i].currentY =
            100 - this.spots[i].x - this.spots[i].diameter;
          break;
        }
        case Directions.DOWN: {
          this.spots[i].currentX =
            100 - this.spots[i].y - this.spots[i].diameter;
          this.spots[i].currentY = this.spots[i].x - this.spots[i].diameter;
          break;
        }
      }
    }
  }

  getThetaByDirection() {
    switch (this.direction) {
      case Directions.UP: {
        return 90;
      }
      case Directions.LEFT: {
        return 180;
      }
      case Directions.DOWN: {
        return 270;
      }
      case Directions.RIGHT: {
        return 0;
      }
      default:
        return -1;
    }
  }

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
