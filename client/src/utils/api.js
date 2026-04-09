import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Ensures cookies (like JWT) are sent with requests
});

api.interceptors.response.use(
  (response) => {
    // If the custom API response indicates failure despite a 2xx status code
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.message || 'An error occurred'));
    }
    // Automatically unpack the data payload for the caller
    return response.data;
  },
  (error) => {
    // The backend error handler in index.js returns { success: false, statusCode, message }
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Throw standard Error instance to trigger TanStack Query's isError boundary properly
    return Promise.reject(new Error(message));
  }
);

export default api;
