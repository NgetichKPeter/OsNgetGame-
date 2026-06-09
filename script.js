const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1; // Horizontal velocity
let dy = 0; // Vertical velocity
let score = 0;

// Game Loop
function main() {
    if (hasGameEnded()) {
        alert(`Game Over! Your score was ${score}`);
        resetGame();
        return;
    }

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100);
}

// Clear the canvas every frame
function clearCanvas() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = "#4CAF50"; // Green snake
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// Move the snake forward
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake ate the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        generateFood();
    } else {
        snake.pop(); // Remove tail if it didn't eat food
    }
}

// Generate random food position
function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    
    // Ensure food doesn't spawn on top of the snake
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) generateFood();
    });
}

// Draw food
function drawFood() {
    ctx.fillStyle = "#FF5252"; // Red food
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Control handling
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === 37 && !goingRight) { dx = -1; dy = 0; } // Left arrow
    if (keyPressed === 38 && !goingDown) { dx = 0; dy = -1; }  // Up arrow
    if (keyPressed === 39 && !goingLeft) { dx = 1; dy = 0; }   // Right arrow
    if (keyPressed === 40 && !goingUp) { dx = 0; dy = 1; }     // Down arrow
}

// Collision checking
function hasGameEnded() {
    // Wall collisions
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) return true;
    
    // Self collisions
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

// Reset Game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    dx = 1;
    dy = 0;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    main();
}

// Start the game
generateFood();
main();
