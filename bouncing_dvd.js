class BouncingDvd {
    reset() {
        this.x = 0;
        this.y = 0;
        this.dx = 3;
        this.dy = 2;
        this.trail = null;
        this.trailSeed = Math.random();
    }

    draw(ctx, img) {
        if (this.trail == null) {
            this.trail = tinted(img, hslToHex(this.trailSeed, 1.0, 0.5));
            this.trailSeed = (this.trailSeed + 1.618034) % 1.0;
        }

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.trail, this.x, this.y, img.width, img.height);

        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0) { this.x *= -1; this.dx *= -1; this.trail = null; }
        if (this.y < 0) { this.y *= -1; this.dy *= -1; this.trail = null; }
        if (this.x + img.width > canvas.width) { this.dx *= -1; this.trail = null; }
        if (this.y + img.height > canvas.height) { this.dy *= -1; this.trail = null; }

        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    }
}