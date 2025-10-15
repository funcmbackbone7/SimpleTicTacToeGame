// SimpleTicTacToeGame - Main Script
// Console tic-tac-toe for 2 players
// Run with: node tictactoe.js

const BOARD_SIZE = 3;
let board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(' '));
let currentPlayer = 'X';

function printBoard() {
  console.clear();
  console.log('\nTic-Tac-Toe Board:');
  for (let row = 0; row < BOARD_SIZE; row++) {
    let rowStr = '';
    for (let col = 0; col < BOARD_SIZE; col++) {
      rowStr += ` ${board[row][col]} |`;
    }
    console.log(rowStr.slice(0, -1)); // Remove last |
    if (row < BOARD_SIZE - 1) {
      console.log('---+---+---');
    }
  }
  console.log(`\nPlayer ${currentPlayer}'s turn.`);
}

function isValidMove(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] === ' ';
}

function makeMove(row, col) {
  if (isValidMove(row, col)) {
    board[row][col] = currentPlayer;
    return true;
  }
  return false;
}

function checkWin() {
  // Rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== ' ') {
      return board[row][0];
    }
  }
  // Columns
  for (let col = 0; col < BOARD_SIZE; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== ' ') {
      return board[0][col];
    }
  }
  // Diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
    return board[0][2];
  }
  return null;
}

function isDraw() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === ' ') {
        return false;
      }
    }
  }
  return true;
}

function playGame() {
  printBoard();
  while (true) {
    const readline = require('readline-sync');
    const input = readline.question('Enter row col (1-3): ').trim().split(' ');
    if (input.length !== 2) {
      console.log('Invalid input. Use row col (e.g., 1 1)');
      printBoard();
      continue;
    }
    let row = parseInt(input[0]) - 1;
    let col = parseInt(input[1]) - 1;
    if (isNaN(row) || isNaN(col) || !makeMove(row, col)) {
      console.log('Invalid move. Try again.');
      printBoard();
      continue;
    }
    const winner = checkWin();
    if (winner) {
      printBoard();
      console.log(`Player ${winner} wins!`);
      break;
    }
    if (isDraw()) {
      printBoard();
      console.log('It\'s a draw!');
      break;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

if (require.main === module) {
  console.log('Note: Install readline-sync for input: npm i readline-sync');
  playGame();
}