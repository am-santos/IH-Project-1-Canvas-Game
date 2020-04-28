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
  constructor(game, orientation, x, y, speed) {
    this.game = game;
    // Character coordinates
    this.x = x || undefined;
    this.y = y || this.game.height - this.height - this.game.ground.groundHeight; // Value is given in draw method. It needs that ground class is initiated.

    // Character Size
    this.width = 20;
    this.height = 40;

    // Movement Speed
    this.speed = speed || 5;

    this.orientation = orientation || 'right';
  }

  extractVarsToGun() {
    return [this.x, this.y, this.width, this.height, this.orientation];
  }

  draw() {
    const game = this.game;
    const context = game.context;

    // Character Y coordinate
    this.y = this.game.height - this.height - this.game.ground.groundHeight;

    if (this.orientation === 'right') {
      // Character Body
      context.save();
      context.fillStyle = 'brown';
      context.fillRect(this.x, this.y, this.width, this.height);

      // character hat
      context.strokeStyle = 'green';
      context.fillStyle = 'green';

      context.beginPath();
      context.moveTo(this.x - 15, this.y); // Back size of hat
      context.lineTo(this.x + this.width / 2, this.y - 15); // height of hat
      context.lineTo(this.x + this.width + 5, this.y); // Front size of hat
      context.closePath();
      context.fill();
      context.stroke();
      context.restore();
    } else if (this.orientation === 'left') {
      context.save();
      // Character Body
      context.fillStyle = 'brown';
      context.fillRect(game.width - this.x, this.y, this.width, this.height);

      // character hat
      context.strokeStyle = 'green';
      context.fillStyle = 'green';

      context.beginPath();
      context.moveTo(game.width - this.x - 5, this.y); // Back size of hat
      context.lineTo(game.width - this.x + this.width / 2, this.y - 15); // height of hat
      context.lineTo(game.width - this.x + this.width + 15, this.y); // Front size of hat
      context.closePath();
      context.fill();
      context.stroke();

      context.restore();
    }
  }

  move(direction) {
    if (!this.game.eventRuns) {
      // Prevents it from running when projectile is in motion.

      // LOGICS NEED TO BE CHANGED!!
      // This logic is working in all characters created..

      // Movement conditions are correct for each case

      if (this.orientation === 'right') {
        if (direction === 'left') {
          this.x -= this.speed;
        } else if (direction === 'right') {
          this.x += this.speed;
        }
      } else if (this.orientation === 'left') {
        if (direction === 'left') {
          this.x += this.speed;
        } else if (direction === 'right') {
          this.x -= this.speed;
        }
      }

      // Boundary conditions
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.game.width - this.width) {
        this.x = this.game.width - this.width;
      }
    }
  }
}
