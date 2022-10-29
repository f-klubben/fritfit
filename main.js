// ======= Setup =======
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();
img.onload = () => {
    setInterval(loop, 1);
}
img.src = "fritfit.png"
let animations = [
    new BouncingDvd(),
]
var needsReset = true;
let curAnim = null;
repickAnimation()

// ======= Loop =======
function loop() {
    if (needsReset) curAnim.reset();
    needsReset = false;
    curAnim.draw(ctx, img);
}

// ======= Utils =======
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function repickAnimation() {
    needsReset = true;
    curAnim = animations[Math.floor(Math.random() * animations.length)]
}