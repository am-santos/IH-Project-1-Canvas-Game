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

    this.characterTurn = 0;
  }

  createsTeam(team, teamSize, orientation) {
    const orient = orientation;

    for (let i = 0; i < teamSize; i++) {
      const char = new Character(this, orient, 50 + i * 70);
      team.push(char);
    }
    team.push(orient);
  }

  drawTeam(team) {
    for (let character of team) {
      if (character.life > 0) {
        character.draw();
        character.gun.draw();
      }
    }
  }

  drawTeamsLife(team) {
    for (let character of team) {
      if (character.life > 0) {
        character.drawCharacterLife();
      }
    }
  }

  drawTeamTotalLife(team) {
    /* let arrayOfTotalLife = [];
    for (let teamchar of team) {
      for (let element in teamchar) {
        if (element === 'char') {
          arrayOftotalLife.push(teamchar[element].life);
        }
      }
    }
    */
    //const totalLife = arrayOfTotalLife.reduce((acc, life) => acc + life, 0);

    // Paint green rectangle on top of red rectangle
    const context = this.context;

    context.save();
    context.fillStyle = 'red';
    context.fillRect(50, 50, 300, 50);
    /* if (team === this.team1) {

    } else if (team === this.team2) {

    }  */

    context.fillStyle = 'limegreen';
    context.fillRect(50, 50, 300 * (200 / 300), 50);

    context.restore();

    context.save();
    context.fillStyle = 'black';
    context.font = '30px serif';
    context.fillText('team1', 50, 50);
    context.restore();
  }

  gameLogic() {
    this.drawCurrentStatus();

    switch (this.characterTurn % 6) {
      case 0: // Team 1 - 0
        this.characterPlays(this.team1, 0, true);
        break;
      case 1: // Team 2 - 0
        this.characterPlays(this.team2, 0, true);
        break;
      case 2: // Team 1 - 1
        this.characterPlays(this.team1, 1, true);
        break;
      case 3: // Team 2 - 1
        this.characterPlays(this.team2, 1, true);
        break;
      case 4: // Team 1 - 2
        this.characterPlays(this.team1, 2, true);
        break;
      case 5: // Team 2 - 2
        this.characterPlays(this.team2, 2, true);
        break;
    }
  }

  start() {
    // this.reset();
    this.gameLogic();
  }

  reset() {
    this.clearEverything();
    this.ground = new Ground(this);
    this.ground.draw();

    this.team1 = [];
    this.team2 = [];

    this.createsTeam(this.team1, 3, 'right');
    this.drawTeam(this.team1);
    this.drawTeamsLife(this.team1);
    this.drawTeamTotalLife(this.team1);

    this.createsTeam(this.team2, 3, 'left');
    this.drawTeam(this.team2);
    this.drawTeamsLife(this.team2);
    this.drawTeamTotalLife(this.team2);
  }

  clearEverything() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawCurrentStatus() {
    this.clearEverything();
    this.ground.draw();
    this.drawTeam(this.team1);
    this.drawTeam(this.team2);
    this.drawTeamsLife(this.team1);
    this.drawTeamsLife(this.team2);
    this.drawTeamTotalLife(this.team1);
    this.drawTeamTotalLife(this.team2);
  }

  characterPlays(teamMembers, charNumber, run) {
    // teamName[charNumber][className].method
    // teamName - array with team chars
    // charNumber - specific char that is being refered
    // className - {char,gun,proj} - that represents each class specifications.
    let runFunction = run;
    //this.charInMotion = true;
    let updateValues;

    window.addEventListener('keydown', (event) => {
      // event.preventDefault();
      const character = teamMembers[charNumber];

      if (runFunction) {
        const keyCode = event.keyCode;
        switch (keyCode) {
          case 37: // Left
            character.move('left');
            character.gun = new Gun(character);
            this.clearEverything();
            this.drawCurrentStatus();
            break;
          case 39: // Right
            character.move('right');
            character.gun = new Gun(character);
            this.clearEverything();
            this.drawCurrentStatus();
            break;
          case 38: // Up
            character.gun.pointsTo('up');
            this.clearEverything();
            this.drawCurrentStatus();
            break;
          case 40: // Down
            character.gun.pointsTo('down');
            this.clearEverything();
            this.drawCurrentStatus();
            break;
          case 32: // Space Bar
            this.clearEverything();
            this.drawCurrentStatus();
            character.gun.projectile = new Projectile(character.gun);
            character.gun.projectile.shootsInMotion(teamMembers);
            runFunction = false;
        }
      }
    });
  }
}
