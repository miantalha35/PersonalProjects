// Cache the DOM
const startGameButton = document.querySelector('#start-game');
const gameBoard = document.querySelector('#gameboard')

// Game class - every new game is an instance of this
class Game {
    constructor(playerName, roundLimit) {
        this.playerName = playerName;
        this.roundLimit = roundLimit;
        this.playerCounter = 0;
        this.computerCounter = 0;
        this.roundCounter = 0;
    };

    static options = ['rock', 'paper', 'scissors'];

}

const game1 = new Game('talha', 3);

// game functions with game class instance
// have everythign run from the game.
// take main function and make it DRY
