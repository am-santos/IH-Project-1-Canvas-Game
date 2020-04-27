const $canvas = document.querySelector('canvas');

const game = new Game($canvas);

window.onload = () => {
  game.reset();
  game.start();
};
