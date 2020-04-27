/* 
Each Gun will have,
        - amount of damage
        - amout of damage per pixel?
          - in case of area damage, how to solve it?
        - bullet movement equation
          - check required variables for it
        - ammo changes color through the canvas, before explosion (black, yellow, orange, red)
        NICE TO HAVE
          - sounds:
            - shooting
            - exploding
        CRAZY STUFF
          - images:
            - gun
            - ammo


*/
class Gun {
  constructor(game) {
    this.game = game;

    // Gun size (aka stroke length and width)
    this.length = 30;
    this.width = 5;

    // Pointing angle
    this.angle = -1 * (1 / 4) * Math.PI;
    this.speedOfAngleChanges = 0.05 * ((1 / 2) * Math.PI);

    // End of Gun
    this.leftEndOfGunX;
    this.leftEndOfGunY;

    // Gun shooting force
    this.force = 10;
  }

  drawLeftGun() {
    const game = this.game;
    const context = game.context;

    // Starting coordinates of gun. (same as, center of the character)
    this.leftCenterX = game.character.x + game.character.width / 2;
    this.leftCenterY = game.character.y + game.character.height / 2;

    // Final coordinates of Gun. (using 45º as default)
    this.leftEndOfGunX = this.leftCenterX + this.length * Math.cos(this.angle);
    this.leftEndOfGunY = this.leftCenterY + this.length * Math.sin(this.angle);

    // Draw gun
    context.save();

    context.lineWidth = this.width;
    context.strokeStyle = 'black';

    context.beginPath();
    context.moveTo(this.leftCenterX, this.leftCenterY);
    context.lineTo(this.leftEndOfGunX, this.leftEndOfGunY);
    context.stroke();
    context.closePath();

    context.restore();
  }

  drawRightGun() {
    const game = this.game;
    const context = game.context;

    // Starting coordinates of gun. (same as, center of the character)
    this.rightCenterX = game.width - game.character.x + game.character.width / 2;
    this.rightCenterY = game.character.y + game.character.height / 2;

    // Final coordinates of Gun. (using 45º as default)
    this.rightEndOfGunX = this.rightCenterX - this.length * Math.cos(this.angle);
    this.rightEndOfGunY = this.rightCenterY - this.length * Math.sin(this.angle);

    // Draw gun
    context.save();

    context.lineWidth = this.width;
    context.strokeStyle = 'black';

    context.beginPath();
    context.moveTo(this.rightCenterX, this.rightCenterY);
    context.lineTo(this.rightEndOfGunX, this.rightEndOfGunY);
    context.stroke();
    context.closePath();

    context.restore();
  }

  points(direction) {
    // Moves gun direction
    if (direction === 'up') {
      this.angle -= this.speedOfAngleChanges;
    } else if (direction === 'down') {
      this.angle += this.speedOfAngleChanges;
    }

    // Boundaries of gun movement, between 0 and PI/2.
    if (this.angle > 0) {
      this.angle = 0;
    } else if (this.angle < -1 * (1 / 2) * Math.PI) {
      this.angle += this.speedOfAngleChanges;
    }
  }

  /* drawProjectile(x, y) {
    const context = this.game.context;

    context.save();
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, this.width, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  } */
}
