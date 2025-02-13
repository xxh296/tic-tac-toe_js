// disallow >2 players
// autocorrect the second player's choise to X or O
const createPlayer = (function () {
    let count = 0;
    let firstChoice = null; // first player's choice will go here

    return function (name, xOrO) {
        if (count >= 2) {
            console.log("Only 2 players can be created.");
        }

        if (count === 0) {
            // First player chooses freely
            if (xOrO !== "X" && xOrO !== "O") {
                console.log("First player must choose either 'X' or 'O'.");
            }
            firstChoice = xOrO;
            console.log("You just chose '" + firstChoice + "'.")
        } else {
            // Automatically assign the opposite symbol to the second player
            xOrO = firstChoice === "X" ? "O" : "X";
            if (count === 1){
                console.log("'" + xOrO + "' was assigned successfully.")
            }            
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

// gameController
//
const gameController = (function(){
    // DEBUG/testing -
    // users will be added from the UI

    let player1 = createPlayer(document.querySelector('#input-first-player').value, 
                    document.querySelector('input[name="response"]:checked')); // Jen chooses "X"
    let player2 = createPlayer("ken", "X");   // Ken is automatically assigned "O"

    // console.log(player1, player2);
    
    
    // the 'X' player to make the first move
    // then the players will alternate
    // this needs to be tied to a click event in the UI
    let xPlayer = (player1.xOrO === "X") ? player1 : player2;
    let oPlayer = (player1.xOrO === "O") ? player1 : player2;;


    



    // rest of the logic - 
    // capture the cellId where the user clicks, place and 'X' in it, etc.
    // assign latestMove (once the first 'X' is placed), then alternate 'X' and 'O'
    // also, make sure each 'X'/'O' is placed on the grid, have a counter for this, 
    // or use `while...`, that'll watch for any "" cells.
    let latestMove = "X"; 

    // btn-start that shows up on page load
    const btnStart = document.querySelector("#btn-start");
    btnStart.addEventListener("click", () => {
        btnStart.remove();
        // add code to display the form 
        // for the first player's name and X/O
    });
    
    // form-first-player
    const formFirstPlayer = document.querySelector("#form-first-player");
    formFirstPlayer.addEventListener("submit", (event) => {
        event.preventDefault();
        player1.name = document.querySelector('#input-first-player').value;
        player1.xOrO = document.querySelector('input[name="response"]:checked');
                // DEBUG
                // console.log(xPlayer);
                // const yPlayer = (player1.xOrO === "X") ? player1 : player2;


        // xPlayer = (player1.xOrO === "X") ? player1 : player2;
        // oPlayer = (player1.xOrO === "O") ? player1 : player2;

        // set up the 9-cell grid in Html/Css/js
        // write this to UI
        console.log(xPlayer.name + ", click a cell.");
        console.log(oPlayer.name + ", wait for your move.");
        
        // DEBUG
        // console.log(xPlayer.name + " , full or empty?");
        // console.log(oPlayer);
        
        // add code to collect data
        // toggle visibility, 
        // and bring up the next form.
    });


    


    return {player1, player2, xPlayer, oPlayer, }; // TODO: check, if access from higher scope is needed
})();






// // factory to create players
// function createPlayer (name, xOrO) {
//     return { name, xOrO };
// }

///////////////////////////////////////////

// DEBUG / tests

// winning line
// play.makeMoveO("A_1");
// play.makeMoveO("A_2");
// play.makeMoveO("A_3");
// console.log("Who won? The " + play.checkForGameover() + " player did!");

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

// create players
// const player1 = createPlayer("Alice", "X"); // Alice chooses "X"
// const player2 = createPlayer("Bob", "X");   // Bob is automatically assigned "O"
// console.log(player1, player2); 