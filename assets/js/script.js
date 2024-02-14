// Variables to keep track of game statistics
let wins = 0;
let ties = 0;
let losses = 0;

// Function to generate computer's choice
function computerChoice() {
    const choices = ['R', 'P', 'S'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to compare user's choice and computer's choice
function compareChoices(user, computer) {
    if (user === computer) {
        ties++;
        return "It's a tie!";
    } else if (
        (user === 'R' && computer === 'S') ||
        (user === 'S' && computer === 'P') ||
        (user === 'P' && computer === 'R')
    ) {
        wins++;
        return 'You win!';
    } else {
        losses++;
        return 'You lose!';
    }
}

// Function to display game statistics
function displayStatistics() {
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);
}

// Function to handle user's input and trigger game logic
function playGame(userChoice) {
    const computer = computerChoice();
    const result = compareChoices(userChoice, computer);

    // Display computer's choice and game result on the webpage
    document.getElementById('computerChoice').textContent = `Computer chose: ${computer}`;
    document.getElementById('gameResult').textContent = result;

    // Update game statistics
    displayStatistics();
}

// WORD GUESS GAME

// Word Guessing Game
let wordGuesses = ['apple', 'banana', 'orange', 'grape', 'peach'];
let currentWord;
let remainingAttempts;
let timerInterval;
let wordWins = 0;
let wordLosses = 0;

// Function to start the Word Guessing Game
function startWordGuessingGame() {
    // Choose a random word from the wordGuesses array
    currentWord = wordGuesses[Math.floor(Math.random() * wordGuesses.length)];
    
    // Initialize game variables
    remainingAttempts = currentWord.length * 2;
    
    // Update UI
    document.getElementById('wordDisplay').textContent = '_ '.repeat(currentWord.length);
    document.getElementById('gameStatus').textContent = `Attempts remaining: ${remainingAttempts}`;

    // Reset win and loss counts
    document.getElementById('wordTotalWins').textContent = wordWins;
    document.getElementById('wordTotalLosses').textContent = wordLosses;

    // Start timer
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    remainingAttempts--;
    document.getElementById('gameStatus').textContent = `Attempts remaining: ${remainingAttempts}`;

    if (remainingAttempts === 0) {
        endWordGame(false);
    }
}

// Function to check the user's guess
function checkGuess(event) {
    if (event.key.length === 1 && /[a-z]/i.test(event.key) && remainingAttempts > 0) {
        const guess = event.key.toLowerCase();
        if (currentWord.includes(guess)) {
            const wordDisplayArray = document.getElementById('wordDisplay').textContent.split(' ');
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === guess) {
                    wordDisplayArray[i] = guess;
                }
            }
            document.getElementById('wordDisplay').textContent = wordDisplayArray.join(' ');
            if (!wordDisplayArray.includes('_')) {
                endWordGame(true);
            }
        } else {
            remainingAttempts--;
            document.getElementById('gameStatus').textContent = `Attempts remaining: ${remainingAttempts}`;
            if (remainingAttempts === 0) {
                endWordGame(false);
            }
        }
    }
}

// Function to end the Word Guessing Game
function endWordGame(isWin) {
    clearInterval(timerInterval);
    if (isWin) {
        wordWins++;
        localStorage.setItem('wordTotalWins', wordWins);
        document.getElementById('wordTotalWins').textContent = wordWins;
        alert('Congratulations! You win the Word Guessing Game!');
    } else {
        wordLosses++;
        localStorage.setItem('wordTotalLosses', wordLosses);
        document.getElementById('wordTotalLosses').textContent = wordLosses;
        alert('Sorry! You lose the Word Guessing Game!');
    }
}

// Add event listener for key presses
document.addEventListener('keydown', checkGuess);
