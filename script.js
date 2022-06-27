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
    playerSign = player1.playerChoice;

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
            console.log(game.gameboard);
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