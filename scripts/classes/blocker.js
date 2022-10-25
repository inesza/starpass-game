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
        // this.strength = Math.floor(Math.random() * 10)
        this.strength = 100
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