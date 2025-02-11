// DEBUG
const hello = document.querySelector("#hello");
hello.textContent += "Hello from script.js";

const play = (function () {
    const Gameboard = {
        CELL_1: "", CELL_2: "", CELL_3: "",
        CELL_4: "", CELL_5: "", CELL_6: "",
        CELL_7: "", CELL_8: "", CELL_9: "",
    }

    // mark an empty cell as X
    const makeMoveX = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "X";
        } else {
            console.log("This cell is already used.")
        }
    };

    // mark an empty cell as O
    const makeMoveO = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "O";
        } else {
            console.log("This cell is already used.")
        }
    };

    return {
        Gameboard,   // the Gameboard
        makeMoveX,   // the function
        makeMoveO,   // the function
    };

})();

// DEBUG / tests

play.makeMoveX("CELL_1");
console.log(play.Gameboard); // print the Gameboard
console.log(play.Gameboard.CELL_1); // individual cells accessible? 

play.makeMoveX("CELL_1"); // testing used cell
play.makeMoveO("CELL_2"); // test an O cell
console.log(play.Gameboard); // print the Gameboard