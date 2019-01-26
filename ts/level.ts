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
		if (this.roundTime === 1) {
			this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobBoss", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(26, -2), new Vector2D(3, 3), new Vector2D(-0.02, 0.08), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(18, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(25, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobRanged", this.roundTime));

		} else if (Math.round(this.time*100)/100 === 3) {
			this.actors.push(new Enemy(new Vector2D(8, -2), new Vector2D(3, 3), new Vector2D(0.02, 0.08), "enemy", "mobTrash", this.roundTime));
		} else if (Math.round(this.time*100)/100 === 8) {
			this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
		} else if (Math.round(this.time*100)/100 === 11) {
			this.actors.push(new Enemy(new Vector2D(12, -2), new Vector2D(3, 3), new Vector2D(0, 0.04), "enemy", "mobTank", this.roundTime));
		} else if (Math.round(this.time*100)/100 === 16) {
			this.actors.push(new Enemy(new Vector2D(7, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
		} else if (Math.round(this.time*100)/100 === 22) {
			this.actors.push(new Enemy(new Vector2D(13, -2), new Vector2D(3, 3), new Vector2D(0.01, 0.08), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(8, -3.5), new Vector2D(3, 3), new Vector2D(0.01, 0.08), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(3, -5), new Vector2D(3, 3), new Vector2D(0.01, 0.08), "enemy", "mobRanged", this.roundTime));
		} else if (Math.round(this.time*100)/100 === 28) {
			this.actors.push(new Enemy(new Vector2D(17, -2), new Vector2D(3, 3), new Vector2D(-0.01, 0.08), "enemy", "mobRanged", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(22, -3.5), new Vector2D(3, 3), new Vector2D(-0.01, 0.08), "enemy", "mobTrash", this.roundTime));
			this.actors.push(new Enemy(new Vector2D(27, -5), new Vector2D(3, 3), new Vector2D(-0.01, 0.08), "enemy", "mobRanged", this.roundTime));
		}
		else if (this.roundTime === 60) {
			this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(3, 3), new Vector2D(0, 0), "enemy", "mobBoss", this.roundTime));
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
	
		if (xStart < -2 || xEnd > this.size.x + 2 || yStart < -2 || yEnd > this.size.y + 2) {
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