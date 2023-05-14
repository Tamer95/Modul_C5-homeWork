

const numberInput = document.getElementById('numberInput');
const submitButton = document.getElementById('submitButton');
const result = document.getElementById('result');

submitButton.addEventListener('click', async () => {
  const number = parseInt(numberInput.value);
  if (number < 1 || number > 10) {
    result.innerText = 'число вне диапазона от 1 до 10';
  } else {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?limit=${number}`);
      const data = await response.json();
      result.innerHTML = '';
      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.download_url;
        result.appendChild(img);
      });
    } catch (error) {
      result.innerText = 'Ошибка при загрузке изображений';
    }
  }
});