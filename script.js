const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('.board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame();
    }
});

function startGame() {
    setInterval(timing, 1000);
    createRandomCircle();
    setTime(time);
}

function timing() {
    if(time === 0) {
        finishGame();
    } else {
        let cur = --time;
        if(cur < 10) {
            cur = `0${cur}`
        }
    setTime(cur);    
    }
}

function setTime(value) {
    timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
    timeElement.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Your count: <span class="primary">${score}</span></h1>`
}

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = randomSize(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = randomSize(0, width - size);
    const y = randomSize(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function randomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}