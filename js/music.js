var audio = document.getElementById("song");
pauseIcon = document.getElementById("pause-music");
playIcon = document.getElementById("play-music");

/** pause music */
function pauseMusic() {
    audio.pause();
    changeIcon();
}

/** reoplay music */
function playMusic() {
    audio.play();
    changeIcon();
}

/** change icon */
function changeIcon() {
    if (pauseIcon.style.display == "none") {
        pauseIcon.style.display = "block";
        playIcon.style.display = "none";
    } else {
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
    }
}