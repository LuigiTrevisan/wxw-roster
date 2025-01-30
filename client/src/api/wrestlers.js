import axios from 'axios';
import api from '../lib/api';

const baseURL = import.meta.env.VITE_ENVIRONMENT === 'DEV' 
  ? import.meta.env.VITE_BASE_URL_DEV 
  : import.meta.env.VITE_BASE_URL_PROD;

export const getAllWrestlers = async () => {
    try {
        const response = await axios.get(`${baseURL}/wrestlers`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createWrestler = (data) => {
  return api.post('/wrestlers', data);
};

export const updateWrestler = (id, data) => {
  return api.put(`/wrestlers/${id}`, data);
};

export const deleteWrestler = (id) => {
  return api.delete(`/wrestlers/${id}`);
};

export const uploadFile = (file, name) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  
  return api.post('/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};