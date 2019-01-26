class Level {

	public size: Vector2D = new Vector2D(36, 36);
	public time: number = 0;
	public roundTime: number = 0;
	public actors:Array<Actor> = [];
	public wind: Vector2D = new Vector2D(0, 0);

	constructor() {
		this.actors.push(new Player(new Vector2D(16, 30), new Vector2D(1, 1), "player"));
	}

	public level: Level;

	public calculFrame = (step: number, keys: Map<string, boolean>): void => {
		while (step > 0) {
			this.act();
			var thisStep: number = Math.min(step, 0.5);
			this.time += thisStep;
			this.roundTime = Math.round(this.time*100)/100;
			this.actors.forEach((actor: Actor) => {
				actor.act(thisStep, this, keys);
			});
			step -= thisStep;
		}
	}
	
    public act = (): void => {
		if (this.roundTime % 5 === 0) {
            this.changeWind();
        }
		if (this.roundTime === 5) {
			this.actors.push(new Enemy(new Vector2D(26, -2), new Vector2D(3, 3), new Vector2D(-0.02, 0.08), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 7) {
			this.actors.push(new Enemy(new Vector2D(8, -2), new Vector2D(3, 3), new Vector2D(0.02, 0.08), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 12) {
			this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
		} else if (this.roundTime === 15) {
			this.actors.push(new Enemy(new Vector2D(12, -2), new Vector2D(3, 3), new Vector2D(0, 0.04), "enemy", "mobTank", this.roundTime));
		} else if (this.roundTime === 20) {
			this.actors.push(new Enemy(new Vector2D(7, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 26) {
			this.actors.push(new Enemy(new Vector2D(13, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(8, -3.5), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(3, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
		} else if (this.roundTime === 32) {
			this.actors.push(new Enemy(new Vector2D(20, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(25, -3.5), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(30, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
		} else if (this.roundTime === 40) {
			this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(3, 3), new Vector2D(0.01, 0.05), "enemy", "mobTank", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(27, -2), new Vector2D(3, 3), new Vector2D(-0.01, 0.05), "enemy", "mobTank", this.roundTime));
		} else if (this.roundTime === 48) {
			this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0.15, 0.05), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(31, -2), new Vector2D(3, 3), new Vector2D(-0.15, 0.05), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 52) {
			this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0.18, 0.06), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(31, -2), new Vector2D(3, 3), new Vector2D(-0.18, 0.06), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 56) {
			this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0.21, 0.07), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(31, -2), new Vector2D(3, 3), new Vector2D(-0.21, 0.07), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 60) {
			this.actors.push(new Enemy(new Vector2D(14, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(19, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 63) {
			this.actors.push(new Enemy(new Vector2D(10, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(23, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 67) {
			this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(27, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 74) {
			this.actors.push(new Enemy(new Vector2D(10, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.07), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(23, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
		} else if (this.roundTime === 80) {
			this.actors.push(new Enemy(new Vector2D(4, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(29, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
		} else if (this.roundTime === 82) {	
			this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
		} else if (this.roundTime === 86) {	
			this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(6, -4), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(10, -6), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
		} else if (this.roundTime === 87) {	
			this.actors.push(new Enemy(new Vector2D(7, -2), new Vector2D(3, 3), new Vector2D(0.04, 0.12), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(26, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTank", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(30, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTank", this.roundTime));
		} else if (this.roundTime === 89) {	
			this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(6, -4), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(10, -6), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
		} 


		else if (this.roundTime === 180) {
			this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(3, 3), new Vector2D(0, 0.06), "enemy", "mobBoss", this.roundTime));
		}
	}

	public limitAt = (pos: Vector2D, size: Vector2D): boolean => {
		let xStart: number = Math.floor(pos.x);
		let xEnd: number = Math.ceil(pos.x + size.x);
		let yStart: number = Math.floor(pos.y);
		let yEnd: number = Math.ceil(pos.y + size.y);
	
		if (xStart < 0 || xEnd > this.size.x || yStart < 0 || yEnd > this.size.y) {
			return true;
		}
	}


	public borderAt = (pos: Vector2D, size: Vector2D): boolean => {
		let xStart: number = Math.floor(pos.x);
		let xEnd: number = Math.ceil(pos.x + size.x);
		let yStart: number = Math.floor(pos.y);
		let yEnd: number = Math.ceil(pos.y + size.y);
	
		if (xStart < -12 || xEnd > this.size.x + 12 || yStart < -12 || yEnd > this.size.y + 12) {
			return true;
		}
	}

	public actorAt = (actor: Actor): Actor => {
		let xStart: number = actor.pos.x;
		let xEnd: number = actor.pos.x + actor.size.x;
		let yStart: number = actor.pos.y;
		let yEnd: number = actor.pos.y + actor.size.y;

		var result: Actor = null;
		this.actors.forEach((other: Actor) => {
			let otherXStart: number = other.pos.x;
			let otherXEnd: number = other.pos.x + other.size.x;
			let otherYStart: number = other.pos.y;
			let otherYEnd: number = other.pos.y + other.size.y;

			if (!(otherXStart > xEnd || otherXEnd < xStart || otherYStart > yEnd || otherYEnd < yStart)) {
				result = other;
			}
		});
		return result;
	}

	public changeWind = (): void => {
        var x = this.getRandom(-1, 2);
        var y = this.getRandom(-1, 2);

		if (x === -1){
			x = -0.01;
		} else if (x === 0){
			x = 0;
		} else if (x === 1){
			x = 0.01;
		}
		
		if (y === -1){
			y = -0.01;
		} else if (y === 0){
			y = 0
		} else if (y === 1){
			y = 0.01;
		}
        this.wind.x = x;
        this.wind.y = y;
    }

    public getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}