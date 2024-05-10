const canvas = document.getElementById('boardCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const cellSize = 100;
const boardSize = 3;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'O';
let gameActive = true;

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    for (let i = 1; i < boardSize; i++) {
        const pos = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cellValue = board[row][col];
            if (cellValue !== '') {
                const x = col * cellSize + cellSize / 2;
                const y = row * cellSize + cellSize / 2;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 48px Arial';
                ctx.fillStyle = '#000';
                ctx.fillText(cellValue, x, y);
            }
        }
    }
}

function placeMarker(row, col) {
    if (gameActive && board[row][col] === '') {
        board[row][col] = currentPlayer;
        drawBoard();
        if (checkWin()) {
            alert(currentPlayer + 'の勝利！');
            gameActive = false;
        } else if (checkDraw()) {
            alert('引き分けです');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winningCombinations.some(combination => {
        return combination.every(([row, col]) => {
            return board[row][col] === currentPlayer;
        });
    });
}

function checkDraw() {
    return board.every(row => row.every(cell => cell !== ''));
}

function reset() {
    board.forEach(row => row.fill(''));
    currentPlayer = 'O';
    gameActive = true;
    drawBoard();
}

canvas.addEventListener('click', function(event) {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    placeMarker(row, col);
});

resetButton.addEventListener('click', reset);

drawBoard();