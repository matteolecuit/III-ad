class Bullet extends Actor {
    constructor(pos, size, sprites) {
        super(pos, size, sprites);
        this.action = null;
        this.lastingFrame = 5;
        this.act = (step, level, keys) => {
            if (this.action === null) {
                this.pos.y -= 0.4; //* level.wind.y;
                this.pos.x *= level.wind.x;
            }
            else if (this.action === "touched") {
                this.lastingFrame--;
            }
            if (this.lastingFrame === 0) {
                this.pos.x = -1;
                this.pos.y = -1;
            }
        };
    }
}
