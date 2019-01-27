class Enemy extends Actor {

    public speed: Vector2D = new Vector2D(0, 0);
    public health: number;
    public maxHealth: number;
    public spawnTime: number;
    public axe: Vector2D;

    public type: string;
    public wobble: number = Math.PI/2;

    public shootCoolDown: number;
    public lastShoot: number = this.shootCoolDown;
    
    public shootLeft: boolean;
    public shootMid: boolean;
    public shootRight: boolean;

	constructor(pos: Vector2D, size: Vector2D, axe: Vector2D, sprites: string, type: string, spawnTime: number) {
        super(pos, size, sprites);
        this.type = type;
        this.sprites ="img/actors/" + sprites + "-" + type + ".png";
        this.spawnTime = spawnTime;
        this.axe = axe;

        if (this.type === "mobTrash") {
            this.health = 3;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
        else if (this.type === "mobZigzag" || this.type === "mobZigzagReverse" || this.type === "mobZigzagSemi" || this.type === "mobZigzagReverseSemi") {
            this.health = 5;
            this.shootCoolDown = 20;
            this.lastShoot = 20;
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
            this.maxHealth = this.health;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
    }

    
    public deleteEnemy = (level: Level): void => {
        for(let i = 0; i < level.actors.length; i++){
            if(level.actors[i] instanceof Enemy && this.pos.equals(level.actors[i].pos)) {
                let enemy: Actor = level.actors[i];
                if (enemy instanceof Enemy && enemy.type === "mobBoss") {
                    level.gameWon = true;
                    level.endTime = level.roundTime;
                    level.actors = [level.actors[0]];
                    return;
                }
                level.actors.splice(i, 1);
            }
        }
    }

    public shoot = (step: number, level: Level, angles: Array<Vector2D>, posX?: number): void => {
        if (!posX) {
            var posX = 0;
        }
		if (this.lastShoot < this.shootCoolDown) {
			this.lastShoot++;
		}
		else if (this.lastShoot >= this.shootCoolDown) {
            for (let index = 0; index < angles.length; index++) {
                level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2 ) - 0.5 + posX , this.pos.y + this.size.y*1.25), new Vector2D(1, 1), "bullet", "player", angles[index]));                        
            }
            this.lastShoot = 0;
		}
	}
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {

        if (this.type === "mobTrash") {
            this.pos.x += this.axe.x;
            this.pos.y += this.axe.y;
            this.shoot(step, level,[new Vector2D(0,0.25)]);
        }
        else if (this.type === "mobZigzag") {
            this.pos.y += this.axe.y;

            let wobbleFreq = 0.03;
            let wobbleAmp = 0.3;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x += wobblePosX;
            this.shoot(step, level,[new Vector2D(0,0.2)]);
        }
        else if (this.type === "mobZigzagReverse") {
            this.pos.y += this.axe.y;

            let wobbleFreq = 0.03;
            let wobbleAmp = 0.3;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x -= wobblePosX;
            this.shoot(step, level,[new Vector2D(0,0.2)]);
        }
        else if (this.type === "mobZigzagSemi") {
            this.pos.y += this.axe.y;

            let wobbleFreq = 0.03;
            let wobbleAmp = 0.15;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x += wobblePosX;
            this.shoot(step, level,[new Vector2D(0,0.2)]);
        }
        else if (this.type === "mobZigzagReverseSemi") {
            this.pos.y += this.axe.y;

            let wobbleFreq = 0.03;
            let wobbleAmp = 0.15;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x -= wobblePosX;
            this.shoot(step, level,[new Vector2D(0,0.2)]);
        }
        else if (this.type === "mobTank") {
            this.pos.y += this.axe.y;
            this.pos.x += this.axe.x;
            this.shoot(step, level,[new Vector2D(-0.1,0.175),new Vector2D(0,0.175),new Vector2D(0.1,0.175)]);
        }
        else if (this.type === "mobRanged") {
            if (level.roundTime < this.spawnTime + 3) {
                this.pos.y += this.axe.y;
                this.pos.x += this.axe.x;
            }
            else {
                this.shoot(step, level,[new Vector2D(-0.05,0.3)]);
                this.shoot(step, level,[new Vector2D(0.05,0.3)]);
            }
        }
        else if (this.type === "mobBoss") {
            if (Math.round(level.time*100)/100 < this.spawnTime + 3) {
                this.pos.y += this.axe.y;
            }
            else {
                let wobbleFreq = 0.04;
                let wobbleAmp = 0.1;
                this.wobble += wobbleFreq;
                let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
                this.pos.x += wobblePosX;
                this.shoot(step, level,[new Vector2D(0,0.2)]);
                
                if (this.health < this.maxHealth*0.9) {
                    this.shoot(step, level,[new Vector2D(-0.2,0),new Vector2D(0,0.2),new Vector2D(0.2,0)]);
                }
                if (this.health < this.maxHealth*0.8) {
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07)
                    ]);
                }
                if (this.health < this.maxHealth*0.7) {
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07),
                        new Vector2D(-0.0866,0.05),new Vector2D(-0.05,0.0866),
                        new Vector2D(0.0866,0.05),new Vector2D(0.05,0.0866),
                        new Vector2D(0.097,0.025),new Vector2D(0.025,0.097),
                        new Vector2D(-0.097,0.025),new Vector2D(-0.025, 0.097)
                    ]);
                }
                if (this.health < this.maxHealth*0.6) {
                    this.shoot(step, level,[new Vector2D(-0.2,0),new Vector2D(0,0.2),new Vector2D(0.2,0)], -10);
                    this.shoot(step, level,[new Vector2D(-0.2,0),new Vector2D(0,0.2),new Vector2D(0.2,0)], 10);
                }
                if (this.health < this.maxHealth*0.4) {
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07)], -10);
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07)], 10);
                }
                if (this.health < this.maxHealth*0.2) {
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07),
                        new Vector2D(-0.0866,0.05),new Vector2D(-0.05,0.0866),
                        new Vector2D(0.0866,0.05),new Vector2D(0.05,0.0866),
                        new Vector2D(0.097,0.025),new Vector2D(0.025,0.097),
                        new Vector2D(-0.097,0.025),new Vector2D(-0.025, 0.097)
                    ], -10);
                    this.shoot(step, level,[
                        new Vector2D(-0.1,0),new Vector2D(0,0.1),new Vector2D(0.1,0),
                        new Vector2D(-0.07,0.07),new Vector2D(0.07,0.07),
                        new Vector2D(-0.0866,0.05),new Vector2D(-0.05,0.0866),
                        new Vector2D(0.0866,0.05),new Vector2D(0.05,0.0866),
                        new Vector2D(0.097,0.025),new Vector2D(0.025,0.097),
                        new Vector2D(-0.097,0.025),new Vector2D(-0.025, 0.097)
                    ], 10);
                }
            }
        }

        let obstacle: Actor = level.actorAt(this);
        if (obstacle && obstacle instanceof Bullet && obstacle.target === "enemy") {
            if (obstacle.action === null) {
                this.health--;
                obstacle.action = "touched";
            }
        }

        if (this.health <= 0) {
            this.deleteEnemy(level);
            let p: Actor =  level.actors[0];
		    if (p instanceof Player) {
                p.power += 100;
                this.health = null;
		    }
        }

        if (level.borderAt(this.pos, this.size)) {
            this.deleteEnemy(level);
        }
    }
}