function light(e) {
    var x = e.clientX;
    y = e.clientY;
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.opacity = 0;

}

function black(e) {
    var x = e.clientX;
    y = e.clientY;
    canvas.style.opacity = 0.85;
}

var openNav = document.getElementById("open-nav");
closeNav = document.getElementById("close-nav");
subNav = document.getElementById("sub-nav");

/** close sub-navigation */
function closeSub() {
    subNav.style.display = "none";
    openNav.style.display = "block";
}

/** open sub-navigation */
function openSub() {
    subNav.style.display = "block";
    openNav.style.display = "none";
}