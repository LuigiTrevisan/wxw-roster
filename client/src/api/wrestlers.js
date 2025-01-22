import axios from 'axios';
const baseURL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD;

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

const uploadFile = async (file, name) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name.replace(/\s+/g, '').replace(/\.[^/.]+$/, ""));

    try {
        const response = await axios.post(`${baseURL}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteFile = async (name) => {
    try {
        const fileName = name.split('/').pop();
        const response = await axios.delete(`${baseURL}/image/${fileName}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getAllWrestlers, getWrestlerById, createWrestler, updateWrestler, deleteWrestler, uploadFile, deleteFile };