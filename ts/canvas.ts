class CanvasDisplay {

	public canvas: HTMLCanvasElement = document.createElement('canvas');
	public cx: CanvasRenderingContext2D = this.canvas.getContext("2d", { alpha: false });
	public zoom: number = 3;
	public animationTime: number = 0;
	public level: Level;
	public viewport: any;

	constructor(parent: HTMLElement, level: Level) {
		this.canvas.width = 12 * scale * this.zoom;
		this.canvas.height = 16 * scale * this.zoom;
		parent.appendChild(this.canvas);
		this.cx.scale(this.zoom, this.zoom);
		this.cx.imageSmoothingEnabled = false;
		this.level = level;

		this.drawFrame(0);
	}

	public drawFrame = (step: number): void => {
		this.animationTime += step;
		this.clearDisplay();
		this.drawBackground();
		this.drawActors();
		this.drawHUD();
	}

	public drawBackground = (): void => {
	}

	public drawHUD = (): void => {
		this.cx.font = "16px rcr";
		this.cx.fillStyle = "white";
		this.cx.fillText("time=" + Math.floor(this.level.time), scale * 0.5, scale * 0.75);
		let p = this.level.actors[0];
		if (p instanceof Player) {
			this.cx.fillText("score=" + p.score, scale * 7, scale * 0.75);
		}
	}

	public clearDisplay = (): void => {
		var gradient: CanvasGradient = this.cx.createLinearGradient(0, 0, 0, scale * 12);
		gradient.addColorStop(0, "rgba(64, 128, 128, 1)");
		gradient.addColorStop(1, "rgba(128, 64, 128, 1)");
		this.cx.fillStyle = gradient;
		this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

			if (actor.sprites === "img/actors/player.png" && actor instanceof Player) {
				this.drawPlayer(actor, sprites, spriteX, spriteY, posX, posY, width, height);
			}
			else if (actor.sprites === "img/actors/bullet.png" && actor instanceof Bullet) {
				if (actor.action === "touched") {
					spriteX = 1;
				}
				this.cx.drawImage(sprites,
					spriteX * width, spriteY * height, width, height,
					posX, posY, width, height);
			}

			// Enemys
			else if (actor.sprites === "img/actors/enemy.png" && actor instanceof Enemy) {
				if (actor.type === "mobTrash") {
					this.cx.drawImage(sprites,
						spriteX * width, spriteY * height, width, height,
						posX, posY, width, height);
				}
				else if (actor.type === "mobZigzag") {
					this.cx.drawImage(sprites,
						spriteX * width, spriteY * height, width, height,
						posX, posY, width, height);
				}
				else if (actor.type === "mobTank") {
					this.cx.drawImage(sprites,
						spriteX * width, spriteY * height, width, height,
						posX, posY, width, height);
				}
				else if (actor.type === "mobDistance") {
					this.cx.drawImage(sprites,
						spriteX * width, spriteY * height, width, height,
						posX, posY, width, height);
				}
				else if (actor.type === "mobBoss") {
					this.cx.drawImage(sprites,
						spriteX * width, spriteY * height, width, height,
						posX, posY, width, height);
				}
			}
		});
	}

	public drawPlayer = (player: Player, sprites: HTMLImageElement, spriteX: number, spriteY: number, posX: number, posY: number, width: number, height: number): void => {

		this.cx.drawImage(sprites,
			spriteX * width, spriteY * height, width, height,
			posX, posY, width, height);

		if (player.focus) {
			var circle: HTMLImageElement = document.createElement("img");
			circle.src = "img/actors/circle.png";

			this.cx.globalAlpha = 0.75;

			this.cx.translate(posX + width/2, posY + height/2);
			this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);

			this.cx.drawImage(circle,
				0, 0, scale, scale,
				-scale/2, -scale/2, scale, scale);

			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));

			this.cx.drawImage(circle,
				0, 0, scale, scale,
				-scale/2, -scale/2, scale, scale);

			this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
			this.cx.translate(-(posX + width/2), -(posY + height/2));

			this.cx.globalAlpha = 1;

		}
	}
}