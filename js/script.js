var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var curX = 0;
var curY = 0;

//initial canvas
ctx.fillStyle = 'rgb(73, 72, 72, 0.75)';
ctx.fillRect(0, 0, 5000, 3000);

//erase color
canvas.addEventListener('mousemove', function(e) {
    curX = e.x + 55;
    curY = e.y + 20;
    clearArcFun(e.x + 55, e.y + 20, 25, ctx);
});

//erase as a circle
function clearArcFun(x, y, r, ctx) {
    var stepClear = 1;
    clearArc(x, y, r);

    function clearArc(x, y, radius) {
        var calcWidth = radius - stepClear;
        var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
        var posX = x - calcWidth;
        var posY = y - calcHeight;
        var widthX = 2 * calcWidth;
        var heightY = 2 * calcHeight;

        if (stepClear <= radius) {
            ctx.clearRect(posX, posY, widthX, heightY);
            stepClear += 1;
            clearArc(x, y, radius);
        }
    }
}

// recover color
setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, 5000, 3000);
    clearArcFun(curX, curY, 25, ctx);
}, 80)