class CanvasDisplay {

	public canvas: HTMLCanvasElement = document.createElement('canvas');
	public cx: CanvasRenderingContext2D = this.canvas.getContext("2d");
	public zoom: number = 1;
	public animationTime: number = 0;
	public level: Level;
	public viewport: any;
	public heightMore: number = 0;

	constructor(parent: HTMLElement, level: Level) {
		this.canvas.width = 36 * scale * this.zoom;
		this.canvas.height = 48 * scale * this.zoom;
		this.cx.translate(0, 12 * scale * this.zoom);
		parent.appendChild(this.canvas);
		this.cx.scale(this.zoom, this.zoom);
		this.level = level;

		this.drawFrame(0);
	}

	public drawFrame = (step: number): void => {
		this.animationTime += step;
		this.drawBckground();
		this.drawActors();
		this.drawSKy();
		this.drawHUD();
	}

	public drawSKy = (): void => {
		var background: HTMLImageElement = document.createElement("img");
		background.src = "img/island.png";
		var cloud: HTMLImageElement = document.createElement("img");
		cloud.src = "img/cloud.png";
		var compass: HTMLImageElement = document.createElement("img");
		compass.src = "img/compass.png";
		var arrows: HTMLImageElement = document.createElement("img");
		arrows.src = "img/arrows.png";

		var gradient: CanvasGradient = this.cx.createLinearGradient(0, 0, 0, -scale * 16);
		gradient.addColorStop(0, "rgba(255, 255, 230, 1)");
		gradient.addColorStop(1, "rgba(100, 200, 212, 1)");
		this.cx.fillStyle = gradient;
		this.cx.fillRect(0, -scale * 12, scale * 36, scale * 12);

		var limit: number = 180;
		var opa: number = (Math.round(this.level.time * 100) / 100) / limit > limit ? limit : (Math.round(this.level.time * 100) / 100) / limit;

		this.cx.globalAlpha = opa;

		this.cx.drawImage(background,
			0, 0, 976, 448,
			scale*6, -scale * 10, scale * 28, scale * 10);

		this.cx.globalAlpha = 1;

		this.cx.drawImage(compass,
			0, 0, 400, 400,
			scale, -scale * 11, scale * 8, scale * 8);

		var windX: number;
		var windY: number;

		if (this.level.wind.x === 0) { windX = 1; }
		else if (this.level.wind.x > 0) { windX = 2; }
		else { windX = 0; }

		if (this.level.wind.y === 0) { windY = 1; }
		else if (this.level.wind.y > 0) { windY = 2; }
		else { windY = 0; }

		this.cx.drawImage(arrows,
			windX * 400, windY * 400, 400, 400,
			scale, -scale * 11, scale * 8, scale * 8);


		let player = this.level.actors[0];
		if (player instanceof Player && player.bombCoolDown > 40) {
			if (player.bombCoolDown % 2) {
				this.cx.fillStyle = "rgb(255, 255, 255)";
				this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}
		}
		var buffer: number = Math.floor(this.level.time) % 2;
		this.cx.drawImage(cloud,
			0, 640 * buffer, 3584, 640,
			-scale * 2, -scale * 3, scale * 40, scale * 6);
	}

	public drawHUD = (): void => {
		this.cx.font = "48px rcr";
		this.cx.fillStyle = "rgb(255, 255, 128)";
		this.cx.fillText("time=" + Math.floor(this.level.time), scale * 26, scale * 35.5);
		this.cx.fillStyle = "black";
		let p = this.level.actors[0];
		if (p instanceof Player) {
			var score: string = p.score.toString();
			while (score.length < 7) {
				score = "0" + score;
			}
			this.cx.fillText("score=" + score, scale * 19, scale * -10);
		}

		var bomb: HTMLImageElement = document.createElement("img");
		bomb.src = "img/bomb.png";

		let bombman: Actor = this.level.actors[0];
		if (bombman && bombman instanceof Player) {
			for (let i = 0; i < bombman.numberBomb; i++) {
				this.cx.drawImage(bomb,
					0, 0, 262, 242,
					scale * (9 + i*3), -scale * 11.5, scale * 3, scale * 3);

			}
		}
	}

	public drawBckground = (): void => {
		this.cx.fillStyle = "rgb(0, 98, 224)";
		this.cx.fillRect(0, 0, scale * 36, scale * 36);
		var waterEffect: HTMLImageElement = document.createElement("img");
		waterEffect.src = "img/waterEffect.png";

		var gradient: CanvasGradient = this.cx.createLinearGradient(0, 0, 0, scale * 32);
		gradient.addColorStop(0, "rgba(0, 98, 224, 1)");
		gradient.addColorStop(1, "rgba(32, 64, 128, 1)");
		this.cx.fillStyle = gradient;
		this.cx.fillRect(0, 0, scale * 36, scale * 36);

		this.cx.globalAlpha = 0.5;
		this.cx.drawImage(waterEffect, 0, 0, 490, 640, 0, this.animationTime * 100 - 640 * this.heightMore , scale * 36, 640);
		this.cx.drawImage(waterEffect, 0, 0, 490, 640, 0, this.animationTime * 100 - 640 * ( this.heightMore - 1 ), scale * 36, 640);
		if (this.animationTime * 100 > ( 640 * this.heightMore )) {
			this.heightMore++;
		}
		this.cx.globalAlpha = 1;
	}

	public drawActors = (): void => {
		this.level.actors.forEach((actor: Actor) => {
			var width: number = actor.size.x * scale;
			var height: number = actor.size.y * scale;
			var posX: number = actor.pos.x * scale;
			var posY: number = actor.pos.y * scale;
			var spriteX: number = 0;
			var spriteY: number = 0;
			var sprites: HTMLImageElement = document.createElement("img");
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
				this.cx.drawImage(sprites,
					spriteX * 179, spriteY * 179, 179, 179,
					posX, posY, width, height);
			}

			else if (actor instanceof Enemy) {
				if (actor.type === "mobTrash") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width / 2, posY - width / 2, width * 2, height * 2);
				}
				else if (actor.type === "mobZigzag") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width / 2, posY - width / 2, width * 2, height * 2);
				}
				else if (actor.type === "mobTank") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width / 2, posY - width / 2, width * 2, height * 2);
				}
				else if (actor.type === "mobRanged") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width / 2, posY - width / 2, width * 2, height * 2);
				}
				else if (actor.type === "mobBoss") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width / 2, posY - width / 2, width * 2, height * 2);
				}
			}
		});
	}

	public drawPlayer = (player: Player, sprites: HTMLImageElement, spriteX: number, spriteY: number, posX: number, posY: number, width: number, height: number): void => {

		spriteX = Math.round(this.level.time * 2) % 2;

		if (player.speed.x > player.moveSpeed / 2) {
			spriteY = 2;
		}
		if (player.speed.x < -player.moveSpeed / 2) {
			spriteY = 1;
		}

		this.cx.drawImage(sprites,
			spriteX * 624, spriteY * 1088, 624, 1088,
			posX - width * 2, posY - height * 3, width * 5, height * 7);

		if (player.focus) {
			var hitbox: HTMLImageElement = document.createElement("img");
			hitbox.src = "img/actors/hitbox.png";

			this.cx.drawImage(hitbox,
				0, 0, 624, 1088,
				posX - width * 2, posY - height * 3, width * 5, height * 7);

			var circle: HTMLImageElement = document.createElement("img");
			circle.src = "img/actors/circle.png";

			this.cx.globalAlpha = 0.5;

			this.cx.translate(posX + width / 2, posY + height / 2);
			this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);

			this.cx.drawImage(circle,
				0, 0, scale * 4, scale * 4,
				-scale * 2, -scale * 2, scale * 4, scale * 4);

			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));

			this.cx.drawImage(circle,
				0, 0, scale * 4, scale * 4,
				-scale * 2, -scale * 2, scale * 4, scale * 4);

			this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
			this.cx.translate(-(posX + width / 2), -(posY + height / 2));

			this.cx.globalAlpha = 1;

		}
	}
}