import axios from 'axios';

const coinlayer = axios.create({
  baseURL: 'http://api.coinlayer.com',
});

coinlayer.interceptors.request.use((config) => {
  const params = new URLSearchParams(config.params);
  params.append('access_key', import.meta.env.VITE_COINLAYER_KEY);
  config.params = params;

  return config;
});

export default coinlayer;
