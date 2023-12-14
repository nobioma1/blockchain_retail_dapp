import axios from 'axios';

const env = import.meta.env;

const backendApi = axios.create({
  baseURL: env.VITE_API_URL,
});

export default backendApi;
