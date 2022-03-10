const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let speed = 5;
let squareMax = 20;
let squareSize = canvas.width / squareMax - 3;
let posHeadLine = 10;
let posHeadColumn = 10;
let line = 0;
let column = 0;
let posAppleLine = Math.floor(Math.random() * squareMax);
let posAppleColumn = Math.floor(Math.random() * squareMax);
let snakeTail = 2;
const snakePiece = [];
let score = 0;
let speedScore = 3;
let lvl = 1;

function drawGame() {
    moveSnake();
    if (isGameOver() || winner()) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    checkAppleEat();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function drawSnake() {
    ctx.fillStyle = 'red';
    ctx.fillRect(posHeadColumn * squareMax, posHeadLine * squareMax, squareSize, squareSize);
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakePiece.length; ++i) {
        let piece = snakePiece[i];
        ctx.fillRect(piece.x * squareMax, piece.y * squareMax, squareSize, squareSize);
    }
    snakePiece.push(new SnakeBody(posHeadColumn, posHeadLine));
    while (snakePiece.length > snakeTail) {
        snakePiece.splice(0,1);
    }
}

class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.body.addEventListener('keydown', pressKeys);

function pressKeys(key) {
    if (key.keyCode == 38) { //up
        if (line != 1) {
            line = -1;
            column = 0;
        }
    }
    if (key.keyCode == 40) { //down
        if (line != -1) {
            line = 1;
            column = 0;
        }
    }
    if (key.keyCode == 37) { //left
        if (column != 1) {
            line = 0;
            column = -1;
        }
    }
    if (key.keyCode == 39) { //right
        if (column != -1) {
            line = 0;
            column = 1;
        }
    }
}

function moveSnake() {
    posHeadLine = posHeadLine + line;
    posHeadColumn = posHeadColumn + column;
}

function drawApple() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(posAppleColumn * squareMax, posAppleLine * squareMax, squareSize, squareSize);
}

function checkAppleEat() {
    if (posAppleColumn == posHeadColumn && posAppleLine == posHeadLine) {
        posAppleColumn = Math.floor(Math.random() * squareMax);
        posAppleLine = Math.floor(Math.random() * squareMax);
        ++snakeTail;
        ++score;
    }
    if (score == speedScore) {
        ++speed;
        speedScore += 2;
        ++lvl;
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Score ' + score, canvas.width - 398, 12);
    ctx.fillText('Lvl' + lvl, canvas.width -210, 12);
}

function isGameOver() {
    let gameOver = false;
    if(column == 0 && line === 0) {
        return false;
    }
    if (posHeadColumn < 0) {
        gameOver = true;
    } else if (posHeadColumn == squareMax) {
        gameOver = true;
    } else if (posHeadLine < 0) {
        gameOver = true;
    } else if (posHeadLine == squareMax) {
        gameOver = true;
    }
    for (let i = 0; i < snakePiece.length; ++i) {
        let pice = snakePiece[i];
        if (pice.x == posHeadColumn && pice.y == posHeadLine) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px arial';
        ctx.fillText('Game Over!', canvas.width / 5, canvas.height / 2);
    }
    return gameOver;  
}

function winner() {
    let win = false;
    if(lvl == 2) {
        ctx.fillStyle = 'blue';
        ctx.font = '30px arial';
        ctx.fillText('Congratulations you won!!!', canvas.width - 385, canvas.height / 2);
        win = true;
    }
    return win;
}

function restartGame() {
    location.reload();
}

drawGame();