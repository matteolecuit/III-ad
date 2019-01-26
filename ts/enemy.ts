class Enemy extends Actor {

    public speed: Vector2D = new Vector2D(0, 0);
    public health: number;
    public spawnTime: number;

    public type: string;
    public wobble: number = Math.PI/2;

    public shootCoolDown: number;
    public lastShoot: number = this.shootCoolDown;
    
    public shootLeft: boolean;
    public shootMid: boolean;
    public shootRight: boolean;

	constructor(pos: Vector2D, size: Vector2D, sprites: string, type: string, spawnTime: number) {
        super(pos, size, sprites);
        this.type = type;
        this.sprites ="img/actors/" + sprites + "-" + type + ".png";
        this.spawnTime = spawnTime;

        if (this.type === "mobTrash") {
            this.health = 3;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
        else if (this.type === "mobZigzag") {
            this.health = 5;
            this.shootCoolDown = 30;
            this.lastShoot = 30;
        }
        else if (this.type === "mobTank") {
            this.health = 10;
            this.shootCoolDown = 120;
            this.lastShoot = 120;
        }
        else if (this.type === "mobDistance") {
            this.health = 5;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
        else if (this.type === "mobBoss") {
            this.health = 200;
            this.shootCoolDown = 60;
            this.lastShoot = 60;
        }
    }

    
    public deleteEnemy = (level: Level): void => {
        for(let i = 0; i < level.actors.length; i++){
            if(level.actors[i] instanceof Enemy && this.pos.equals(level.actors[i].pos)) {
                level.actors.splice(i, 1);
            }
        }
    }

    public shoot = (step: number, level: Level, angles: Array<Vector2D>): void => {
		if (this.lastShoot < this.shootCoolDown) {
			this.lastShoot++;
		}
		else if (this.lastShoot >= this.shootCoolDown) {
            for (let index = 0; index < angles.length; index++) {
                level.actors.push(new Bullet(new Vector2D((this.pos.x + this.size.x / 2 ) - 0.5 , this.pos.y + this.size.y), new Vector2D(1, 1), "bullet", "player", angles[index]));                        
            }
            this.lastShoot = 0;
		}
	}
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {

        if (this.type === "mobTrash") {
            this.pos.y += 0.06;
            this.pos.x += 0.0125;
            this.shoot(step, level,[new Vector2D(0,0.25)]);
        }
        else if (this.type === "mobZigzag") {
            this.pos.y += 0.05;

            let wobbleFreq = 0.04;
            let wobbleAmp = 0.1;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x += wobblePosX;
            this.shoot(step, level,[new Vector2D(0,0.2)]);
        }
        else if (this.type === "mobTank") {
            this.pos.y += 0.06;
            this.pos.x += 0.0125;
            this.shoot(step, level,[new Vector2D(-0.2,0.2),new Vector2D(0,0.2),new Vector2D(0.2,0.2)]);
        }
        else if (this.type === "mobDistance") {
            if (level.roundTime < this.spawnTime + 3) {
                this.pos.y += 0.06;
                this.pos.x += 0.0125;
            }
            else {
                this.shoot(step, level,[new Vector2D(-0.2,0.2),new Vector2D(0,0.2),new Vector2D(0.2,0.2)]);
            }
        }
        else if (this.type === "mobBoss") {
            if (Math.round(level.time*100)/100 < this.spawnTime + 3) {
                this.pos.y += 0.04;
            }
            else {

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
            let p =  level.actors[0];
		    if (p instanceof Player) {
                p.score += 100;
                this.health = null;
		    }
        }

        if (level.borderAt(this.pos, this.size)) {
            this.deleteEnemy(level);
        }
    }
}