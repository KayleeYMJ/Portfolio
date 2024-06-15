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