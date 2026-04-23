const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector(".remaining-span");
const messages = document.querySelector(".messages");
const playItAgainButton = document.querySelector(".play-it-again");

const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetter = [];
        for (const letter of word) {
            console.log(letter);
            placeholderLetter.push("•");
        }
    wordInProgress.innerText = placeholderLetter.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});