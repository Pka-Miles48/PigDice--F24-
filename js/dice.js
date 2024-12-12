"use strict";

let scores = [0, 0]; // Initialize scores array
let activePlayer = 0; // Initialize activePlayer to 0
let currentScore = 0, isPlaying = false; // Initialize currentScore and isPlaying

// Function to switch players
function switchPlayers() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    let playerName = document.getElementById(`player${activePlayer + 1}`).value;
    if (!playerName) {
        playerName = `Player ${activePlayer + 1}`; // Default to "Player 1" or "Player 2"
    }
    document.getElementById('current').innerText = playerName;
}

// Function to roll the die
function rollDie() {
    if (isPlaying) {
        const dice = Math.floor(Math.random() * 6) + 1;
        document.getElementById('die').value = dice;
        document.getElementById('diceImage').src = `green-dice${dice}.png`; // Update the dice image
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById('total').value = currentScore;
        } else {
            switchPlayers();
        }
    }
}

// Function to hold the current score
function holdDie() {
    if (isPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score${activePlayer + 1}`).value = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            isPlaying = false;
            let playerName = document.getElementById(`player${activePlayer + 1}`).value;
            if (!playerName) {
                playerName = `Player ${activePlayer + 1}`; // Default to "Player 1" or "Player 2"
            }
            document.getElementById(`player${activePlayer + 1}`).value = `${playerName} Wins!`;
        } else {
            switchPlayers();
        }
    }
}

// Function to start a new game
function startNewGame() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    document.getElementById('turn').classList.add('open');
    document.getElementById('total').value = '0';
    document.getElementById('score1').value = '0';
    document.getElementById('score2').value = '0';
    document.getElementById('player1').value = 'Player 1'; // Reset Player 1's name
    document.getElementById('player2').value = 'Player 2'; // Reset Player 2's name
    document.getElementById('player1').removeAttribute('disabled');
    document.getElementById('player2').removeAttribute('disabled');
    switchPlayers();
}

// Initialize the game on window load
window.onload = function () {
    document.getElementById('diceImage').src = '';
    document.getElementById('new_game').onclick = startNewGame;
    document.getElementById('roll').onclick = rollDie;
    document.getElementById('hold').onclick = holdDie;
};
