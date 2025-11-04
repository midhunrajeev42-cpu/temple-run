const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

let score = 0;
let gameRunning = false;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 10
};

let obstacles = [];

function createObstacle() {
    const obstacle = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 50,
        height: 50,
        speed: 5
    };
    obstacles.push(obstacle);
}

function gameLoop() {
    if (!gameRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacle.speed;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Collision detection
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            endGame();
        }

        // Remove obstacles that are off-screen
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
            score++;
            scoreElement.textContent = score;
        }
    });

    requestAnimationFrame(gameLoop);
}

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    player.x = canvas.width / 2 - 25;
    obstacles = [];
    gameRunning = true;
    gameLoop();
    setInterval(createObstacle, 1000);
}

function endGame() {
    gameRunning = false;
    alert('Game Over! Your score: ' + score);
}

// Event Listeners
startButton.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});
