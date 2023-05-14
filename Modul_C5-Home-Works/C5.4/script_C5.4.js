
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const submitButton = document.getElementById('submitButton');
const result = document.getElementById('result');

submitButton.addEventListener('click', async () => {
  const width = parseInt(widthInput.value);
  const height = parseInt(heightInput.value);
  if (isNaN(width) || isNaN(height) || width < 100 || width > 300 || height < 100 || height > 300) {
    result.innerText = 'одно из чисел вне диапазона от 100 до 300';
  } else {
    try {
      const response = await fetch(`https://picsum.photos/${width}/${height}`);
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = imgUrl;
      result.innerHTML = '';
      result.appendChild(img);
    } catch (error) {
      result.innerText = 'Ошибка при загрузке изображения';
    }
  }
});