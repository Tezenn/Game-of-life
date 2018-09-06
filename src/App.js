import React, { Component } from "react";
import "./App.css";
import Grid from "./components/grid";

class App extends Component {
  constructor() {
    super();
    this.interv = "wait";
    this.newBorns = 0;
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generations: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  //newCell = JSON.parse(JSON.stringify(this.state.generations));

  selectBox = (row, col) => {
    let prev = [...this.state.gridFull];
    prev[row][col] ? (prev[row][col] = false) : (prev[row][col] = true);
    this.setState({
      gridFull: prev
    });
  };

  checkAround = (grid, row, col) => {
    let around = 0;
    if ((grid[row - 1] || {})[col - 1] && grid[row - 1][col - 1]) {
      around++;
    }
    if ((grid[row - 1] || {})[col] && grid[row - 1][col]) {
      around++;
    }
    if ((grid[row - 1] || {})[col + 1] && grid[row - 1][col + 1]) {
      around++;
    }
    if ((grid[row] || {})[col - 1] && grid[row][col - 1]) {
      around++;
    }
    if ((grid[row] || {})[col + 1] && grid[row][col + 1]) {
      around++;
    }
    if ((grid[row + 1] || {})[col - 1] && grid[row + 1][col - 1]) {
      around++;
    }
    if ((grid[row + 1] || {})[col] && grid[row + 1][col]) {
      around++;
    }
    if ((grid[row + 1] || {})[col + 1] && grid[row + 1][col + 1]) {
      around++;
    }
    if (around < 2 && (grid[row] || {})[col]) {
      grid[row][col] = false;
    }
    if (around > 3 && (grid[row] || {})[col]) {
      grid[row][col] = false;
    }
    if (around === 3 && !(grid[row] || {})[col]) {
      grid[row][col] = true;
      this.newBorns++;
    }
  };

  render() {
    return (
      <div className="App">
        <h1> React Game Of Life </h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <button
          className="center"
          onClick={() => {
            this.interv = setInterval(() => {
              const copy = JSON.parse(JSON.stringify(this.state.gridFull));

              for (let i = 0; i < this.state.gridFull.length; i++) {
                for (let j = 0; j < this.cols; j++) {
                  this.checkAround(copy, i, j);
                }
              }
              this.setState({
                gridFull: copy,
                generations: this.newBorns
              });
            }, 200);
          }}
        >
          Start
        </button>
        <button
          className="center"
          onClick={() => {
            const copy = JSON.parse(JSON.stringify(this.state.gridFull));
            for (let i = 0; i < this.state.gridFull.length; i++) {
              for (let j = 0; j < this.cols; j++) {
                if (Math.random() * 10 > 7) {
                  copy[i][j] = true;
                }
              }
            }
            this.setState({ gridFull: copy });
          }}
        >
          Random Cells
        </button>
        <button
          className="center"
          onClick={() => {
            clearInterval(this.interv);
          }}
        >
          Stop
        </button>

        <button
          className="center"
          onClick={() => {
            const copy = JSON.parse(JSON.stringify(this.state.gridFull));
            for (let i = 0; i < this.state.gridFull.length; i++) {
              for (let j = 0; j < this.cols; j++) {
                copy[i][j] = false;
              }
            }
            this.newBorns = 0;
            this.setState({
              gridFull: copy,
              generations: this.newBorns
            });
          }}
        >
          Clear Board
        </button>
        <h2>New Born Cells: {this.state.generations}</h2>
      </div>
    );
  }
}

export default App;
