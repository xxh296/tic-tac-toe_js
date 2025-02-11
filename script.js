// DEBUG
const hello = document.querySelector("#hello");
hello.textContent += "Hello from script.js";

const play = (function () {
    const Gameboard = {
        A_1: "", B_1: "", C_1: "",
        A_2: "", B_2: "", C_2: "",
        A_3: "", B_3: "", C_3: "",
    }

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
    };

})();

// DEBUG / tests

// play.makeMoveX("A_1");
// console.log(play.Gameboard); // print the Gameboard
// console.log(play.Gameboard.A_1); // individual cells accessible? 

// play.makeMoveX("A_1"); // testing used cell
// play.makeMoveO("B_1"); // test an O cell
// console.log(play.Gameboard); // print the Gameboard

/*

play.makeMoveO("A_1");
console.log(checkForGameover()); // undefined
play.makeMoveO("A_2");
console.log(checkForGameover()); // undefined
play.makeMoveO("A_3");
console.log(checkForGameover());

*/






// check for gameover (refactored for switch, added the 'tie')
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
        const value = play.Gameboard[cell1];

        if (value && value === play.Gameboard[cell2] && value === play.Gameboard[cell3]) {
            switch (value) {
                case "X":
                    return "X"; // X wins
                case "O":
                    return "O"; // O wins
            }
        }
    }

    // Check if there are any empty spaces left
    const isTie = !Object.values(play.Gameboard).includes("");
    if (isTie) {
        return "It's a tie!";
    }

    return null; // No winner yet
};

// // check for gameover
// function checkForGameover(){
//     if ((play.Gameboard.A_1 === play.Gameboard.A_2 && play.Gameboard.A_2 === play.Gameboard.A_3)){
//         if (play.Gameboard.A_1 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_1 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.B_1 === play.Gameboard.B_2 && play.Gameboard.B_2 === play.Gameboard.B_3)){
//         if (play.Gameboard.B_1 === "X"){
//             return "X";
//         } else if (play.Gameboard.B_1 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.C_1 === play.Gameboard.C_2 && play.Gameboard.C_2 === play.Gameboard.C_3)){
//         if (play.Gameboard.C_1 === "X"){
//             return "X";
//         } else if (play.Gameboard.C_1 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.A_1 === play.Gameboard.B_1 && play.Gameboard.B_1 === play.Gameboard.C_1)){
//         if (play.Gameboard.A_1 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_1 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.A_2 === play.Gameboard.B_2 && play.Gameboard.B_2 === play.Gameboard.C_2)){
//         if (play.Gameboard.A_2 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_2 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.A_3 === play.Gameboard.B_3 && play.Gameboard.B_3 === play.Gameboard.C_3)){
//         if (play.Gameboard.A_3 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_3 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.A_1 === play.Gameboard.B_2 && play.Gameboard.B_2 === play.Gameboard.C_3)){
//         if (play.Gameboard.A_1 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_1 === "O"){
//             return "O";
//         }
//     }

//     if ((play.Gameboard.A_3 === play.Gameboard.B_2 && play.Gameboard.B_2 === play.Gameboard.C_1)){
//         if (play.Gameboard.A_3 === "X"){
//             return "X";
//         } else if (play.Gameboard.A_3 === "O"){
//             return "O";
//         }
//     }
// }


