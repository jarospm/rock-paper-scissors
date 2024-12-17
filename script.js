let humanScore = 0;
let computerScore = 0;

// Get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Update the score display
function updateScoreDisplay() {
    document.getElementById('human-score').textContent = humanScore;
    document.getElementById('computer-score').textContent = computerScore;
}

// Show game results in the result-display div
function displayResult(humanChoice, computerChoice, result) {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = `
        <div class="result-text human-choice">👤 You chose: <strong>${humanChoice}</strong></div>
        <div class="result-text computer-choice">🤖 Computer chose: ${computerChoice}</div>
        <div class="game-result ${result.toLowerCase()}">${getResultMessage(result, humanChoice, computerChoice)}</div>
    `;
}

// Format result message
function getResultMessage(result, humanChoice, computerChoice) {
    if (result === 'tie') {
        return '🤝 It\'s a Tie!';
    }

    const resultMessages = {
        rock: {
            scissors: '🪨 Rock crushes ✂️ Scissors!',
            lizard: '🪨 Rock crushes 🦎 Lizard!'
        },
        paper: {
            rock: '📄 Paper covers 🪨 Rock!',
            spock: '📄 Paper disproves 🖖 Spock!'
        },
        scissors: {
            paper: '✂️ Scissors cuts 📄 Paper!',
            lizard: '✂️ Scissors decapitates 🦎 Lizard!'
        },
        lizard: {
            paper: '🦎 Lizard eats 📄 Paper!',
            spock: '🦎 Lizard poisons 🖖 Spock!'
        },
        spock: {
            scissors: '🖖 Spock smashes ✂️ Scissors!',
            rock: '🖖 Spock vaporizes 🪨 Rock!'
        }
    };

    const message = result === 'win' 
        ? resultMessages[humanChoice][computerChoice]
        : resultMessages[computerChoice][humanChoice];

    return result === 'win'
        ? `🎉 You Win! ${message}`
        : `😔 You Lose! ${message}`;
}

// Win conditions mapping
const winConditions = {
    rock: ['scissors', 'lizard'],     // Rock crushes Scissors and Lizard
    paper: ['rock', 'spock'],         // Paper covers Rock and disproves Spock
    scissors: ['paper', 'lizard'],    // Scissors cuts Paper and decapitates Lizard
    lizard: ['paper', 'spock'],       // Lizard eats Paper and poisons Spock
    spock: ['scissors', 'rock']       // Spock smashes Scissors and vaporizes Rock
};

// Play one round
function playRound(humanChoice, computerChoice) {
    // Check for a tie
    if (humanChoice === computerChoice) {
        return "tie";
    }
    
    // Check if the computer's choice is in the array of things that the human's choice beats
    if (winConditions[humanChoice].includes(computerChoice)) {
        return 'human';
    } else {
        return 'computer';
    }
}

// Play the game
function playGame(humanChoice) {
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);
    
    // Update scores based on the round result
    if (result === "human") {
        humanScore++;
        displayResult(humanChoice, computerChoice, 'win');
    } else if (result === "computer") {
        computerScore++;
        displayResult(humanChoice, computerChoice, 'lose');
    } else {
        displayResult(humanChoice, computerChoice, 'tie');
    }
    
    // Update the score display
    updateScoreDisplay();
}