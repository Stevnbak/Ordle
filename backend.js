var correctWord = '';

//Check if word is real
function checkWordEligibility(word) {
    if (availableWords.includes(word.toLowerCase())) return true;
    else return false;
}

//Get new word
function getNewWord() {
    const date = new Date(Date.now());
    correctWord = generatedWords[date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()].toUpperCase();
}
