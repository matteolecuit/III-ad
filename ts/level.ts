class Level {

	public size: Vector2D = new Vector2D(12, 16);
	public time: number = 0;
	public actors:Array<Actor> = [];

	constructor() {
		this.actors.push(new Player(new Vector2D(5.5, 14), new Vector2D(0.25, 0.25), "player"));
	}

	public level: Level;

	public calculFrame = (step: number, keys: Map<string, boolean>): void => {
		while (step > 0) {
			this.act();
			var thisStep: number = Math.min(step, 0.5);
			this.time += thisStep;
			this.actors.forEach((actor: Actor) => {
				actor.act(thisStep, this, keys);
			});
			step -= thisStep;
		}
	}
	
    public act = (): void => {
		if (Math.round(this.time*100)/100 === 3) {
			this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(1, 1), "enemy", "test", 1));
		}
		if (Math.round(this.time*100)/100 === 3 && false) {
			this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(9.5, -4), new Vector2D(1, 1), "enemy", "crook", -1));
			this.actors.push(new Enemy(new Vector2D(1.5, -6), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(9.5, -8), new Vector2D(1, 1), "enemy", "crook", -1));
		}
		else if (Math.round(this.time*100)/100 === 5 && false) {
			this.actors.push(new Enemy(new Vector2D(5.5, -2), new Vector2D(2, 2), "enemy", "boss"));
		}
		else if (Math.round(this.time*100)/100 === 7 && false) {
			this.actors.push(new Enemy(new Vector2D(2.5, -2), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(4, -3), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(5.5, -4), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(7, -5), new Vector2D(1, 1), "enemy", "crook", 1));
			this.actors.push(new Enemy(new Vector2D(8.5, -6), new Vector2D(1, 1), "enemy", "crook", 1));
		}
		else if (Math.round(this.time*100)/100 === 9 && false) {
			this.actors.push(new Enemy(new Vector2D(2.5, -6), new Vector2D(1, 1), "enemy", "crook", -1));
			this.actors.push(new Enemy(new Vector2D(4, -5), new Vector2D(1, 1), "enemy", "crook", -1));
			this.actors.push(new Enemy(new Vector2D(5.5, -4), new Vector2D(1, 1), "enemy", "crook", -1));
			this.actors.push(new Enemy(new Vector2D(7, -3), new Vector2D(1, 1), "enemy", "crook", -1));
			this.actors.push(new Enemy(new Vector2D(8.5, -2), new Vector2D(1, 1), "enemy", "crook", -1));
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
}