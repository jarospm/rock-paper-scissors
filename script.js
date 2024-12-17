let humanScore = 0;
let computerScore = 0;

function updateScoreDisplay() {
    document.getElementById('human-score').textContent = humanScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playGame(humanChoice) {
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);
    
    // Update scores based on the result
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

function playRound(humanChoice, computerChoice) {
    // Check for a tie
    if (humanChoice === computerChoice) {
        return "tie";
    }
    // Did human win?
    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        return "human";
    // Then computer must have won
    } else {
        return "computer";
    }
}

function displayResult(humanChoice, computerChoice, result) {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = `
        <div class="result-text">You chose: <strong>${humanChoice}</strong></div>
        <div class="result-text computer-choice">Computer chose: ${computerChoice}</div>
        <div class="game-result ${result.toLowerCase()}">${getResultMessage(result)}</div>
    `;
}

function getResultMessage(result) {
    switch(result) {
        case 'win':
            return '🎉 You Win! 🎉';
        case 'lose':
            return '😔 You Lose!';
        case 'tie':
            return '🤝 It\'s a Tie!';
    }
}