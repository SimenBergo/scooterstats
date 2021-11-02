import axios from 'axios';

const all = axios.create({
    baseURL:  'https://scooterstats.herokuapp.com',
});

export const getStats = () => all.get(`/getstats`);

const api = { getStats };

export default api;