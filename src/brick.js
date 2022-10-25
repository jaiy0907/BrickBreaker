import { detectCollision } from "/src/detectCollision.js";

export default class Brick{
    constructor(game, level, position) {
        this.bricklevel = level;
        this.height = 24;
        this.width = 80;
        this.game = game;
        this.position = position;
    }
    draw(ctx) {
        if (this.bricklevel == 1)
            this.img = document.getElementById("img_brick1");
        else if (this.bricklevel == 2)
            this.img = document.getElementById("img_brick2");
        else if (this.bricklevel == 3)
            this.img = document.getElementById("img_brick3");
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    update(delta) {
        switch (detectCollision(this.game.ball, this)) {
            case 1:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                this.bricklevel--;
                break;
            case 2:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.bricklevel--;
                break;
            default:
                break; 
        }
    }
}