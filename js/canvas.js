class CanvasDisplay {
    constructor(parent, level) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d", { alpha: false });
        this.zoom = 3;
        this.animationTime = 0;
        this.drawFrame = (step) => {
            this.animationTime += step;
            this.clearDisplay();
            this.drawBackground();
            this.drawActors();
            this.drawHUD();
        };
        this.drawBackground = () => {
        };
        this.drawHUD = () => {
            this.cx.font = "16px rcr";
            this.cx.fillStyle = "white";
            this.cx.fillText("time=" + Math.floor(this.level.time), scale * 0.5, scale * 0.75);
            let p = this.level.actors[0];
            if (p instanceof Player) {
                this.cx.fillText("score=" + p.score, scale * 7, scale * 0.75);
            }
        };
        this.clearDisplay = () => {
            var gradient = this.cx.createLinearGradient(0, 0, 0, scale * 12);
            gradient.addColorStop(0, "rgba(64, 128, 128, 1)");
            gradient.addColorStop(1, "rgba(128, 64, 128, 1)");
            this.cx.fillStyle = gradient;
            this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.drawActors = () => {
            this.level.actors.forEach((actor) => {
                var width = actor.size.x * scale;
                var height = actor.size.y * scale;
                var posX = actor.pos.x * scale;
                var posY = actor.pos.y * scale;
                var spriteX = 0;
                var spriteY = 0;
                var sprites = document.createElement("img");
                sprites.src = actor.sprites;
                if (actor.sprites === "img/actors/player.png" && actor instanceof Player) {
                    this.drawPlayer(actor, sprites, spriteX, spriteY, posX, posY, width, height);
                }
                else if (actor.sprites === "img/actors/bullet.png" && actor instanceof Bullet) {
                    if (actor.action === "touched") {
                        spriteX = 1;
                    }
                    this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, posX, posY, width, height);
                }
                else if (actor.sprites === "img/actors/enemy.png" && actor instanceof Enemy) {
                    if (actor.type === "crook") {
                        this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, posX, posY, width, height);
                    }
                    else if (actor.type === "boss") {
                        this.cx.drawImage(sprites, spriteX * width / 2, spriteY * height / 2, width / 2, height / 2, posX, posY, width, height);
                    }
                }
            });
        };
        this.drawPlayer = (player, sprites, spriteX, spriteY, posX, posY, width, height) => {
            this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, posX, posY, width, height);
            if (player.focus) {
                var circle = document.createElement("img");
                circle.src = "img/actors/circle.png";
                this.cx.globalAlpha = 0.75;
                this.cx.translate(posX + width / 2, posY + height / 2);
                this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
                this.cx.drawImage(circle, 0, 0, scale, scale, -scale / 2, -scale / 2, scale, scale);
                this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
                this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
                this.cx.drawImage(circle, 0, 0, scale, scale, -scale / 2, -scale / 2, scale, scale);
                this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
                this.cx.translate(-(posX + width / 2), -(posY + height / 2));
                this.cx.globalAlpha = 1;
            }
        };
        this.canvas.width = 12 * scale * this.zoom;
        this.canvas.height = 16 * scale * this.zoom;
        parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, this.zoom);
        this.cx.imageSmoothingEnabled = false;
        this.level = level;
        this.drawFrame(0);
    }
}
