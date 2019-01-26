class Bullet extends Actor {
    constructor(pos, size, sprites, target) {
        super(pos, size, sprites);
        this.action = null;
        this.lastingFrame = 5;
        this.act = (step, level, keys) => {
            if (this.action === null) {
                if (this.target === "player") {
                    this.pos.y += 0.4;
                    this.pos.x *= level.wind.x;
                }
                else if (this.target === "enemy") {
                    this.pos.y -= 0.4;
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
    }
}
