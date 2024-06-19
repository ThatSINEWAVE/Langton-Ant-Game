document.addEventListener('DOMContentLoaded', () => {
    const introBox = document.getElementById('introBox');
    const gameBox = document.getElementById('gameBox');
    const beginButton = document.getElementById('beginButton');
    const pauseButton = document.getElementById('pauseButton');
    const applyButton = document.getElementById('applyButton');
    const speedInput = document.getElementById('speedInput');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    let isPaused = false;
    let speed = 500;
    let ant = { x: 20, y: 20, direction: 'right' };
    const grid = [];
    const gridSize = 40;
    const cellSize = 10;

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = 'white';
        }
    }

    function moveAnt() {
        if (isPaused) return;
        setTimeout(() => {
            let { x, y, direction } = ant;
            if (grid[x][y] === 'white') {
                ant.direction = direction === 'right' ? 'down' : direction === 'down' ? 'left' : direction === 'left' ? 'up' : 'right';
                grid[x][y] = 'black';
            } else {
                ant.direction = direction === 'right' ? 'up' : direction === 'up' ? 'left' : direction === 'left' ? 'down' : 'right';
                grid[x][y] = 'white';
            }
            drawGrid();
            switch (ant.direction) {
                case 'right': ant.x = (x + 1) % gridSize; break;
                case 'down': ant.y = (y + 1) % gridSize; break;
                case 'left': ant.x = (x - 1 + gridSize) % gridSize; break;
                case 'up': ant.y = (y - 1 + gridSize) % gridSize; break;
            }
            moveAnt();
        }, speed);
    }

    function drawGrid() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                ctx.fillStyle = grid[i][j];
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
        ctx.fillStyle = 'red';
        ctx.fillRect(ant.x * cellSize, ant.y * cellSize, cellSize, cellSize);
    }

    beginButton.addEventListener('click', () => {
        introBox.style.opacity = '0';
        setTimeout(() => {
            introBox.style.display = 'none';
            gameBox.style.display = 'block';
            gameBox.style.opacity = '1';
            moveAnt();
        }, 500);
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Start' : 'Pause';
        if (!isPaused) moveAnt();
    });

    applyButton.addEventListener('click', () => {
        speed = parseInt(speedInput.value, 10);
    });
});
