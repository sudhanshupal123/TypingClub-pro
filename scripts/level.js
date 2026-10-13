import { disableCopy } from './window.js';
import { ThemeMode } from './ThemeMode.js';
ThemeMode();
disableCopy();
const TierName = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];


fetch('./json/word.json').then(response => response.json()).then(data => {
    let levelHTML = '';
    console.log(data[0].text[5]);

    data.forEach((level, idx) => {
        console.log(idx)
        levelHTML += `<div class="lessons">
                        <h1 class="lessonNumber">${level.level}</h1>
                        <p class="lessonDescription">${level.title}</p>
                        <div class="lock"><i class="fa-solid fa-lock"></i></div>
                    </div>
                    `;

    });
    document.querySelector('.lesson-grid').innerHTML = levelHTML;
    if (data[0]) {
        document.querySelector('.lock').style.display = 'none';
    } else {
        console.error('Error in level first');
    }
    const lessonEl = document.querySelectorAll('.lessons');
    lessonEl.forEach((lesson, d) => {
        lesson.addEventListener('click', () => {
            window.location.href = "game.html";
        })
    })

});


