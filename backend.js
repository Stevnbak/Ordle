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

//Check letter
function checkLetter(letter, location) {
    console.log(letter);
    let correctLocations = [];
    for (l in correctWord.split('')) {
        if (correctWord.split('')[l] == letter) correctLocations.push(l);
    }
    let currentLocations = [];
    for (l in currentWord.split('')) {
        if (currentWord.split('')[l] == letter) currentLocations.push(l);
    }
    console.log(currentLocations);
    console.log(correctLocations);
    if (correctLocations.length == 0) return 0;
    if (correctWord.charAt(location) == letter) return 2;
    if (currentLocations.length == 1 && correctWord.includes(letter)) return 1;
    for (correct in correctLocations) {
        if (currentLocations[correct] == location.toString()) return 1;
    }
    return 0;
}
