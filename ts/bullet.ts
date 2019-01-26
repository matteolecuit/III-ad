class Bullet extends Actor {
    public action: string = null;
    public lastingFrame: number = 5;
    public target: string;
    public angle: Vector2D;

	constructor(pos: Vector2D, size: Vector2D, sprites: string, target: string, angle:Vector2D) {
        super(pos, size, sprites);
        this.target = target;
        this.angle = angle;
    }

    public deleteBullet = (level: Level): void => {
        for(let i = 0; i < level.actors.length; i++){
            if(level.actors[i] instanceof Bullet && this.pos.equals(level.actors[i].pos)) {
                level.actors.splice(i, 1);
            }
        }
    }
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {
        if (this.action === null) {
            
            if(this.target === "player"){
               this.pos.x += this.angle.x + level.wind.x;
                this.pos.y += this.angle.y + level.wind.y;
            } else if (this.target === "enemy") {
                this.pos.x += this.angle.x;
                this.pos.y += this.angle.y;
            }
            
        }
        else if (this.action === "touched") {
            this.lastingFrame--;
        }

        if (this.lastingFrame === 0) {
            this.deleteBullet(level);
        }

        if (level.borderAt(this.pos, this.size)) {
            this.deleteBullet(level);
        }
    }
}