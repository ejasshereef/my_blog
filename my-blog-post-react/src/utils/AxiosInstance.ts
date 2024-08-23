import axios from 'axios';
import EnvKeys from './EnvKeys';

/**
 * Creating an instance of axios with custom configuration
 *  */ 
const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BACKEND_URL,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance