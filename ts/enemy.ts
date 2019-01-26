class Enemy extends Actor {

    public speed: Vector2D = new Vector2D(0, 0);
    public health: number = 3;

    public type: string;
    public wobble: number = Math.PI/2;
    public direction: number;

	constructor(pos: Vector2D, size: Vector2D, sprites: string, type: string, direction?: number) {
        super(pos, size, sprites);
        this.type = type;
        this.sprites ="img/actors/" + sprites + "-" + type + ".png";
        this.direction = direction || 1;
    }
    
    public act = (step: number, level: Level, keys:Map<string, boolean>): void => {

        if (this.type === "crook") {
            this.pos.y += 0.06;
            this.pos.x += 0.0125 * this.direction;
        }
        else if (this.type === "boss") {
            this.pos.y += 0.05;

            let wobbleFreq = 0.04;
            let wobbleAmp = 0.1;
            this.wobble += wobbleFreq;
            let wobblePosX = Math.sin(this.wobble) * wobbleAmp;
            this.pos.x += wobblePosX;
        }

        let obstacle: Actor = level.actorAt(this);
        if (obstacle && obstacle instanceof Bullet) {
            if (obstacle.action === null) {
                this.health--;
                obstacle.action = "touched";
            }
        }

        if (this.health === 0) {
            this.pos = new Vector2D(70, 0);
            let p =  level.actors[0];
		    if (p instanceof Player) {
                p.score += 100;
                this.health = null;
		    }
        }
    }
}