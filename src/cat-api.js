import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_k2IFna3dCnY9u6uuWUuFTrMt8CYdjmKbj4exyftV5RH4VUjMLXt6FQkc8p6n9gz5';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
