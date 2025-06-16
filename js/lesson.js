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
