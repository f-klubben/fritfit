// ======= Setup =======
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.onload = () => {
    setInterval(loop, 1);
}
img.src = "fritfit.png"
const animations = [
    new Rain(),
]
let needsReset = true;
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