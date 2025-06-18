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
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);

            const usdRate = parseFloat(data.usd);
            const eurRate = parseFloat(data.eur);

            const somRate = 1;
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
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


