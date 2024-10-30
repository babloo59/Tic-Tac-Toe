const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr empty bhi karna padega boxes ko
    boxes.forEach((box,index)=> {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    // TODO
    // newGameBtn.classList.add("active");/
    let answer = "";
    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            
                // check if winner is x
                if(gameGrid[position[0]] === "X")
                    answer="X";
                else
                    answer="O";

                // Disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    // It means we have a winner
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return; 
    }

//     // let's check whether ther is tie
    let fillCuont =0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCuont++;
    });
    
//     // board is filled , game is TIE
    if(fillCuont ===9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapTurn();
        // check koi jeet toh nai gaya
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);