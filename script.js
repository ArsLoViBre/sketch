let reset;
const showGridNum = document.getElementById("counter");
const minusBtn = document.getElementById("decrease");
const plusBtn = document.getElementById("increase");
const enterBtn = document.getElementById("enter");
let gridNum = 16;
let isCtrlPressed = false;  // Track "Ctrl" state for touch-based toggle

// Decrease grid number on touchstart
minusBtn.addEventListener("touchstart", () => {
    if (gridNum > 16) {
        gridNum--;
        showGridNum.value = gridNum;
    }
});

// Increase grid number on touchstart
plusBtn.addEventListener("touchstart", () => {
    if (gridNum < 64) {
        gridNum++;
        showGridNum.value = gridNum;
    }
});

// Enter button to start game
enterBtn.addEventListener("touchstart", () => playRound(gridNum));

// Function to start the game and set up the grid
function playRound(gridNum = 16) {
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear container for new grid
    let gridSize = 16 * gridNum;
    container.setAttribute("style", `height: ${gridSize}px; width: ${gridSize}px;`);
    const grid = [];

    // Double-tap to toggle "Ctrl" pressed state
    container.addEventListener("dblclick", () => {
        isCtrlPressed = !isCtrlPressed;
    });

    function getRandomColor() {
        function getRandom() {
            return Math.floor(Math.random() * 256);
        }
        return 'rgb(' + [getRandom(), getRandom(), getRandom()].join(',') + ')';
    }

    // Create grid items
    for (let i = 1; i <= gridNum * gridNum; i++) {
        let div = document.createElement("div");
        
        // Change color on touchmove if "Ctrl" is simulated pressed
        div.addEventListener("touchmove", (e) => {
            if (isCtrlPressed) {
                e.target.style.backgroundColor = getRandomColor();
            }
        });

        // Set attributes and add to container
        div.setAttribute("id", `sqr${i}`);
        container.append(div);
        grid.push(div);
    }
}

// Initialize the grid when the page loads
window.onload = () => reset = playRound(gridNum);