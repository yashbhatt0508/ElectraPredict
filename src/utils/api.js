import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictDemand = async (features) => {
  try {
    const response = await api.post('/predict', features);
    return response.data;
  } catch (error) {
    console.error("Prediction API Error:", error);
    throw error;
  }
};