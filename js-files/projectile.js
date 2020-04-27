/* 

This class is set to,
- draw projectile
context.beginPath();
  - projectile motion
  - collision detection

 */
class Projectile {
  constructor(game) {
    this.game = game;

    this.x = this.game.gun.leftEndOfGunX;
    this.y = this.game.gun.leftEndOfGunY;

    this.speed = 5; // Number of moved pixels per "time"

    this.shootDisplaySpeed = 1000 / 30;

    this.gravityForce = 10;

    this.time = 0;
  }

  drawProjectile(x, y) {
    const context = this.game.context;

    context.save();
    context.beginPath();
    context.fillStyle = 'orange';
    context.arc(x, y, this.game.gun.width, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  shootsInMotion() {
    this.Fx = this.game.gun.shootingForce * Math.cos(this.game.gun.currentAngle);
    this.Fy = -1 * this.game.gun.shootingForce * Math.sin(this.game.gun.currentAngle);

    // Values have to be instanciated inside of this method.
    this.x = this.game.gun.leftEndOfGunX;
    this.y = this.game.gun.leftEndOfGunY;

    this.newX = this.x + this.Fx * this.time;
    this.newY = this.y - this.Fy * this.time + (1 / 2) * this.gravityForce * this.time ** 2;

    this.game.clearEverything();
    this.game.start();
    this.drawProjectile(this.newX, this.newY);

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
      this.newX + this.game.gun.width * 2 > this.game.width || // Right
      this.newY + this.game.gun.width * 2 > this.game.height - this.game.ground.groundHeight || // Bottom
      this.newY - this.game.gun.width * 2 < 0 // Top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
