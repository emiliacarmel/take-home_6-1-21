import { useState } from "react";
import "./App.css";
import { data } from "./data.js";

const App = () => {
  // Map over each array in the grid
  // At the beginning of each new array, set some variables with previous, current, and next arrays
  // If a number other than 0 is encountered, check what number it is and who its neighbors are based on the set array variables
  // For each array, we want to return a new array with updated cells so that the output of the function is a new, updated grid

  const [grid, setNewGrid] = useState(data);
  const [generationCount, setGenerationCount] = useState(0);

  const createNewGrid = () => {
    let previousRow = [];
    let currentRow = [];
    let nextRow = [];
    const newGridInProgress = [];

    for (let i = 0; i < grid.length; i++) {
      const newRowInProgress = [];

      if (grid[i - 1]) {
        previousRow = grid[i - 1];
      }
      if (grid[i + 1]) {
        nextRow = grid[i + 1];
      }
      currentRow = grid[i];

      for (let j = 0; j < currentRow.length; j++) {
        let value = 0;
        let neighbors = [];

        if (currentRow[j] === 0) {
          let adultCount = 0;
          // check all of the value's neighbors
          neighbors.push(previousRow[j - 1]);
          neighbors.push(previousRow[j]);
          neighbors.push(previousRow[j + 1]);
          neighbors.push(currentRow[j - 1]);
          neighbors.push(currentRow[j + 1]);
          neighbors.push(nextRow[j - 1]);
          neighbors.push(nextRow[j]);
          neighbors.push(nextRow[j + 1]);

          // check how many adults surround the value
          neighbors.forEach((neighbor) => {
            if (neighbor === 2) {
              adultCount++;
            }
          });

          // update cell value if conditions are met
          if (adultCount === 2) {
            value = 1;
          }
        }

        if (currentRow[j] === 1) {
          let neighborCount = 0;

          neighbors.push(previousRow[j - 1]);
          neighbors.push(previousRow[j]);
          neighbors.push(previousRow[j + 1]);
          neighbors.push(currentRow[j - 1]);
          neighbors.push(currentRow[j + 1]);
          neighbors.push(nextRow[j - 1]);
          neighbors.push(nextRow[j]);
          neighbors.push(nextRow[j + 1]);

          neighbors.forEach((neighbor) => {
            if (neighbor !== 0) {
              neighborCount++;
            }
          });

          if (neighborCount >= 5 || neighborCount <= 1) {
            value = 0;
          } else {
            value = 2;
          }
        }

        if (currentRow[j] === 2) {
          let neighborCount = 0;

          neighbors.push(previousRow[j - 1]);
          neighbors.push(previousRow[j]);
          neighbors.push(previousRow[j + 1]);
          neighbors.push(currentRow[j - 1]);
          neighbors.push(currentRow[j + 1]);
          neighbors.push(nextRow[j - 1]);
          neighbors.push(nextRow[j]);
          neighbors.push(nextRow[j + 1]);

          neighbors.forEach((neighbor) => {
            if (neighbor !== 0) {
              neighborCount++;
            }
          });

          if (neighborCount >= 3 || neighborCount === 0) {
            value = 0;
          } else {
            value = 3;
          }
        }

        if (currentRow[j] === 3) {
          value = 0;
        }

        // add the value (same or updated) to the new row being created
        newRowInProgress.push(value);
      }

      // add the updated row to the new grid being created
      newGridInProgress.push(newRowInProgress);
    }

    setNewGrid(newGridInProgress);
  };

  return (
    <div style={{ margin: "30px" }}>
      <h2>2D Cellular Automata</h2>
      <div>{grid}</div>
      <button
        onClick={() => {
          createNewGrid();
          setGenerationCount(generationCount + 1);
        }}
      >
        Next Generation
      </button>
      <div>Generation: {generationCount}</div>
    </div>
  );
};

export default App;
