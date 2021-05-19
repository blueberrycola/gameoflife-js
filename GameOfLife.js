'use strict';

/**
 *  Game of Life
 *  Author(s): Christian Van Eerden and Chase Johnston
 */

/*
 * The "fs" module provides an API for interacting with the file system
 */
const fs = require('fs');

// Class that represents Game of Life
class GameOfLife {

    // Constructor that sets up instance variables with default values
    constructor() {
        this.grid = [];
        this.rows = 0;
        this.cols = 0;
    }

    // Reads data from the file, instantiates the grid, and loads the
    // grid with data from file. Sets this.grid, this.rows, and
    // this.cols instance variables for later use.
    loadGrid(file) {
        let data = fs.readFileSync(file, 'utf8');
        let tokens = data.split(' ');

        this.rows = parseInt(tokens.shift());
        this.cols = parseInt(tokens.shift());
        this.grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
            this.grid[i].fill(0);
        }
	
	var loadIterator = 0;
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			if (tokens[loadIterator] == 1) {
				this.grid[i][j] = "X";
			}
			loadIterator++;
		}
	}
        

    }

    // Saves the current grid values to the file specified.
    saveGrid(file) {
        let data = this.rows + ' ' + this.cols;

        var saveIterator = 0;
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			if (this.grid[i][j] == "X") {
				data += ' ' + 1;
			}
			else if (this.grid[i][j] == 0) {
				data += ' ' + 0;
			}
		}
	}

        data += '\n';
        fs.writeFileSync(file, data);
    }

    // Mutates the grid to next generation
    mutate() {
        // make a copy of grid and fill it with zeros
        let temp = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            temp[i] = new Array(this.cols);
            temp[i].fill(0);
        }

        for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			let ncount = this.getNeighbors(i, j);
            //Any live cell with fewer than two live neighbours dies
            if (ncount < 2 && (this.grid[i][j] == "X" || this.grid == 1)) {
				temp[i][j] = 0;
			}
            //Any live cell with two 
			if (ncount == 2 && (this.grid[i][j] == "X" || this.grid == 1)) {
				temp[i][j] = "X";
			}
            //or three live neighbours lives on to the next generation
			if (ncount == 3 && (this.grid[i][j] == "X" || this.grid == 1)) {
				temp[i][j] = "X";
			}

            //Any live cell with more than three live neighbours dies, as if by overpopulation
			if (ncount > 3 && (this.grid[i][j] == "X" || this.grid == 1)) {
				temp[i][j] = 0;
			}
            //Any dead cell with exactly three live neighbours becomes a live cell,
            if(ncount == 3 && ((this.grid[i][j] == ".") || this.grid[i][j] == 0)) {
                temp[i][j] = "X";
            }
			
		}
	}

        
        // set this.grid to temp grid
        this.grid = temp;
    }

    // Returns the number of neighbors for cell at this.grid[i][j]
    getNeighbors(i, j) {
        let neighbors = 0;
        //Down direction
    if (!(i + 1 >= this.rows) && (this.grid[i + 1][j] == "X")) {
		neighbors++;
	}
    
        //Up direction
	if (!(i - 1 < 0) && this.grid[i - 1][j] == "X") {
		neighbors++;
	}
        //Right direction
	if (!(j + 1 >= this.cols) && this.grid[i][j + 1] == "X") {
		neighbors++;
	}
        //Left direction
	if (!(j - 1 < 0) && this.grid[i][j - 1] == "X") {
		neighbors++;
	}
        //Down-Right
	if ((!(i + 1 >= this.rows) && !(j + 1 >= this.cols)) && this.grid[i + 1][j + 1] == "X") {
		neighbors++;
	}
        //Up-Right
	if ((!(i - 1 < 0) && !(j + 1 >= this.cols)) && this.grid[i - 1][j + 1] == "X") {
		neighbors++;
	}
        //Down-Left
	if ((!(i + 1 >= this.rows) && !(j - 1 < 0)) && (this.grid[i + 1][j - 1] == "X")) {
		neighbors++;
	}
        //Up-Left
	if ((!(i - 1 < 0) && !(j - 1 < 0)) && (this.grid[i - 1][j - 1] == "X")) {
		neighbors++;
	}
        
        return neighbors;
    }

    // Returns a string representation of the grid (for display purposes)
    toString() {
        let str = '\n';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    str += ' . ';
                } else {
                    str += ' X ';
                }
            }
            str += "\n";
        }
        return str;
    }
}

module.exports = GameOfLife;
