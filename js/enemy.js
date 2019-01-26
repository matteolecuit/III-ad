class Enemy extends Actor {
    constructor(pos, size, sprites, type, direction) {
        super(pos, size, sprites);
        this.speed = new Vector2D(0, 0);
        this.health = 3;
        this.wobble = Math.PI / 2;
        this.act = (step, level, keys) => {
            if (this.type === "crook") {
                this.pos.y += 0.06;
                this.pos.x += 0.0125 * this.direction;
            }
            else if (this.type === "boss") {
                this.pos.y += 0.05;
                let wobbleFreq = 0.04;
                let wobbleAmp = 0.1;
                this.wobble += wobbleFreq;
                let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
                this.pos.x += wobblePosX;
            }
            let obstacle = level.actorAt(this);
            if (obstacle && obstacle instanceof Bullet) {
                if (obstacle.action === null) {
                    this.health--;
                    obstacle.action = "touched";
                }
            }
            if (this.health === 0) {
                this.pos = new Vector2D(70, 0);
                let p = level.actors[0];
                if (p instanceof Player) {
                    p.score += 100;
                    this.health = null;
                }
            }
        };
        this.type = type;
        this.sprites = "img/actors/" + sprites + "-" + type + ".png";
        this.direction = direction || 1;
    }
}
