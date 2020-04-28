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

    // this.team1 = [];
    // this.team2 = [];

    this.eventRuns = false;

    // this.characterMoves();
  }

  createsTeam(teamName, teamSize, orientation) {
    const orient = orientation;

    for (let i = 0; i < teamSize; i++) {
      const char = new Character(this, orient, 50 + i * 70);
      const gunVars = char.extractVarsToGun();
      const gun = new Gun(this, ...gunVars);
      const projectileVars = gun.extractVarsToProjectile();
      const proj = new Projectile(this, ...projectileVars);

      teamName.push({ char, gun, proj });
    }
    teamName.push(orient);
  }

  drawTeam(team) {
    for (let teamchar of team) {
      for (let element in teamchar) {
        switch (element) {
          case 'char':
            teamchar[element].draw();
          case 'gun':
            teamchar[element].draw();
        }
      }
    }
  }

  start() {
    this.reset();
    this.characterPlays(this.team2, 1);
  }

  reset() {
    this.ground = new Ground(this);
    this.ground.draw();

    this.team1 = [];
    this.team2 = [];

    this.createsTeam(this.team1, 3, 'right');
    this.drawTeam(this.team1);

    this.createsTeam(this.team2, 3, 'left');
    this.drawTeam(this.team2);
  }

  clearEverything() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawCurrentStatus() {
    this.ground.draw();
    this.drawTeam(this.team1);
    this.drawTeam(this.team2);
  }

  characterPlays(teamName, charNumber) {
    // teamName[charNumber][className].method
    // teamName - array with team chars
    // charNumber - specific char that is being refered
    // className - {char,gun,proj} - that represents each class specifications.

    let updateValues;
    console.log('characterPlays', teamName);
    window.addEventListener('keydown', (event) => {
      // event.preventDefault();
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 37: // Left
          teamName[charNumber]['char'].move('left');
          updateValues = teamName[charNumber]['char'].extractVarsToGun();
          teamName[charNumber]['gun'] = new Gun(this, ...updateValues);
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 39: // Right
          teamName[charNumber]['char'].move('right');
          updateValues = teamName[charNumber]['char'].extractVarsToGun();
          teamName[charNumber]['gun'] = new Gun(this, ...updateValues);
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 38: // Up
          teamName[charNumber]['gun'].pointsTo('up');
          // updateValues = teamName[charNumber]['char'].extractVarsToGun();
          // teamName[charNumber]['gun'] = new Projectile(this, ...updateValues);

          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 40: // Down
          teamName[charNumber]['gun'].pointsTo('down');
          // updateValues = teamName[charNumber]['char'].extractVarsToGun();
          // teamName[charNumber]['gun'] = new Projectile(this, ...updateValues);

          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 32: // Space Bar
          this.clearEverything();
          this.drawCurrentStatus();
          updateValues = teamName[charNumber]['gun'].extractVarsToProjectile();
          teamName[charNumber]['proj'] = new Projectile(this, ...updateValues);

          teamName[charNumber]['proj'].shootsInMotion();
      }
    });
  }

  // Previous logic, working
  /* characterMoves() {
    window.addEventListener('keydown', (event) => {
      // event.preventDefault();
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 37: // Left
          this.character.move('left');
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 39: // Right
          this.character.move('right');
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 38: // Up
          this.gun.pointsTo('up');
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 40: // Down
          this.gun.pointsTo('down');
          this.clearEverything();
          this.drawCurrentStatus();
          break;
        case 32: // Space Bar
          this.clearEverything();
          this.drawCurrentStatus();
          this.projectile.shootsInMotion();
      }
    });
  } */

  createShooter() {
    /* 
    Shooter is one element that includes Character, Gun and Projectile.
    Projectile depends on Gun that depends on Character.
    
    Each shooter should be independent from other shooter's actions.
    
    Char (x,y,orientation)
      '-> Gun (needs from character the following vars: x,y,width,height,orientation)
            '-> Projectile (needs from gun the following vars: shootingForce, endOfGun Coordinates, currentAngle)
    
    
    RETURN Character???
    */
  }
}
