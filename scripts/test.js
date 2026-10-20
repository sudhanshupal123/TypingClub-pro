export function testwordRender() {
    fetch('../json/randomwordTest.json').then(response => response.json()).then(data => {
        const locklevelTest = document.querySelector('.locklevelTest');
        data.forEach((randomword) => {
            for (const i = 0; i >= 100; i++) {
                console.log(i)
            }
        })
        locklevelTest.addEventListener('click', () => {
            window.location.href = "../game.html";
        })
    }).catch(err => {
        console.error('Failed to load randomwordTest JSON:', err);
    });
}
testwordRender();