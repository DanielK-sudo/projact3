//phone

document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById("phoneInput");
    const phoneButton  = document.getElementById("phoneButton");
    const phoneResult = document.getElementById("phoneResult");

    const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

    phoneButton.onclick = () => {
        if (regExp.test(phoneInput.value)) {
            phoneResult.innerHTML = 'OK';
            phoneResult.style.color = 'green';
        } else {
            phoneResult.innerHTML = 'ERROR';
            phoneResult.style.color = 'red';
        }
    };
});


//SLAIDER BLOCK

document.addEventListener("DOMContentLoaded", () => {
    const tabContentBlocks = document.querySelectorAll('.tab_content_block');
    const tabContentItems = document.querySelectorAll('.tab_content_item');
    const tabsParent = document.querySelector('.tab_content_items');

    let currentIndex = 0;
    let intervalId;

    const hideTabContent = () => {
        tabContentBlocks.forEach(block => block.style.display = 'none');
        tabContentItems.forEach(item => item.classList.remove('tab_content_item_active'));
    };

    const showTabContent = (i = 0) => {
        tabContentBlocks[i].style.display = 'flex';
        tabContentItems[i].classList.add('tab_content_item_active');
        currentIndex = i;
    };

    const startAutoSlider = () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabContentBlocks.length;
            hideTabContent();
            showTabContent(currentIndex);
        }, 3000);
    };

    tabsParent.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab_content_item')) {
            tabContentItems.forEach((item, index) => {
                if (event.target === item) {
                    hideTabContent();
                    showTabContent(index);
                    clearInterval(intervalId);
                    startAutoSlider();
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
    startAutoSlider();
});


// CONVERTER

const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

const converter = (element, target1, target2) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке JSON');
            }

            const data = await response.json();

            const usdRate = parseFloat(data.usd);
            const eurRate = parseFloat(data.eur);
            const value = parseFloat(element.value);

            if (isNaN(value)) {
                target1.value = '';
                target2.value = '';
                return;
            }

            if (element.id === 'som') {
                target1.value = (value / usdRate).toFixed(2);
                target2.value = (value / eurRate).toFixed(2);
            } else if (element.id === 'usd') {
                const inSom = value * usdRate;
                target1.value = inSom.toFixed(2);
                target2.value = (inSom / eurRate).toFixed(2);
            } else if (element.id === 'eur') {
                const inSom = value * eurRate;
                target1.value = inSom.toFixed(2);
                target2.value = (inSom / usdRate).toFixed(2);
            }

            if (element.value === '') {
                target1.value = '';
                target2.value = '';
            }
        } catch (error) {
            console.error('Ошибка конвертации:', error);
            target1.value = '';
            target2.value = '';
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


//CARD SWITCHER

const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1;

const fetchCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'};">
                ${data.completed}
            </p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Ошибка загрузки карточки:', error);
        cardBlock.innerHTML = '<p style="color:red;">Ошибка загрузки</p>';
    }
};

fetchCard(cardId);

btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId + 1;
    fetchCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? 200 : cardId - 1;
    fetchCard(cardId);
};


//второе задание

const fetchAllPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Ошибка при получении постов');
        }
        const data = await response.json();
        console.log('(второе задание):', data);
    } catch (error) {
        console.error('Ошибка при получении всех постов:', error);
    }
};

fetchAllPosts();


//WEATHER

const searchInput = document.querySelector('.cityName');
const searchbutton = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const QPI = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

searchbutton.onclick = async () => {
    if (searchInput.value.trim() === '') {
        city.innerHTML = 'введите названия города';
        temp.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`${QPI}?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Город не найден');
        }

        const data = await response.json();
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + '&deg;C';
    } catch (error) {
        console.error('Ошибка получения погоды:', error);
        city.innerHTML = 'Ошибка загрузки';
        temp.innerHTML = '';
    }

    searchInput.value = '';
};
