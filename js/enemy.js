class Enemy extends Actor {
    constructor(pos, size, sprites, type, direction) {
        super(pos, size, sprites);
        this.speed = new Vector2D(0, 0);
        this.wobble = Math.PI / 2;
        this.shootCoolDown = 5;
        this.lastShoot = this.shootCoolDown;
        this.shoot = (step, level) => {
            if (this.lastShoot < this.shootCoolDown) {
                this.lastShoot++;
            }
            else if (this.lastShoot >= this.shootCoolDown) {
                level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2) - 0.5, this.pos.y + this.size.y), new Vector2D(1, 1), "bullet", "player"));
                this.lastShoot = 0;
            }
        };
        this.act = (step, level, keys) => {
            if (this.type === "mobTrash") {
                this.pos.y += 0.06;
                this.pos.x += 0.0125 * this.direction;
                this.shoot(step, level);
            }
            else if (this.type === "mobZigzag") {
                this.pos.y += 0.05;
                let wobbleFreq = 0.04;
                let wobbleAmp = 0.1;
                this.wobble += wobbleFreq;
                let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
                this.pos.x += wobblePosX;
            }
            else if (this.type === "mobTank") {
                this.pos.y += 0.06;
                this.pos.x += 0.0125 * this.direction;
            }
            else if (this.type === "mobDistance") {
                this.pos.y += 0.06;
                this.pos.x += 0.0125 * this.direction;
            }
            else if (this.type === "mobBoss") {
            }
            let obstacle = level.actorAt(this);
            if (obstacle && obstacle instanceof Bullet && obstacle.target === "enemy") {
                if (obstacle.action === null) {
                    this.health--;
                    obstacle.action = "touched";
                }
            }
            if (this.health === 0) {
                for (let i = 0; i < level.actors.length; i++) {
                    if (level.actors[i] instanceof Enemy && this.pos.equals(level.actors[i].pos)) {
                        level.actors.splice(i, 1);
                    }
                }
                let p = level.actors[0];
                if (p instanceof Player) {
                    p.score += 100;
                    this.health = null;
                }
            }
        };
        this.type = type;
        this.direction = direction || 1;
        if (this.type === "mobTrash") {
            this.health = 3;
        }
        else if (this.type === "mobZigzag") {
            this.health = 5;
        }
        else if (this.type === "mobTank") {
            this.health = 15;
        }
        else if (this.type === "mobDistance") {
            this.health = 5;
        }
        else if (this.type === "mobBoss") {
            this.health = 200;
        }
    }
}
