const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".messages");
const playItAgainButton = document.querySelector(".play-it-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
        for (const letter of word) {
            //console.log(letter);

            placeholderLetters.push("•");
        }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    messages.innerText = "";

    const guess = letterInput.value;
    //console.log(guess);

    const greatGuess = acceptableInput(guess);

    if (greatGuess) {
        
        makeGuess(guess);
    }
    letterInput.value = "";
});

const acceptableInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "Must enter a letter.";

    } else if (input.length > 1) {
        messages.innerText = "Only one letter allowed at a time.";

    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Enter a letter A through Z.";

    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        messages.innerText = "You already guessed that, please try again.";
   
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgess(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (const letter of wordArray) {
        
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        
        } else {
            revealWord.push("•");
        }
    }
    
    wordInProgress.innerText = revealWord.join("");
    checkIfWon();
};

const checkIfWon = function () {

    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("winner");
        messages.innerHTML = `<p class="highlight">You did it! Winner Winner Chicken Dinner!</p>`;
    }
};