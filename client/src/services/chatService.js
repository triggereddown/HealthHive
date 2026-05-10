import api from './api';

// 30-second timeout for Gemini responses
const chatApi = (config) => api({ ...config, timeout: 30000 });

export const chatService = {
  start: (message) =>
    chatApi({ method: 'POST', url: '/chat/start', data: { message } }),

  send: (sessionId, message) =>
    chatApi({ method: 'POST', url: '/chat/message', data: { sessionId, message } }),

  getSessions: () =>
    chatApi({ method: 'GET', url: '/chat/sessions' }),
};
