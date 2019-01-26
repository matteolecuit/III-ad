class Bullet extends Actor {
    constructor(pos, size, sprites, target, left, mid, right) {
        super(pos, size, sprites);
        this.action = null;
        this.lastingFrame = 5;
        this.act = (step, level, keys) => {
            if (this.action === null) {
                if (this.left) {
                    if (this.target === "player") {
                        this.pos.x += 0.2;
                        this.pos.x *= level.wind.x;
                        this.pos.y += 0.4 * level.wind.y;
                    }
                    else if (this.target === "enemy") {
                        this.pos.y -= 0.4;
                    }
                }
                if (this.mid) {
                    if (this.target === "player") {
                        this.pos.x *= level.wind.x;
                        this.pos.y += 0.4 * level.wind.y;
                    }
                    else if (this.target === "enemy") {
                        this.pos.y -= 0.4;
                    }
                }
                if (this.right) {
                    if (this.target === "player") {
                        this.pos.x -= 0.2;
                        this.pos.x *= level.wind.x;
                        this.pos.y += 0.4 * level.wind.y;
                    }
                    else if (this.target === "enemy") {
                        this.pos.y -= 0.4;
                    }
                }
            }
            else if (this.action === "touched") {
                this.lastingFrame--;
            }
            if (this.lastingFrame === 0) {
                for (let i = 0; i < level.actors.length; i++) {
                    if (level.actors[i] instanceof Bullet && this.pos.equals(level.actors[i].pos)) {
                        level.actors.splice(i, 1);
                    }
                }
            }
        };
        this.target = target;
        this.left = left;
        this.mid = mid;
        this.right = right;
    }
}
