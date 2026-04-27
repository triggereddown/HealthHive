import { create } from 'zustand';
import { predictionService } from '../services/prediction.service';

const usePredictionStore = create((set) => ({
  currentResult: null,
  history: [],
  historyPagination: null,
  isLoading: false,
  isLoadingHistory: false,
  error: null,

  predict: async (symptoms) => {
    set({ isLoading: true, error: null, currentResult: null });
    try {
      const res = await predictionService.predict(symptoms);
      set({ currentResult: res.data, isLoading: false });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Prediction failed.';
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  fetchHistory: async (page = 1) => {
    set({ isLoadingHistory: true, error: null });
    try {
      const res = await predictionService.getHistory(page);
      set({
        history: res.data.predictions,
        historyPagination: res.data.pagination,
        isLoadingHistory: false,
      });
    } catch (err) {
      set({ isLoadingHistory: false, error: err.response?.data?.message || 'Failed to load history.' });
    }
  },

  clearResult: () => set({ currentResult: null }),
  clearError: () => set({ error: null }),
}));

export default usePredictionStore;
