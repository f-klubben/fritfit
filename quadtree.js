class QuadTreeNode {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.children = [];
        this.oldX = x;
        this.oldY = y;
        this.oldSize = size;
        this.oldChildren = [];
        this.isSettled = true;
        this.settleTime = 0;
        this.settleTimeMax = 0.3;
    }

    animTo(x, y, size, time) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.settleTimeMax = time;
        this.settleTime = this.settleTimeMax;
        this.isSettled = false;
        return this;
    }

    attemptSplit() {
        if (this.children.length === 0 && this.isSettled) {
            const t = 0.24;
            this.children = [
                new QuadTreeNode(this.x, this.y, this.size).animTo(this.x, this.y, this.size / 2, t),
                new QuadTreeNode(this.x, this.y, this.size).animTo(this.x + this.size / 2, this.y, this.size / 2, t),
                new QuadTreeNode(this.x, this.y, this.size).animTo(this.x, this.y + this.size / 2, this.size / 2, t),
                new QuadTreeNode(this.x, this.y, this.size).animTo(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, t),
            ].filter(child => child.x <= canvas.width && child.y <= canvas.height);
            return true;
        }
        return false;
    }

    attemptMerge() {
        if (this.children.length !== 0) {
            for (const child of this.children) {
                if (child.children.length !== 0 || child.oldChildren.length !== 0) {
                    return false;
                }
            }
            for (const child of this.children) {
                child.animTo(this.x, this.y, this.size, 0.24);
            }
            this.oldChildren = this.children;
            this.children = [];
            return true;
        }
        return false;
    }

    draw(ctx, img) {
        if (this.oldChildren.length !== 0) {
            // Old children are animating
            for (const child of this.oldChildren) {
                child.draw(ctx, img);
            }
            if (this.oldChildren[0].settleTime <= 0) {
                this.oldChildren = [];
            }
        } else if (!this.isSettled) {
            // This node is animating
            this.settleTime -= 0.016;
            let t = 1 - this.settleTime / this.settleTimeMax;
            t = easeInOutCubic(t)
            let x = lerp(this.oldX, this.x, t);
            let y = lerp(this.oldY, this.y, t);
            let s = lerp(this.oldSize, this.size, t);
            ctx.drawImage(img, img.width * x, img.height * y, img.width * s, img.height * s);
            if (this.settleTime <= 0) {
                this.isSettled = true;
                this.oldX = this.x;
                this.oldY = this.y;
                this.oldSize = this.size;
            }
        } else if (this.children.length === 0) {
            // This not is a leaf
            ctx.drawImage(img, img.width * this.x, img.height * this.y, img.width * this.size, img.height * this.size);
        } else {
            // This node is a branch
            for (const child of this.children) {
                child.draw(ctx, img);
            }
        }
    }
}

class Quadtree {
    reset() {
        this.tree = new QuadTreeNode(0, 0, Math.ceil(canvas.height / img.height));
        this.ticks = 0;
        this.splits = 0;
        this.direction = "split";
    }

    draw(ctx, img) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.tree.draw(ctx, img);
        if (this.ticks >= 4) {
            this.ticks = 0;
            if (this.direction === "split") {
                this.splitRandom(this.tree);
            } else {
                this.mergeRandom(this.tree);
            }
            if (this.splits >= 150) {
                this.direction = "merge";
            } else if (this.splits <= 0) {
                this.direction = "split";
            }
        }
        this.ticks++;
    }

    splitRandom(tree) {
        // Use random depth-first search to find a leaf node to split
        if (tree.attemptSplit()) {
            this.splits++;
            return true;
        } else {
            let rand = Math.floor(Math.random() * tree.children.length);
            for (let i = 0; i < tree.children.length; i++) {
                if (this.splitRandom(tree.children[(rand + i) % tree.children.length])) {
                    return true;
                }
            }
            return false;
        }
    }

    mergeRandom(tree) {
        // Use random depth-first search to find a node to merge
        if (tree.attemptMerge()) {
            this.splits--;
            return true;
        } else {
            let rand = Math.floor(Math.random() * tree.children.length);
            for (let i = 0; i < tree.children.length; i++) {
                if (this.mergeRandom(tree.children[(rand + i) % tree.children.length])) {
                    return true;
                }
            }
            return false;
        }
    }
}