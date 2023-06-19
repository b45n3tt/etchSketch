document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".grid-container");
    let isMouseDown = false; // Flag to track mouse state
    let clearButton = null; // Variable to hold the clear button element
    let currentColor = "#000000"; // Variable to hold the current background color for the trail
    let setColorButton = null; // Variable to hold the set color button element
  
    // Create 16x16 grid
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        container.appendChild(gridItem);
  
        // Mouse hover event listener
        gridItem.addEventListener("mouseover", function(event) {
          if (isMouseDown) {
            if (event.target === clearButton) {
              clearGrid();
            } else if (event.target === setColorButton) {
              setColor();
            } else {
              event.target.style.backgroundColor = currentColor; // Set the background color on mouse hover
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
            event.target.style.backgroundColor = currentColor; // Set the background color on mouse down
          }
        });
  
        // Add mouse up event listener
        gridItem.addEventListener("mouseup", function() {
          isMouseDown = false;
        });
  
        // Set the first grid item as the clear button
        if (i === 0 && j === 0) {
          gridItem.textContent = "Clr";
          gridItem.classList.add("clear-button");
          clearButton = gridItem;
        }
  
        // Set the second grid item as the set color button
        if (i === 1 && j === 0) {
          gridItem.textContent = "Rndm";
          gridItem.classList.add("setColor-button");
          setColorButton = gridItem;
        }
      }
    }
  
    function clearGrid() {
      const gridItems = document.querySelectorAll(".grid-item");
      gridItems.forEach(function(item) {
        item.style.backgroundColor = "transparent"; // Reset the background color of all grid items
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
      currentColor = getRandomColor(); // Generate a random color and assign it to the currentColor variable
    }
  });
  