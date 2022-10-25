export function detectCollision(ball, brick) {
    let leftSideOfBall = ball.position.x;
    let rightSideOfBall = ball.position.x + ball.size;
    let topOfBall = ball.position.y;
    let bottomOfBall = ball.position.y + ball.size;

    let leftSideOfObject = brick.position.x;
    let rightSideOfObject = brick.position.x + brick.width;
    let topOfObject = brick.position.y;
    let bottomOfObject = brick.position.y + brick.height;

    if (topOfBall <= bottomOfObject && bottomOfBall >= topOfObject && leftSideOfBall <= rightSideOfObject && rightSideOfBall >= leftSideOfObject) {
        if (
            (ball.speed.x >= 0 &&
              ball.speed.y < 0 &&
              bottomOfObject - topOfBall < rightSideOfBall - leftSideOfObject) ||
            (ball.speed.x <= 0 &&
              ball.speed.y < 0 &&
              bottomOfObject - topOfBall < rightSideOfObject - leftSideOfBall) ||
            (ball.speed.x >= 0 &&
              ball.speed.y > 0 &&
              bottomOfBall - topOfObject < rightSideOfBall - leftSideOfObject) ||
            (ball.speed.x <= 0 &&
              ball.speed.y > 0 &&
              bottomOfBall - topOfObject < rightSideOfObject - leftSideOfBall)
        ) {
            console.log("case Y");
            return 2;
        } else if (
            (ball.speed.x > 0 &&
              ball.speed.y <= 0 &&
              bottomOfObject - topOfBall > rightSideOfBall - leftSideOfObject) ||
            (ball.speed.x < 0 &&
              ball.speed.y <= 0 &&
              bottomOfObject - topOfBall > rightSideOfObject - leftSideOfBall) ||
            (ball.speed.x > 0 &&
              ball.speed.y >= 0 &&
              bottomOfBall - topOfObject > rightSideOfBall - leftSideOfObject) ||
            (ball.speed.x < 0 &&
              ball.speed.y >= 0 &&
              bottomOfBall - topOfObject > rightSideOfObject - leftSideOfBall)
          ) {
            console.log("case X");
            return 1;
          }    
    }
}