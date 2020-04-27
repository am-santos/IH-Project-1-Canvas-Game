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

    console.log('current Angle', this.game.gun.currentAngle);
    console.log('Fx and Fy', this.Fx, this.Fy);

    this.gravityForce = 10;

    this.time = 0;
  }

  drawProjectile(x, y) {
    // This method has default values, makes it easy for testing.

    const context = this.game.context;
    context.beginPath();

    context.save();
    context.fillStyle = 'orange';
    context.arc(x, y, this.game.gun.width, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  shootsInMotion(time = this.time) {
    // Apply some crazy equations on previous x and y value of projectile
    // Draw new position of projectile
    // Give projectile new values for x and y

    /* const gun = this.game.gun;
    

    const shootingForce = gun.shootingForce;
    */
    this.Fx = this.game.gun.shootingForce * Math.cos(this.game.gun.currentAngle);
    this.Fy = -1 * this.game.gun.shootingForce * Math.sin(this.game.gun.currentAngle);

    console.log('current Angle', this.game.gun.currentAngle);
    // Values have to be instanciated inside of this method.
    this.x = this.game.gun.leftEndOfGunX;
    this.y = this.game.gun.leftEndOfGunY;

    console.log('Fx and Fy', this.Fx, this.Fy);
    this.newX = this.x + this.Fx * this.time;
    this.newY = this.y - this.Fy * this.time + (1 / 2) * this.gravityForce * this.time ** 2;

    this.game.clearEverything();
    this.game.start();
    this.drawProjectile(this.newX, this.newY);

    this.time += 0.1;

    if (!this.collision()) {
      setTimeout(() => {
        this.shootsInMotion(this.time);
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
