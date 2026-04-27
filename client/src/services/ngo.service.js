import api from './api';

export const ngoService = {
  getAll: async (params = {}) => {
    const response = await api.get('/ngos', { params });
    return response.data;
  },
};
