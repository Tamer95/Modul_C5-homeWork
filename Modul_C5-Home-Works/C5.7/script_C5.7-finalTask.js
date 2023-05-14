
const pageInput = document.getElementById('pageInput');
const limitInput = document.getElementById('limitInput');
const requestButton = document.getElementById('requestButton');
const imageList = document.getElementById('imageList');

let lastPage = localStorage.getItem('lastPage');
let lastLimit = localStorage.getItem('lastLimit');

if (lastPage && lastLimit) {
  pageInput.value = lastPage;
  limitInput.value = lastLimit;
  makeRequest(lastPage, lastLimit);
}

requestButton.addEventListener('click', () => {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);
  if (isNaN(page) || page < 1 || page > 10) {
    imageList.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
  } else if (isNaN(limit) || limit < 1 || limit > 10) {
    imageList.innerHTML = 'Лимит вне диапазона от 1 до 10';
  } else {
    makeRequest(page, limit);
    localStorage.setItem('lastPage', page);
    localStorage.setItem('lastLimit', limit);
  }
});

async function makeRequest(page, limit) {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    const data = await response.json();
    let html = '';
    data.forEach(item => {
      html += `<img src="${item.download_url}" alt="${item.author}">`;
    });
    imageList.innerHTML = html;
  } catch (error) {
    imageList.innerHTML = 'Ошибка при загрузке изображений';
  }
}