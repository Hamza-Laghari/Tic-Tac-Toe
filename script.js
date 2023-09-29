const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("reset");
const cells = [];

resetButton.style.display = "none"
function startgame() {
    startButton.style.display = "none";
    resetButton.style.display = "none"; // Hide Reset Game button initially
    let currentPlayer = "Robin";
    let gameOver = false;

    // Create the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }

    // Images for X and O
    const images = {
        Robin: "rashid.jpeg",
        Hamza: "hamza2.jpeg",
    };

    // Function to handle cell clicks
    function handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains("cell") || cell.innerHTML || gameOver) {
            return;
        }

        cell.innerHTML = `<img src="${images[currentPlayer]}" alt="${currentPlayer}">`;
        cell.dataset.value = currentPlayer;

        if (checkWinner(currentPlayer)) {
            celebrateWin(currentPlayer);
            resetButton.style.display = "block"; // Show Reset Game button when the game ends
        } else if (isBoardFull()) {
            winnerText.textContent = "It's a draw!";
            gameOver = true;
            resetButton.style.display = "block"; // Show Reset Game button when the game ends
        } else {
            currentPlayer = currentPlayer === "Robin" ? "Hamza" : "Robin";
        }
    }

    // Function to check for a win
    function checkWinner(player) {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        if (winCombinations.some(combination =>
            combination.every(index => cells[index].dataset.value === player)
        )) {
            celebrateWin(player); // Call the celebrateWin function
            return true;
        }

        return false;
    }

    // Function to check if the board is full
    function isBoardFull() {
        const isFull = cells.every(cell => cell.dataset.value === "Robin" || cell.dataset.value === "Hamza");
        if (isFull) {
            winnerText.textContent = "It's a draw!";
            gameOver = true;
        }
        return isFull;
    }

    function celebrateWin(winningPlayer) {
        winnerText.textContent = `${winningPlayer} wins!`;
        gameOver = true;
        resetButton.addEventListener("click", resetGame);
    }
    
    // Event listener for the Reset Game button
    
}

// Function to reset the game

function resetGame() {
    // Clear the board
   
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.dataset.value = "";
    });

    // Clear the winner text
    winnerText.textContent = "";

    // Reset game state
    currentPlayer = "Robin";
    gameOver = false;
    resetButton.style.display = "none"; // Hide Reset Game button again
    board.innerHTML = "";
}
// Function to reset the game
function handleReset(){
    document.querySelector('#reset').addEventListener('click', function(){   
     location.reload();
    });
}

handleReset();
// Add an event listener to start the game when the "Start Game" button is clicked
// Add an event listener to start the game when the "Start Game" button is clicked
