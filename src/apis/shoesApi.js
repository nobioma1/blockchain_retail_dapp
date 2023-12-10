import axios from 'axios';

const env = import.meta.env;

const shoesApi = axios.create({
  baseURL: 'https://shoes-collections.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com',
  },
});

export default shoesApi;
