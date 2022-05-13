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
    let correctLocations = [];
    for (l in correctWord.split('')) {
        if (correctWord.split('')[l] == letter) correctLocations.push(l);
    }
    let currentLocations = [];
    for (l in currentWord.split('')) {
        if (currentWord.split('')[l] == letter) currentLocations.push(l);
    }
    if (correctLocations.length == 0) return 0;
    if (correctWord.charAt(location) == letter) return 2;
    if (currentLocations.length == 1 && correctWord.includes(letter)) return 1;
    for (correct in correctLocations) {
        if (currentLocations[correct] == location.toString()) return 1;
    }
    return 0;
}

//Check Guess
function checkGuess() {
    if (currentWord.length != 5 || !checkWordEligibility(currentWord)) {
        console.log('Word not long enough or not eligible!');
        return;
    }
    let numOfCorrect = 0;
    setCookie('guess-' + currentGuess, currentWord, 1);
    //Check letters
    for (letter in currentWord.split('')) {
        let answer = checkLetter(currentWord.split('')[letter], letter);
        if (answer == 0) {
            guesses[currentGuess].childNodes[letter].setAttribute('class', 'wrong');
            if (document.getElementById('key-' + currentWord.split('')[letter]).className == 'empty') document.getElementById('key-' + currentWord.split('')[letter]).setAttribute('class', 'wrong');
        } else if (answer == 1) {
            guesses[currentGuess].childNodes[letter].setAttribute('class', 'partly');
            if (document.getElementById('key-' + currentWord.split('')[letter]).className != 'correct') document.getElementById('key-' + currentWord.split('')[letter]).setAttribute('class', 'partly');
        } else if (answer == 2) {
            numOfCorrect += 1;
            guesses[currentGuess].childNodes[letter].setAttribute('class', 'correct');
            document.getElementById('key-' + currentWord.split('')[letter]).setAttribute('class', 'correct');
        } else {
            console.log('Letter check error!');
        }
    }
    //Check entire word
    if (numOfCorrect == 5) {
        completionWin();
        return;
    }
    //Check if max guesses has been reached
    if (currentGuess == guesses.length - 1) {
        completionLose();
        return;
    }
    currentGuess += 1;
    currentWord = '';
    currentLetter = 0;
    return;
}

//Set cookie
function setCookie(cname, cvalue, exdays) {
    const date = new Date();
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + new Date(date.setHours(0, 0, 0, 0)).toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

//Get cookie
function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
