import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v4';

const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchRockets = async () => {
    try {
        const response = await api.get('/rockets');
        return response.data;
    } catch (error) {
        console.error('Error fetching rockets:', error.responnse || error.message || error);
        throw error;
    }
};