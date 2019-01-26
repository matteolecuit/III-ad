class Bullet extends Actor {
    public action: string = null;
    public lastingFrame: number = 5;
    public target: string;

	constructor(pos: Vector2D, size: Vector2D, sprites: string, target: string) {
        super(pos, size, sprites);
        this.target = target;
    }
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {
        if (this.action === null) {
            
            if(this.target === "player"){
                this.pos.y += 0.4;
                this.pos.x *= level.wind.x;
            } else if (this.target === "enemy") {
                this.pos.y -= 0.4;
            }
        }
        else if (this.action === "touched") {
            this.lastingFrame--;
        }

        if (this.lastingFrame === 0) {
            for(let i = 0; i < level.actors.length; i++){
                if(level.actors[i] instanceof Bullet && this.pos.equals(level.actors[i].pos)) {
                    level.actors.splice(i, 1);
                }
            }
        }
    }
}