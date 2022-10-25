export default class InputHandler{
    constructor(game) {
        document.addEventListener('keydown', event => {
            if (event.keyCode == 37)
                game.paddle.moveLeft();
            else if (event.keyCode == 39)
                game.paddle.moveRight();
            else if (event.keyCode == 32)
                game.ball.go();
            else if (event.keyCode == 13) {
                game.togglePause();
                game.start();
            }
        });
        document.addEventListener('keyup', event => {
            if (event.keyCode == 37 && game.paddle.speed < 0)
                game.paddle.stop();
            else if (event.keyCode == 39 && game.paddle.speed > 0)
                game.paddle.stop();
        });
    }
}