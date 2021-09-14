function deepCopy(input) {
  return JSON.parse(JSON.stringify(input));
}

function getIdFromXY(x, y) {
  return x + y * numCols;
}

function randomNumber(numCols, numRows) {
  return Math.round(Math.random() * (numCols * numRows - 1));
}

function randInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
Array.prototype.peek = function () {
  return this.length > 0 ? this[this.length - 1] : undefined;
};
