const gameBoard = document.getElementById("gameboard");
const infoDisplay = document.getElementById("info");
const restartButton = document.getElementById("restartButton");

// empty cells
const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
infoDisplay.textContent = "Circle goes first";

// Create board
function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    gameBoard.append(cellElement);
    cellElement.addEventListener("click", addGo);
  });
}

createBoard();

// Add cross and circle on board
function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `${go.charAt(0).toUpperCase() + go.slice(1)} turn`;
  // Remove eventListener
  e.target.removeEventListener("click", addGo);
  checkWin();
}

const allSquares = document.querySelectorAll(".square");

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let draw = true;

  // For circle win
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      //Remove Listeners
      removeListeners();
      draw = false;
      return;
    }
  });

  // For cross win
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      //Remove Listeners
      removeListeners();
      draw = false;
      return;
    }
  });

  // Check for a draw
  if (draw) {
    const allFilled = Array.from(allSquares).every(
      (square) =>
        square.firstChild?.classList.contains("circle") ||
        square.firstChild?.classList.contains("cross")
    );
    if (allFilled) {
      infoDisplay.textContent = "It's a Draw!";
      // Remove Listeners
      removeListeners();
      draw = false;
    }
  }
}

function removeListeners() {
  allSquares.forEach((square) => square.removeEventListener("click", addGo));
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartGame);
}

function restartGame() {
  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.addEventListener("click", addGo);
  });
  infoDisplay.textContent = "Circle goes first";
  restartButton.style.display = "none";
  go = "circle";
}

restartButton.style.display = "none";
