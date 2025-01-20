import axios from 'axios';
import { URL_API } from './env.config';
import { useAuthStore } from '@store/auth/auth.store';

const AxiosConfig = axios.create({
  baseURL: URL_API,
});

AxiosConfig.interceptors.request.use(
  (config) => {
    const user = useAuthStore.getState().user;
    
    if (user?.cToken) {
      config.headers.Authorization = `Bearer ${user.cToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosConfig;