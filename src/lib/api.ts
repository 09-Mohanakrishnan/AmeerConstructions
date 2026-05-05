import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Upload helper
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.filePath;
};

export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  const { data } = await api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.filePaths;
};

export default api;
