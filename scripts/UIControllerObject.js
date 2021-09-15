class UIController {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.spawnArea = 5;
  }

  //GRID----------------------------------------
  generateGridCells() {
    var parent = document.querySelector(".game-wrapper");
    var newRow, newNode;
    for (var i = 0; i < this.numRows; i++) {
      newRow = document.createElement("div");
      newRow.classList.add("row");
      for (var j = 0; j < this.numCols; j++) {
        newNode = document.createElement("div");
        newNode.classList.add("cell");
        newNode.id = i * this.numCols + j;
        newRow.appendChild(newNode);
      }
      parent.appendChild(newRow);
    }
    newRow.classList.add("last-row");
  }

  //FRUIT----------------------------------------
  drawFruit(hX, hY) {
    let randX, randY;
    this.removeFruits();

    do {
      randX = randInRange(Math.max(0, hX - this.spawnArea), Math.min(numCols - 1, hX + this.spawnArea));
      randY = randInRange(Math.max(0, hY - this.spawnArea), Math.min(numRows - 1, hY + this.spawnArea));
    } while (!this.cellIsEmpty(getIdFromXY(randX, randY)));
    document.getElementById(getIdFromXY(randX, randY)).classList.add("fruit");
    this.spawnArea++;
  }

  removeFruits() {
    document.querySelectorAll(".fruit").forEach((segment) => {
      segment.classList.remove("fruit");
    });
  }

  //SNAKE-------------------------
  drawSnake(snake) {
    this.removeOldSnake();
    let temp = snake.getTail();
    document.getElementById(temp.getId()).classList.add("snake-body");
    while (temp.hasNext()) {
      let cell = document.getElementById(temp.getId());
      cell.classList.add("snake-body");
      this.drawSpots(temp);
      temp = temp.getNext();
    }
    document.getElementById(temp.getId()).classList.add("snake-body");
    document.getElementById(temp.getId()).classList.add("snake-body--head");
  }

  removeOldSnake() {
    document.querySelectorAll(".snake-body").forEach((segment) => {
      segment.classList.remove("snake-body");
    });
    document.querySelectorAll(".snake-body--head").forEach((segment) => {
      segment.classList.remove("snake-body--head");
    });
    document.querySelectorAll(".snake-body--tail").forEach((segment) => {
      segment.classList.remove("snake-body--tail");
    });
    this.removeDots();
  }

  drawSpots(node) {
    let bodySeg = document.getElementById(node.getId());
    let spots = node.getSpots();
    for (let i = 0; i < spots.length; i++) {
      let newSpot = document.createElement("div");
      newSpot.classList.add("spot");
      newSpot.style.top = spots[i].currentY + "%";
      newSpot.style.left = spots[i].currentX + "%";
      newSpot.style.height = spots[i].diameter + "%";
      newSpot.style.width = newSpot.style.height;
      bodySeg.appendChild(newSpot);
    }
  }

  removeDots() {
    let dots = document.querySelectorAll(".spot");
    dots.forEach((dot) => {
      if (!dot.parentElement.classList.contains("snake-body")) dot.remove();
    });
  }

  //SCORE-------------------------------------------
  updateScore(score) {
    document.querySelector("#score .value").innerHTML = score;
  }

  updateHighscore(score) {
    document.querySelector("#highscore .value").innerHTML = score;
  }

  updateFruitsCollected(numFruits) {
    document.querySelector("#fruits .value").innerHTML = numFruits;
  }

  //POPUPS------------------------------------------------
  async showSuccess(context) {
    let res = await swal.fire({
      title: "Game complete!",
      text: "Congratulations, you win!",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Play Again!",
      showCancelButton: true,
    });
    if (res.isConfirmed) {
      context.restart();
    } else {
      context.reset();
    }
  }

  async showGameOver(context, score) {
    let res = await swal.fire({
      title: "Game Over!",
      text: "You died. Your final score was " + score,
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "Try again!",
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      context.restart();
    } else {
      context.audioController.stopMusic();
      context.reset();
    }
  }

  showWait() {
    swal.fire({
      title: "Game In Progress!",
      text: "There is a game in progress, please wait.",
      icon: "info",
      confirmButtonText: "Confirm",
    });
  }

  //MISC-----------------------------------------
  cellIsEmpty(id) {
    let cell = document.getElementById(id);
    if (id >= 625) console.error("ID IS OUT OF BOUNDS " + id);
    return cell && !cell.classList.contains("fruit") && !cell.classList.contains("snake-body");
  }

  toggleSettings(context) {
    let toggle = document.querySelector(".settings-toggle");
    let pane = document.querySelector(".settings-pane");

    toggle.classList.toggle("visible");
    pane.classList.toggle("visible");

    if (toggle.classList.contains("visible")) {
      context.pause();
      this.showPaused();
    } else {
      this.removePaused();
      context.resume();
    }
  }

  showPaused() {
    let gameGrid = document.querySelector(".game-wrapper");
    let pause = document.createElement("div");
    let text = document.createElement("p");
    text.innerHTML = "Game Paused!";
    pause.classList.add("paused");
    pause.appendChild(text);
    gameGrid.appendChild(pause);
  }

  removePaused() {
    document.querySelector(".paused").remove();
  }

  openModal(context, directionId) {
    let modalBackdrop = document.createElement("div");
    let modal = document.createElement("div");
    let title = document.createElement("div");
    let subtitle = document.createElement("div");
    let bindParent = document.createElement("div");
    let buttons = document.createElement("div");
    let confirmBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");

    modalBackdrop.classList.add("modal-backdrop");
    modal.classList.add("modal");
    title.classList.add("title");
    subtitle.classList.add("subtitle");
    bindParent.classList.add("key-bind");
    buttons.classList.add("buttons");
    confirmBtn.classList = "btn confirm";
    cancelBtn.classList = "btn cancel";

    confirmBtn.innerHTML = "Confirm";
    cancelBtn.innerHTML = "Cancel";
    title.innerHTML = "Rebind Controls";
    subtitle.innerHTML = "Click the box and then click the key you would like to bind.";
    modalBackdrop.addEventListener(
      "click",
      function () {
        this.closeModal();
      }.bind(this)
    );

    bindParent.addEventListener(
      "click",
      function (e) {
        context.recordNextKeypress(directionId);
        e.stopPropagation();
      }.bind(this)
    );
    buttons.appendChild(confirmBtn);
    buttons.appendChild(cancelBtn);

    modal.appendChild(title);
    modal.appendChild(subtitle);
    modal.appendChild(bindParent);
    modal.appendChild(buttons);

    modalBackdrop.appendChild(modal);
    document.body.appendChild(modalBackdrop);
  }

  closeModal() {
    document.body.removeChild(document.querySelector(".modal-backdrop"));
  }

  initControlButtons(ctrls) {
    let upa = document.querySelector(".up .ctrl1");
    let upb = document.querySelector(".up .ctrl2");

    let downa = document.querySelector(".down .ctrl1");
    let downb = document.querySelector(".down .ctrl2");

    let lefta = document.querySelector(".left .ctrl1");
    let leftb = document.querySelector(".left .ctrl2");

    let righta = document.querySelector(".right .ctrl1");
    let rightb = document.querySelector(".right .ctrl2");

    upa.innerHTML = this.getControlChar(ctrls?.UP?.A);
    upb.innerHTML = this.getControlChar(ctrls?.UP?.B);

    downa.innerHTML = this.getControlChar(ctrls?.DOWN?.A);
    downb.innerHTML = this.getControlChar(ctrls?.DOWN?.B);

    lefta.innerHTML = this.getControlChar(ctrls?.LEFT?.A);
    leftb.innerHTML = this.getControlChar(ctrls?.LEFT?.B);

    righta.innerHTML = this.getControlChar(ctrls?.RIGHT?.A);
    rightb.innerHTML = this.getControlChar(ctrls?.RIGHT?.B);
  }

  getControlChar(control) {
    return control?.length <= 1 ? control : this.getUnicodeArrow(control);
  }

  getUnicodeArrow(input) {
    switch (input?.toLowerCase()) {
      case "arrowup": {
        return "&#8593;";
      }
      case "arrowdown": {
        return "&#8595;";
      }
      case "arrowleft": {
        return "&#8592;";
      }
      case "arrowright": {
        return "&#8594;";
      }
    }
  }
}
