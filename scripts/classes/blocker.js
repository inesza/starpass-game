class Blocker {
    constructor(canvas, ctx, x, y) {
        this.ctx = ctx
        this.canvas = canvas
        this.x = x
        this.width = 50
        this.height = 50
        this.y = y
        this.icon = new Image()
        this.icon.src = "./assets/blocker-icon.png"
        this.strength = Math.floor(Math.random() * 10)
        this.speed = Math.floor(Math.random() *10)
    }

    draw() {
        this.ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += 4
    }

    bottomEdge() {
		return this.y + this.height - 5
	}
	leftEdge() {
		return this.x + 5
	}
	rightEdge() {
		return this.x + this.width - 5
	}
	topEdge() {
		return this.y + 5
	}

}

export default Blocker