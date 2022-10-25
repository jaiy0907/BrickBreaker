import Game from "/src/game.js";
let canvas = document.getElementById("gamecanvas");
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lasttime = 0;

function gameloop(timestamp) {
    let delta = timestamp - lasttime;
    lasttime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(delta);
    game.draw(ctx);

    window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop); 
