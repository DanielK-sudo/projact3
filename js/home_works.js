//CHECK GMAIL

document.addEventListener('DOMContentLoaded', () => {
    const gmailInput = document.getElementById('gmail_input');
    const gmailButton = document.getElementById('gmail_button');
    const gmailResult = document.getElementById('gmail_result');

    if (gmailInput && gmailButton && gmailResult) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        gmailButton.addEventListener('click', () => {
            const email = gmailInput.value.trim();
            if (gmailRegex.test(email)) {
                gmailResult.textContent = 'Valid Gmail!';
                gmailResult.style.color = 'green';
            } else {
                gmailResult.textContent = 'Invalid Gmail!';
                gmailResult.style.color = 'red';
            }
        });
    }
});


//MOVE BLOCK

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;
let direction = 'right';

const offsetWidth = parentBlock.clientWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.clientHeight - childBlock.offsetHeight;

const moveBlock = () => {
    if (direction === 'right') {
        if (positionX < offsetWidth) {
            positionX++;
            childBlock.style.left = `${positionX}px`;
        } else {
            direction = 'down';
        }
    }

    if (direction === 'down') {
        if (positionY < offsetHeight) {
            positionY++;
            childBlock.style.top = `${positionY}px`;
        } else {
            direction = 'left';
        }
    }

    if (direction === 'left') {
        if (positionX > 0) {
            positionX--;
            childBlock.style.left = `${positionX}px`;
        } else {
            direction = 'up';
        }
    }

    if (direction === 'up') {
        if (positionY > 0) {
            positionY--;
            childBlock.style.top = `${positionY}px`;
        } else {
            direction = 'right';
        }
    }

    requestAnimationFrame(moveBlock);
};

moveBlock();


//CLOCk

const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;

function updateDisplay() {
    const time = elapsedTime + (intervalId ? Date.now() - startTime : 0);
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;

    secondsDisplay.textContent = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
}

function startCounter() {
    if (intervalId) return;
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 10);
}

function stopCounter() {
    if (!intervalId) return;
    elapsedTime += Date.now() - startTime;
    clearInterval(intervalId);
    intervalId = null;
}

function resetCounter() {
    clearInterval(intervalId);
    intervalId = null;
    startTime = 0;
    elapsedTime = 0;
    secondsDisplay.textContent = '0.000';
}

startBtn.addEventListener('click', startCounter);
stopBtn.addEventListener('click', stopCounter);
resetBtn.addEventListener('click', resetCounter);


// CHARACTERS

document.addEventListener('DOMContentLoaded', () => {
    const charactersList = document.querySelector('.characters-list');

    const fetchCharacters = async () => {
        try {
            const response = await fetch('../data/person.json');
            if (!response.ok) {
                throw new Error(`Ошибка загрузки person.json: ${response.status}`);
            }
            const persons = await response.json();
            console.log('Данные из person.json:', persons);

            let html = '';

            persons.forEach(person => {
                html += `
                    <div class="character-card">
                        <div class="character-photo">
                            <img src="${person.person_photo}" alt="${person.name}">
                        </div>
                        <h3>${person.name}</h3>
                        <p>Возраст: ${person.age}</p>
                        <p>Меч: ${person.sword}</p>
                    </div>
                `;
            });

            charactersList.innerHTML = html;

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    fetchCharacters();
});
