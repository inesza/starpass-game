import Blocker from "./blocker.js"
import Jammer from "./jammer.js"
import Track from "./track.js"


class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.init()
        this.track = new Track(this.canvas, this.ctx)
        this.jammer = new Jammer(this.canvas, this.ctx)
        this.frames = 0
        this.score = 0
        this.blockers = []
    }
    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.createEventListeners()
    }

    startGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.frames % 30 === 0) {
            this.blockers.push(new Blocker(this.canvas, this.ctx))
        }
        this.track.draw();
        this.track.move();

        this.jammer.draw();

        for (const blocker of this.blockers) {
            blocker.draw()
            if (this.checkCollision(blocker, this.jammer)) {
                this.fightMode()
                return
            }
            blocker.move()
            this.updateScore(blocker, this.jammer);
        }
        
        this.frames = requestAnimationFrame(() => { this.startGame() });
    }

    updateScore(blocker, jammer) {
        let scoreCounter = document.getElementById('score-counter')
        if (jammer.topEdge() > blocker.topEdge()) {
            this.score++
            scoreCounter.innerHTML = this.score
        }
    }

    checkCollision(blocker, jammer) {
		const isInX =
			blocker.rightEdge() >= jammer.leftEdge() &&
			blocker.leftEdge() <= jammer.rightEdge()
		const isInY =
			blocker.topEdge() <= jammer.bottomEdge() &&
			blocker.bottomEdge() >= jammer.topEdge()
		return isInX && isInY
	}

    stopGame() {
        cancelAnimationFrame(this.frames);
    }

    fightMode() {
        cancelAnimationFrame(this.frames);
        document.getElementById('fight-screen-dialog').showModal()
    }

    createEventListeners() {
		document.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "ArrowLeft":
					this.jammer.moveLeft()
					break
				case "ArrowRight":
					this.jammer.moveRight()
					break
				default:
					break
			}
		})
	}
}

export default Game