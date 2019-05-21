import React, { PureComponent } from "react";
import Controls from "../../components/Controls/Controls";
import shapes from "../../shapes";

import Grid from "../../components/Grid/Grid";

import "./GameOfLife.css";

class GameOfLife extends PureComponent {
  state = {
    grid: [],
    genNo: 0,
    gridSize: [50, 100],
    speed: 150,
    placingShape: null
  };

  componentDidMount() {
    this.initGrid();
  }

  initGrid = () => {
    const [rows, columns] = [...this.state.gridSize];
    const newGrid = Array(rows).fill(Array(columns).fill(false));
    this.setState({ grid: newGrid });
  };

  initRandomGrid = () => {
    const [rows, columns] = [...this.state.gridSize];
    const newGrid = Array(rows)
      .fill()
      .map(() =>
        Array(columns)
          .fill(false)
          .map(() => Math.random() >= 0.5)
      );
    this.setState({ grid: newGrid });
  };

  placeAlive = cell => {
    const newGrid = [...this.state.grid].map(row => [...row]);
    newGrid[cell[0]][cell[1]] = !newGrid[cell[0]][cell[1]];
    this.setState({ grid: newGrid });
  };

  getAlive = cell => {
    const [rows, columns] = [...this.state.gridSize];
    const adjacentCells = [
      [cell[0] - 1, cell[1] - 1],
      [cell[0] - 1, cell[1]],
      [cell[0] - 1, cell[1] + 1],
      [cell[0], cell[1] + 1],
      [cell[0] + 1, cell[1] + 1],
      [cell[0] + 1, cell[1]],
      [cell[0] + 1, cell[1] - 1],
      [cell[0], cell[1] - 1]
    ].filter(
      c =>
        c[0] >= 0 &&
        c[1] >= 0 &&
        (c[0] < rows && c[1] < columns) &&
        this.state.grid[c[0]][c[1]]
    );

    return adjacentCells.length;
  };

  nextGen = () => {
    const next = prevState => {
      // make a grid for the future generation
      const nextGenGrid = JSON.parse(JSON.stringify(prevState.grid));

      // compare cells to game rules
      this.state.grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const aliveNeighbours = this.getAlive([rowIndex, cellIndex]);
          if (cell === true) {
            if (aliveNeighbours < 2 || aliveNeighbours > 3) {
              nextGenGrid[rowIndex][cellIndex] = false;
            }
          } else {
            if (aliveNeighbours === 3) {
              nextGenGrid[rowIndex][cellIndex] = true;
            }
          }
        });
      });

      return nextGenGrid;
    };

    this.setState(prevState => ({
      grid: next(prevState),
      genNo: this.state.genNo + 1
    }));
  };

  startGame = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.nextGen();
    }, this.state.speed);
  };

  pauseGame = () => {
    clearInterval(this.timer);
  };

  clearGrid = () => {
    clearInterval(this.timer);
    this.initGrid();
    this.setState({ genNo: 0 });
  };

  gridSizeHandler = size => {
    this.clearGrid();
    this.setState({ gridSize: size }, () => {
      this.initGrid();
    });
  };

  speedChangeHandler = newSpeed => {
    this.setState({ speed: newSpeed }, () => {
      const gameOn = this.timer !== undefined;
      if (gameOn === true) {
        this.startGame();
      }
    });
  };

  placeShape1 = shape => {
    // first phase when you click the shape from the dropdown
    this.setState({ placingShape: shape });
  };

  placeShape2 = centerCell => {
    // second phase when you click a cell on the grid
    // takes center cell (function argument)
    // takes shape to place
    const shapeToPlace = shapes[this.state.placingShape];

    // takes the grid
    const newGrid = [...this.state.grid].map(row => [...row]);
    // take starting position to place the shape
    const [rows, columns] = this.state.gridSize;
    // calculates starting position around the center cell
    const [startingRow, startingColumn] = [
      centerCell[0] - Math.floor(shapeToPlace.length / 2),
      centerCell[1] - Math.floor(shapeToPlace[0].length / 2)
    ];
    // places shape
    shapeToPlace.forEach((row, rowIndex) => {
      // if it's out of range it just moves on #0hecks
      if (rowIndex + startingRow >= 0 && rowIndex + startingRow < rows) {
        row.forEach((column, columnIndex) => {
          if (
            columnIndex + startingColumn >= 0 &&
            columnIndex + startingColumn < columns
          ) {
            newGrid[rowIndex + startingRow][
              columnIndex + startingColumn
            ] = column;
          }
        });
      }
    });
    // sets states back to new grid
    this.setState({ grid: newGrid, placingShape: null });
  };

  render() {
    return (
      <div className="GameOfLife">
        <h1>Conway&apos;s Game of Life</h1>
        <Controls
          speed={this.state.speed}
          speedChangeHandler={this.speedChangeHandler}
          randomGrid={this.initRandomGrid}
          startGame={this.startGame}
          clearGrid={this.clearGrid}
          pauseGame={this.pauseGame}
          incSpeed={() => this.changeSpeed("inc")}
          decSpeed={() => this.changeSpeed("dec")}
          gridSizeHandler={this.gridSizeHandler}
          placeShape={this.placeShape1}
        />
        <Grid
          gridSize={this.state.gridSize}
          grid={this.state.grid}
          clicked={this.placeAlive}
          placingShape={this.state.placingShape}
          placeShape={this.placeShape2}
        />
        <h3>Generation: {this.state.genNo}</h3>
      </div>
    );
  }
}

export default GameOfLife;
