let gameState; // gameState is a global scoped var that can be referenced throughout js.file

function initialGame() { //call this function to 'reset' game
    gameState = {
        players: [
            {name: "", symbol:'X'}, 
            {name: "", symbol:'O'},
    ],
        board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
        ]
    };
}
function selectFirstPlayer() {
    return Math.floor(Math.random() * 2);
}
function startGame() {
    const player1Name = input1.value;
    const player2Name = input2.value;
    gameState.players[0].name = player1Name;
    gameState.players[1].name = player2Name;
    button.style.display = "none";
    button3.style.display = "none";
    input1.style.display = "none";
    input2.style.display = "none";
    enableCells();
    currentPlayer = selectFirstPlayer();
    turnDisplay.textContent = `It's ${gameState.players[currentPlayer].name}'s turn`;
}

function resetGame() {
    initialGame();
    let cellsI = 0;
    while (cellsI < cells.length) {
        cells[cellsI].textContent = '';
        cells[cellsI].style.pointerEvents = 'none';
        cellsI++;
    }
    gameState.players[0].name = '';
    gameState.players[1].name = '';
    button.style.display = "initial";
    button3.style.display = "initial";
    input1.style.display = "initial";
    input2.style.display = "initial";
    turnDisplay.textContent = '';
}

function startCompGame() {
    const player1Name = input1.value;
    gameState.players[0].name = player1Name;
    gameState.players[1].name = "Computer";
    button.style.display = "none";
    button3.style.display = "none";
    input1.style.display = "none";
    input2.style.display = "none";
    enableCells();
    currentPlayer = selectFirstPlayer();
    turnDisplay.textContent = `It's ${gameState.players[0].name}'s turn`;
    if (gameState.players[currentPlayer].name === "Computer") {
        computerMove();
    }
}
// DOM Selectors & creating the board

const main = document.createElement('main');
main.id = 'main';

const h1 = document.createElement('h1');
h1.textContent = 'TIC-TAC-TOE';
main.appendChild(h1);

const turnDisplay = document.createElement('p');
turnDisplay.id = 'turn-display';
main.appendChild(turnDisplay);

const board = document.createElement('div');
board.id = 'board';
let i = 0;
while (i < 9) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
    i++;
}
main.appendChild(board);

const p = document.createElement('p');

const input1 = document.createElement('input');
input1.setAttribute('placeholder', 'Enter Player 1 Name');
p.appendChild(input1);

const button = document.createElement('button');
button.textContent = 'Start Game';
p.appendChild(button);

const button2 = document.createElement('button');
button2.textContent = 'Reset Game';
p.appendChild(button2);

const button3 = document.createElement('button');
button3.textContent = 'Start Game (with Computer)';
p.appendChild(button3);

const input2 = document.createElement('input');
input2.setAttribute('placeholder', 'Enter Player 2 Name');
p.appendChild(input2);

main.appendChild(p);

document.body.appendChild(main);

button.addEventListener('click', startGame)
button2.addEventListener('click', resetGame)
button3.addEventListener('click', startCompGame)

const cells = document.getElementsByClassName('cell');

let currentPlayer = 0;
function clickEvent(event) {
    const cell = event.target;
    if (cell.textContent === "") {
        cell.textContent = gameState.players[currentPlayer].symbol;
        if (checkForWin()) {
            setTimeout(() => {
                alert(`Player ${gameState.players[currentPlayer].name} wins!`);
                resetGame();
            }, 10);
        } else if (checkForDraw()) {
            setTimeout(() => alert("It's a draw!"), 10);
            resetGame();
        } else {
            currentPlayer = (currentPlayer + 1) % 2;
            turnDisplay.textContent = `It's ${gameState.players[currentPlayer].name}'s turn`
            if (gameState.players[currentPlayer].name === "Computer") {
                turnDisplay.textContent = `It's ${gameState.players[0].name}'s turn`;
                computerMove();
            }
        }
    }
}
let cellsI = 0;
while (cellsI < cells.length) {
    cells[cellsI].addEventListener('click', clickEvent);
    cells[cellsI].cellIndex = cellsI;
    cells[cellsI].style.pointerEvents = 'none';
    cellsI++;
}
function enableCells() {
    let i = 0;
    while (i < cells.length) {
        cells[i].style.pointerEvents = 'auto';
        i++;
    }
}
function checkForWin() {
    const currentPlayerSymbol = gameState.players[currentPlayer].symbol;
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
    ];

    let win = false;
    winCombos.forEach(combo => {
        if (
            cells[combo[0]].textContent === currentPlayerSymbol &&
            cells[combo[1]].textContent === currentPlayerSymbol &&
            cells[combo[2]].textContent === currentPlayerSymbol
        ) {
            win = true;
        }
    });

    return win;
}



function checkForDraw() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            return false;
        }
    }
    return true;
}


function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        cells[cellIndex].textContent = gameState.players[currentPlayer].symbol;

        if (checkForWin()) {
            setTimeout(() => {
                alert(`Player ${gameState.players[currentPlayer].name} wins!`);
                resetGame();
            }, 10);
        } else if (checkForDraw()) {
            setTimeout(() => alert("It's a draw!"), 10);
            resetGame();
        } else {
            currentPlayer = (currentPlayer + 1) % 2;
        }
    }
}

initialGame()