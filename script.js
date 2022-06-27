function createPlayer(name, playerChoice) {
    return {
        name,
        playerChoice,
    }
}

const player1 = createPlayer('player1', '0')
const Player2 = createPlayer('player2', 'X') 

const game = (function () {
    const gameBoard = {
        gameBoardArray : [...Array(3)].map(e => Array(3).fill('')),
    }

    return {
        gameboard : gameBoard.gameBoardArray
    }

})();

const displayController = (function() {
    let playerSign = player1.playerChoice;


    const blockPos = document.querySelectorAll('[data-position]');
    blockPos.forEach(block => {
        block.addEventListener('click', updateGameboardArray)
        block.addEventListener('click', updateGameboard)
    });

    function updateGameboardArray() {
        let positionX = this.dataset.position.split(',')[0];
        let positionY = this.dataset.position.split(',')[1];

        if(game.gameboard[positionX][positionY] === '') {
            game.gameboard[positionX][positionY] = playerSign;
        }
        isGameOver(positionX, positionY).winnerCheck();
        if(isGameOver(positionX, positionY).checkDraw()){
            console.log('draw')
        }
    }

    function updateGameboard() {
        if(this.textContent === '') {
            this.querySelector('h1').textContent = playerSign;
            changePlayer();
        }   
    }

    function changePlayer() {
        if(playerSign === player1.playerChoice) {
            playerSign = Player2.playerChoice
        }
        else {
            playerSign = player1.playerChoice
        }
    }
    
})()

const isGameOver = function(positionX, positionY) {
    const board = game.gameboard;

    function winnerCheck() {
        if(columnCheck(board) || diagonalCheck(board) || rowCheck(board)) {
            console.log('winner')
        }
    }

    function columnCheck() {
        let column = [board[0][positionY], board[1][positionY], board[2][positionY]]
        if (column.every(item => item === 'X') || 
            column.every(item => item === '0')) {
                return true;
        }
    }

    function rowCheck() {
        let row = [board[positionX][0], board[positionX][1], board[positionX][2]]
        if (row.every(item => item === 'X') || 
            row.every(item => item === '0')) {
                return true;
        }
    }

    function diagonalCheck() {
        let diagonal1 = [board[0][0], board[1][1], board[2][2]];
        let diagonal2 = [board[0][2], board[1][1], board[2][0]]
        if (diagonal1.every(item => item === 'X') || 
            diagonal1.every(item => item === '0') ||
            diagonal2.every(item => item === 'X') || 
            diagonal2.every(item => item === '0')) {
                return true;
        }
    }

    function checkDraw() {
       if(winnerCheck()) {
           return false;
       }
       for(let i=0; i<3; i++) {
           for(let j=0; j<3; j++) {
               if(board[i][j] === ''){
                   return false;
               }
           }
       }

       return true;
    }  

    return {
        winnerCheck,
        checkDraw
    }
}

const button = document.querySelector('button');
const overlay = document.querySelector('.overlay');

button.addEventListener('click', openOverlay)

overlay.addEventListener('click', closeOverlay);

function openOverlay() {
    overlay.classList.add('active');
    document.querySelector('.winning-text').classList.add('active');
}

function closeOverlay() {
    overlay.classList.remove('active');
    document.querySelector('.winning-text').classList.remove('active');
}