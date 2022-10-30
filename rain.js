class RainDrop {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.dy = 0;
    }

    step() {
        this.y += this.dy;
        this.dy += 0.1;
    }
}

class Rain {
    constructor() {
        this.intervalMin = 10;
        this.intervalMax = 30;
    }

    reset() {
        this.droplets = [];
        this.next = 0;
    }

    draw(ctx, img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let i = this.droplets.length;
        while (i--) {
            const drop = this.droplets[i];
            drop.step();
            ctx.drawImage(img, drop.x, drop.y, img.width, img.height);

            if (drop.y >= canvas.height + 99) {
                this.droplets.slice(i, 1);
            }
        }

        this.next--;
        if (this.next <= 0) {
            this.droplets.push(new RainDrop((canvas.width - img.width) * Math.random()))
            this.next = this.intervalMin + (this.intervalMax - this.intervalMin) * Math.random();
        }
    }
}