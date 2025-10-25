import axios from 'axios';

import { config } from '../config/constants';

const API_URL = config.apiUrl;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const notesService = {
  getAllNotes: async (categoryId) => {
    const response = await api.get(`/notes${categoryId ? `?category=${categoryId}` : ''}`);
    return response.data;
  },

  getNoteById: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (noteData) => {
    const formData = new FormData();
    Object.keys(noteData).forEach(key => {
      formData.append(key, noteData[key]);
    });
    const response = await api.post('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  addComment: async (noteId, comment) => {
    const response = await api.post(`/notes/${noteId}/comments`, { content: comment });
    return response.data;
  },

  rateNote: async (noteId, rating) => {
    const response = await api.post(`/notes/${noteId}/rate`, { rating });
    return response.data;
  },
};