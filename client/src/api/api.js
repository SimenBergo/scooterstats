import axios from 'axios';

const all = axios.create({
    baseURL:  'https://scooterstats.herokuapp.com/all',
});

export const getStats = () => all.get(`/getStats`);

const api = { getStats };

export default api;