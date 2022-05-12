const guesses = document.getElementsByClassName('word');
var playing = false;
var currentLetter = 0;
var currentGuess = 0;
var currentWord = '';

//Load
function onLoad() {
    playing = true;
    //Setup guesses
    for (word in guesses) {
        guesses[word].innerHTML = '<a class="empty"> </a><a class="empty"> </a><a class="empty"> </a><a class="empty"> </a><a class="empty"> </a>';
    }
    //Setup keyboard
    let alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'æ', 'ø', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace', 'Enter'];
    for (letter in alphabet) {
        let displayKey = alphabet[letter] == 'Backspace' ? '␡' : alphabet[letter] == 'Enter' ? '✅' : alphabet[letter].toUpperCase();
        document.getElementById('keyboard').innerHTML += '<a onClick="getInput(' + "'" + alphabet[letter] + "'" + ')" id="key-' + alphabet[letter].toUpperCase() + '"class="empty">' + displayKey + '</a>';
    }
    getNewWord();
}

//Input
document.addEventListener('keydown', function (event) {
    getInput(event.key);
});

function getInput(key) {
    //console.log('Key: ' + key + ' | CurrentLetter: ' + currentLetter + ' | CurrentGuess: ' + currentGuess);
    if (!playing) return;
    //Delete letter
    if (key === 'Backspace') {
        if (currentLetter > 0) {
            currentLetter -= 1;
            currentWord = currentWord.slice(0, currentWord.length - 1);
            guesses[currentGuess].childNodes[currentLetter].innerHTML = '';
        }
        return;
    }

    //Guess word
    if (key === 'Enter') {
        if (currentWord.length != 5 || !checkWordEligibility(currentWord)) {
            console.log('Word not long enough or not eligible!');
            return;
        }
        let numOfCorrect = 0;
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

    //Add letter to current word
    if (currentWord.length < 5) {
        currentWord += key.toUpperCase();
        currentLetter += 1;
        guesses[currentGuess].childNodes[currentLetter - 1].innerHTML = currentWord.charAt(currentWord.length - 1);
    }
}

//Correct word
function completionWin() {
    console.log('Answer is correct');
    document.getElementById('popup-title').innerHTML = 'Tillykke!';
    document.getElementById('popup-description').innerHTML = 'Du gættede dagens ord som var "' + correctWord.toLowerCase() + '".';
    document.getElementById('popup').style.visibility = 'visible';
    playing = false;
}

//Max guesses
function completionLose() {
    console.log('Max guesses reached!');
    document.getElementById('popup-title').innerHTML = 'Prøv igen i morgen!';
    document.getElementById('popup-description').innerHTML = 'Dagens ord var "' + correctWord.toLowerCase() + '".';
    document.getElementById('popup').style.visibility = 'visible';
    playing = false;
}
