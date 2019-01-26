class Level {
    constructor() {
        this.size = new Vector2D(12, 16);
        this.time = 0;
        this.actors = [];
        this.calculFrame = (step, keys) => {
            while (step > 0) {
                this.act();
                var thisStep = Math.min(step, 0.5);
                this.time += thisStep;
                this.actors.forEach((actor) => {
                    actor.act(thisStep, this, keys);
                });
                step -= thisStep;
            }
        };
        this.act = () => {
            if (Math.round(this.time * 100) / 100 === 2) {
                console.log("mobTrash");
                this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(1, 1), "enemy", "mobTrash", 1));
                console.log("mobZigzag");
                this.actors.push(new Enemy(new Vector2D(2.5, -5), new Vector2D(1, 1), "enemy", "mobZigzag", 1));
                console.log("mobTank");
                this.actors.push(new Enemy(new Vector2D(3, -2), new Vector2D(1, 1), "enemy", "mobTank", 1));
                console.log("mobDistance");
                this.actors.push(new Enemy(new Vector2D(2.5, -6), new Vector2D(1, 1), "enemy", "mobDistance", -1));
            }
            else if (Math.round(this.time * 100) / 100 === 3) {
                console.log("mobBoss");
                this.actors.push(new Enemy(new Vector2D(6, 2), new Vector2D(1, 1), "enemy", "mobBoss"));
            }
        };
        this.limitAt = (pos, size) => {
            let xStart = Math.floor(pos.x);
            let xEnd = Math.ceil(pos.x + size.x);
            let yStart = Math.floor(pos.y);
            let yEnd = Math.ceil(pos.y + size.y);
            if (xStart < 0 || xEnd > this.size.x || yStart < 0 || yEnd > this.size.y) {
                return true;
            }
        };
        this.actorAt = (actor) => {
            let xStart = actor.pos.x;
            let xEnd = actor.pos.x + actor.size.x;
            let yStart = actor.pos.y;
            let yEnd = actor.pos.y + actor.size.y;
            var result = null;
            this.actors.forEach((other) => {
                let otherXStart = other.pos.x;
                let otherXEnd = other.pos.x + other.size.x;
                let otherYStart = other.pos.y;
                let otherYEnd = other.pos.y + other.size.y;
                if (!(otherXStart > xEnd || otherXEnd < xStart || otherYStart > yEnd || otherYEnd < yStart)) {
                    result = other;
                }
            });
            return result;
        };
        this.actors.push(new Player(new Vector2D(5.5, 14), new Vector2D(0.25, 0.25), "player"));
    }
}
