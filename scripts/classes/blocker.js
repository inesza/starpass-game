class Blocker {
    constructor(canvas, ctx) {
        this.ctx = ctx
        this.canvas = canvas
        this.x = Math.floor(Math.random() * (this.canvas.width / 2)) + 20
        this.width = 50
        this.height = 50
        this.y = -20
        this.icon = new Image()
        this.icon.src = "./assets/blocker-icon.png"
        // this.strength = Math.floor(Math.random() * 10)
        this.strength = 9
        this.speed = Math.floor(Math.random() *10)
    }

    draw() {
        this.ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += 4
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

export default Blocker