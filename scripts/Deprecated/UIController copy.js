function generateGridCells(numRows, numCols) {
  var parent = document.querySelector(".grid-wrapper");
  var newRow, newNode;
  for (var i = 0; i < numRows; i++) {
    newRow = document.createElement("div");
    newRow.classList.add("row");

    for (var j = 0; j < numCols; j++) {
      newNode = document.createElement("div");
      newNode.classList.add("cell");
      newNode.id = i * numCols + j;
      newRow.appendChild(newNode);
    }
    parent.appendChild(newRow);
  }
}

function drawSnake(snake) {
  removeOldSnake();
  let temp = snake.getTail();
  document.getElementById(temp.getId()).classList.add("snake-body");
  document.getElementById(temp.getId()).classList.add("tail");
  while (temp.hasNext()) {
    let cell = document.getElementById(temp.getId());
    cell.classList.add("snake-body");
    temp = temp.getNext();
  }
  document.getElementById(temp.getId()).classList.add("snake-body");
  document.getElementById(temp.getId()).classList.add("head");
}

function drawFruit(id) {
  document.getElementById(id).className += " fruit fas";
}

function removeFruits() {
  document.querySelectorAll(".fruit").forEach((segment) => {
    segment.classList.remove("fruit");
  });
}

function removeOldSnake() {
  document.querySelectorAll(".snake-body").forEach((segment) => {
    segment.classList.remove("snake-body");
  });
  document.querySelectorAll(".head").forEach((segment) => {
    segment.classList.remove("head");
  });
  document.querySelectorAll(".tail").forEach((segment) => {
    segment.classList.remove("tail");
  });
}

function updateScore(score) {
  document.getElementById("score").innerHTML = "Score: " + score;
}

function updateSpeedUI(speed) {
  document.getElementById("gamespeed").innerHTML = "Speed: " + speed;
}

function cellIsEmpty(id) {
  let cell = document.getElementById(id);
  return (
    cell &&
    !cell.classList.contains("fruit") &&
    !cell.classList.contains("snake-body")
  );
}
