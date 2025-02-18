// disallow >2 players
// autocorrect the second player's choise to X or O
const createPlayer = (function () {
    let count = 0;

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
                        document.querySelector(`#${cell1}`).style.color = "darkorange";
                        document.querySelector(`#${cell2}`).style.color = "darkorange";
                        document.querySelector(`#${cell3}`).style.color = "darkorange";
                        return "X"; // X wins
                    case "O":
                        document.querySelector(`#${cell1}`).style.color = "darkorange";
                        document.querySelector(`#${cell2}`).style.color = "darkorange";
                        document.querySelector(`#${cell3}`).style.color = "darkorange";
                        return "O"; // O wins
                }
            }
        }

        // no empty spaces left?
        const isTie = !Object.values(Gameboard).includes("");
        if (isTie) {
            return "Tie";
        }

        return null; // No winner yet
    };

    // mark an empty cell as X
    const makeMoveX = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "X";
            populateGameboard();
        } else {
            console.log("This cell is already used.")
        }
    };

    // mark an empty cell as O
    const makeMoveO = (cell) => {
        if (Gameboard[cell] === ""){
            Gameboard[cell] = "O";
            populateGameboard();
        } else {
            console.log("This cell is already used.")
        }
    };

    return {Gameboard, makeMoveX, makeMoveO, checkForGameover};

})();

// TODO: can these vars be moved out
// of the global scope
let player1 = null;
let player2 = null;


const gameController = (function(){

    const gameTitle = document.querySelector("h1");
    const formPlayers = document.querySelector("#form-players");
    const gameBoard = document.querySelector("#gameboard");

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
        gameBoard.style.display = "grid";
        gameTitle.remove();
        formPlayers.remove();
        notifications.innerText = "Turn: X";
    });

     return {player1, player2}
})();

// UI gameboard values need to come from Gameboard
// TODO: see, if it can be moved away from the global scope
function populateGameboard() {
    for (const [key, value] of Object.entries(play.Gameboard)) {
        const cell = document.querySelector(`#${key}`);            
        cell.textContent = value;
    }
}

// whose turn?
let turn = "X";
function changeTurn(){
    if (turn === "O"){        
        turn = "X";
    } else {        
        turn = "O";
    }
}

const cells = document.querySelectorAll(".cell");
const notifications = document.querySelector("#notifications");
const playAgainBtn = document.querySelector("#play-again");
cells.forEach(cell => {
    cell.addEventListener("click", (event) => {
        // target the clicked cell
        const clickedCell = event.target;

        if (turn === "X" && play.checkForGameover() === null){
            play.makeMoveX(clickedCell.id);
            notifications.innerText = "Turn: O";
        }
        if (turn === "O" && play.checkForGameover() === null){
            play.makeMoveO(clickedCell.id);
            notifications.innerText = "Turn: X";
        } 

        if (play.checkForGameover() === "X" || play.checkForGameover() === "O" || play.checkForGameover() === "Tie"){
            notifications.innerText = "";
            determineWinner(play.checkForGameover());
        }

        changeTurn();
    });
});

function determineWinner(winningSymbol){
    if (player1.xOrO === winningSymbol){
        notifications.innerText = player1.name + " won!";
    } else if (player2.xOrO === winningSymbol){
        notifications.innerText = player2.name + " won!";
    } else {
        notifications.innerText = "It's a tie.";
    }
    playAgainBtn.style.display = "block";
}

playAgainBtn.addEventListener("click", () => location.reload());