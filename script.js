const play = (function () {
    const Gameboard = {
        A_1: "", B_1: "", C_1: "",
        A_2: "", B_2: "", C_2: "",
        A_3: "", B_3: "", C_3: "",
    }

function checkForGameover() {
    const winningLines = [
        ["A_1", "A_2", "A_3"],
        ["B_1", "B_2", "B_3"],
        ["C_1", "C_2", "C_3"],
        ["A_1", "B_1", "C_1"],
        ["A_2", "B_2", "C_2"],
        ["A_3", "B_3", "C_3"],
        ["A_1", "B_2", "C_3"],
        ["A_3", "B_2", "C_1"]
    ];

    for (const [cell1, cell2, cell3] of winningLines) {
        const value = Gameboard[cell1];

        if (value && value === Gameboard[cell2] && value === Gameboard[cell3]) {
            switch (value) {
                case "X":
                    return "X"; // X wins
                case "O":
                    return "O"; // O wins
            }
        }
    }

    // no empty spaces left?
    const isTie = !Object.values(Gameboard).includes("");
    if (isTie) {
        return "It's a tie!";
    }

    return null; // No winner yet
};

    // mark an empty cell as X
    const makeMoveX = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "X";
            return checkForGameover();
        } else {
            console.log("This cell is already used.")
        }
    };

    // mark an empty cell as O
    const makeMoveO = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "O";
            return checkForGameover();
        } else {
            console.log("This cell is already used.")
        }
    };

    return {
        Gameboard,   // the Gameboard
        makeMoveX,   // the function
        makeMoveO,   // the function
        checkForGameover, // the function
    };

})();

// DEBUG / tests

// winning line
play.makeMoveO("A_1");
play.makeMoveO("A_2");
play.makeMoveO("A_3");
console.log("Who won? The " + play.checkForGameover() + " player did!");

// "it's a tie" message
// play.makeMoveX("A_1");
// play.makeMoveX("A_2");
// play.makeMoveO("A_3");
// play.makeMoveO("B_1");
// play.makeMoveO("B_2");
// play.makeMoveX("B_3");
// play.makeMoveX("C_1");
// play.makeMoveX("C_2");
// play.makeMoveO("C_3");
// console.log("Who won? " + play.checkForGameover());