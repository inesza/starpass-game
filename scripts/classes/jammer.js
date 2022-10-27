class Jammer {
    constructor(canvas, ctx, strength, speed, image) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 50
        this.height = 50
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - 100
        this.image = new Image();
        this.image.src = image;
        this.icon = new Image()
        this.icon.src = "./assets/jammer-icon.png";
        this.outSide = null;
        this.strength = strength
        this.speed = speed
        this.stamina = 100
        this.speedX = 7
        this.isBoosted = false
    }

    draw() {
        this.ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        if (this.x <= 5) {
            return
        }
        this.x -= this.speedX
    }

    moveRight() {
        if (this.x >= this.canvas.width - this.width - 5) {
            return
        }
        this.x += this.speedX
    }

    move(direction) {
        switch (direction) {
            case "left":
                this.moveLeft()
                break
            case "right":
                this.moveRight()
                break
        }
    }

    bottomEdgeJ() {
        return this.y + this.height - 5
    }
    leftEdgeJ() {
        return this.x + 5
    }
    rightEdgeJ() {
        return this.x + this.width - 5
    }
    topEdgeJ() {
        return this.y + 5
    }

    fight(blocker, jammer, game) {
        document.getElementById('btn-force').addEventListener('click', fightForce)
        document.getElementById('btn-feint').addEventListener('click', fightFeint)
        let brutePower = ''
        let loseMsg = ""
        function fightForce() {
            if (!document.getElementById('sound-switch').classList.contains("sound-off")) {
                let punch = new Audio('./assets/sounds/punch.wav')
                punch.play()
            }
            brutePower = "force"
            loseMsg = "stronger"
            fightOutcome()
        }
        function fightFeint() {
            if (!document.getElementById('sound-switch').classList.contains("sound-off")) {
                let swoosh = new Audio('./assets/sounds/swoosh.wav')
                swoosh.play()
            }
            brutePower = "speed"
            loseMsg = "faster"
            fightOutcome()
        }
        function fightOutcome() {
            if (brutePower === 'force') {
                brutePower = jammer.strength - blocker.strength
            } else if (brutePower === 'speed') {
                brutePower = jammer.speed - blocker.speed
            }
            let rand = Math.floor(Math.random() * (10)) + 1
            let outcome = brutePower + rand
            if (outcome > 5) {
                document.querySelector('section.blocker').style.display = 'none'
                document.querySelector('section.fight-actions').style.display = 'none';
                document.querySelector('section.jammer').classList.add('jammer-continue')
                let continueSection = document.getElementById("continue-template").content.cloneNode(true);
                if (!document.getElementById('sound-switch').classList.contains("sound-off")) {
                    let yay = new Audio('./assets/sounds/yay.wav')
                    yay.play()
                }
                document.getElementById("fight-screen").appendChild(continueSection);
                document.getElementById('btn-continue').addEventListener('click', function () {
                    document.querySelector('.continue-section').remove()
                    document.getElementById('fight-screen-dialog').close()
                    document.querySelector('section.blocker').style.display = 'flex'
                    document.querySelector('section.fight-actions').style.display = 'flex';
                    document.querySelector('section.jammer').style.width = "40%"
                    game.score -= 4
                    setTimeout(() => {
                        game.startGame()
                    }, 500)
                    setTimeout(() => {
                        game.isColliding = false
                    }, 1500)
                })
                document.getElementById('btn-force').removeEventListener('click', fightForce)
                document.getElementById('btn-feint').removeEventListener('click', fightFeint)
                return
            } else {
                let fightAgain = document.createElement('div')
                fightAgain.classList.add('fight-again')
                fightAgain.innerHTML = `<h3>OH NO...</h3><p>Your opponent was ${loseMsg} than you... Try again</p>`
                document.querySelector('section.fight-actions').prepend(fightAgain)
                setTimeout(() => {
                    document.querySelector('.fight-again').remove()
                }, 2000)
                jammer.stamina -= 10
                jammer.updateStamina()
                game.gameOver()
                return
            }
        }

    }

    updateStamina() {
        let staminaCounterCanvas = document.querySelector('#canvas-screen .stamina-counter')
        let staminaCounterFight = document.querySelector('#fight-screen .stamina-counter')
        let staminaBarCanvas = document.querySelector("#canvas-screen .stamina-bar")
        let staminaBarFight = document.querySelector("#fight-screen .stamina-bar")
        let staminaGaugeFight = document.querySelector("#fight-screen .stamina-gauge")
        staminaCounterCanvas.innerHTML = this.stamina
        staminaCounterFight.innerHTML = this.stamina
        staminaBarCanvas.style.width = this.stamina + "%"
        staminaBarFight.style.width = this.stamina + "%"

        if (this.stamina <= 40) {
            staminaBarCanvas.classList.add('danger-pink')
            staminaBarFight.classList.add('danger-pink')
            staminaGaugeFight.classList.add('danger-pink')
            staminaBarCanvas.classList.remove('pink')
            staminaBarFight.classList.remove('pink')
            staminaGaugeFight.classList.remove('pink')
        }
        if (this.stamina <= 0) {
            staminaBarCanvas.classList.remove('danger-pink')
            staminaBarFight.classList.remove('danger-pink')
            staminaGaugeFight.classList.remove('danger-pink')
            staminaBarCanvas.classList.add('pink')
            staminaBarFight.classList.add('pink')
            staminaGaugeFight.classList.add('pink')
        }
        return

    }

}

export default Jammer