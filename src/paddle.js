export default class paddle{
    constructor(game) {
        this.width = 150;
        this.height = 20;
        this.game = game;
        this.image = document.getElementById("img_paddle");
        this.maxSpeed = 10;
        this.reset();
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    reset() {
        this.speed = 0;
        this.position = {
            x: (this.game.gameWidth - this.width) / 2,     
            y: this.game.gameHeight - this.height - 10
        }
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
    update(deltatime) {
        this.position.x += this.speed;
        if (this.position.x < 0)
            this.position.x = 0;
        if (this.position.x + this.width > this.game.gameWidth)
            this.position.x = this.game.gameWidth - this.width;
    }
}