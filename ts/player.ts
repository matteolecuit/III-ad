class Player extends Actor {

	public status: string = null;

	public speed: Vector2D = new Vector2D(0, 0);
	public focus: boolean = false;
	public shootCoolDown: number = 10;
	public lastShoot: number = this.shootCoolDown;

	public moveSpeed: number = scale;
	public inertia: number = 1 / scale;

	public controls: Array<boolean> = [false, false, false, false, false, false];
	public score: number = 0;

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

	public shoot = (step: number, level: Level): void => {
		if (this.lastShoot < this.shootCoolDown) {
			this.lastShoot++;
		}
		else if (this.lastShoot >= this.shootCoolDown && this.controls[0]) {
			level.actors.push(new Bullet(new Vector2D(this.pos.x, this.pos.y), new Vector2D(0.25, 0.25), "bullet", "enemy"));
			this.lastShoot = 0;
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
			keys.get("focus")
		];

		if (this.status === null) {
			this.checkFocus(step, level);
			this.moveX(step, level);
			this.moveY(step, level);
			this.shoot(step, level);

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
		else if (this.status === "dead") {
			this.pos.x = -2;
			this.pos.y = -2;
		}

	}
}