class Level {
    constructor() {
        this.size = new Vector2D(36, 36);
        this.time = 0;
        this.roundTime = 0;
        this.actors = [];
        this.wind = new Vector2D(0, 0);
        this.gameOver = false;
        this.gameWon = false;
        this.calculFrame = (step, keys) => {
            while (step > 0) {
                this.act();
                var thisStep = Math.min(step, 0.5);
                this.time += thisStep;
                this.roundTime = Math.round(this.time * 100) / 100;
                this.actors.forEach((actor) => {
                    actor.act(thisStep, this, keys);
                });
                step -= thisStep;
            }
        };
        this.checkGame = () => {
            let player = this.actors[0];
            if (player instanceof Player && player.status === "dead") {
                this.actors.splice(0, this.actors.length);
                this.actors.push(new Player(new Vector2D(16, 30), new Vector2D(1, 1), "player"));
                this.gameOver = true;
            }
        };
        this.act = () => {
            this.checkGame();
            if (!this.gameOver && !this.gameWon) {
                if (this.roundTime % 10 === 0) {
                    this.changeWind();
                }
                switch (this.roundTime) {
                    case 5:
                        this.actors.push(new Enemy(new Vector2D(26, -2), new Vector2D(3, 3), new Vector2D(-0.02, 0.08), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 7:
                        this.actors.push(new Enemy(new Vector2D(8, -2), new Vector2D(3, 3), new Vector2D(0.02, 0.08), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 12:
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
                        break;
                    case 15:
                        this.actors.push(new Enemy(new Vector2D(12, -2), new Vector2D(4, 5), new Vector2D(0, 0.04), "enemy", "mobTank", this.roundTime));
                        break;
                    case 20:
                        this.actors.push(new Enemy(new Vector2D(7, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 26:
                        this.actors.push(new Enemy(new Vector2D(10.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(5.5, -3.5), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(0.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
                        break;
                    case 32:
                        this.actors.push(new Enemy(new Vector2D(22.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27.5, -3.5), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(32.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.05), "enemy", "mobRanged", this.roundTime));
                        break;
                    case 40:
                        this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(4, 5), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(26, -2), new Vector2D(4, 5), new Vector2D(-0, 0.05), "enemy", "mobTank", this.roundTime));
                        break;
                    case 48:
                        this.actors.push(new Enemy(new Vector2D(0.5, -2), new Vector2D(3, 3), new Vector2D(0.15, 0.05), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(32.5, -2), new Vector2D(3, 3), new Vector2D(-0.15, 0.05), "enemy", "mobTrash", this.roundTime));
                    case 52:
                        this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0.18, 0.06), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(31, -2), new Vector2D(3, 3), new Vector2D(-0.18, 0.06), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 56:
                        this.actors.push(new Enemy(new Vector2D(2, -2), new Vector2D(3, 3), new Vector2D(0.21, 0.07), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(31, -2), new Vector2D(3, 3), new Vector2D(-0.21, 0.07), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 60:
                        this.actors.push(new Enemy(new Vector2D(13, -2), new Vector2D(4, 5), new Vector2D(0, 0.2), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(19, -2), new Vector2D(4, 5), new Vector2D(0, 0.2), "enemy", "mobTank", this.roundTime));
                        break;
                    case 61:
                        this.actors.push(new Enemy(new Vector2D(10, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(23, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 62:
                        this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 66:
                        this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 67:
                        this.actors.push(new Enemy(new Vector2D(10, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(23, -2), new Vector2D(3, 3), new Vector2D(0, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 68:
                        this.actors.push(new Enemy(new Vector2D(14, -2), new Vector2D(3, 3), new Vector2D(0, 0.125), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(19, -2), new Vector2D(3, 3), new Vector2D(0, 0.125), "enemy", "mobRanged", this.roundTime));
                        break;
                    case 70:
                        this.actors.push(new Enemy(new Vector2D(4, -2), new Vector2D(4, 5), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
                        break;
                    case 74:
                        this.actors.push(new Enemy(new Vector2D(10, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.07), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(23, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzagReverse", this.roundTime));
                        break;
                    case 76:
                        this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(3, 3), new Vector2D(0.075, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(26, -6), new Vector2D(3, 3), new Vector2D(-0.075, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 80:
                        this.actors.push(new Enemy(new Vector2D(4, -2), new Vector2D(4, 5), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(28.5, -2), new Vector2D(4, 5), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(4, 5), new Vector2D(0, 0.05), "enemy", "mobTank", this.roundTime));
                        break;
                    case 82:
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobZigzag", this.roundTime));
                        break;
                    case 88:
                        this.actors.push(new Enemy(new Vector2D(0.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(4.5, -4), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(8.5, -6), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 89:
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27, -2), new Vector2D(4, 5), new Vector2D(0, 0.08), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(32.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.08), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 91:
                        this.actors.push(new Enemy(new Vector2D(32.5, -2), new Vector2D(3, 3), new Vector2D(-0.1, 0.1), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(28.5, -4), new Vector2D(3, 3), new Vector2D(-0.1, 0.1), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(24.5, -6), new Vector2D(3, 3), new Vector2D(-0.1, 0.1), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 95:
                        this.actors.push(new Enemy(new Vector2D(11, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobZigzag", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(22, -6), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobZigzagReverse", this.roundTime));
                        break;
                    case 97:
                        this.actors.push(new Enemy(new Vector2D(22, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(11, -6), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 98:
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.15), "enemy", "mobZigzagReverse", this.roundTime));
                        break;
                    case 102:
                        this.actors.push(new Enemy(new Vector2D(16, -2), new Vector2D(4, 5), new Vector2D(0, 0.2), "enemy", "mobTank", this.roundTime));
                        break;
                    case 104:
                        this.actors.push(new Enemy(new Vector2D(0.5, -2), new Vector2D(4, 5), new Vector2D(0.1, 0.1), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(32, -2), new Vector2D(4, 5), new Vector2D(-0.1, 0.1), "enemy", "mobTank", this.roundTime));
                        break;
                    case 106:
                        this.actors.push(new Enemy(new Vector2D(7.5, -3.5), new Vector2D(3, 3), new Vector2D(0.05, 0.2), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(25.5, -3.5), new Vector2D(3, 3), new Vector2D(-0.05, 0.2), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 110:
                        this.actors.push(new Enemy(new Vector2D(0.5, -2), new Vector2D(3, 3), new Vector2D(0.025, 0.075), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(4.5, -6), new Vector2D(4, 5), new Vector2D(0.025, 0.075), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(9.5, -6), new Vector2D(3, 3), new Vector2D(0.025, 0.075), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(13, -8), new Vector2D(3, 3), new Vector2D(0.025, 0.075), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(17, -12), new Vector2D(4, 5), new Vector2D(0.025, 0.075), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(22, -12), new Vector2D(3, 3), new Vector2D(0.025, 0.075), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 113:
                        this.actors.push(new Enemy(new Vector2D(11, -2), new Vector2D(3, 3), new Vector2D(0.02, 0.175), "enemy", "mobZigzagReverse", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(22, -6), new Vector2D(3, 3), new Vector2D(0.02, 0.175), "enemy", "mobZigzag", this.roundTime));
                        break;
                    case 118:
                        this.actors.push(new Enemy(new Vector2D(1.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.175), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(31.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.175), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(6.5, -6), new Vector2D(3, 3), new Vector2D(0.0125, 0.1), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(26.5, -6), new Vector2D(3, 3), new Vector2D(-0.0125, 0.1), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(2, -8), new Vector2D(4, 5), new Vector2D(0, 0.125), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(30, -8), new Vector2D(4, 5), new Vector2D(0, 0.125), "enemy", "mobTank", this.roundTime));
                        break;
                    case 119:
                        this.actors.push(new Enemy(new Vector2D(14.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.175), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(18.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.175), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 122:
                        this.actors.push(new Enemy(new Vector2D(11, -2), new Vector2D(3, 3), new Vector2D(0.02, 0.175), "enemy", "mobZigzag", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(22, -6), new Vector2D(3, 3), new Vector2D(0.02, 0.175), "enemy", "mobZigzagReverse", this.roundTime));
                        break;
                    case 123:
                        this.actors.push(new Enemy(new Vector2D(8, -6), new Vector2D(3, 3), new Vector2D(0.01, 0.125), "enemy", "mobZigzagSemi", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(24, -2), new Vector2D(3, 3), new Vector2D(0.01, 0.125), "enemy", "mobZigzagReverseSemi", this.roundTime));
                        break;
                    case 126:
                        this.actors.push(new Enemy(new Vector2D(14, -2), new Vector2D(3, 3), new Vector2D(0, 0.125), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(19, -2), new Vector2D(3, 3), new Vector2D(0, 0.125), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(6, -10), new Vector2D(3, 3), new Vector2D(0, 0.075), "enemy", "mobRanged", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27, -10), new Vector2D(3, 3), new Vector2D(0, 0.075), "enemy", "mobRanged", this.roundTime));
                        break;
                    case 128:
                        this.actors.push(new Enemy(new Vector2D(25, -2), new Vector2D(4, 5), new Vector2D(0, 0.075), "enemy", "mobTank", this.roundTime));
                        break;
                    case 130:
                        this.actors.push(new Enemy(new Vector2D(8, -2), new Vector2D(3, 3), new Vector2D(0.01, 0.125), "enemy", "mobZigzagSemi", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(24.5, -2), new Vector2D(3, 3), new Vector2D(0.01, 0.125), "enemy", "mobZigzagReverseSemi", this.roundTime));
                        break;
                    case 133:
                        this.actors.push(new Enemy(new Vector2D(14, -2), new Vector2D(3, 3), new Vector2D(0.1, 0.15), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(19, -2), new Vector2D(3, 3), new Vector2D(-0.1, 0.15), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(10, -4), new Vector2D(3, 3), new Vector2D(-0.02, 0.125), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(23, -4), new Vector2D(3, 3), new Vector2D(0.02, 0.125), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(6, -6), new Vector2D(3, 3), new Vector2D(0.05, 0.125), "enemy", "mobTrash", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(27, -6), new Vector2D(3, 3), new Vector2D(-0.05, 0.125), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 137:
                        this.actors.push(new Enemy(new Vector2D(7, -2), new Vector2D(4, 5), new Vector2D(0.01, 0.1), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(25, -2), new Vector2D(4, 5), new Vector2D(-0.01, 0.1), "enemy", "mobTank", this.roundTime));
                        this.actors.push(new Enemy(new Vector2D(16, -6), new Vector2D(4, 5), new Vector2D(0, 0.1), "enemy", "mobTank", this.roundTime));
                        break;
                    case 140:
                        this.actors.push(new Enemy(new Vector2D(5, -2), new Vector2D(4, 5), new Vector2D(0, 0.075), "enemy", "mobTank", this.roundTime));
                        break;
                    case 142:
                        this.actors.push(new Enemy(new Vector2D(6, -2), new Vector2D(4, 5), new Vector2D(0, 0.075), "enemy", "mobTank", this.roundTime));
                        break;
                    case 144:
                        this.actors.push(new Enemy(new Vector2D(16.5, -2), new Vector2D(3, 3), new Vector2D(0, 0.1), "enemy", "mobTrash", this.roundTime));
                        break;
                    case 150:
                        this.actors.push(new Enemy(new Vector2D(13.5, -12), new Vector2D(9, 9), new Vector2D(0, 0.1), "enemy", "mobBoss", this.roundTime));
                        break;
                }
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
        this.borderAt = (pos, size) => {
            let xStart = Math.floor(pos.x);
            let xEnd = Math.ceil(pos.x + size.x);
            let yStart = Math.floor(pos.y);
            let yEnd = Math.ceil(pos.y + size.y);
            if (xStart < -12 || xEnd > this.size.x + 12 || yStart < -12 || yEnd > this.size.y + 12) {
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
        this.changeWind = () => {
            var x = this.getRandom(-1, 2);
            var y = this.getRandom(-1, 2);
            if (x === -1) {
                x = -0.01;
            }
            else if (x === 0) {
                x = 0;
            }
            else if (x === 1) {
                x = 0.01;
            }
            if (y === -1) {
                y = -0.01;
            }
            else if (y === 0) {
                y = 0;
            }
            else if (y === 1) {
                y = 0.01;
            }
            this.wind.x = x;
            this.wind.y = y;
        };
        this.actors.push(new Player(new Vector2D(16, 30), new Vector2D(1, 1), "player"));
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
