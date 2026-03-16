import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId: number, quantity: number) => api.post('/cart', { productId, quantity });
export const removeFromCart = (cartItemId: number) => api.delete(`/cart/${cartItemId}`);

// Order
export const getOrders = () => api.get('/orders');
export const checkout = () => api.post('/orders/checkout');

// Seed
export const seedData = () => api.post('/seed/run');
