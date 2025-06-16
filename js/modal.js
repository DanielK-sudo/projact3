const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#btn-get');
const closeModalBtn = document.querySelector('.modal_close');


const openModalBtnClose = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};


const closeModalBtnClose = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};


openModalBtn.onclick = openModalBtnClose;
closeModalBtn.onclick = closeModalBtnClose;


modal.onclick = (event) => {
    if (event.target === modal) {
        closeModalBtnClose();
    }
};


setTimeout(openModalBtnClose, 10000);


const handleScrollToEnd = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight) {
        openModalBtnClose();
        window.removeEventListener('scroll', handleScrollToEnd);
    }
};

window.addEventListener('scroll', handleScrollToEnd);
