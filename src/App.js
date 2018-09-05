import React, { Component } from "react";
import "./App.css";
import Grid from "./components/grid";

class App extends Component {
  constructor() {
    super();
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

  selectBox = (row, col) => {
    let prev = [...this.state.gridFull];
    prev[row][col] ? (prev[row][col] = false) : (prev[row][col] = true);
    this.setState({
      gridFull: prev
    });
    console.log(row, col);
  };

  checkAround = (grid, row, col) => {
    //debugger;
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
            setInterval(() => {
              const copy = JSON.parse(JSON.stringify(this.state.gridFull));
              for (let i = 0; i < this.state.gridFull.length; i++) {
                for (let j = 0; j < this.cols; j++) {
                  this.checkAround(copy, i, j);
                }
              }
              this.setState({ gridFull: copy });
            }, 50);
          }}
        >
          Start
        </button>
        <h2>Generations: {this.state.generations}</h2>
      </div>
    );
  }
}

export default App;
