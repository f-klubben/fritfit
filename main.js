// ======= Setup =======
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.onload = () => {
    setInterval(loop, 16); // 60 hz
    setInterval(repickAnimation, 5 * 60 * 1000); // Change every 5 min
}
img.src = "fritfit.png"
const animations = [
    new BouncingDvd(),
    new Rain(),
    new RotatingBubbles(),
]
let needsReset = true;
let curAnim = null;
repickAnimation();

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
    curAnim = animations[Math.floor(Math.random() * animations.length)];
    canvas.clearRect(0, 0, canvas.width, canvas.height);
}