import { detectCollisionPaddle } from "/src/detectCollisionPaddle.js";

export default class ball{
    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.game = game;
        this.size = 16;
        this.state = 0;
        this.reset();
    }
    reset() {
        this.state = 0;
        this.position = {
            x: (this.game.gameWidth - this.size) / 2,
            y: (this.game.gameHeight - 10 - this.size - this.game.paddle.height)
        }
        this.speed = {
            x: 0,
            y: 0
        }
    }
    go() {
        if (this.state == 1)
            return;
        this.speed = {
            x: 5,
            y: -7
        };
        this.state = 1;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    update(deltatime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.state == 0) {
            this.position.x = this.game.paddle.position.x + 67;
            this.position.y = this.game.paddle.position.y - this.size;
        }
        else {
            //wall collision on left or right
            if (this.position.x <= 0 || this.position.x + this.size > this.game.gameWidth) {
                this.speed.x = -this.speed.x;
            }
            //wall collision on top
            if (this.position.y <= 0) {
                this.speed.y = -this.speed.y;
            }
            // collision on bottom
            if (this.position.y + this.size >= this.game.gameHeight) {
                this.game.lives--;
                this.reset();
                this.game.paddle.reset();
            }
        }
        switch (detectCollisionPaddle(this, this.game.paddle)) {
            case 1:
                this.speed.x = -9;
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            case 2:
                if (this.speed.x < 0) {
                    this.speed.x = -6;
                } else {
                    this.speed.x += -6;
                }
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            case 3:
                if (this.speed.x < 0) {
                    this.speed.x = this.speed.x;
                } else {
                    this.speed.x = this.speed.x;
                }
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            case 4:
                if (this.speed.x > 0) {
                    this.speed.x = this.speed.x;
                } else {
                    this.speed.x = this.speed.x;
                }
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            case 5:
                if (this.speed.x > 0) {
                    this.speed.x = 6;
                } else {
                    this.speed.x += 6;
                }
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            case 6:
                this.speed.x = 9;
                this.speed.y = -this.speed.y;
                // this.position.y = this.game.paddle.position.y - this.size;
                break;
            default: 
                break;
        }
    }

}