let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();
img.onload = () => {
    setInterval(draw, 1);
}
img.src = "fritfit.png"

var x = 0;
var y = 0;
var dx = 3;
var dy = 2;

function draw() {
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(img, x, y, img.width, img.height);
    x += dx;
    y += dy;

    if (x < 0) x *= -1, dx *= -1;
    if (y < 0) y *= -1, dy *= -1;
    if (x + img.width > canvas.width) dx *= -1;
    if (y + img.height > canvas.height) dy *= -1;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}