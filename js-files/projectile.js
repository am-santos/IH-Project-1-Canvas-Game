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

  shootsInMotion(shootingTeam) {
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

    if (!this.collision(shootingTeam)) {
      setTimeout(() => {
        this.shootsInMotion();
      }, this.shootDisplaySpeed);
    }
  }

  collision(shootingTeam) {
    //Checks if hit the enemy
    /* if (this.collisionWithEnimies) {
      return true;
    } */

    // checks if out of canvas or hit the ground.
    if (
      this.newX + this.gunWidth * 2 > this.game.width || // Right
      this.newX - this.gunWidth * 2 < 0 || // Left
      this.newY + this.gunWidth * 2 > this.game.height - this.game.ground.groundHeight || // Ground
      this.newY - this.gunWidth * 2 < 0 // Top
    ) {
      this.game.eventRuns = false;
      this.game.characterTurn++;
      this.game.gameLogic();
      console.log('new characterturn value', this.game.characterTurn);
      return true;
    } else {
      return false;
    }
  }

  collisionWithEnimies(shootingTeam) {
    // Required variables:
    // ball location,
    // Enemies location

    if (this.game.team1 === shootingTeam) {
      //Check if collided with team2
      // ball.x + ball.radius < block.x (left side of block) ||
      // ball.x - ball.radius < block.x + block.width (right side of black)
      // ball.y + ball.radius > black.y
    } else if (this.game.team2 === shootingTeam) {
      //Check if collided with team1
    }
  }

  drawExplosion() {
    // ball location
    // explosion radius
  }

  damage() {}
  friendlyFire() {
    // Nice to have feature!
  }
}
