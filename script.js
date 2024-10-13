const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning conditions array
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle click on each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle the cell click and mark X or O
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return; // Ignore if cell is already clicked or the game is over
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for X or O
  
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  updateStatus();
}

// Check for a winner or a draw
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue; // Skip empty cells
    }
    if (a === b && b === c) {
      roundWon = true;
      highlightWinningCells(winCondition); // Highlight the winning cells
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusDisplay.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }
}

// Highlight winning cells with animation
function highlightWinningCells(winCondition) {
  winCondition.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

// Update game status message
function updateStatus() {
  if (gameActive) {
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  }
}

// Reset game to start again
resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell', 'x', 'o'); // Remove classes
  });
}
