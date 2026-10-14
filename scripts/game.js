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
