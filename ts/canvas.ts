class CanvasDisplay {

	public canvas: HTMLCanvasElement = document.createElement('canvas');
	public cx: CanvasRenderingContext2D = this.canvas.getContext("2d", { alpha: false });
	public zoom: number = 1;
	public animationTime: number = 0;
	public level: Level;
	public viewport: any;

	constructor(parent: HTMLElement, level: Level) {
		this.canvas.width = 36 * scale * this.zoom;
		this.canvas.height = 48 * scale * this.zoom;
		this.cx.translate(0, 12 * scale * this.zoom);
		parent.appendChild(this.canvas);
		this.cx.scale(this.zoom, this.zoom);
		this.cx.imageSmoothingEnabled = false;
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
		var house: HTMLImageElement = document.createElement("img");
		house.src = "img/island2.png";
		var cloud: HTMLImageElement = document.createElement("img");
		cloud.src = "img/cloud.png";
		var compass: HTMLImageElement = document.createElement("img");
		compass.src = "img/compass.png";
		var arrows: HTMLImageElement = document.createElement("img");
		arrows.src = "img/arrows.png";

		this.cx.fillStyle = "rgb(0, 148, 255)";
		this.cx.fillRect(0, -scale*12, scale*36, scale*12);

		var opa: number = (Math.round(this.level.time*100)/100) / 100 > 100 ? 100 : (Math.round(this.level.time*100)/100) / 100;
		this.cx.globalAlpha = opa;

		this.cx.drawImage(background,
			0, 0, scale*36, scale*12,
			0, -scale*12, scale*36, scale*12);

		this.cx.drawImage(house,
			(Math.round(this.level.time) % 2) * scale * 8, 0, scale*8, scale*8,
			scale*28, -scale*12, scale*8, scale*8);

		this.cx.globalAlpha = 1;

		this.cx.drawImage(compass,
			0, 0, scale*4, scale*4,
			scale*3, -scale*9, scale*4, scale*4);
		
		var windX: number;
		var windY: number;
		
		if (this.level.wind.x === 1) { windX = 1; }
		else if (this.level.wind.x > 1) { windX = 2; }
		else { windX = 0; }
		
		if (this.level.wind.y === 1) { windY = 1; }
		else if (this.level.wind.y > 1) { windY = 2; }
		else { windY = 0; }

		console.log(windX + " " + windY)

		this.cx.drawImage(arrows,
			windX * scale*4, windY * scale*4, scale*4, scale*4,
			scale*3, -scale*9, scale*4, scale*4);

		this.cx.drawImage(cloud,
			0, 0, scale*36, scale*4,
			0, -scale*2, scale*36, scale*4);
	}

	public drawHUD = (): void => {
		this.cx.font = "32px rcr";
		this.cx.fillStyle = "white";
		this.cx.fillText("time=" + Math.floor(this.level.time), scale * 0.5, scale*-10.5);
		let p = this.level.actors[0];
		if (p instanceof Player) {
			this.cx.fillText("score=" + p.score, scale * 21, scale*-10.5);
		}
	}

	public drawBckground = (): void => {
		this.cx.fillStyle = "rgb(0, 98, 224)";
		this.cx.fillRect(0, 0, scale*36, scale*36);
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
				if (actor.action === "touched") {
					spriteY = 1;
					spriteX = Math.round(this.level.time * 8) % 2;
				}
				this.cx.drawImage(sprites,
					spriteX+1 * 179, spriteY * 179, 179, 179,
					posX, posY, width, height);
			}
			else if (actor instanceof Enemy) {
				if (actor.type === "crook") {
					this.cx.drawImage(sprites,
						(Math.round(this.level.time * 2) % 2) * 512, spriteY * 512, 512, 512,
						posX - width/2, posY - width / 2, width*2, height*2);
				}
				else if (actor.type === "boss") {
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
				0, 0, scale*4, scale*4,
				-scale*2, -scale*2, scale*4, scale*4);

			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));
			this.cx.rotate(-(this.animationTime * 45 % 360 * Math.PI / 180));

			this.cx.drawImage(circle,
				0, 0, scale*4, scale*4,
				-scale*2, -scale*2, scale*4, scale*4);

			this.cx.rotate(this.animationTime * 45 % 360 * Math.PI / 180);
			this.cx.translate(-(posX + width/2), -(posY + height/2));

			this.cx.globalAlpha = 1;

		}
	}
}