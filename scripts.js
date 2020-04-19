let color = false;

function createGrid(grid_size) {
    // First find grid div.
    const grid = document.querySelector('#grid');
    grid.style.gridTemplateColumns = `repeat(${grid_size}, auto)`;

    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square')
            newSquare.addEventListener("mouseenter", (e) => {
                if (!newSquare.style.backgroundColor && color) {
                    newSquare.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                }
                else if (!newSquare.style.backgroundColor && !color) {
                    newSquare.style.backgroundColor = 'black';
                }
                else if (newSquare.style.backgroundColor && color) {
                    // Make color darker if already passed over square.
                    newSquare.style.filter += 'brightness(70%)';
                }
            });
            grid.appendChild(newSquare);
        }
    }
}

function addButtonListeners() {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', clearGrid);

    const colorButton = document.querySelector('#color');
    colorButton.addEventListener('click', toggleColor);
}

function toggleColor(e) {
    if (color) {
        color = false;
    }
    else {
        color = true
    }
    // Set button text;
    const colorButton = document.querySelector('#color');
    if (color) {
        colorButton.textContent = 'Black';
    }
    else {
        colorButton.textContent = 'Color';
    }
}

function clearGrid(e) {
    const grid = document.querySelector('#grid');

    // Remove old grid.
    for (let i = 0; i < grid_size ** 2; i++) {
        grid.removeChild(grid.firstChild); 
    }

    promptString = "Enter the number of squares per side for the new grid. It must be less than 200 and actually be a number."
    grid_size = prompt(promptString);
    while (Math.abs(grid_size) >= 200 || isNaN(grid_size)) {
        grid_size = prompt(promptString);
    }
    grid_size = Math.floor(Math.abs(grid_size));

    createGrid(grid_size);
}

let grid_size = 50;
createGrid(grid_size);
addButtonListeners();