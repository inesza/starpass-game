class Jammer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 50
        this.height = 50
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - 100
        // this.image = new Image();
        // this.image.src = image;
        this.icon = new Image()
        this.icon.src = "./assets/jammer-icon.png";
        this.speedX = 0;
        this.outSide = null;
    }

    draw() {
        this.ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
    }

	moveLeft() {
		if (this.x <= 5) {
			return
		}
		this.x -= 5
	}
	moveRight() {
		if (this.x >= this.canvas.width - this.width - 5) {
			return
		}
		this.x += 5
	}

    bottomEdge() {
		return this.y + this.height
	}
	leftEdge() {
		return this.x
	}
	rightEdge() {
		return this.x + this.width
	}
	topEdge() {
		return this.y
	}

}

export default Jammer