(function () {
    const gameBoard = {
        gameBoardArray : [...Array(3)].map(e => Array(3).fill('')),
    }

    //player symbol altering

    const blockPos = document.querySelectorAll('[data-position]');
    blockPos.forEach(block => {
        block.addEventListener('click', () => {
            let positionX = block.dataset.position.split(',')[0];
            let positionY = block.dataset.position.split(',')[1];

            console.log(block.dataset.position.split(',')[1])

            gameBoard.gameBoardArray[positionX][positionY]= 0
            console.log(gameBoard.gameBoardArray)
           
            // changePlayer()--> changes player and its sign everytime the block is clicked
            
        })
    })
    
    // console.log(gameBoard.gameBoardArray)

})();

function createPlayer(name, playerChoice) {
    return {
        name,
        playerChoice,
    }
}

const player1 = createPlayer('player1', '0')
const Player2 = createPlayer('player2', 'X') 