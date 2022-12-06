class RotatingBubbles {
    reset() {
        const N = 6;
        const W = canvas.width / N;
        const H = canvas.height / N;
        const MARGIN = 0.07;
        const sizes = [...Array(N * N).keys()].map(i => Math.pow((i + 1) / (N*N), 3));

        this.bubbles = []
        for (let ySection = 0; ySection < N; ySection++) {
            for (let xSection = 0; xSection < N; xSection++) {
                let x = W * xSection + W * Math.random();
                let y = H * ySection + H * Math.random();
                let size = sizes.splice(Math.floor(Math.random()*sizes.length), 1);
                let rot = Math.random() * 2 * Math.PI;
                this.bubbles.push({
                    x: canvas.width * MARGIN + x * (1 - 2 * MARGIN),
                    y: canvas.height * MARGIN + y * (1 - 2 * MARGIN),
                    size: size,
                    rotation: rot,
                });
            }
        }
    }

    draw(ctx, img) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let bubble of this.bubbles) {
            ctx.save();
            ctx.translate(bubble.x, bubble.y);
            ctx.rotate(bubble.rotation);
            let s = 0.3 + 7 * bubble.size;
            bubble.rotation = (bubble.rotation + 0.005 * Math.pow(1.1 - bubble.size, 2)) % (2 * Math.PI);
            ctx.globalAlpha = 0.7 * Math.pow(1 - bubble.size, 2);
            ctx.drawImage(img, -img.width * s / 2, -img.height * s / 2, img.width * s, img.height * s);
            ctx.restore();
        }
    }
}