import { ThemeMode } from './ThemeMode.js';
ThemeMode();

console.log('game.js');
function goBack() {
    const backBTN = document.querySelector('#backBtn');
    backBTN.addEventListener('click', () => {
        window.location.href = "./index.html";
    });
}
goBack();

function restartGame() {
    const resetBTN = document.querySelector('#restartBtn');
    resetBTN.addEventListener('click', () => {
        location.reload();
    });

}
restartGame();

function goBackMap() {
    const map = document.querySelector('.btn-ghost');
    map.addEventListener('click', () => {
        window.location.href = '../index.html';
    })
}
goBackMap();
function statValue() {
    let count = 0;
    let minuts = 0;
    const seconds = document.querySelector('#statTimer');
    const minut = document.querySelector('#startminuts');
    setInterval(() => {
        count++;
        if (count > 60) {
            minuts++;
            count = 0;
        }
        seconds.innerHTML = count;
        minut.innerHTML = minuts;
    }, 1000);
}



function keyHint() {
    const keyHint = document.querySelector('#keyHint').style.display === "flex";
    if (keyHint) {
        document.querySelector('.game-main').classList.add("blur");
    }
}
keyHint();

function addClass(e, name) {
    if (!e) return;
    if (e.classList) {
        e.classList.add(name);
    } else {
        e.className += ' ' + name;
    }
}
function removeClass(e, name) {
    if (!e) return;
    if (e.classList) {
        e.classList.remove(name);
    } else {
        e.className = e.className.replace(name, '').trim();
    }
}

function getKeyId(key) {
    if (!key) return null;
    if (key === ' ' || key === 'Space' || key === 'Spacebar') return 'space';
    if (key === 'Backspace') return 'backspace';
    if (key === 'Tab') return 'tab';
    if (key === 'Enter') return 'enter';
    if (key === 'CapsLock') return 'capslock';
    if (key === 'Shift') return 'shift-left';
    if (key === 'Alt') return 'option-left';
    if (key === '1' || key === '!') return 'key-1';
    if (key === '2' || key === '@') return 'key-2';
    if (key === '3' || key === '#') return 'key-3';
    if (key === '4' || key === '$') return 'key-4';
    if (key === '5' || key === '%') return 'key-5';
    if (key === '6' || key === '^') return 'key-6';
    if (key === '7' || key === '&') return 'key-7';
    if (key === '8' || key === '*') return 'key-8';
    if (key === '9' || key === '(') return 'key-9';
    if (key === '0' || key === ')') return 'key-0';
    if (key === '`' || key === '~') return 'tilda';
    if (key === '-' || key === '_') return 'minus';
    if (key === '=' || key === '+') return 'equal';
    if (key === '[' || key === '{') return 'open-bracket';
    if (key === ']' || key === '}') return 'close-bracket';
    if (key === '\\' || key === '|') return 'backslash';
    if (key === ';' || key === ':') return 'semicolon';
    if (key === "'" || key === '"') return 'quote';
    if (key === ',' || key === '<') return 'comma';
    if (key === '.' || key === '>') return 'dot';
    if (key === '/' || key === '?') return 'slash';
    if (key.length === 1) return key.toLowerCase();
    return key.toLowerCase();
}

function textDisplay() {
    const text = document.querySelector('#textDisplay');
    const levelName = document.querySelector('#levelBadge');
    const levelNameText = document.querySelector('#levelName');
    const displayWord = document.querySelector('#statWords');

    fetch('../json/word.json').then(response => response.json()).then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlidx = urlParams.get('id') ?? 0;
        const leveltexts = data[urlidx].text;
        const levelText = `<div class="words">${leveltexts.split(' ').map(word => `<span class="letter">${word.split('').map(letter => `<span class="letter_unit">${letter}</span>`).join('')}<span class="letter_unit"> </span></span>`).join('')}</div>`;

        levelNameText.innerHTML = data[urlidx].title;
        levelName.innerHTML = `Level ${data[urlidx].level}`;
        text.innerHTML = levelText;

        const letter = document.querySelectorAll('.letter');
        displayWord.innerHTML = letter.length;

        addClass(document.querySelector('.letter'), 'Current');
        addClass(document.querySelector('.letter_unit'), 'Current');
        updateCaret();
        text.focus();
    }).catch(err => {
        console.error('Failed to load words JSON:', err);
        const loading_overlay = document.querySelector('.loading-overlay');
        loading_overlay.style.display = 'flex';
    });
}
textDisplay();

function updateCaret(lastLetter = null) {
    const nextletter = document.querySelector('.letter.Current');
    const nextletter_unit = document.querySelector('.letter_unit.Current');
    const cursor = document.querySelector('#caret');
    const target = nextletter_unit || lastLetter || nextletter;

    if (cursor && target) {
        const parentRect = (cursor.offsetParent || cursor.parentElement).getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        cursor.style.top = (targetRect.top - parentRect.top) + 'px';
        cursor.style.left = ((nextletter ? targetRect.left : targetRect.right) - parentRect.left) + 'px';
    }
}
window.gameStart = null;
let minuts = 0;
let sLeft = null;
function gettime() {
    let gameTime = 1 * 1000;
    if (!window.timer) {
        window.timer = setInterval(() => {
            if (!window.gameStart) {
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            sLeft = Math.round((gameTime / 1000) + sPassed);
            if (sLeft >= 60) {
                minuts += 1;
                gameTime = -2 * 1000;
                sLeft = 0;
            }
            document.querySelector('#startminuts').innerHTML = minuts;
            document.querySelector('#statTimer').innerHTML = sLeft;
            localStorage.setItem('minuts', minuts);
            localStorage.setItem('sLeft', sLeft);
        }, 1000);
    }
}

let wpm = 0;

function type() {
    const keybordIMG = document.querySelector('#keys');
    document.addEventListener('keydown', (e) => {
        gettime();
        const letter = document.querySelector('.letter.Current');
        const letter_unit = document.querySelector('.letter_unit.Current');
        const correct = [...document.querySelectorAll('.letter_unit.Correct')].length + 1;
        const totalletter = [...document.querySelectorAll('.letter_unit')].length - 1;
        const totalError = [...document.querySelectorAll('.letter_unit.Error')].length;
        const error20 = totalletter * 0.20;
        const error30 = totalletter * 0.30;
        const Accuracayvalue = (correct / totalletter) * 100 || 0;
        const Accuracay = Math.round(Accuracayvalue);
        const key = e.key;
        const isletter = key.length === 1 && key !== ' ';
        const isBackspace = key === 'Backspace';
        const isSpace = key === ' ';
        const expected = letter_unit.textContent;
        const statAcc = document.querySelector('#statAcc');

        if (error20 <= totalError) {
            if (error30 >= totalError) {
                let removeErrorflex;
                document.querySelector('.errorRestart').style.display = 'flex';
                clearInterval(window.timer);
                clearInterval(removeErrorflex);
                const errorrestart = document.querySelector('.errorrestart');
                errorrestart.addEventListener('click', () => {
                    window.location.reload();
                    clearInterval(window.timer);
                    clearInterval(removeErrorflex);
                });
                removeErrorflex = setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        }

        if (Accuracay >= 0 || Accuracay <= 100) {
            statAcc.innerHTML = Accuracay;
        }
        getWpm(correct);
        function getWpm(words) {
            if (!words) return;
            const totalcharcter = words;
            let minut = JSON.parse(localStorage.getItem('minuts'));
            let seconds = JSON.parse(localStorage.getItem('sLeft'));
            let totalsec = (minut * 60) + seconds;
            wpm = Math.round((totalcharcter * 60) / (5 * totalsec));
            if (wpm === 'Infinity') {
                seconds++;
            }
            setTimeout(() => {
                document.querySelector('#statWpm').innerHTML = wpm;
            }, 4000);

            localStorage.setItem('wpm', JSON.stringify(wpm));
        }


        function keybordimg() {
            if (keybordIMG) {
                const targetId = getKeyId(key);
                const keys = keybordIMG.querySelectorAll('path');
                keys.forEach((keyEl) => {
                    if (keyEl.id === targetId || (targetId === 'shift-left' && keyEl.id === 'shift-right')) {
                        addClass(keyEl, 'active');
                    } else {
                        removeClass(keyEl, 'active');
                    }
                });
            }
        }
        keybordimg();

        if (isletter) {
            if (!letter || !letter_unit) return;

            addClass(letter_unit, key === expected ? 'Correct' : 'Error');
            removeClass(letter_unit, 'Current');

            const nextUnit = letter_unit.nextElementSibling;
            if (nextUnit) {
                addClass(nextUnit, 'Current');
            } else {
                removeClass(letter, 'Current');

                const nextWord = letter.nextElementSibling;
                if (nextWord && nextWord.classList.contains('letter')) {
                    addClass(nextWord, 'Current');
                    const firstUnit = nextWord.querySelector('.letter_unit');
                    if (firstUnit) addClass(firstUnit, 'Current');
                }
            }

        }
        if (isSpace) {
            if (expected !== ' ') {
                const lettersToInvalidate = [...document.querySelectorAll('.letter.Current .letter_unit:not(.Correct)')];
                lettersToInvalidate.forEach(letter => {
                    addClass(letter, 'Error');
                });
            }

            removeClass(letter, 'Current');
            addClass(letter.nextSibling, 'Current');
            if (letter_unit) {
                removeClass(letter_unit, 'Current');
                addClass(letter_unit, "Correct")
            }
            addClass(letter.nextSibling.firstChild, 'Current');
        }
        if (isBackspace) {
            const prevUnit = letter_unit.previousElementSibling;

            if (prevUnit) {
                removeClass(prevUnit, "Correct");
                removeClass(prevUnit, "Error");
                removeClass(letter_unit, "Current");
                addClass(prevUnit, "Current");
            } else {
                const preWord = letter.previousElementSibling;

                if (preWord && preWord.classList.contains('letter')) {
                    removeClass(letter, "Current");
                    addClass(preWord, 'Current');

                    const lastUnit = preWord.lastElementChild;
                    if (lastUnit) {
                        removeClass(letter_unit, "Current");
                        removeClass(lastUnit, "Correct");
                        removeClass(lastUnit, "Error");
                        addClass(lastUnit, "Current");
                    }
                }
            }
            if (letter.getBoundingClientRect().top < 200) {
                const words = document.querySelector('.words');
                const margin = parseInt(words.style.marginTop || '0px');
                words.style.marginTop = (margin + 35) + 'px';
            }
        }
        if (letter.getBoundingClientRect().top > 235) {
            const words = document.querySelector('.words');
            const margin = parseInt(words.style.marginTop || '0px');
            words.style.marginTop = (margin - 35) + 'px';
        }

        updateCaret(letter);

        const allletter_unit = document.querySelectorAll('.letter_unit');
        const lastWord = allletter_unit[allletter_unit.length - 1];

        if (lastWord && lastWord.classList.contains("Current")) {
            const result = document.querySelector('#resultsModal');
            const nextlessonBtn = document.querySelector('.btn-primary');
            const retryBtn = document.querySelector('#retryBtn');
            const levelidx = JSON.parse(localStorage.getItem('levelidx'));
            const incorrect = document.querySelectorAll('.letter_unit.Error');
            const correct = document.querySelectorAll('.letter_unit.Correct');
            const resErrors = document.querySelector('#resErrors');
            const resCorrect = document.querySelector('#resCorrect');
            const resAcc = document.querySelector('#resAcc');
            const resWpm = document.querySelector('#resWpm');
            const resTime = document.querySelector('#resTime');
            const minuts = JSON.parse(localStorage.getItem('minuts'));
            const second = JSON.parse(localStorage.getItem('sLeft'));

            resTime.innerHTML = `${minuts}:${second}`
            resAcc.innerHTML = Math.round(Accuracay);
            resErrors.innerHTML = incorrect.length;
            resErrors.innerHTML = incorrect ? incorrect.length : 0;
            resCorrect.innerHTML = correct.length;
            result.style.display = 'flex';
            function timeover() {
                clearInterval(window.timer);
                const wpmresult = JSON.parse(localStorage.getItem('wpm'));//100
                const displaywpm = localStorage.getItem('displayWPM');//110
                if (wpmresult >= displaywpm) {//110 
                    localStorage.setItem('displayWPM', JSON.stringify(wpmresult))
                }
                resWpm.innerHTML = wpmresult;
            }
            timeover();
            retryBtn.addEventListener('click', () => {
                result.style.display = 'none';
                window.location.reload();
            });
            function nextLevel() {
                let idxlevel = levelidx;
                idxlevel++;
                nextlevel(idxlevel);
                localStorage.removeItem('levelidx');
                localStorage.setItem('levelidx', JSON.stringify(idxlevel));
            }
            function lastLevel() {
                nextlessonBtn.innerHTML = 'All level complete Goback →';
                window.location.href = '../index.html';
            }

            nextlessonBtn.addEventListener('click', () => {
                const finallevel = levelidx === 159 ? lastLevel() : nextLevel();
                if (!finallevel) return;
            });
        }
        function nextlevel(idx) {
            window.location.href = `./game.html?id=${encodeURIComponent(idx)}`;
        }
    });
}
type();

window.addEventListener('resize', () => updateCaret());

document.querySelector('.text-display-wrapper')?.addEventListener('click', () => {
    document.querySelector('#textDisplay')?.focus();
});

