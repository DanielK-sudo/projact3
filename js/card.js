const cardContainer = document.getElementById('card-container');

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        renderCards(data.slice(0, 12));
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        cardContainer.innerHTML = '<p style="color: white;">Не удалось загрузить данные</p>';
    }
}

function renderCards(posts) {

    const imageUrl = "https://ih1.redbubble.net/image.3028234640.8990/flat,750x,075,f-pad,750x1000,f8f8f8.jpg";

    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${imageUrl}" alt="Моё изображение">
            <h4>${post.title}</h4>
            <p>${post.body}</p>
        `;

        cardContainer.appendChild(card);
    });
}

fetchPosts();

