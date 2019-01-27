class CanvasDisplay {
    constructor(parent, level) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");
        this.zoom = 1;
        this.animationTime = 0;
        this.heightMore = 0;
        this.restart = false;
        this.preShake = () => {
            if (this.level.roundTime > 150 && this.level.roundTime < 152) {
                this.cx.save();
                var dx = Math.random() * 10;
                var dy = Math.random() * 10;
                this.cx.translate(dx, dy);
            }
        };
        this.postShake = () => {
            if (this.level.roundTime > 150 && this.level.roundTime < 152) {
                this.cx.restore();
            }
        };
        this.drawFrame = (step) => {
            this.animationTime += step;
            this.preShake();
            this.drawBckground();
            this.drawActors();
            this.drawSKy();
            this.drawHUD();
            this.postShake();
            if (this.level.gameOver) {
                this.canvas.remove();
                if (!this.restart) {
                    let flexDiv = document.createElement("div");
                    flexDiv.style.margin = "auto";
                    flexDiv.style.width = "300px";
                    flexDiv.style.display = "flex";
                    flexDiv.style.flexWrap = "wrap";
                    flexDiv.style.textAlign = "center";
                    this.parent.appendChild(flexDiv);
                    let gameOverP = document.createElement("p");
                    gameOverP.style.margin = "auto";
                    gameOverP.style.fontSize = "48";
                    gameOverP.style.marginBottom = "50px";
                    gameOverP.textContent = "Game Over";
                    flexDiv.appendChild(gameOverP);
                    let restartButton = document.createElement("a");
                    restartButton.style.margin = "auto";
                    restartButton.style.marginBottom = "10px";
                    restartButton.text = "Restart";
                    restartButton.href = "game.html";
                    flexDiv.appendChild(restartButton);
                    let menuButton = document.createElement("a");
                    menuButton.style.margin = "auto";
                    menuButton.text = "Menu";
                    menuButton.href = "index.html";
                    flexDiv.appendChild(menuButton);
                    this.restart = true;
                }
            }
            if (this.level.gameWon) {
                this.cx.fillStyle = "white";
                this.cx.fillRect(0, -scale * 12, scale * 36, scale * 48);
                this.cx.font = "28px consolas";
                this.cx.fillStyle = "rgb(0, 0, 0)";
                if (this.level.roundTime < this.level.endTime + 2) {
                    this.cx.fillText("Finaly...", scale * 14, scale * 12);
                }
                else if (this.level.roundTime < this.level.endTime + 6) {
                    this.cx.fillText("This journey is reaching", scale * 6.5, scale * 12);
                    this.cx.fillText("it's end", scale * 14, scale * 14);
                }
                else {
                    var gradient = this.cx.createLinearGradient(0, -scale * 12, 0, scale * 36);
                    gradient.addColorStop(0, "rgba(100, 200, 212, 1)");
                    gradient.addColorStop(1, "rgba(255, 255, 230, 1)");
                    this.cx.fillStyle = gradient;
                    this.cx.fillRect(0, -scale * 12, scale * 36, scale * 48);
                    this.cx.fillStyle = "black";
                    this.cx.font = "28px consolas";
                    this.cx.fillText("Thanks for playing !", scale * 3.5, scale * 12);
                    var background = document.createElement("img");
                    background.src = "img/island.png";
                    this.cx.drawImage(background, 0, 0, 976, 448, -scale * 10, scale * 10, 976, 448);
                }
            }
        };
        this.drawSKy = () => {
            var background = document.createElement("img");
            background.src = "img/island.png";
            var cloud = document.createElement("img");
            if (this.level.roundTime > 150) {
                cloud.src = "img/cloud2.png";
            }
            else {
                cloud.src = "img/cloud.png";
            }
            var compass = document.createElement("img");
            compass.src = "img/compass.png";
            var arrows = document.createElement("img");
            arrows.src = "img/arrows.png";
            var rain = document.createElement("img");
            rain.src = "img/rain.png";
            var gradient = this.cx.createLinearGradient(0, 0, 0, -scale * 16);
            if (this.level.roundTime < 150) {
                gradient.addColorStop(0, "rgba(255, 255, 230, 1)");
                gradient.addColorStop(1, "rgba(100, 200, 212, 1)");
            }
            else {
                gradient.addColorStop(0, "rgba(140, 75, 85, 1)");
                gradient.addColorStop(1, "rgba(51, 57, 73, 1)");
            }
            this.cx.fillStyle = gradient;
            this.cx.fillRect(0, -scale * 12, scale * 36, scale * 12);
            var limit = 150;
            var opa = (Math.round(this.level.time * 100) / 100) / limit > limit ? limit : (Math.round(this.level.time * 100) / 100) / limit;
            this.cx.globalAlpha = opa;
            this.cx.drawImage(background, 0, 0, 976, 448, scale * 6, -scale * 10, scale * 28, scale * 10);
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
            if (this.level.roundTime > 150 && this.level.roundTime < 151) {
                if (Math.floor(this.animationTime * 10000) % 2) {
                    this.cx.fillStyle = "rgb(255, 255, 255)";
                    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }
            }
            this.cx.save();
            if (this.level.wind.x > 0) {
                this.flipHorizontally(this.cx, this.canvas.width / 2);
            }
            if (this.level.roundTime > 150) {
                let rainBuffer = Math.floor(this.level.time * 9) % 4;
                this.cx.drawImage(rain, 512 * rainBuffer, 0, 512, 446, 0, 0, scale * 36, scale * 36);
            }
            this.cx.restore();
            var buffer = Math.floor(this.level.time) % 2;
            this.cx.drawImage(cloud, 0, 640 * buffer, 3584, 640, -scale * 2, -scale * 3, scale * 40, scale * 6);
        };
        this.flipHorizontally = (context, around) => {
            context.translate(around, 0);
            context.scale(-1, 1);
            context.translate(-around, 0);
        };
        this.drawHUD = () => {
            this.cx.font = "36px consolas";
            this.cx.fillStyle = "black";
            let p = this.level.actors[0];
            if (p instanceof Player) {
                var power = p.power.toString();
                while (power.length < 7) {
                    power = "0" + power;
                }
                this.cx.fillText("POWER:" + power, scale * 19.5, scale * -10);
            }
            var bomb = document.createElement("img");
            bomb.src = "img/bomb.png";
            let player = this.level.actors[0];
            if (player && player instanceof Player) {
                for (let i = 0; i < player.numberBomb; i++) {
                    this.cx.drawImage(bomb, 0, 0, 262, 242, scale * (9 + i * 3), -scale * 11.5, scale * 3, scale * 3);
                }
            }
        };
        this.drawBckground = () => {
            this.cx.fillStyle = "rgb(0, 98, 224)";
            this.cx.fillRect(0, 0, scale * 36, scale * 36);
            var waterEffect = document.createElement("img");
            waterEffect.src = "img/waterEffect.png";
            var gradient = this.cx.createLinearGradient(0, 0, 0, scale * 32);
            if (this.level.roundTime < 150) {
                gradient.addColorStop(0, "rgba(0, 98, 224, 1)");
                gradient.addColorStop(1, "rgba(32, 64, 128, 1)");
            }
            else {
                gradient.addColorStop(0, "rgba(0, 64, 96, 1)");
                gradient.addColorStop(1, "rgba(0, 32, 48, 1)");
            }
            this.cx.fillStyle = gradient;
            this.cx.fillRect(0, 0, scale * 36, scale * 36);
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
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - height / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobZigzag" || actor.type === "mobZigzagReverse" || actor.type === "mobZigzagSemi" || actor.type === "mobZigzagReverseSemi") {
                        this.cx.save();
                        if (Math.sin(actor.wobble) < 0) {
                            this.flipHorizontally(this.cx, posX + width / 2);
                        }
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - height / 2, width * 2, height * 2);
                        this.cx.restore();
                    }
                    else if (actor.type === "mobTank") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 640, spriteY * 656, 640, 656, posX - width / 2, posY - height / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobRanged") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512, posX - width / 2, posY - height / 2, width * 2, height * 2);
                    }
                    else if (actor.type === "mobBoss") {
                        this.cx.drawImage(sprites, (Math.round(this.level.time * 2) % 4) * 1575, spriteY * 1100, 1575, 1100, posX - width / 2, posY - height / 4, width * 2, height * 1.5);
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
                this.cx.globalAlpha = 0.75;
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
        this.parent = parent;
        this.parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, this.zoom);
        this.level = level;
        this.drawFrame(0);
    }
}
