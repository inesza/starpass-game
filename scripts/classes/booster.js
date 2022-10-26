class Booster {
    constructor(canvas, ctx) {
        this.ctx = ctx
        this.canvas = canvas
        this.x = (Math.floor(Math.random() * (this.canvas.width)))
        this.width = 50
        this.height = 50
        this.y = (Math.floor(Math.random() * 30) * -1)
        this.icon = new Image()
        this.icon.src = "./assets/booster-icon.png"
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

    checkBooster(jammer) {
        if (!jammer.isBoosted) {
            const boosterInX =
                this.rightEdge() >= jammer.leftEdgeJ() && 
                this.leftEdge() <= jammer.rightEdgeJ()
            const boosterInY =
                this.topEdge() <= jammer.bottomEdgeJ() &&
                this.bottomEdge() >= jammer.topEdgeJ()
            if (boosterInX && boosterInY) {
                if (jammer.stamina <= 95) {
                    jammer.stamina += 5
                    jammer.updateStamina()
                }
                jammer.isBoosted = true;
                setTimeout(() => {
                    jammer.isBoosted = false
                }, 1000)

            }

        }
    }
}

export default Booster