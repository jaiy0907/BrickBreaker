export function detectCollisionPaddle(ball, paddle) {
    let bottomOfBall = ball.position.y + ball.size;
    let rightOfBall = ball.position.x + ball.size;
    let leftOfBall = ball.position.x;

    let hitPosition = 0;

    let topOfObject = paddle.position.y;
    let leftOfObject = paddle.position.x;
    let rightOfObject = paddle.position.x + paddle.width;

    if (bottomOfBall >= topOfObject && ball.position.x + ball.size >= leftOfObject && ball.position.x <= rightOfObject) {
        hitPosition = leftOfBall - leftOfObject;
        if (hitPosition <= 20) 
            return 1;
        else if (hitPosition > 20 && hitPosition <= 50)
            return 2;
        else if (hitPosition > 50 && hitPosition <= 75) 
            return 3;
        else if (hitPosition > 75 && hitPosition <= 100) 
            return 4;
        else if (hitPosition > 100 && hitPosition <= 130) 
            return 5;
        else if (hitPosition >= 130) 
            return 6;
        
    }
}