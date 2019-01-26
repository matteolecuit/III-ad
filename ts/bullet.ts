class Bullet extends Actor {
    public action: string = null;
    public lastingFrame: number = 5;
    public target: string;
    public left: boolean;
    public mid: boolean;
    public right: boolean;

	constructor(pos: Vector2D, size: Vector2D, sprites: string, target: string, left:boolean, mid:boolean, right:boolean) {
        super(pos, size, sprites);
        this.target = target;
        this.left = left;
        this.mid = mid;
        this.right = right;
    }
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {
        if (this.action === null) {
            
            if(this.left){
                if(this.target === "player"){
                    this.pos.x += 0.2;
                    this.pos.x *= level.wind.x;
                    this.pos.y += 0.4 * level.wind.y;
                } else if (this.target === "enemy") {
                    this.pos.y -= 0.4;
                }
            }

            if(this.mid){
                if(this.target === "player"){
                    this.pos.x *= level.wind.x;
                    this.pos.y += 0.4 * level.wind.y;
                } else if (this.target === "enemy") {
                    this.pos.y -= 0.4;
                }
            }

            if(this.right){
                if(this.target === "player"){
                    this.pos.x -= 0.2;
                    this.pos.x *= level.wind.x;
                    this.pos.y += 0.4 * level.wind.y;
                } else if (this.target === "enemy") {
                    this.pos.y -= 0.4;
                }
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