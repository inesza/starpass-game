import Game from "./classes/game.js";

window.onload = () => {
	document.getElementById("start-button").onclick = () => {
		const game = new Game()
		game.startGame();
		document.getElementById('start-screen').style.display = 'none';
		document.getElementById('canvas-screen').style.display = 'flex';
	}
}