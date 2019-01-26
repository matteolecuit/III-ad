class Enemy extends Actor {
    constructor(pos, size, axe, sprites, type, spawnTime) {
        super(pos, size, sprites);
        this.speed = new Vector2D(0, 0);
        this.wobble = Math.PI / 2;
        this.lastShoot = this.shootCoolDown;
        this.deleteEnemy = (level) => {
            for (let i = 0; i < level.actors.length; i++) {
                if (level.actors[i] instanceof Enemy && this.pos.equals(level.actors[i].pos)) {
                    level.actors.splice(i, 1);
                }
            }
        };
        this.shoot = (step, level, angles) => {
            if (this.lastShoot < this.shootCoolDown) {
                this.lastShoot++;
            }
            else if (this.lastShoot >= this.shootCoolDown) {
                for (let index = 0; index < angles.length; index++) {
                    level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2) - 0.5, this.pos.y + this.size.y), new Vector2D(1, 1), "bullet", "player", angles[index]));
                }
                this.lastShoot = 0;
            }
        };
        this.act = (step, level, keys) => {
            if (this.type === "mobTrash") {
                this.pos.y += this.axe.y;
                this.pos.x += this.axe.x;
                this.shoot(step, level, [new Vector2D(0, 0.25)]);
            }
            else if (this.type === "mobZigzag") {
                this.pos.y += this.axe.y;
                let wobbleFreq = 0.03;
                let wobbleAmp = 0.3;
                this.wobble += wobbleFreq;
                let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
                this.pos.x += wobblePosX;
                this.shoot(step, level, [new Vector2D(0, 0.2)]);
            }
            else if (this.type === "mobTank") {
                this.pos.y += this.axe.y;
                this.pos.x += this.axe.x;
                this.shoot(step, level, [new Vector2D(-0.2, 0.2), new Vector2D(0, 0.2), new Vector2D(0.2, 0.2)]);
            }
            else if (this.type === "mobRanged") {
                if (level.roundTime < this.spawnTime + 3) {
                    this.pos.y += this.axe.y;
                    this.pos.x += this.axe.x;
                }
                else {
                    this.shoot(step, level, [new Vector2D(0, 0.2)]);
                    this.shoot(step, level, [new Vector2D(-0.2, 0.2)]);
                    this.shoot(step, level, [new Vector2D(0.2, 0.2)]);
                }
            }
            else if (this.type === "mobBoss") {
                if (Math.round(level.time * 100) / 100 < this.spawnTime + 3) {
                    this.pos.y += this.axe.y;
                }
                else {
                }
            }
            let obstacle = level.actorAt(this);
            if (obstacle && obstacle instanceof Bullet && obstacle.target === "enemy") {
                if (obstacle.action === null) {
                    this.health--;
                    obstacle.action = "touched";
                }
            }
            if (this.health <= 0) {
                this.deleteEnemy(level);
                let p = level.actors[0];
                if (p instanceof Player) {
                    p.score += 100;
                    this.health = null;
                }
            }
            if (level.borderAt(this.pos, this.size)) {
                this.deleteEnemy(level);
            }
        };
        this.type = type;
        this.sprites = "img/actors/" + sprites + "-" + type + ".png";
        this.spawnTime = spawnTime;
        this.axe = axe;
        if (this.type === "mobTrash") {
            this.health = 3;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
        else if (this.type === "mobZigzag") {
            this.health = 5;
            this.shootCoolDown = 30;
            this.lastShoot = 30;
        }
        else if (this.type === "mobTank") {
            this.health = 10;
            this.shootCoolDown = 120;
            this.lastShoot = 120;
        }
        else if (this.type === "mobRanged") {
            this.health = 5;
            this.shootCoolDown = 100;
            this.lastShoot = 100;
        }
        else if (this.type === "mobBoss") {
            this.health = 200;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
    }
}
