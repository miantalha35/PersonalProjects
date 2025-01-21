//Cache the DOM
const section = document.querySelector('section');
const scoreBoard = document.querySelector('#scoreboard');
const gameBoard = document.querySelector('#gameboard');

// Game class - every game is an instance of this class
class Game {
    constructor(playerName, roundLimit) {
        this.playerName = playerName;
        this.roundLimit = roundLimit;
        this.playerCounter = 0;
        this.computerCounter = 0;
        this.roundCounter = 0;
        this.options = [{name:'rock', font: 'fa-hand-back-fist'}, {name:'paper', font: 'fa-hand'}, {name: 'scissors', font: 'fa-hand-scissors'}];
    };

    displayScore() {
        scoreBoard.style.height = '32%';
        let scoreBoardChildren = scoreBoard.children;
        let arr = [this.playerCounter, this.roundCounter, this.computerCounter]
        for (let i = 0; i < 3; i++) {
            let p = document.createElement('p');
            scoreBoardChildren.item(i).appendChild(p);
            p.innerText = arr[i]
            p.classList.add('animate__animated');
            p.classList.add('animate__fadeInDown');
        };
    };


    displayOptions() {
        // let shuffleArr = []; // randomized options

        console.log('choose between the below options')
        // console.log(shuffleArr);

        this.options.forEach(option => {
            console.log(option.name);
            let div = document.createElement('div');
            div.classList.add('option');
            div.id = option.name;

            console.log("I is dumbbbb!");
            gameBoard.appendChild(div);

            let i = document.createElement('i');
            i.classList.add('fa-solid');
            i.classList.add(`${option.font}`);
            i.classList.add('animate__animated')
            i.classList.add('animate__flipInY')
            div.appendChild(i);
        })
    };
}

function game(i, formResult) {
    let phases = ['Start', 'Form', 'Options', 'duel', 'end'];    
    let currentPhase = phases[i];
    let gameInfo = formResult;

    if(currentPhase == phases[0]) {
        console.log(phases[0] + ' Phase')        
        // Create Start Game Button
        const startGameButton = document.createElement('button');
        startGameButton.id = 'start-game';
        startGameButton.innerText = 'Start Game';
        gameboard.appendChild(startGameButton)

        // Click Event
        startGameButton.addEventListener('click', () => {
            startGameButton.classList.add('animate__animated');
            startGameButton.classList.add('animate__bounceOut');

            startGameButton.addEventListener('animationend', () => {
                startGameButton.remove()
                game(i+1);
            });
        })

    } else if(currentPhase == phases[1]) {
        console.log(phases[1] + ' Phase')
        // Create Form
        let form = generateForm();
        // Capture player name and number of rounds
        let input = document.querySelector('#player-name')
        let roundInput = document.querySelectorAll('.round-input')
        let playButton = document.querySelector('.button-27');
        let result = {playerName: '', roundNumber: ''};
        
        roundInput.forEach((roundElement) => {
            roundElement.addEventListener('click', () => {
                result.roundNumber = roundElement.innerText;
                roundInput.forEach((el) => el.classList.remove('active'));
                roundElement.classList.add('active');
            });
        });

        playButton.addEventListener('click', () => {
            result.playerName = input.value;

            if (result.playerName === '' || result.roundNumber === '') {
                alert('Please ensure player name is entered and number of rounds is selected.');
            } else {
                console.log(`Player Name: ${result.playerName}`);
                console.log(`Number of Rounds: ${result.roundNumber}`);   
                form.classList.add('animate__animated', 'animate__bounceOut', 'animate__slow');

                
            form.addEventListener('animationend', () => {
                form.remove()
                game(i+1, result)
            });
            }
        });

    } else if(currentPhase == phases[2]) {
        console.log(phases[2] + ' phase')
        const game1 = new Game(gameInfo.playerName, gameInfo.roundNumber);
        game1.displayScore();
        game1.displayOptions();
        let remArr = document.querySelectorAll('.option');
        let playerSelection = {};

        for (let i = 0; i < remArr.length; i++) {
            remArr[i].addEventListener('click', e => {
                for (let i = 0; i < remArr.length; i++) {
                    remArr[i].classList.add('animate__animated');
                    remArr[i].classList.add('animate__bounceOut');
                    remArr[i].addEventListener('animationend', e => {
                        remArr[i].remove();
                    })
                };    
                let target = e.target;
                let cssObj = window.getComputedStyle(target, null)
                let color = cssObj.getPropertyValue('color');
                playerSelection = {name: remArr[i].id, font: color};
                duel(playerSelection);
            })
        }
                    

    } else if(currentPhase == phases[3]) {
        console.log(phases[3] + ' phase')
    } else if(currentPhase == phases[4]) {
        console.log(phases[4] + ' phase')
    } else {
        return 'hello';
    }
};

game(0);

function generateForm() {
    const form = document.createElement('div');
    form.id = 'form';
    gameBoard.appendChild(form);

    form.classList.add('animate__animated', 'animate__bounceIn', 'animate__slow');

    form.innerHTML = `
        <div class="container">
            <div class="input"> 
                <label for="player-name">Player Name</label>
                <input type="text" id="player-name">
            </div>
            <button class="button-27">Play!</button>
        </div>

        <div class="container">
            <p>Number of Rounds</p>
            <p class="round-input">3</p>
            <p class="round-input">5</p>
            <p class="round-input">10</p>
        </div> 
    `;
    return form;
}

function duel(playerSelection) {
    playerSelection = playerSelection;
    computerSelection = 'rock';


    console.log(playerSelection);
    console.log(computerSelection);
}



// Font-awesome foonts not loading fast enough due to internet speeds.
// Donwload fonts and import them locally 
// or learn load management with window functions
