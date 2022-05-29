import axios from 'axios';

const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

let apiService = axios.create(defaultOptions);

apiService.defaults.withCredentials = true;

export default apiService;
