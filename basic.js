document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector(".grid-container");
  let isMouseDown = false;
  let clearButton = null;
  let currentColor = "#000000";
  let setColorButton = null;
  let gridNumberButton = null;
  let size = 16; // Default grid size

  // Create 16x16 grid
  createGrid();

  function createGrid() {
    // Set the grid template columns and rows based on the size variable
    container.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    container.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

    // Clear the previous grid items
    container.innerHTML = "";

    // Create new grid items
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        container.appendChild(gridItem);
      
        gridItem.addEventListener("mouseover", function(event) {
          if (isMouseDown) {
            if (event.target === clearButton) {
              clearGrid();
            } else if (event.target === setColorButton) {
              setColor();
            } else {
              event.target.style.backgroundColor = currentColor;
            }
          }
        });

        gridItem.addEventListener("mousedown", function(event) {
          isMouseDown = true;
          if (event.target === clearButton) {
            clearGrid();
          } else if (event.target === setColorButton) {
            setColor();
          } else {
            event.target.style.backgroundColor = currentColor;
          }
        });

        gridItem.addEventListener("mouseup", function() {
          isMouseDown = false;
        });

        if (i === 0 && j === 0) {
          gridItem.textContent = String.fromCodePoint(0x21BB); // U+21BB: Unicode character for "↻"
          gridItem.classList.add("clear-button");
          clearButton = gridItem;
        }

        if (i === 0 && j === 1) {
          gridItem.textContent = String.fromCodePoint(0x1F308);
          gridItem.classList.add("setColor-button");
          setColorButton = gridItem;
        }

        if (i === 0 && j === 3) {
          gridItem.textContent = "#";
          gridItem.classList.add("gridNumber-button");
          gridNumberButton = gridItem;
          gridItem.addEventListener("click", function() {
            changeGridSize();
          });
        }
      }
    }
  }

  function changeGridSize() {
    const newSize = parseInt(prompt("Enter the new grid size 4-100 (e.g., 16 for a 16x16 grid):"));
    if (isNaN(newSize) || newSize < 4 || newSize > 100) {
      alert("Invalid grid size. Please enter a valid number.");
    } else {
      size = newSize;
      createGrid();
    }
  }

  function clearGrid() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(function(item) {
      item.style.backgroundColor = "transparent";
    });
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setColor() {
    currentColor = getRandomColor();
  }
});
