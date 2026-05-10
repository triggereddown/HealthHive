import { create } from 'zustand';
import { chatService } from '../services/chatService';

const useChatStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────────
  sessionId: null,
  messages: [],        // { id, role: 'user'|'ai', content, timestamp }
  isLoading: false,
  isComplete: false,
  diagnosis: null,
  error: null,

  // ── Actions ─────────────────────────────────────────────────

  startChat: async (message) => {
    set({ isLoading: true, error: null });

    // Optimistically add user message
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    set((s) => ({ messages: [...s.messages, userMsg] }));

    try {
      const res = await chatService.start(message);
      const { sessionId, message: aiContent, isComplete, diagnosis } = res.data.data;

      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: aiContent,
        timestamp: new Date(),
      };

      set({
        sessionId,
        messages: [...get().messages, aiMsg],
        isLoading: false,
        isComplete,
        diagnosis: diagnosis || null,
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to connect to Dr. AI. Please try again.';
      set((s) => ({
        isLoading: false,
        error: errMsg,
        // Remove optimistic user message on error
        messages: s.messages.filter((m) => m.id !== userMsg.id),
      }));
    }
  },

  sendMessage: async (message) => {
    const { sessionId } = get();
    if (!sessionId) return;

    set({ isLoading: true, error: null });

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    set((s) => ({ messages: [...s.messages, userMsg] }));

    try {
      const res = await chatService.send(sessionId, message);
      const { message: aiContent, isComplete, diagnosis } = res.data.data;

      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: aiContent,
        timestamp: new Date(),
      };

      set((s) => ({
        messages: [...s.messages, aiMsg],
        isLoading: false,
        isComplete,
        diagnosis: diagnosis || s.diagnosis,
      }));
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      set((s) => ({
        isLoading: false,
        error: errMsg,
        messages: s.messages.filter((m) => m.id !== userMsg.id),
      }));
    }
  },

  resetChat: () =>
    set({
      sessionId: null,
      messages: [],
      isLoading: false,
      isComplete: false,
      diagnosis: null,
      error: null,
    }),

  clearError: () => set({ error: null }),
}));

export default useChatStore;
