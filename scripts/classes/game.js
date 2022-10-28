import Blocker from "./blocker.js"
import Track from "./track.js"
import Booster from "./booster.js"

let scoreCounter = document.getElementById('score-counter')
class Game {
    constructor(jammer) {
        this.canvas = null
        this.ctx = null
        this.init()
        this.track = new Track(this.canvas, this.ctx)
        this.jammer = jammer
        this.frames = 0
        this.framesModulo = 120
        this.score = 0
        this.blockers = []
        this.boosters = []
        this.isColliding = false
        this.pressedKeys = {
            right: false,
            left: false,
        }
        this.gameIsOver = false
    }
    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.createEventListeners()
    }

    startGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.frames % this.framesModulo === 0) {
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
        for (const key in this.pressedKeys) {
            if (this.pressedKeys[key]) {
                this.jammer.move(key)
            }
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
            if (blocker.topEdge() >= this.canvas.height && blocker.topEdge() < this.canvas.height + 4) {
                this.score += 1
                if (this.score <= 1) {
                    scoreCounter.innerHTML = `<span>${this.score}</span> point`
                } else {
                    scoreCounter.innerHTML = `<span>${this.score}</span> points`
                }
            }
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

        if (this.frames % 300 === 0 && this.frames != 0) {
            this.framesModulo -= 10
        }
        this.frames = requestAnimationFrame(() => { this.startGame() });
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

        // Making sure nothing executes twice
        document.getElementById('fight-screen-dialog').close()

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
            this.gameIsOver = true
            document.getElementById('fight-screen-dialog').close()
            if (!document.getElementById('sound-switch').classList.contains("sound-off")) {
                let fail = new Audio('./assets/sounds/fail.mp3')
                fail.play()
            }

            document.getElementById('game-zone').style.display = 'none'
            document.getElementById('game-over').style.display = "flex"

            this.jammer.stamina = 100

            this.jammer.updateStamina()
            document.getElementById('final-score').textContent = this.score
            document.getElementById('start-container').classList.add("hidden")
            this.score = 0
            scoreCounter.innerHTML = `<span>${this.score}</span> point`
            this.blockers = []
            this.boosters = []
            this.frames = 0
            this.framesModulo = 120
        }

    }

    createEventListeners() {
        // For keyboards
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.pressedKeys.left = true
                    break
                case "ArrowRight":
                    this.pressedKeys.right = true
                    break
                case "Escape":
                    event.preventDefault()
                default:
                    break
            }
        })
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.pressedKeys.left = false
                    break
                case "ArrowRight":
                    this.pressedKeys.right = false
                    break
            }
        });

        // For touchscreens
        this.canvas.addEventListener('touchstart', (e) => {
            let clientX = e.touches[0].clientX;
            if (clientX > this.canvas.width / 2) {
                this.pressedKeys.right = true
            } else {
                this.pressedKeys.left = true
            }
        }, false)

        this.canvas.addEventListener('touchend', (e) => {
            this.pressedKeys.right = false
            this.pressedKeys.left = false
        }, false)
    }

}

export default Game