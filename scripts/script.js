import Game from "./classes/game.js";
import Jammer from "./classes/jammer.js";

window.onload = () => {
	let canvas = document.getElementById("canvas")
	let ctx = canvas.getContext("2d")
	document.getElementById('sound-switch').addEventListener('click', soundSwitch)
	function soundSwitch() {


	}

	let chosenJammer = false
	let jammers = []


	function chooseJammer() {
		jammers = []
		jammers.push(new Jammer(canvas, ctx, 4, 8, './assets/blond-jammer.png'))
		jammers.push(new Jammer(canvas, ctx, 5, 5, './assets/brunette-jammer.png'))
		jammers.push(new Jammer(canvas, ctx, 8, 4, './assets/pink-jammer.png'))
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
				} else {
					document.getElementById('ready-button').disabled = false
					document.getElementById('ready-button').classList.add('double-shadow')
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

	let pop = new Audio('./assets/sounds/pop.wav')
	let punch = new Audio('./assets/sounds/punch.wav')
	let swoosh = new Audio('./assets/sounds/swoosh.wav')
	// let cheer = new Audio('./assets/sounds/test.wav')
	// document.addEventListener('click', () => {
	// 	cheer.play()
	// }, {once : true})
	
	let soundButton = document.getElementById('sound-switch')
	let soundButtonIcon = document.querySelector('#sound-switch img')		
	let buttonsPop = document.querySelectorAll('.pop')
	audios()
	soundButton.addEventListener('click', function () {
		soundButton.classList.toggle("sound-off")
		if (!soundButton.classList.contains("sound-off")) {
			console.log("play")
			soundButtonIcon.src = "./assets/sound-on.svg"
			audios()
		} else {
			console.log('pause')
			soundButtonIcon.src = "./assets/sound-off.svg"
			pop.pause()
			punch.pause()
			swoosh.pause()
			// cheer.pause()
		}

	})

	function audios() {
		buttonsPop.forEach((button) => {
			button.addEventListener('click', function () {
				console.log("Pop")
				pop.play()
			})
		})
		document.getElementById('btn-force').addEventListener('click', () => punch.play())
        document.getElementById('btn-feint').addEventListener('click', () => swoosh.play())

	}

	function stopAudios() {
		buttonsPop.forEach((button) => {
			button.addEventListener('click', function () {
				console.log("Pop")
				pop.pause()
			})
		})
		document.getElementById('btn-force').addEventListener('click', () => punch.pause())
        document.getElementById('btn-feint').addEventListener('click', () => swoosh.pause())
	}


}