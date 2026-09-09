import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // If in production build or running on Vercel without env var, default to backend server URL
  if (import.meta.env.MODE === 'production' || window.location.hostname.includes('vercel.app') || window.location.hostname.includes('jaswanthnarne.online')) {
    return 'https://server-one-neon.vercel.app/api';
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
