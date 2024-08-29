let reset;
const showGridNum = document.getElementById("counter");
const minusBtn = document.getElementById("decrease");
const plusBtn = document.getElementById("increase");
const enterBtn = document.getElementById("enter");
let gridNum = 16;
let currentColor = '';  // Variable to keep track of the current color being drawn
let drawing = false;    // Flag to check if drawing is active

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

    // Handle drawing on touchstart, touchmove, and touchend
    container.addEventListener("touchstart", (e) => {
        e.preventDefault();  // Prevent default touch behavior
        drawing = true;      // Start drawing
        currentColor = getRandomColor();  // Set a new random color at the start of touch
        handleDrawing(e);  // Draw on the initial touch
    }, { passive: false });

    container.addEventListener("touchmove", (e) => {
        e.preventDefault();  // Prevent default touch behavior
        if (drawing) {
            handleDrawing(e);  // Continue drawing as the finger moves
        }
    }, { passive: false });

    container.addEventListener("touchend", () => {
        drawing = false;  // Stop drawing when touch ends
    }, { passive: false });

    function handleDrawing(e) {
        const touch = e.touches[0];  // Get the first touch point
        const rect = container.getBoundingClientRect();  // Get the container's position and size
        const x = touch.clientX - rect.left;  // Calculate touch position relative to the container
        const y = touch.clientY - rect.top;
        const elemWidth = container.offsetWidth / gridNum;  // Width of each grid item
        const elemHeight = container.offsetHeight / gridNum; // Height of each grid item
        const col = Math.floor(x / elemWidth);  // Calculate column index
        const row = Math.floor(y / elemHeight); // Calculate row index
        const index = row * gridNum + col;  // Calculate grid item index

        if (index >= 0 && index < grid.length) {
            const elementUnderFinger = grid[index];  // Get the element at the calculated index
            if (elementUnderFinger.style.backgroundColor !== currentColor) {
                elementUnderFinger.style.backgroundColor = currentColor;  // Color the element
            }
        }
    }
}

// Initialize the grid when the page loads
window.onload = () => reset = playRound(gridNum);