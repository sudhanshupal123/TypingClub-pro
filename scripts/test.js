export function testwordRender() {
    const locklevelTest = document.querySelector('.locklevelTest');

    fetch('../json/randomwordTest.json').then(response => response.json()).then(data => {
        let randomworddata = [];
        data.forEach((randomword) => {
            return randomworddata.push(randomword);
        })


        for (let i = 0; i <= 200; i++) {
            randomworddata[i];
            
        }



    }).catch(err => {
        console.error('RandomwordTest JSON:', err);
    });
    locklevelTest.addEventListener('click', () => {
        window.location.href = "../game.html";
        console.log('open')
    });
}
testwordRender();
