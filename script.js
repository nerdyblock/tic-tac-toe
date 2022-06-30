function createPlayer(name, playerChoice) {
    return {
        name,
        playerChoice,
        getName() {
            return this.name;
        },
        setName(newName) {
            this.name = newName;
        },
        getSign() {
            return this.playerChoice;
        }
    }
}

const player1 = createPlayer('player1', '0');
const player2 = createPlayer('player2', 'X');

const players = [player1, player2];

const game = (function () {
    const gameBoard = {
        gameBoardArray : [...Array(3)].map(e => Array(3).fill('')),
    }

    let playerSign = player1.getSign();

    function changePlayer() {
        if(playerSign === player1.getSign()) {
            playerSign = player2.getSign()
        }
        else {
            playerSign = player1.getSign()
        }
    }

    const getSign = function() {
        return playerSign;
    }

    const getPlayer = function(sign) {
        let player = players.filter(item => item.getSign() === sign);
        return player[0].getName();
    }

    return {
        gameboard : gameBoard.gameBoardArray,
        changePlayer,
        getSign,
        getPlayer
    }

})();

const isGameOver = (function() {
    const board = game.gameboard;
    let winner = '';

    function checkWinner() {
        if(columnCheck() || diagonalCheck() || rowCheck()) {
            winner = game.getSign();
            return true;
        }
    }

    function columnCheck() {
        for(let row=0; row<3; row++) {
            let column = [];
            for(let col=0; col<3; col++) {
                column.push(board[col][row])
            }
            if (column.every(item => item === 'X') || 
                column.every(item => item === '0')) {
                    return true;
            }
        }
   
    }

    function rowCheck() {
        for(let row=0; row<3; row++) {
            if (board[row].every(item => item === 'X') || 
                board[row].every(item => item === '0')) {
                return true;
            }
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
       if(checkWinner()) {
           return false;
       }
       for(let row=0; row<3; row++) {
           for(let col=0; col<3; col++) {
               if(board[row][col] === ''){
                   return false;
               }
           }
       }

       return true;
    }  

    function gameOver() {
        if(checkDraw() || checkWinner()) {
            return true;
        }
    }

    function getWinner() {
        if(checkWinner()) {
            return winner;
        }
    }

    return {
        gameOver,
        getWinner,
        checkDraw
    }
})();

const showResult = function() {

    const result = document.querySelector('[data-result]');
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', closeResult);

    if(isGameOver.gameOver() && isGameOver.checkDraw()) {
        result.textContent = "It's a DRAW!!"
        openResult();
    }
    else if(isGameOver.getWinner() !== '') {
        let sign = isGameOver.getWinner();
        let player = game.getPlayer(sign);
        result.textContent = `${player} WON!!`;
        openResult();
    }

    function openResult() {
        overlay.classList.add('active');
        document.querySelector('.resultDiv').classList.add('active');
    }
    
    function closeResult() {
        overlay.classList.remove('active');
        document.querySelector('.resultDiv').classList.remove('active');
        for(let row=0; row<3; row++) {
            for(let col=0; col<3; col++) {
                if(game.gameboard[row][col] === 'X' ||
                    game.gameboard[row][col] === '0') {
                        game.gameboard[row][col] = '';
                }
            }
        }

        document.querySelectorAll('.block h1').forEach(item => {
            item.textContent = '';
        });

    }

};

const displayController = (function() {
    const playerName = document.querySelectorAll('.player-name');
    const playerSign = document.querySelectorAll('.player-sign');

    playerSign.forEach(item => {
        if(item.textContent === '0' && player1.getSign() === 'X') {
            item.closest('.player').classList.add('active');
        }
        else if(item.textContent === 'X' && player1.getSign() === '0') {
            item.closest('.player').classList.add('active');
        }
    });

    const blockPos = document.querySelectorAll('[data-position]');
    blockPos.forEach(block => {
        block.addEventListener('click', function () {
            if(this.querySelector('h1').textContent === '') {
                game.changePlayer();
            }
        });
        block.addEventListener('click', updateGameboardArray);
        block.addEventListener('click', updateGameboard);
        
    });

    function updateGameboardArray() {
        let positionX = this.dataset.position.split(',')[0];
        let positionY = this.dataset.position.split(',')[1];

        if(game.gameboard[positionX][positionY] === '') {
            game.gameboard[positionX][positionY] = game.getSign();
        }
    }

    function updateGameboard() {
        if(this.querySelector('h1').textContent === '') {
            this.querySelector('h1').textContent = game.getSign();
            playerHighlight(); 
        }  
        
        if(isGameOver.gameOver()) {
            showResult();
        }
    }

    function playerHighlight() {
        playerSign.forEach(item => {
            if(item.textContent === 'X' && game.getSign() === '0') {
                item.closest('.player').previousElementSibling.classList.remove('active');
                item.closest('.player').classList.add('active');
            }
            else if(item.textContent === '0' && game.getSign() === 'X') {
                item.closest('.player').nextElementSibling.classList.remove('active');
                item.closest('.player').classList.add('active');
            }
        });
    }

    playerName.forEach(item => {

        item.addEventListener('click', function() {
            let newPlayer;
            item.contentEditable = "true"; 

            (item.textContent === 'player1') ? newPlayer = player1: newPlayer = player2;

            item.addEventListener('keypress', function(e) {
                if(e.key === 'Enter') {
                    setPlayerName();
                }
            });

            document.addEventListener('click', function(event) {
                if (!item.contains(event.target)) {
                  setPlayerName();
                }
            });

            function setPlayerName() {
                item.contentEditable = "false";
                newPlayer.setName(item.textContent);
            }
              
        });
    });

})();




