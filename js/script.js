const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".messages");
const playItAgainButton = document.querySelector(".play-it-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();


    placeholder(word);
};


getWord ();


const placeholder = function (word) {
    const placeholderLetters = [];
        for (const letter of word) {


            placeholderLetters.push("•");
        }


        wordInProgress.innerText = placeholderLetters.join("");
};


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();


    messages.innerText = "";


    const guess = letterInput.value;


    const greatGuess = acceptableInput (guess);


    if (greatGuess) {
        makeGuess (guess);
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
        //console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
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
checkIfWon ();
};


const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();


    if (!upperWord.includes(guess)) {
        messages.innerText = `That's a negative Ghost Rider! No ${guess} here.`;
       
        remainingGuesses -= 1;


    } else {
        messages.innerText = `Nailed it!`;
    }


    if (remainingGuesses === 0) {
        messages.innerHTML = `Sorry! <span class="highlight">${word}</span> won this round.`;
        startOver();


    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;


    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWon = function () {
   
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight"> You did it! Winner winner chicken dinner!</p>`;
       
        startOver();
    }
};


const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playItAgainButton.classList.remove("hide");
};


playItAgainButton.addEventListener("click", function () {
    messages.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    messages.innerText = "";


    getWord();


    guessLetterButton.classList.remove("hide");
    playItAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});