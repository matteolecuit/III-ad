class Level {
    constructor() {
        this.size = new Vector2D(12, 16);
        this.time = 0;
        this.actors = [];
        this.wind = new Vector2D(0, 0);
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
            if ((Math.round(this.time * 100) / 100) % 5 === 0) {
                this.changeWind(this.actors[0]);
            }
            if (Math.round(this.time * 100) / 100 === 3) {
                this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(1, 1), "enemy", "test", 1));
            }
            if (Math.round(this.time * 100) / 100 === 3 && false) {
                this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(9.5, -4), new Vector2D(1, 1), "enemy", "crook", -1));
                this.actors.push(new Enemy(new Vector2D(1.5, -6), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(9.5, -8), new Vector2D(1, 1), "enemy", "crook", -1));
            }
            else if (Math.round(this.time * 100) / 100 === 5 && false) {
                this.actors.push(new Enemy(new Vector2D(5.5, -2), new Vector2D(2, 2), "enemy", "boss"));
            }
            else if (Math.round(this.time * 100) / 100 === 7 && false) {
                this.actors.push(new Enemy(new Vector2D(2.5, -2), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(4, -3), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(5.5, -4), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(7, -5), new Vector2D(1, 1), "enemy", "crook", 1));
                this.actors.push(new Enemy(new Vector2D(8.5, -6), new Vector2D(1, 1), "enemy", "crook", 1));
            }
            else if (Math.round(this.time * 100) / 100 === 9 && false) {
                this.actors.push(new Enemy(new Vector2D(2.5, -6), new Vector2D(1, 1), "enemy", "crook", -1));
                this.actors.push(new Enemy(new Vector2D(4, -5), new Vector2D(1, 1), "enemy", "crook", -1));
                this.actors.push(new Enemy(new Vector2D(5.5, -4), new Vector2D(1, 1), "enemy", "crook", -1));
                this.actors.push(new Enemy(new Vector2D(7, -3), new Vector2D(1, 1), "enemy", "crook", -1));
                this.actors.push(new Enemy(new Vector2D(8.5, -2), new Vector2D(1, 1), "enemy", "crook", -1));
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
        this.changeWind = (actor) => {
            var x = this.getRandom(-1, 2);
            var y = this.getRandom(-1, 2);
            if (x === -1) {
                x = 0.98;
            }
            else if (x === 0) {
                x = 1;
            }
            else if (x === 1) {
                x = 1.02;
            }
            if (y === -1) {
                y = 0.9;
            }
            else if (y === 0) {
                y = 1;
            }
            else if (y === 1) {
                y = 1.1;
            }
            while (x < 0) {
            }
            this.wind.x = x;
            this.wind.y = y;
            console.log("wind x", x);
            console.log("wind y", y);
        };
        this.actors.push(new Player(new Vector2D(5.5, 14), new Vector2D(0.25, 0.25), "player"));
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
