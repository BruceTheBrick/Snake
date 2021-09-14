// drawSnake2(snake) {
//   let oldSnake = document.querySelectorAll("[data-body-id]");
//   let newSnake = this.getCellsFromSnake(snake);
//   for (let i = 0; i < newSnake.length; i++) {
//     let cell = document.getElementById(newSnake[i].id);
//     cell.dataset.bodyId = newSnake[i].num;
//     let index = this.getNodeByNum(oldSnake, newSnake[i].num);
//     if (index == null) {
//       cell.classList.add("snake-body");
//     } else {
//       cell.style = oldSnake[index].style;
//       cell.classList = oldSnake[index].classList;
//       oldSnake[index].children.forEach((child) => {
//         cell.appendChild(child);
//       });
//     }
//   }

// let cell = document.getElementById(temp.getId());
// cell.classList.add("tail");
// cell.dataset.bodyId = snake.getLength();
// while (temp.hasNext()) {
//   cell = document.getElementById(temp.getId());
//   cell.classList.add("snake-body");
//   cell.dataset.bodyId = temp.getNum();
//   temp = temp.getNext();
// }
// cell = document.getElementById(temp.getId());
// cell.classList.add("snake-body", "head");
// cell.dataset.bodyId = temp.getNum();
//If oldSnake is initialised
// debugger;
// if (oldSnake.length > 0) {
//   let indexOfTail;
//   for (let i = 0; i < newSnake.length; i++) {
//     newSnake[i].classList = oldSnake[i].classList;
//     newSnake[i].style = oldSnake[i].style;

//     if (oldSnake[i].classList.contains("tail")) indexOfTail = i;
//   }
//   if (oldSnake[indexOfTail] !== temp.getId())
//     oldSnake[indexOfTail].classList.remove("snake-body", "tail", "head");
// } else {
//   document.getElementById(temp.getId()).classList.add("tail");
//   while (temp.hasNext()) {
//     let cell = document.getElementById(temp.getId());
//     cell.classList.add("snake-body");
//     addDotsToBody(cell);
//     temp = temp.getNext();
//   }
//   document.getElementById(temp.getId()).classList.add("snake-body", "head");
// }
// }
// updateSpots() {
//   let theta = this.getThetaByDirection();
//   for (let i = 0; i < this.spots.length; i++) {
//     let newX = Math.floor(
//       this.spots[i].x * Math.cos(theta) - this.spots[i].y * Math.sin(theta)
//     );
//     let newY = Math.floor(
//       this.spots[i].y * Math.cos(theta) + this.spots[i].x * Math.sin(theta)
//     );

//     this.spots[i].currentX = newX;
//     this.spots[i].currentY = newY;
//   }
// }

// arrow(node) {
//     switch (node.getDirection()) {
//       case Directions.UP:
//         return "&uarr;";
//       case Directions.DOWN:
//         return "&darr;";
//       case Directions.LEFT:
//         return "&larr;";
//       case Directions.RIGHT:
//         return "&rarr;";
//       default:
//         return -1;
//     }
//   }

// getNodeByNum(nodeList, num) {
//   for (let i = 0; i < nodeList.length; i++) {
//     console.log(nodeList[i]);
//     if (nodeList[i].dataset.bodyId == num) return i;
//   }
//   return null;
// }

// getCellsFromSnake(snake) {
//   let cells = [];
//   let temp = snake.getTail();
//   while (temp.hasNext()) {
//     let newCell = {
//       id: temp.getId(),
//       num: temp.getNum(),
//     };
//     cells.push(newCell);
//     temp = temp.getNext();
//   }
//   cells.push(document.getElementById(temp.getId()));
//   return cells;
// }

// HTMLElement.prototype.copyChildren = function (element) {
//   for (let i = 0; i < element.children.length; i++) {
//     this.appendChild(element.children[i]);
//   }
// };

// dots(segment) {
//   let newDiv;
//   for (var i = 0; i < 3; i++) {
//     newDiv = document.createElement("div");
//     newDiv.classList.add("spot");
//     newDiv.style.top = Math.random() * 100 + "%";
//     newDiv.style.left = Math.random() * 100 + "%";
//     newDiv.style.bottom = Math.random() * 100 + "%";
//     newDiv.style.right = Math.random() * 100 + "%";
//     newDiv.style.transform = "scale(" + Math.random() + ")";
//     newDiv.style.height = Math.random() * 100 + "%";
//     newDiv.style.width = newDiv.style.height;
//     segment.appendChild(newDiv);
//   }
// }

//  getHighscore() {
//     let highscore = 0;
//     let cookie = decodeURIComponent(document.cookie);
//     let cookies = cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       if (cookies[i].indexOf("highscore=") > -1) {
//         highscore = parseInt(
//           cookies[i].substr(cookies[i].indexOf("=") + 1, cookies[i].length)
//         );
//         break;
//       }
//     }
//     return highscore;
//   }

// setHighscore(score) {
//     const d = new Date();
//     d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = "highscore=" + score + ";" + expires;
//   }

// drawFruit2() {
//   this.removeFruits();
//   let id = randomNumber(this.numRows, this.numCols);
//   let cell = document.getElementById(id);
//   while (!this.cellIsEmpty(id)) {
//     id = randomNumber(this.numRows, this.numCols);
//     cell = document.getElementById(id);
//   }
//   cell.classList.add("fruit");
//   return cell.id;
// }
