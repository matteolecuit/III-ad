class Actor {
    constructor(pos, size, sprites) {
        this.act = (step, level, keys) => { };
        this.pos = pos;
        this.size = size;
        this.sprites = "img/actors/" + sprites + ".png";
    }
}
