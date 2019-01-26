class Player extends Actor {
    constructor(pos, size, sprites) {
        super(pos.plus(new Vector2D(size.x * 1.5, size.y * 1.5)), size, sprites);
        this.status = null;
        this.speed = new Vector2D(0, 0);
        this.focus = false;
        this.shootCoolDown = 10;
        this.lastShoot = this.shootCoolDown;
        this.moveSpeed = scale;
        this.inertia = 1 / scale;
        this.controls = [false, false, false, false, false, false];
        this.score = 0;
        this.moveX = (step, level) => {
            if (this.controls[2] && !this.controls[3]) {
                this.speed.x = this.speed.x - this.moveSpeed * this.inertia > -this.moveSpeed ? this.speed.x - this.moveSpeed * this.inertia : -this.moveSpeed;
            }
            else if (this.controls[3] && !this.controls[2]) {
                this.speed.x = this.speed.x + this.moveSpeed * this.inertia < this.moveSpeed ? this.speed.x + this.moveSpeed * this.inertia : this.moveSpeed;
            }
            else {
                if (this.speed.x > 0) {
                    this.speed.x -= this.moveSpeed * this.inertia;
                }
                else if (this.speed.x < 0) {
                    this.speed.x += this.moveSpeed * this.inertia;
                }
            }
            if (!level.limitAt(this.pos.plus(new Vector2D(this.speed.x * step, 0)), this.size)) {
                this.pos = this.pos.plus(new Vector2D(this.speed.x * step, 0));
            }
            else {
                this.speed.x = 0;
            }
        };
        this.moveY = (step, level) => {
            if (this.controls[4] && !this.controls[5]) {
                this.speed.y = this.speed.y - this.moveSpeed * this.inertia > -this.moveSpeed ? this.speed.y - this.moveSpeed * this.inertia : -this.moveSpeed;
            }
            else if (this.controls[5] && !this.controls[4]) {
                this.speed.y = this.speed.y + this.moveSpeed * this.inertia < this.moveSpeed ? this.speed.y + this.moveSpeed * this.inertia : this.moveSpeed;
            }
            else {
                if (this.speed.y > 0) {
                    this.speed.y -= this.moveSpeed * this.inertia;
                }
                else if (this.speed.y < 0) {
                    this.speed.y += this.moveSpeed * this.inertia;
                }
            }
            if (!level.limitAt(this.pos.plus(new Vector2D(0, this.speed.y * step)), this.size)) {
                this.pos = this.pos.plus(new Vector2D(0, this.speed.y * step));
            }
            else {
                this.speed.y = 0;
            }
        };
        this.checkFocus = (step, level) => {
            if (this.controls[6]) {
                if (!this.focus) {
                    this.moveSpeed /= 2;
                    this.moveSpeed /= 2;
                    this.shootCoolDown = 7;
                    this.focus = true;
                }
            }
            else {
                if (this.focus) {
                    this.moveSpeed *= 2;
                    this.moveSpeed *= 2;
                    this.shootCoolDown = 10;
                    this.focus = false;
                }
            }
        };
        this.shoot = (step, level, angles) => {
            if (this.lastShoot < this.shootCoolDown) {
                this.lastShoot++;
            }
            else if (this.lastShoot >= this.shootCoolDown && this.controls[0]) {
                for (let index = 0; index < angles.length; index++) {
                    level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2) - 0.5, this.pos.y - 3), new Vector2D(1, 1), "bullet", "enemy", angles[index]));
                }
                this.lastShoot = 0;
            }
        };
        this.act = (step, level, keys) => {
            this.controls = [
                keys.get("shoot"),
                keys.get("bomb"),
                keys.get("left"),
                keys.get("right"),
                keys.get("up"),
                keys.get("down"),
                keys.get("focus")
            ];
            if (this.status === null) {
                this.checkFocus(step, level);
                this.moveX(step, level);
                this.moveY(step, level);
                this.shoot(step, level, [new Vector2D(0, 0)]);
                let obstacle = level.actorAt(this);
                if (obstacle && obstacle instanceof Enemy) {
                    this.status = "dead";
                }
                else if (obstacle && obstacle instanceof Bullet && obstacle.target === "player") {
                    if (obstacle.action === null) {
                        obstacle.action = "touched";
                        this.status = "dead";
                    }
                }
            }
            else if (this.status === "dead") {
                this.pos.x = -2;
                this.pos.y = -2;
            }
        };
    }
}
