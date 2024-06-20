var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//initial canvas
ctx.fillStyle = 'rgb(73, 72, 72, 0.75)';
ctx.fillRect(0, 0, 5000, 3000);

//erase color
canvas.addEventListener('mousemove', function(e) {
    clearArcFun(e.x + 55, e.y + 20, 30, ctx);
});

// recover color
setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(73, 72, 72, 0.75)';
    ctx.fillRect(0, 0, 5000, 3000);
}, 80)


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