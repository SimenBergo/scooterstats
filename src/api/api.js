import axios from 'axios';

const all = axios.create({
    baseURL:  'http://localhost:5000/all',
});

export const getStats = () => all.get(`/getStats`);

const api = { getStats };

export default api;