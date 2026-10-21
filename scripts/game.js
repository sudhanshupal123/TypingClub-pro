import { ThemeMode } from './ThemeMode.js';
ThemeMode();


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
    })
}
restartGame();

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
statValue();


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

        text.innerHTML = levelText;
        levelNameText.innerHTML = data[urlidx].title;
        levelName.innerHTML = `Level ${data[urlidx].level}`;

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

function type() {
    const keybordIMG = document.querySelector('#keys');

    document.addEventListener('keydown', (e) => {
        const letter = document.querySelector('.letter.Current');
        const letter_unit = document.querySelector('.letter_unit.Current');
        const key = e.key;
        const isletter = key.length === 1 && key !== ' ';
        const isBackspace = key === 'Backspace';
        const isSpace = key === ' ';
        const expected = letter_unit.textContent;

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

        if (isletter || isSpace) {
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
        }

        if (letter.getBoundingClientRect().top > 235) {
            const words = document.querySelector('.words');
            const margin = parseInt(words.style.marginTop || '0px');
            words.style.marginTop = (margin - 35) + 'px';
        }

        updateCaret(letter);
    });
}
type();

window.addEventListener('resize', () => updateCaret());

document.querySelector('.text-display-wrapper')?.addEventListener('click', () => {
    document.querySelector('#textDisplay')?.focus();
});

