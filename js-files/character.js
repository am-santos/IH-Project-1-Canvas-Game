/*
Each character have,
      - current position, x and y coordinates,
      - direction,
      - boundaries
      - Life, (display life with different colors)
      - movement
      - fire a gun, action

      NICE TO HAVE:
      - time to play (displaying countdown)
      - jump


*/
class Character {
  constructor(game) {
    this.game = game;

    // Character coordinates
    this.x = 150;
    this.y; // Value is given in draw method. It needs that ground class is initiated.

    // Character Size
    this.width = 20;
    this.height = 40;

    // Movement Speed
    this.speed = 5;
  }

  drawLeftCharacter() {
    const game = this.game;
    const context = game.context;

    // Character Y coordinate
    this.y = this.game.height - this.height - this.game.ground.groundHeight;

    // Character Body
    context.save();
    context.fillStyle = 'brown';
    context.fillRect(this.x, this.y, this.width, this.height);

    // character hat
    context.strokeStyle = 'green';

    context.beginPath();
    context.moveTo(this.x - 15, this.y); // Back size of hat
    context.lineTo(this.x + this.width / 2, this.y - 15); // height of hat
    context.lineTo(this.x + this.width + 5, this.y); // Front size of hat
    context.closePath();
    context.fillStyle = 'green';
    context.fill();
    context.stroke();

    context.restore();
  }

  /* drawRightCharacter() {
    const game = this.game;
    const context = game.context;
    // Character Y coordinate
    this.y = this.game.height - this.height - this.game.ground.groundHeight;

    // Character Body
    context.save();
    context.fillStyle = 'brown';
    context.fillRect(game.width - this.x, this.y, this.width, this.height);
    context.restore();
  } */

  move(direction) {
    // Movement conditions
    if (direction === 'left') {
      this.x -= this.speed;
    } else if (direction === 'right') {
      this.x += this.speed;
    }

    // Boundary conditions
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }
  }
}
