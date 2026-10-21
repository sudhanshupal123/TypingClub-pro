export function testwordRender() {
    const locklevelTest = document.querySelector('.locklevelTest');

    fetch('../json/randomwordTest.json').then(response => response.json()).then(data => {
        let randomworddata = [];
        data.forEach((randomword) => {
            return randomworddata.push(randomword);
        })
        let datarandomword = [];
        for (let i = 0; i <= 200; i++) {
            datarandomword.push(randomworddata[i]); const randomIndex = Math.ceil(Math.random() * 20000);
            const word = randomworddata[randomIndex - 1];
            localStorage.setItem('testWord', JSON.stringify(word));
        }

        locklevelTest.addEventListener('click', () => {
            window.location.href = `../game.html?id=${encodeURIComponent(200)}`;
            console.log(datarandomword);
        });

    }).catch(err => {
        console.error('RandomwordTest JSON:', err);
    });

}
testwordRender();
