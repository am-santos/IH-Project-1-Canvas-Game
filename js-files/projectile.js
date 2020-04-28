/* 

This class is set to,
- draw projectile
context.beginPath();
  - projectile motion
  - collision detection

 */
class Projectile {
  constructor(game, EndOfGunX, EndOfGunY, orientation, currentAngle, shootingForce, gunWidth) {
    this.game = game;

    this.EndOfGunX = EndOfGunX;
    this.EndOfGunY = EndOfGunY;
    this.orientation = orientation;
    this.currentAngle = currentAngle;
    this.shootingForce = shootingForce;
    this.gunWidth = gunWidth;

    this.speed = 5; // Number of moved pixels per "time"

    this.shootDisplaySpeed = 1000 / 30;
    this.gravityForce = 10;
    this.time = 0;
  }

  draw(x, y) {
    const context = this.game.context;

    context.save();
    context.beginPath();
    context.fillStyle = 'orange';
    context.arc(x, y, this.gunWidth, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  shootsInMotion() {
    this.game.eventRuns = true;

    if (this.orientation === 'right') {
      //orientation === 'left'

      this.Fx = this.shootingForce * Math.cos(this.currentAngle);
      this.Fy = -1 * this.shootingForce * Math.sin(this.currentAngle);
    } else if (this.orientation === 'left') {
      //orientation === 'right'
      this.Fx = -1 * this.shootingForce * Math.cos(this.currentAngle);
      this.Fy = -1 * this.shootingForce * Math.sin(this.currentAngle);
    }
    // Values have to be instanciated inside of this method.
    this.x = this.EndOfGunX; // Inicial value of X
    this.y = this.EndOfGunY; // Inicial value of Y

    this.newX = this.x + this.Fx * this.time;
    this.newY = this.y - this.Fy * this.time + (1 / 2) * this.gravityForce * this.time ** 2;

    this.game.clearEverything();
    this.game.drawCurrentStatus();
    this.draw(this.newX, this.newY);

    this.time += 0.1;

    if (!this.collision()) {
      setTimeout(() => {
        this.shootsInMotion();
      }, this.shootDisplaySpeed);
    }
  }

  collision() {
    // Collision only checks if out of canvas or hit the ground.
    if (
      // this.newX + this.gunWidth * 2 > this.game.width || // Right
      this.newX - this.gunWidth * 2 < 0 || // Left
      this.newY + this.gunWidth * 2 > this.game.height - this.game.ground.groundHeight || // Ground
      this.newY - this.gunWidth * 2 < 0 // Top
    ) {
      this.game.eventRuns = false;
      this.game.characterTurn++;
      console.log('new characterturn value', this.game.characterTurn);
      return true;
    } else {
      return false;
    }
  }
}
