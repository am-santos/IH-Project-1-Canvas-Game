/* 
  Game Ideas:

  Each team will make one shoot at a time
      - if more than one character per team, make them shoot one at a time.
  Team that reaches zero health first will loose

  User interactions per turn,
    - move worm -> set coordinates
    - sets direction -> left/right values
    - set shooting position -> up/down arrows
    - shoot
    
  Game calculations after user shoots gun,
    - set shoot trajectory
    - check shoot collision on each movement, until it is out of the canvas or collides with ground or any char
    - make shoot explode
    - calculate life for each char
    - update each char life
    - remove dead char
    - update board scores
    - check if any team has zero char left
    - assign winning team
    
    

*/
class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');

    this.width = $canvas.width;
    this.height = $canvas.height;

    this.characterMoves();
  }

  start() {
    this.ground.draw();
    this.character.drawLeftCharacter();
    this.gun.drawLeftGun();
    // this.character.drawRightCharacter();
    // this.gun.drawRightGun();
  }

  reset() {
    this.character = new Character(this);

    this.ground = new Ground(this);
    this.gun = new Gun(this);
    this.projectile = new Projectile(this);
  }

  clearEverything() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  characterMoves() {
    window.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 37: // Left
          this.character.move('left');
          this.clearEverything();
          this.start();
          break;
        case 39: // Right
          this.character.move('right');
          this.clearEverything();
          this.start();
          break;
        case 38: // Up
          this.gun.points('up');
          this.clearEverything();
          this.start();
          break;
        case 40: // Down
          this.gun.points('down');
          this.clearEverything();
          this.start();
          break;
        case 32: // Space Bar
          this.clearEverything();
          this.start();
          this.projectile.drawProjectile();
          break;
      }
    });
  }

  /* pointingGun() {
    window.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 38: // Up
          this.gun.move('up');
          break;
        case 40: // Down
          this.gun.move('down');
          break;
      }
    });
  } */
}
