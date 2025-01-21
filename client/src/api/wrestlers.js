import axios from 'axios';
const baseURL = 'http://localhost:3000';

const getAllWrestlers = async () => {
    try {
        const response = await axios.get(`${baseURL}/wrestlers`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getWrestlerById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/wrestlers/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const createWrestler = async (wrestler) => {
    try {
        const response = await axios.post(`${baseURL}/wrestlers`, wrestler);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateWrestler = async (id, wrestler) => {
    try {
        const response = await axios.put(`${baseURL}/wrestlers/${id}`, wrestler);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteWrestler = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/wrestlers/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getAllWrestlers, getWrestlerById, createWrestler, updateWrestler, deleteWrestler };