class Grid {
  constructor(numRows, numCols) {
    this.grid = [];
    this.numFruits = 0;
    this.numRows = numRows;
    this.numCols = numCols;

    this.initGrid();
    this.addFruit();
  }

  initGrid() {
    for (var i = 0; i < this.numCols; i++) {
      var temp = [];
      for (var j = 0; j < this.numRows; j++) {
        temp.push(this.grid.length * this.numRows + temp.length);
      }
      this.grid.push(temp);
    }
  }

  addFruit() {
    if (this.numFruits == 0) {
      let id = this.randomNumber();
      while (!cellIsEmpty(id)) {
        id = this.randomNumber();
      }
      drawFruit(id);

      this.numFruits += 1;
    }
  }

  fruitEaten() {
    this.numFruits -= 1;
    removeFruits();
    this.addFruit();
  }

  randomNumber() {
    return Math.round(Math.random() * (this.numCols * this.numRows - 1));
  }

  getNumCols() {
    return this.grid.length;
  }

  getNumRows() {
    return this.grid[0].length;
  }
}
