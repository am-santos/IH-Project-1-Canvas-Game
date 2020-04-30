const $canvas = document.querySelector('canvas');

const game = new Game($canvas);

const backgroundSound = new Audio('/sounds/2018-10-06_-_Silly_Chicken_-_David_Fesliyan.mp3');
backgroundSound.loop = true;

window.addEventListener('load', () => {
  game.start();
  backgroundSound.play();
});

/* const $buttonStart = document.getElementById('start');
$buttonStart.addEventListener('click', () => {
  game.start();
}); */

/*
-
-
-
-
-
-
-
-
-
*/

/* const $buttonReset = document.getElementById('reset');
$buttonReset.addEventListener('click', () => {
  game.reset();
}); */
