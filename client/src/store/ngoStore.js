import { create } from 'zustand';
import { ngoService } from '../services/ngo.service';

const useNGOStore = create((set) => ({
  ngos: [],
  isLoading: false,
  error: null,

  fetchNGOs: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await ngoService.getAll(params);
      set({ ngos: res.data.ngos, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || 'Failed to load NGOs.' });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useNGOStore;
