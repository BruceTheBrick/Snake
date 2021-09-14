//In order to allow for better UX, all audio items are embedded as part of the HTML document.
//This allows the audio files to be downloaded on DOM render, therefore reducing the likely hood
//of any delay in playing audio due to needing to download files
class AudioController {
  constructor() {
    this.musicVol = 0;
    this.effectsVol = 0.2;

    this.isMusicPlaying = false;
    this.backgroundMusic = document.getElementById("backgroundMusic");
    this.gameOverMusic = document.getElementById("gameOverMusic");
    this.itemPickup = document.getElementById("itemPickup");

    this.setMusicVol(25);
    this.loopBackgroundMusic();
  }

  toggleMusicPlaying() {
    this.isMusicPlaying = !this.isMusicPlaying;
    if (this.isMusicPlaying) {
      this.enableMusic();
    } else {
      this.disableMusic();
    }
  }

  enableMusic() {}

  disableMusic() {}
  getMusicVol() {
    return this.musicVol;
  }

  getEffectsVol() {
    return this.effectsVol;
  }

  setMusicVol(musicVol) {
    this.musicVol = (Math.log(parseInt(musicVol)) / 100) * 3;
    this.updateMusicVolumes();
  }

  setEffectsVol(effectsVol) {
    this.effectsVol = (Math.log(parseInt(effectsVol)) / 100) * 3;
    this.updateEffectsVolumes;
  }

  updateMusicVolumes() {
    this.backgroundMusic.volume = this.musicVol;
  }

  updateEffectsVolumes() {
    this.itemPickup.volume = this.musicVol;
  }

  async itemPickupSound() {
    this.itemPickup.volume = this.effectsVol;
    this.itemPickup.currentTime = 0;
    this.itemPickup.play();
  }

  async startBackgroundMusic() {
    this.stopGameOverMusic();
    this.backgroundMusic.volume = this.musicVol;
    this.backgroundMusic.play();
  }

  startGameOverMusic() {
    this.stopBackgroundMusic();
    this.gameOverMusic.volume = this.musicVol;
    this.gameOverMusic.play();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  stopGameOverMusic() {
    this.gameOverMusic.pause();
    this.gameOverMusic.currentTime = 0;
  }

  stopMusic() {
    this.stopBackgroundMusic();
    this.stopGameOverMusic();
  }

  loopBackgroundMusic() {
    this.backgroundMusic.addEventListener(
      "ended",
      () => {
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic.play();
      },
      false
    );
  }
}
