import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});

// Set up request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const apiClient = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Surveys
  getCurrentSurvey: async () => {
    const response = await api.get('/surveys');
    return response.data;
  },
  getSurveyHistory: async () => {
    const response = await api.get('/surveys/history');
    return response.data;
  },
  submitSurveyResponse: async (response: string) => {
    const res = await api.post('/surveys/response', { response });
    return res.data;
  },
  getAdminResponses: async () => {
    const response = await api.get('/admin/responses');
    return response.data;
  },
  
  // Admin functions
  setTodayQuestion: async (question: string) => {
    const response = await api.post('/admin/question', { question });
    return response.data;
  },
  getAllDailyQuestions: async () => {
    const response = await api.get('/admin/questions');
    return response.data;
  },
  getAdminUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  addAdminUser: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  removeAdminUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
}; 