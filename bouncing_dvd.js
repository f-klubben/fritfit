class BouncingDvd {
    reset() {
        this.x = 0;
        this.y = 0;
        this.dx = 3;
        this.dy = 2;
    }

    draw(ctx, img) {
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1.0;

        ctx.drawImage(img, this.x, this.y, img.width, img.height);
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) this.x *= -1, this.dx *= -1;
        if (this.y < 0) this.y *= -1, this.dy *= -1;
        if (this.x + img.width > canvas.width) this.dx *= -1;
        if (this.y + img.height > canvas.height) this.dy *= -1;
    }
}