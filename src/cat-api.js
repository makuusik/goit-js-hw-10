import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_k2IFna3dCnY9u6uuWUuFTrMt8CYdjmKbj4exyftV5RH4VUjMLXt6FQkc8p6n9gz5';

export function fetchBreedsData() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
    return response.data;
  });
}

export function fetchCatData(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Request failed');
      }
      const cat = response.data[0];
      return {
        breeds: [
          {
            name: cat.breeds[0].name,
            description: cat.breeds[0].description,
            temperament: cat.breeds[0].temperament,
          },
        ],
        url: cat.url,
      };
    });
}
