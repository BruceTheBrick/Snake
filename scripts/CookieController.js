class CookieController {
  constructor() {
    this.initControls();
  }

  //CONTROLS-----------------------------
  initControls() {
    if (!localStorage.getItem("controls")) {
      localStorage.setItem(
        "controls",
        JSON.stringify({
          UP: {
            A: "w",
            B: "",
          },
          DOWN: {
            A: "s",
            B: "",
          },
          LEFT: {
            A: "a",
            B: "",
          },
          RIGHT: {
            A: "d",
            B: "",
          },
        })
      );
    }
  }

  setControls(controls) {
    localStorage.setItem("controls", JSON.stringify(controls));
  }

  getControls() {
    return JSON.parse(localStorage.getItem("controls"));
  }

  updateControl(directionId, key) {
    let ctrls = this.getControls();
    let direction = directionId.charAt(0);
    let variant = directionId[1].toUpperCase();

    let u = /u/;
    let d = /d/;
    let l = /l/;
    let r = /r/;
    switch (true) {
      case u.test(direction):
        ctrls.UP[variant] = key;
        break;
      case d.test(direction):
        ctrls.DOWN[variant] = key;
        break;
      case l.test(direction):
        ctrls.LEFT[variant] = key;
        break;
      case r.test(direction):
        ctrls.RIGHT[variant] = key;
        break;
      default:
        console.error("Invalid Control Option.");
    }
    this.setControls(ctrls);
  }

  //SCORING--------------------
  setHighScore(score) {
    localStorage.setItem("highScore", score);
  }

  getHighScore() {
    return Math.max(localStorage.getItem("highScore"), 0);
  }

  //SNAKE COLORING--------------
  setSnakeColor(color) {
    localStorage.setItem("snakeBodyColor", color);
  }

  getSnakeColor() {
    return localStorage.getItem("snakeBodyColor");
  }

  setSpotColor(color) {
    localStorage.setItem("spotColor", color);
  }

  getSpotColor() {
    return localStorage.getItem("spotColor");
  }

  //AUDIO-----
  setMusicVolume(volume) {
    localStorage.setItem("musicVol", volume);
  }

  setEffectsVolume(volume) {
    localStorage.setItem("effectsVol", volume);
  }

  getMusicVolume() {
    return parseInt(localStorage.getItem("musicVol"));
  }
  getEffectsVolume() {
    return parseInt(localStorage.getItem("effectsVol"));
  }
}
