'use strict';

/**
 *  Driver code for Game of Life game
 *  Author(s): Nandigam
 */

/*
 * Requires "readline-sync" package for synchronous I/O
 * Package installation: npm install readline-sync
 * 		(run this command inside the project folder; requires node.js)
 * Documentation: https://www.npmjs.com/package/readline-sync
 */
const readlineSync = require('readline-sync');

const GameOfLife = require('./GameOfLife');

// Main driver for the program
function main() {
    // process.argv array stores command-line arguments
    if (process.argv.length !== 3) {
        console.log("Incorrect number of arguments to the program");
        console.log("Usage: node Main.js inputfilename");
        console.log("Example: node Main.js blinker.gol");
        process.exit(1);
    }

    // instantiate GameOfLife object
    let gol = new GameOfLife();

    // load grid with data from file given on command line
    gol.loadGrid(process.argv[2]);

    console.log("Beginning with grid size " + gol.rows + "," + gol.cols);
    console.log(gol.toString());

    // play game
    while (true) {
        
        /*

        */
        let line = readlineSync.question("Press n (or return) for next generation, i to iterate multiple times,\n"
                            + "w to save grid to disk, or q to quit? ");
        line = line.trim().toLowerCase();
       

        switch (line) {
            case "n":
            case "":
                gol.mutate();
                console.log(gol.toString());
                break;

            case "i":
                let num = parseInt(readlineSync.question("How many iterations? "));
                for (let i = 0; i < num; i++) {
                    gol.mutate();
                    console.log(gol.toString());
                }
                break;

            case "w":
                let filename = readlineSync.question("Enter a filename: ");
                gol.saveGrid(filename.trim());
                console.log("Grid saved to file " + filename + "\n");
                break;

            case "q":
                console.log("Exiting program");
                process.exit(0);
                break;
        }
    }
}

// Invoke the driver
main();
