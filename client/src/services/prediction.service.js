import api from './api';

export const predictionService = {
  predict: async (symptoms) => {
    const response = await api.post('/predict', { symptoms });
    return response.data;
  },

  getHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`/predict/history?page=${page}&limit=${limit}`);
    return response.data;
  },
};
