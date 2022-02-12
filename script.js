"use strict";

// Selecting Elements
const playerNamesEl = [
  document.getElementById("name--0"),
  document.getElementById("name--1"),
];
const scoresEl = [
  document.querySelector("#score--0"),
  document.getElementById("score--1"),
];
const currentScoresEL = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];
const playersEl = [
  document.querySelector("#player--0"),
  document.querySelector("#player--1"),
];
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnStartGame = document.querySelector("#btn-start-game");
const getPlayerNameModal = document.querySelector(".get-player-name");
const overlayEl = document.querySelector(".overlay");

let currentScore = 0, activePlayer = 0, scores = [];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Used Functions

// Function to set player name
const startGame = function () {
  if (document.querySelector("#player-name-0").value) {
  playerNamesEl[0].textContent = document.querySelector("#player-name-0").value;
  playerNamesEl[1].textContent = document.querySelector("#player-name-1").value;
  }
  getPlayerNameModal.classList.add("hidden");
  overlayEl.classList.add("hidden");
};

// Function to reset the dice image to default one
const resetDice = function () {
  diceEl.classList.remove("rolled-dice");
  diceEl.src = `dice/dice.png`;
};

// Function to display the rolled dice number image
const displayDice = function (dice) {
  diceEl.classList.add("rolled-dice");
  diceEl.src = `dice/dice-${dice}.png`;
};

// Function to switch the current player
const switchPlayer = function () {
  // Updating current score
  currentScoresEL[activePlayer].textContent = currentScore = 0;

  // Switching player
  activePlayer = activePlayer ? 0 : 1;
  playersEl[0].classList.toggle("player--active");
  playersEl[1].classList.toggle("player--active");
};

// Function to set up initial conditions before starting the new game or reloading the page
const initializeGame = function () {
  document.querySelector(`#win-${activePlayer}`).classList.add("hidden");
  activePlayer = 0;
  playerNamesEl[0].textContent = "Player 1";
  playerNamesEl[1].textContent = "Player 2";

  document.querySelector("#player-name-0").value = "";
  document.querySelector("#player-name-1").value = "";

  scoresEl[0].textContent = scores[0] = 0;
  scoresEl[1].textContent = scores[1] = 0;
  currentScoresEL[0].textContent = currentScore = 0;
  currentScoresEL[1].textContent = 0;

  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");

  playersEl[0].classList.add("player--active");
  playersEl[1].classList.remove("player--active");
  playersEl[0].classList.remove("player--winner");
  playersEl[1].classList.remove("player--winner");
  getPlayerNameModal.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
  resetDice();
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// Starting Conditions
initializeGame();

// Start Game button and Enter keydown functionality (Getting Players' name and starting game)
btnStartGame.addEventListener("click", startGame);
document.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && !getPlayerNameModal.classList.contains("hidden")) {
    startGame();
  }
});

// New Game button funcationality
btnNew.addEventListener("click", initializeGame);

// Rolling dice button functionality
btnRoll.addEventListener("click", function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  displayDice(dice);

  // 3. Checking for rolled 1 :: if true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScoresEL[activePlayer].textContent = currentScore += dice;
  } else {
    // Switching to next player
    switchPlayer();
  }
});

// Hold button functionality
btnHold.addEventListener("click", function () {
  // 1. Adding current score to active player
  scoresEl[activePlayer].textContent = scores[activePlayer] += currentScore;

  // 2. Checking if player's score is >=100. if true, finish the game
  if (scores[activePlayer] >= 100) {
    currentScoresEL[activePlayer].textContent = currentScore = 0;
    playersEl[activePlayer].classList.add("player--winner");
    playersEl[activePlayer].classList.remove("player--active");
    resetDice();
    btnRoll.classList.toggle("hidden");
    btnHold.classList.toggle("hidden");
    document.querySelector(`#win-${activePlayer}`).classList.remove("hidden");
  }

  // 3. Switching to the next player
  else {
    switchPlayer();
  }
});
