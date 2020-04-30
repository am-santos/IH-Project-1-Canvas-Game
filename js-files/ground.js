class Ground {
  constructor(game) {
    this.game = game;

    this.groundHeight = 100;
  }

  draw() {
    const game = this.game;
    const context = game.context;

    context.save();
    context.fillStyle = 'black';
    context.fillRect(0, game.height - this.groundHeight, game.width, this.groundHeight);
    context.restore();
  }
}
