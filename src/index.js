import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

function showCatInfo(imageUrl, breedName, description, temperament) {
  catInfo.innerHTML = `
    <div>
      <img src="${imageUrl}" alt="${breedName}" />
    </div>
    <div>
      <h2>${breedName}</h2>
      <p>${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
  `;
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      const cat = data[0];
      const breedName = cat.breeds[0].name;
      const description = cat.breeds[0].description;
      const temperament = cat.breeds[0].temperament;
      const imageUrl = cat.url;

      showCatInfo(imageUrl, breedName, description, temperament);
    })
    .catch(error => {
      console.error(error);
    });
}

breedSelect.addEventListener('input', handleBreedSelectChange);
document.addEventListener('DOMContentLoaded', () => {
  showLoader(); // Показать загрузчик при загрузке страницы
  fetchBreeds()
    .then(breeds => {
      hideLoader(); // Скрыть загрузчик после успешной загрузки пород
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error(error);
      showError();
      hideLoader();
    });
});
