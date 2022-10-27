import Game from "./classes/game.js";
import Jammer from "./classes/jammer.js";

window.onload = () => {
	let canvas = document.getElementById("canvas")
	let ctx = canvas.getContext("2d")


	// Sounds and music
	let pop = new Audio('./assets/sounds/pop.wav')
	let clap1 = new Audio('./assets/sounds/clap1.wav')
	let clap2 = new Audio('./assets/sounds/clap2.wav')

	let backgroundMusic = new Audio('./assets/sounds/music.wav')

	let chosenJammer = false
	let jammers = []

	function chooseJammer() {
		jammers = []
		jammers.push(new Jammer(canvas, ctx, 3, 8, './assets/blond-jammer.png'))
		jammers.push(new Jammer(canvas, ctx, 5, 5, './assets/brunette-jammer.png'))
		jammers.push(new Jammer(canvas, ctx, 8, 3, './assets/pink-jammer.png'))
		for (let i = 0; i < jammers.length; i++) {
			let article = document.createElement('article')
			article.setAttribute("id", `jammer${i}`);
			article.style.backgroundImage = `url(${jammers[i].image.src})`
			document.getElementById("jammers").append(article)
			let divStats = document.createElement('div')
			article.append(divStats)
			let strengthStat = document.createElement('div')
			let speedStat = document.createElement('div')
			strengthStat.setAttribute("id", `strength-jammer${i}`)
			speedStat.setAttribute("id", `speed-jammer${i}`)
			strengthStat.innerHTML = `<span>${jammers[i].strength}</span> strength`
			speedStat.innerHTML = `<span>${jammers[i].speed}</span> speed`
			divStats.append(strengthStat)
			divStats.append(speedStat)
			function readyButton() {
				if (chosenJammer) {
					chosenJammer = false
					document.getElementById('ready-button').disabled = true
					document.getElementById('ready-button').classList.remove('double-shadow')
					document.getElementById("tooltip").classList.remove('hidden')
				} else {
					document.getElementById('ready-button').disabled = false
					document.getElementById('ready-button').classList.add('double-shadow')
					document.getElementById("tooltip").classList.add('hidden')
					chosenJammer = jammers[i]
					document.getElementById('chosen-jammer-pic').src = chosenJammer.image.src
				}
				article.classList.toggle('double-shadow')
				article.classList.toggle('shrink')
				document.getElementById('start-container').classList.remove("hidden")
			}
			article.addEventListener('click', readyButton)
		}
	}

	function newGame() {
		chooseJammer()
		document.getElementById('ready-button').addEventListener('click', function () {
			document.getElementById('jammer-choice').style.display = 'none';
			document.getElementById('canvas-screen').style.display = 'flex';
			let game = new Game(chosenJammer)
			if (!soundButton.classList.contains("sound-off")) {
				clap1.play()
				clap2.play()
			}
			game.startGame();
		})
	}

	document.getElementById('start-button').addEventListener('click', choiceScreen)
	function choiceScreen() {
		document.getElementById('jammer-choice').style.display = 'flex';
		document.getElementById('start-screen').style.display = 'none';
		document.getElementById('canvas-screen').style.display = 'none';
		newGame()
		document.getElementById('start-button').removeEventListener('click', choiceScreen)
	}

	document.getElementById('how').onclick = () => {
		document.getElementById("how-dialog").showModal()
	}

	document.getElementById('close').onclick = () => {
		document.getElementById('how-dialog').close()
	}

	document.getElementById('retry-btn').addEventListener('click', function () {
		chosenJammer = false
		document.getElementById('game-zone').style.display = 'flex'
		document.getElementById('game-over').style.display = "none"
		document.getElementById('start-screen').style.display = 'flex';
		document.getElementById('canvas-screen').style.display = 'none';
		document.getElementById("jammers").innerHTML = null
		document.getElementById('start-button').addEventListener('click', choiceScreen)

	})

	function popPlay() {
		pop.play()
	}

	let soundButton = document.getElementById('sound-switch')
	let soundButtonIcon = document.querySelector('#sound-switch img')
	let buttonsPop = document.querySelectorAll('.pop')
	sounds()
	soundButton.addEventListener('click', function () { soundButton.classList.toggle("sound-off"); sounds(); console.log(soundButton) })

	function sounds() {
		if (soundButton.classList.contains("sound-off")) {
			soundButtonIcon.src = "./assets/sound-off.svg"
			buttonsPop.forEach((button) => {
				button.removeEventListener('click', popPlay)
			})
		} else {
			soundButtonIcon.src = "./assets/sound-on.svg"
			buttonsPop.forEach((button) => {
				button.addEventListener('click', popPlay)
			})
		}
	}

	function music() {
		let musicButton = document.getElementById('music-switch')
		let musicButtonIcon = document.querySelector('#music-switch img')
		musicButton.addEventListener('click', () => {
			musicButton.classList.toggle("sound-off")
			if (!musicButton.classList.contains("sound-off")) {
				musicButtonIcon.src = "./assets/music-on.svg"
				backgroundMusic.volume = .5
				backgroundMusic.loop = true
				backgroundMusic.play()
			} else {
				musicButtonIcon.src = "./assets/music-off.svg"
				backgroundMusic.pause()
			}
		})
	}
	music()

}