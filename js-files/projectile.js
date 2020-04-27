/* 

This class is set to,
  - draw projectile
  - projectile motion
  - collision detection

 */
class Projectile {
  constructor(game) {
    this.game = game;
  }

  drawProjectile(x = this.game.gun.leftEndOfGunX + 5, y = this.game.gun.leftEndOfGunY - 5) {
    // This method has default values, makes it easy for testing.

    const context = this.game.context;

    context.save();
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, this.game.gun.width, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  shootsInMotion(time) {
    // Apply some crazy equations on previous x and y value of projectile
    // Draw new position of projectile
    // Give projectile new values for x and y

    const force = this.game.gun.force;
    const Fx = force * Math.cos(this.game.gun.angle);
    const Fy = -1 * force * Math.sin(this.game.gun.angle) + 10;
    const newXcoordinate = leftEndOfGunX + Fx * time ** 2;
    const newYcoordinate = leftEndOfGunY + Fy * time ** 2;
  }

  collision() {}
}
