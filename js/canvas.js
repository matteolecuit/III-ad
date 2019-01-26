class CanvasDisplay {
    constructor(parent, level) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");
        this.zoom = 1;
        this.animationTime = 0;
        this.heightMore = 0;
        this.drawFrame = (step) => {
            this.animationTime += step;
            this.drawBckground();
            this.drawActors();
            this.drawSKy();
            this.drawHUD();
        };
        this.drawSKy = () => {
            var background = document.createElement("img");
            background.src = "img/island.png";
            var house = document.createElement("img");
            house.src = "img/island2.png";
            var cloud = document.createElement("img");
            cloud.src = "img/cloud.png";
            var compass = document.createElement("img");
            compass.src = "img/compass.png";
            var arrows = document.createElement("img");
            arrows.src = "img/arrows.png";
            this.cx.fillStyle = "rgb(0, 148, 255)";
            this.cx.fillRect(0, -scale * 12, scale * 36, scale * 12);
            var limit = 200;
            var opa = (Math.round(this.level.time * 100) / 100) / limit > limit ? limit : (Math.round(this.level.time * 100) / 100) / limit;
            this.cx.globalAlpha = opa;
            this.cx.drawImage(background, 0, 0, scale * 36, scale * 12, 0, -scale * 12, scale * 36, scale * 12);
            this.cx.drawImage(house, (Math.round(this.level.time) % 2) * scale * 8, 0, scale * 8, scale * 8, scale * 28, -scale * 12, scale * 8, scale * 8);
            this.cx.globalAlpha = 1;
            this.cx.drawImage(compass, 0, 0, 400, 400, scale, -scale * 11, scale * 8, scale * 8);
            var windX;
            var windY;
            if (this.level.wind.x === 0) {
                windX = 1;
            }
            else if (this.level.wind.x > 0) {
                windX = 2;
            }
            else {
                windX = 0;
            }
            if (this.level.wind.y === 0) {
                windY = 1;
            }
            else if (this.level.wind.y > 0) {
                windY = 2;
            }
            else {
                windY = 0;
            }
            this.cx.drawImage(arrows, windX * 400, windY * 400, 400, 400, scale, -scale * 11, scale * 8, scale * 8);
            let player = this.level.actors[0];
            if (player instanceof Player && player.bombCoolDown > 40) {
                if (player.bombCoolDown % 2) {
                    this.cx.fillStyle = "rgb(255, 255, 255)";
                    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }
            }
            this.cx.drawImage(cloud, 0, 0, 3584, 640, -scale * 2, -scale * 3, scale * 40, scale * 6);
        };
        this.drawHUD = () => {
            this.cx.font = "32px rcr";
            this.cx.fillStyle = "white";
            this.cx.fillText("time=" + Math.floor(this.level.time), scale * 12, scale * -10.5);
            let p = this.level.actors[0];
            if (p instanceof Player) {
                this.cx.fillText("score=" + p.score, scale * 21, scale * -10.5);
            }
        };
        this.drawBckground = () => {
            this.cx.fillStyle = "rgb(0, 98, 224)";
            this.cx.fillRect(0, 0, scale * 36, scale * 36);
            var waterEffect = document.createElement("img");
            waterEffect.src = "img/waterEffect.png";
            this.cx.globalAlpha = 0.5;
            this.cx.drawImage(waterEffect, 0, 0, 490, 640, 0, this.animationTime * 100 - 640 * this.heightMore, scale * 36, 640);
            this.cx.drawImage(waterEffect, 0, 0, 490, 640, 0, this.animationTime * 100 - 640 * (this.heightMore - 1), scale * 36, 640);
            if (this.animationTime * 100 > (640 * this.heightMore)) {
                this.heightMore++;
            }
            this.cx.globalAlpha = 1;
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
                if (actor instanceof Player) {
                    this.drawPlayer(actor, sprites, spriteX, spriteY, posX, posY, width, height);
                }
                else if (actor instanceof Bullet) {
                    if (actor.target === "enemy") {
                        spriteX = 1;
                    }
                    if (actor.action === "touched") {
                        spriteY = 1;
                        spriteX = Math.round(this.level.time * 8) % 2;
                    }
                    this.cx.drawImage(sprites, spriteX * 179, spriteY * 179, 179, 179, posX, posY, width, height);
                }
                else if (actor instanceof Enemy) {
                    if (actor.type === "mobTrash") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - width / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobZigzag") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - width / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobTank") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - width / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobDistance") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - width / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobBoss") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - width / 2, width * 2, height * 2);
                    }
                }
            });
        };
        this.drawPlayer = (player, sprites, spriteX, spriteY, posX, posY, width, height) => {
            spriteX = Math.round(this.level.time * 2) % 2;
            if (player.speed.x > player.moveSpeed / 2) {
                spriteY = 2;
            }
            if (player.speed.x < -player.moveSpeed / 2) {
                spriteY = 1;
            }
            this.cx.drawImage(sprites, spriteX * 624, spriteY * 1088, 624, 1088, posX - width * 2, posY - height * 3, width * 5, height * 7);
            if (player.focus) {
                var hitbox = document.createElement("img");
                hitbox.src = "img/actors/hitbox.png";
                this.cx.drawImage(hitbox, 0, 0, 624, 1088, posX - width * 2, posY - height * 3, width * 5, height * 7);
                var circle = document.createElement("img");
                circle.src = "img/actors/circle.png";
                this.cx.globalAlpha = 0.5;
                this.cx.translate(posX + width / 2, posY + height / 2);
                this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
                this.cx.drawImage(circle, 0, 0, scale * 4, scale * 4, -scale * 2, -scale * 2, scale * 4, scale * 4);
                this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
                this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
                this.cx.drawImage(circle, 0, 0, scale * 4, scale * 4, -scale * 2, -scale * 2, scale * 4, scale * 4);
                this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
                this.cx.translate(-(posX + width / 2), -(posY + height / 2));
                this.cx.globalAlpha = 1;
            }
        };
        this.canvas.width = 36 * scale * this.zoom;
        this.canvas.height = 48 * scale * this.zoom;
        this.cx.translate(0, 12 * scale * this.zoom);
        parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, this.zoom);
        this.level = level;
        this.drawFrame(0);
    }
}
