const guesses = document.getElementsByClassName('word');
var playing = false;
var currentLetter = 0;
var currentGuess = 0;
var currentWord = '';
var statistic = {};
const alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'æ', 'ø', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace', 'Enter'];

//Load
function onLoad() {
    //General
    playing = true;
    getNewWord();
    //Setup keyboard
    for (letter in alphabet) {
        let displayKey = alphabet[letter] == 'Backspace' ? '␡' : alphabet[letter] == 'Enter' ? '✅' : alphabet[letter].toUpperCase();
        document.getElementById('keyboard').innerHTML += '<a onClick="getInput(' + "'" + alphabet[letter] + "'" + ')" id="key-' + alphabet[letter].toUpperCase() + '"class="empty">' + displayKey + '</a>';
    }
    //Setup guesses
    for (word in guesses) {
        guesses[word].innerHTML = '<a class="empty"> </a><a class="empty"> </a><a class="empty"> </a><a class="empty"> </a><a class="empty"> </a>';
        if (getCookie('guess-' + word) != '') {
            currentWord = getCookie('guess-' + word);
            for (letter in guesses[word].childNodes) {
                guesses[word].childNodes[letter].innerHTML = currentWord.charAt(letter);
            }
            currentGuess = parseInt(word);
            checkGuess();
            currentWord = '';
        }
    }
    //Stats
    stats();
}

//Input
document.addEventListener('keydown', function (event) {
    getInput(event.key);
});

function getInput(key) {
    //console.log('Key: ' + key + ' | CurrentLetter: ' + currentLetter + ' | CurrentGuess: ' + currentGuess);
    if (!playing) return;
    if (!alphabet.includes(key)) return;
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
        checkGuess();
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
    if (getCookie('completion') == '') {
        if (getCookie('wordsPlayed') == '') setCookie('wordsPlayed', 0, 365);
        setCookie('wordsPlayed', parseInt(getCookie('wordsPlayed')) + 1, 365);
        if (getCookie('wordsWon') == '') setCookie('wordsWon', 0, 365);
        setCookie('wordsWon', parseInt(getCookie('wordsWon')) + 1, 365);
        if (getCookie('Used-Guess-' + (currentGuess + 1)) == '') setCookie('Used-Guess-' + (currentGuess + 1), 0, 365);
        setCookie('Used-Guess-' + (currentGuess + 1), parseInt(getCookie('Used-Guess-' + (currentGuess + 1))) + 1, 365);
    }
    stats();
    setCookie('completion', 'win', 1);
    document.getElementById('popup-title').innerHTML = 'Tillykke!';
    document.getElementById('popup-description').innerHTML = 'Du gættede dagens ord som var "' + correctWord.toLowerCase() + '".';
    document.getElementById('popup').style.visibility = 'visible';
    playing = false;
}

//Max guesses
function completionLose() {
    console.log('Max guesses reached!');
    setCookie('completion', 'fail', 1);
    if (getCookie('wordsPlayed') == '') setCookie('wordsPlayed', 0, 365);
    setCookie('wordsPlayed', parseInt(getCookie('wordsPlayed')) + 1, 365);
    stats();
    document.getElementById('popup-title').innerHTML = 'Prøv igen i morgen!';
    document.getElementById('popup-description').innerHTML = 'Dagens ord var "' + correctWord.toLowerCase() + '".';
    document.getElementById('popup').style.visibility = 'visible';
    playing = false;
}

//Update statistic
function stats() {
    statistic['played'] = getCookie('wordsPlayed');
    statistic['won'] = getCookie('wordsWon');
    for (let i = 1; i <= 6; i++) {
        if (getCookie('Used-Guess-' + i) == '') setCookie('Used-Guess-' + i, 0, 365);
        statistic['used-' + i] = getCookie('Used-Guess-' + i);
    }
    document.getElementById('popup-stats').innerHTML = `<table>
        <tr>
            <td>Spil</td>
            <td>${statistic['played']}</td>
        </tr>
        <tr>
            <td>Vundet</td>
            <td>${statistic['won']}</td>
        </tr>
        <tr>
            <td>1 gæt</td>
            <td>${statistic['used-1']}</td>
        </tr>
        <tr>
            <td>2 gæt</td>
            <td>${statistic['used-2']}</td>
        </tr>
        <tr>
            <td>3 gæt</td>
            <td>${statistic['used-3']}</td>
        </tr>
        <tr>
            <td>4 gæt</td>
            <td>${statistic['used-4']}</td>
        </tr>
        <tr>
            <td>5 gæt</td>
            <td>${statistic['used-5']}</td>
        </tr>
        <tr>
            <td>6 gæt</td>
            <td>${statistic['used-6']}</td>
        </tr>
    </table>`;
}
