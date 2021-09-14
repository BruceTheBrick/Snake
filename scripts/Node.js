class Node {
  constructor(x, y, nextNode, direction) {
    this.id = getIdFromXY(x, y);
    this.x = x;
    this.y = y;
    this.num = 0;
    this.next = nextNode;
    this.direction = direction;
    this.doUpdate = true;
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
    this.direction = direction;
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

  hasNext() {
    return this.next;
  }
}
