import axios from 'axios';
const baseURL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD;

const login = async({username, password}) => {
    try {
        const response = await axios.post(`${baseURL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { login };