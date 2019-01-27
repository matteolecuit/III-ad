class Player extends Actor {

	public status: string = null;

	public speed: Vector2D = new Vector2D(0, 0);
	public focus: boolean = false;
	public shootCoolDown: number = 10;
	public lastShoot: number = this.shootCoolDown;
	public bombCoolDown: number = 0;

	public moveSpeed: number = scale;
	public inertia: number = 1 / scale;
	public numberBomb: number = 3;

	public controls: Array<boolean> = [false, false, false, false, false, false];
	public power: number = 0;

	constructor(pos: Vector2D, size: Vector2D, sprites: string) {
		super(pos.plus(new Vector2D(size.x * 1.5, size.y * 1.5)), size, sprites);
	}

	public moveX = (step: number, level: Level): void => {
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
	}

	public moveY = (step: number, level: Level): void => {
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
	}

	public checkFocus = (step: number, level: Level): void => {
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
	}

	public shoot = (step: number, level: Level, angles: Array<Vector2D>): void => {
		if (this.lastShoot < this.shootCoolDown) {
			this.lastShoot++;
		}

		else if (this.lastShoot >= this.shootCoolDown && this.controls[0]) {
			for (let index = 0; index < angles.length; index++) {
                level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2 ) - 0.5 , this.pos.y - 3), new Vector2D(1, 1), "bullet", "enemy", angles[index]));                        
            }
			this.lastShoot = 0;
		}
    }

	public bomb = (step: number, level: Level): void => {
		if (this.bombCoolDown > 0) {
			this.bombCoolDown--;
		}
		if (this.controls[1] && this.numberBomb > 0 && this.bombCoolDown === 0) {
			for(let i = level.actors.length; i != 0; i--) {
				let object = level.actors[i];
				if(object && object instanceof Enemy) {
					object.health -= 5;
				} else if (object instanceof Bullet) {
					level.actors.splice(i, 1);
				}
			}
			this.numberBomb--;
			this.bombCoolDown = 60;
		}
	}

	public act = (step: number, level: Level, keys: Map<string, boolean>): void => {
		this.controls = [
			keys.get("shoot"),
			keys.get("bomb"),
			keys.get("left"),
			keys.get("right"),
			keys.get("up"),
			keys.get("down"),
			keys.get("focus"),
		];

		if (this.status === null) {
			let attack: Array<Vector2D>;
			this.checkFocus(step, level);
			this.moveX(step, level);
			this.moveY(step, level);
			this.bomb(step, level);
			if(this.power < 1500){
				attack = [new Vector2D(0,-0.4)]
			} else if (this.power >= 1500 && this.power < 3000){
				attack = [new Vector2D(-0.1,-0.4),new Vector2D(0.1,-0.4)]
			} else if (this.power >= 3000) {
				attack = [new Vector2D(-0.2,-0.4), new Vector2D(0,-0.4),new Vector2D(0.2,-0.4)]
			}
			this.shoot(step, level,attack);
			
			let obstacle: Actor = level.actorAt(this);
			if (obstacle && obstacle instanceof Enemy) {
				this.status = "dead";
			} else if (obstacle && obstacle instanceof Bullet && obstacle.target === "player") {
				if (obstacle.action === null) {
					obstacle.action = "touched";
					this.status = "dead";
				}
			}
		}
	}
}