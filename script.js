let reset;
const showGridNum = document.getElementById("counter");
const minusBtn = document.getElementById("decrease");
const plusBtn = document.getElementById("increase");
const enterBtn = document.getElementById("enter");
let gridNum = 16;
let currentColor = '';  // Variable to keep track of the current color being drawn

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

    function getRandomColor() {
        function getRandom() {
            return Math.floor(Math.random() * 256);
        }
        return 'rgb(' + [getRandom(), getRandom(), getRandom()].join(',') + ')';
    }

    // Create grid items
    for (let i = 1; i <= gridNum * gridNum; i++) {
        let div = document.createElement("div");
        div.setAttribute("id", `sqr${i}`);
        container.append(div);
        grid.push(div);
    }

    // Handle drawing on touchstart and touchmove
    container.addEventListener("touchstart", (e) => {
        e.preventDefault();  // Prevent scrolling or other touch behaviors
        currentColor = getRandomColor();  // Set a new random color at the start of touch
        handleDrawing(e);  // Draw on the initial touch
    }, { passive: false });

    container.addEventListener("touchmove", (e) => {
        e.preventDefault();  // Prevent scrolling or other touch behaviors
        handleDrawing(e);  // Continue drawing as the finger moves
    }, { passive: false });

    function handleDrawing(e) {
        const touch = e.touches[0];  // Get the first touch point
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);  // Find the element under the finger
        
        if (elementUnderFinger && container.contains(elementUnderFinger) && elementUnderFinger.style.backgroundColor !== currentColor) {
            elementUnderFinger.style.backgroundColor = currentColor;  // Color only if not already colored
        }
    }
}

// Initialize the grid when the page loads
window.onload = () => reset = playRound(gridNum);