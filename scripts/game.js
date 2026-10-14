import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function goBack() {
    const backBTN = document.querySelector('#backBtn');
    backBTN.addEventListener('click', () => {
        window.location.href = "../index.html"
    })
}
goBack();

function GameTime() {
    const timeword = document.querySelector('#statTimer');
    let minutesWord = document.querySelector('#startminuts');
    let seconds = 0;
    let minutes = 0;

    const timeID = setInterval(() => {
        seconds++;

        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        timeword.innerHTML = seconds;
        minutesWord.innerHTML = minutes;
    }, 1000);
}
GameTime();

function restartGame() {
    const resetBTN = document.querySelector('#restartBtn');
    resetBTN.addEventListener('click', () => {
        location.reload();
    })
}
restartGame();

function textDisplay() {
    const text = document.querySelector('#textDisplay');
    const levelName = document.querySelector('#levelBadge');
    const levelNameText = document.querySelector('#levelName');
    const currentWord = document.querySelector('#currentTypedDisplay');
    fetch('../json/word.json').then(response => response.json()).then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlidx = urlParams.get('id');
        const levelSplit = data[urlidx].text;


        const levelText = `<div class="word"><span class="letter">${levelSplit.split('').join('</span><span class="letter">')}</span></div>`;

        text.innerHTML = levelText;
        levelNameText.innerHTML = data[urlidx].title;
        levelName.innerHTML = `Level ${data[urlidx].level}`;

        const letter = document.querySelectorAll('.letter');
        currentWord.innerHTML = letter.length;


    })
}
textDisplay();
//Here
document.addEventListener('keydown', (e) => {
    document.querySelector('.letter').classList.add('textCurrent');
    const letters = document.querySelector('.textCurrent');
    const key = e.key;
    if (key === letters.innerHTML) {
        letters.classList.add("textComplete");
        letters.classList.remove("textCurrent");
        letters.nextSibling.classList.add("textCurrent");

    } else if (key !== letters.innerHTML) {
        letters.classList.add('textError');
    }
})




