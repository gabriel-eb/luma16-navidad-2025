const musicPlay = document.getElementById("musicPlay");
const music = document.getElementById("music");

musicPlay.addEventListener("change", () => {
    if(musicPlay.checked) {
        music.pause();
    } else {
        music.play();
    }
})