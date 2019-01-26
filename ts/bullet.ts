class Bullet extends Actor {

    public action: string = null;
    public lastingFrame: number = 5;

	constructor(pos: Vector2D, size: Vector2D, sprites: string) {
        super(pos, size, sprites);
    }
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {
        if (this.action === null) {
            this.pos.y -= 0.4 ;//* level.wind.y;
            this.pos.x *= level.wind.x;
        }
        else if (this.action === "touched") {
            this.lastingFrame--;
        }

        if (this.lastingFrame === 0) {
            this.pos.x = -1;
            this.pos.y = -1;
        }
    }
}