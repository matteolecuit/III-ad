class Actor {

    public pos: Vector2D;
    public size: Vector2D;
    public sprites: string;

	constructor (pos: Vector2D, size: Vector2D, sprites: string) {
        this.pos = pos;
        this.size = size;
        this.sprites = "img/actors/" + sprites + ".png";
    }

    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {}
}