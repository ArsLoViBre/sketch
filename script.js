const container = document.getElementById("container");
const grid = [];
for (let i=1; i<=256; i++){
    let div = document.createElement("div");
    div.addEventListener("mouseover", (e) => e.target.style.backgroundColor = "red");
    // div.addEventListener("mouseout", (e) => e.target.style.backgroundColor = "lightblue");
    div.setAttribute("id", `sqr${i}`);
    container.append(div);
    grid.push(div);
}

// console.log(grid);