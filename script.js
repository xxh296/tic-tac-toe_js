// disallow >2 players
// autocorrect the second player's choise to X or O
const createPlayer = (function () {
    let count = 0;
    let firstChoice = null; // first player's choice will go here

    return function (name, xOrO) {
        if (count >= 2) {
            console.log("Only 2 players can be created.");
        }

        count++;
        return { name, xOrO };
    };
})();

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

let player1 = null;
let player2 = null;


const gameController = (function(){

    const formPlayers = document.querySelector("#form-players");
    formPlayers.addEventListener("submit", (event) => {
        event.preventDefault();
        player1 = createPlayer(document.querySelector('#input-first-player').value, document.querySelector('input[name="response-player1"]:checked').value);

    // xOrO for player2 depends on player1's xOrO
    let secondXorO = "";
    if (player1.xOrO === "X"){
        secondXorO = "O";
    } else {
        secondXorO = "X";
    }

    player2 = createPlayer(document.querySelector('#input-second-player').value, secondXorO);
    formPlayers.remove();
    });

     return {player1, player2}
})();