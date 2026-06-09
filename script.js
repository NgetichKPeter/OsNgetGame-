const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1; 
let dy = 0; 
let score = 0;
let gameInterval;

function main() {
    if (hasGameEnded()) {
        alert(`Game Over! Score: ${score}`);
        resetGame();
        return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "#4CAF50"; 
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        generateFood();
    } else {
        snake.pop(); 
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) generateFood();
    });
}

function drawFood() {
    ctx.fillStyle = "#FF5252"; 
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Keyboard Controls (Just in case)
document.addEventListener("keydown", (e) => handleDirection(e.keyCode));

// Mobile Touch Controls
document.getElementById("upBtn").addEventListener("click", () => handleDirection(38));
document.getElementById("downBtn").addEventListener("click", () => handleDirection(40));
document.getElementById("leftBtn").addEventListener("click", () => handleDirection(37));
document.getElementById("rightBtn").addEventListener("click", () => handleDirection(39));

function handleDirection(keyCode) {
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyCode === 37 && !goingRight) { dx = -1; dy = 0; } 
    if (keyCode === 38 && !goingDown) { dx = 0; dy = -1; }  
    if (keyCode === 39 && !goingLeft) { dx = 1; dy = 0; }   
    if (keyCode === 40 && !goingUp) { dx = 0; dy = 1; }     
}

function hasGameEnded() {
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    dx = 1;
    dy = 0;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    generateFood();
    gameInterval = setInterval(main, 150); // Speed set to 150ms for mobile playability
}

// Start
generateFood();
gameInterval = setInterval(main, 150);
