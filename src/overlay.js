const overlay = document.querySelector("div.overlay");
const startButton = document.querySelector("button.start");
const music = document.getElementById("music");
const musicPlay = document.getElementById("musicPlay");

startButton.addEventListener(
  "click",
  () => {
    overlay.remove();
    music.play();
    musicPlay.checked = false;
  },
  { once: true }
);

musicPlay.addEventListener("change", () => {
    if(musicPlay.checked) {
        music.pause();
    } else {
        music.play();
    }
})
