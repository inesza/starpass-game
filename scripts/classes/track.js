class Track {
  constructor(canvas, ctx) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "./assets/track.png";
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.x = 0;
    this.y = 0;
  }

  draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
		this.ctx.drawImage(
			this.image,
			this.x,
			this.y - this.height,
			this.width,
			this.height
		)
  }

  move() {
    this.y += 4;
    this.y %= canvas.height;
  }
}

export default Track