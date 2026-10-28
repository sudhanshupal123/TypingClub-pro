import { disableCopy } from './window.js';
import { ThemeMode } from './ThemeMode.js';
ThemeMode();
disableCopy();
const headerWPM = document.querySelector('.headerWPM');
const displayWPM = JSON.parse(localStorage.getItem('displayWPM'));
if (displayWPM === null || displayWPM === undefined) {
    headerWPM.innerHTML = `WPM:0`;
}
headerWPM.innerHTML = `WPM:${displayWPM}`;

const TierName = ["Bronze", "Silver", "Platinum", "Gold", "Diamond", "TypeMaster", "TypeMaster Pro"];

fetch('./json/word.json').then(response => response.json()).then(data => {
    let levelHTML = '';
    data.forEach((level, idx) => {
        levelHTML += `<div class="lessons" data-idx=${idx + 1}>
                        <h1 class="lessonNumber">${level.level}</h1>
                        <p class="lessonDescription">${level.title}</p>
                    </div>`;
    });

    document.querySelector('.lesson-grid').innerHTML = `${levelHTML}`;
    const lessonEl = document.querySelectorAll('.lessons');
    lessonEl.forEach((lesson, d) => {
        const locklevel = document.querySelector(".locklevel");
        lesson.addEventListener('click', (e) => {
            // const x = e.clientX;
            // const y = e.clientY;
            // locklevel.style.display = "block";

            // const width = locklevel.offsetWidth;
            // const height = locklevel.offsetHeight;

            // const left = Math.min(x, window.innerWidth - width - 5);
            // const top = Math.min(y + 5, window.innerHeight - height - 5);
            // locklevel.style.left = Math.max(5, left - 170) + 'px';
            // locklevel.style.top = Math.max(5, top) + 'px';

            // const locklevelContinue = document.querySelector('.locklevelContinue');
            // const locklevelClose = document.querySelector(".locklevelClose");
            window.location.href = `./game.html?id=${encodeURIComponent(d)}`;
            localStorage.setItem('levelidx', JSON.stringify(d));
        })
    })
});

