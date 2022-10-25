import InputHandler from "/src/input.js";
import ball from "/src/ball.js";
import paddle from "/src/paddle.js";
import Brick from "/src/brick.js";

console.log("done");

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
};

export default class Game{
    constructor(gamewidth, gameheight) {
        this.gameWidth = gamewidth;
        this.gameHeight = gameheight;
        this.paddle = new paddle(this);
        this.ball = new ball(this);
        this.gameObjects = [];
        this.gameState = GAMESTATE.MENU;
        this.maxLives = 4;
        this.lives = this.maxLives;
        new InputHandler(this);
        this.score = 0;
        this.img_ball = document.getElementById("img_ball");
        this.img_paddle = document.getElementById("img_paddle");
        this.bricks = []
    }
    update(deltatime) {
        if (this.lives == 0)
            this.gameState = GAMESTATE.GAMEOVER;
        if (this.gameState == GAMESTATE.MENU || this.gameState == GAMESTATE.PAUSED || this.gameState == GAMESTATE.GAMEOVER)
            return;
        function check(brick) {
            return brick.bricklevel != 0;
        }
        for (let i = 0; i < this.bricks.length; i++)
            if (this.bricks[i].bricklevel == 0) this.score++;
        this.bricks = this.bricks.filter(check);
        [...this.gameObjects, ...this.bricks].forEach(object => {
            object.update(deltatime);
        });
    }
    draw(ctx) {
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center"
        ctx.fillStyle = "black"
        ctx.fillText("Lives:", 32, 30, 60, this.ball.size);
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center"
        ctx.fillText("Score: " + this.score, 720, 30, 150, this.ball.size);
        for (let i = 2; i <= this.lives; i++){
            ctx.drawImage(this.img_ball, i * 20 + 25, 17, this.ball.size, this.ball.size);
        }
        [...this.gameObjects, ...this.bricks].forEach(object => {
            object.draw(ctx);
        });
        if (this.gameState == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "bolder 80px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
            return;
        }
        if (this.gameState == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "bolder 80px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("START GAME", this.gameWidth / 2, this.gameHeight / 2);
            ctx.font = "bold 35px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("|Press Enter|", this.gameWidth / 2, this.gameHeight / 2 + 100); 
            return;
        }
        if (this.gameState == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "bolder 80px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER!!", this.gameWidth / 2, this.gameHeight / 2);
            ctx.font = "bold 35px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("|Press Enter to Restart|", this.gameWidth / 2, this.gameHeight / 2 + 100); 
            return;
        }
    }
    buildlevel() {
        let poslevel = []
        let testbrick = new Brick(this, 0, {x:0, y:0})
        let bricksNumRows = 7;
        let bricksNumCols = (this.gameWidth / testbrick.width)
        for (let i = 0; i < bricksNumRows * bricksNumCols; i++){
            let newnum = Math.floor(Math.abs(Math.random() - Math.random()) * (1 + 3 - 1) + 1)
            poslevel.push(newnum);
        }
        for (let i = 0; i < bricksNumRows; i++){
            for (let j = 0; j < bricksNumCols; j++){
                let position = {
                    x: j * testbrick.width,
                    y: i * testbrick.height + 100
                }
                this.bricks.push(new Brick(this, poslevel[bricksNumCols * i + j], position))
            }
        }    
    }
    start() {
        if (this.gameState != GAMESTATE.MENU && this.gameState != GAMESTATE.GAMEOVER)
            return;
        this.buildlevel();
        this.ball.reset();
        this.paddle.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.lives = this.maxLives;
        this.gameState = GAMESTATE.RUNNING;   
    }
    togglePause() {
        if (this.gameState == GAMESTATE.MENU)
            return;
        if (this.gameState == GAMESTATE.RUNNING)
            this.gameState = GAMESTATE.PAUSED;
        else if (this.gameState == GAMESTATE.PAUSED)
            this.gameState = GAMESTATE.RUNNING;
    }
    
}