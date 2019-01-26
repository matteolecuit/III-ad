class Bullet extends Actor {
    constructor(pos, size, sprites, target, angle) {
        super(pos, size, sprites);
        this.action = null;
        this.lastingFrame = 5;
        this.deleteBullet = (level) => {
            for (let i = 0; i < level.actors.length; i++) {
                if (level.actors[i] instanceof Bullet && this.pos.equals(level.actors[i].pos)) {
                    level.actors.splice(i, 1);
                }
            }
        };
        this.act = (step, level, keys) => {
            if (this.action === null) {
                if (this.target === "player") {
                    this.pos.x += this.angle.x + level.wind.x;
                    this.pos.y += this.angle.y + level.wind.y;
                }
                else if (this.target === "enemy") {
                    this.pos.x += this.angle.x;
                    this.pos.y += this.angle.y;
                }
            }
            else if (this.action === "touched") {
                this.lastingFrame--;
            }
            if (this.lastingFrame === 0) {
                this.deleteBullet(level);
            }
            if (level.borderAt(this.pos, this.size)) {
                this.deleteBullet(level);
            }
        };
        this.target = target;
        this.angle = angle;
    }
}
