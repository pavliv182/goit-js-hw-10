// import axios from 'axios';
// export async function fetchCountries(name) {
//   try {
//     const { data } = await axios.get(`${BASE_URL}${name}?fields=${params}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
BASE_URL = 'https://restcountries.com/v3.1/name/';
params = 'name,capital,population,flags,languages ';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}?fields=${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
