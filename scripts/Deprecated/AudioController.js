//In order to allow for better UX, all audio items are embedded as part of the HTML document.
//This allows the audio files to be downloaded on DOM render, therefore reducing the likely hood
//of any delay in playing audio due to needing to download files
class AudioController {
  constructor() {}

  itemPickupSound() {
    let audio = document.getElementById("itemPickup");
    audio.play();
  }
}
