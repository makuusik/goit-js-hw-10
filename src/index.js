import { fetchBreedsData, fetchCatData } from './cat-api.js';

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
  showLoader();
  hideError();
  catInfo.innerHTML = '';

  fetchCatData(selectedBreedId)
    .then(data => {
      const cat = data;
      const breedName = cat.breeds[0].name;
      const description = cat.breeds[0].description;
      const temperament = cat.breeds[0].temperament;
      const imageUrl = cat.url;

      showCatInfo(imageUrl, breedName, description, temperament);
      hideLoader();
    })
    .catch(error => {
      console.error(error);
      showError();
      hideLoader();
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);
document.addEventListener('DOMContentLoaded', () => {
  showLoader();
  hideError();
  fetchBreedsData()
    .then(breeds => {
      hideLoader();
      populateBreedSelect(breeds);
      handleBreedSelectChange();
    })
    .catch(error => {
      console.error(error);
      showError();
      hideLoader();
    });
});
