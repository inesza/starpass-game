import Blocker from "./blocker.js"
import Jammer from "./jammer.js"
import Track from "./track.js"
import Booster from "./booster.js"


class Game {
    constructor(jammer) {
        this.canvas = null
        this.ctx = null
        this.init()
        this.track = new Track(this.canvas, this.ctx)
        this.jammer = jammer
        this.frames = 0
        this.score = 0
        this.blockers = []
        this.boosters = []
        this.isColliding = false
    }
    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.createEventListeners()
    }

    startGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.frames % 120 === 0) {
            let x = (Math.floor(Math.random() * (this.canvas.width / 2)))
            let y = -20
            let rand = Math.floor(Math.random() * 50)
            this.blockers.push(new Blocker(this.canvas, this.ctx, x, y))
            this.blockers.push(new Blocker(this.canvas, this.ctx, x + 50, y + rand))
            this.blockers.push(new Blocker(this.canvas, this.ctx, x + 120, y - rand))
            this.blockers.push(new Blocker(this.canvas, this.ctx, x + 200, y))
            this.boosters.push(new Booster(this.canvas, this.ctx))
        }
        this.track.draw();
        this.track.move();
        if (this.isColliding) {
            if (this.frames % 20 < 10) {
                this.ctx.globalAlpha = .3
                this.jammer.draw()
                this.ctx.globalAlpha = 1
            } else {
                this.jammer.draw()

            }
        } else {
            this.jammer.draw()
        }
        for (const booster of this.boosters) {
            booster.draw()
            booster.move()
            booster.checkBooster(this.jammer)
        }
        for (const blocker of this.blockers) {
            blocker.draw()
            blocker.draw()
            blocker.draw()
            blocker.draw()
            blocker.move()

            if (this.isColliding) {
                continue
            }
            if (this.checkCollision(blocker, this.jammer)) {
                this.isColliding = true
                this.fightMode()
                return
            }
        }
        this.updateScore();

        this.frames = requestAnimationFrame(() => { this.startGame() });
    }

    updateScore() {
        let scoreCounter = document.getElementById('score-counter')
        if (this.frames % 120 === 0 && this.frames > 0) {
            this.score += 4
            scoreCounter.innerHTML = this.score
        }
    }

    checkCollision(blocker, jammer) {
        const isInX =
            blocker.rightEdge() >= jammer.leftEdgeJ() &&
            blocker.leftEdge() <= jammer.rightEdgeJ()
        const isInY =
            blocker.topEdge() <= jammer.bottomEdgeJ() &&
            blocker.bottomEdge() >= jammer.topEdgeJ()
        return isInX && isInY
    }

    stopGame() {
        cancelAnimationFrame(this.frames)
    }

    fightMode() {
        let blockerPics = ['./assets/indian-blocker.png', './assets/red-blocker.png', './assets/turquoise-blocker.png']
        let rand = Math.floor(Math.random() * blockerPics.length)
        cancelAnimationFrame(this.frames)
        let blocker = new Blocker(this.canvas, this.ctx)
        document.getElementById('fight-screen-dialog').showModal()
        document.getElementById('blocker-strength').innerHTML = blocker.strength
        document.getElementById('blocker-speed').innerHTML = blocker.speed
        document.getElementById('jammer-strength').innerHTML = this.jammer.strength
        document.getElementById('jammer-speed').innerHTML = this.jammer.speed
        document.getElementById('random-blocker-pic').src = blockerPics[rand]
        this.jammer.fight(blocker, this.jammer, this)
    }

    gameOver() {
        if (this.jammer.stamina <= 0) {
            document.getElementById('fight-screen-dialog').close()
            document.getElementById('game-zone').style.display = 'none'
            document.getElementById('game-over').style.display = "flex"
            document.getElementById('final-score').innerHTML = this.score
            this.jammer.stamina = 100

            this.jammer.updateStamina()
            this.updateScore()
            this.score = 0
            this.blockers = []
            this.boosters = []
        }

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
                case "Escape":
                    event.preventDefault()
                default:
                    break
            }
        })
        document.addEventListener("keyup", (e) => {

        });
    }

}

export default Game