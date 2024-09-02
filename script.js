let reset;
showGridNum = document.getElementById("counter");
minusBtn = document.getElementById("decrease");
plusBtn = document.getElementById("increase");
enterBtn = document.getElementById("enter");
let gridNum = 16;
minusBtn.addEventListener("click", () => {
    if (gridNum > 16) {
        gridNum--;
        showGridNum.value = gridNum;
    }
});
plusBtn.addEventListener("click", () => {
    if (gridNum < 64) {
        gridNum++;
        showGridNum.value = gridNum;
    }
});
enterBtn.addEventListener("click", () => playRound(gridNum));

function playRound (gridNum=16) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    let gridSize = 16*gridNum;
    container.setAttribute("style", `height: ${gridSize}px; width: ${gridSize}px;`)
    const grid = [];
    let isCtrlPressed = false;

    document.addEventListener("keydown", (e) => {
        if (e.key === "Control") {
            isCtrlPressed = true;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "Control") {
            isCtrlPressed = false;
        }
    });

    function getRandomColor() {
        function getRandom () {
            return Math.floor(Math.random() * 256);
        }
        return 'rgb(' + [getRandom(),getRandom(),getRandom()].join(',') + ')'
    }

    for (let i=1; i<=gridNum*gridNum; i++){
        let div = document.createElement("div");
        div.addEventListener("mouseover", (e) => {
            if (isCtrlPressed) {
                e.target.style.backgroundColor = getRandomColor();
                if (!e.target.style.opacity) e.target.style.opacity = 0.1;
                e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
            }
        });
        // div.addEventListener("mouseout", (e) => e.target.style.backgroundColor = "lightblue");
        div.setAttribute("id", `sqr${i}`);
        container.append(div);
        grid.push(div);
    }
}

window.onload = (e) => playRound(gridNum);