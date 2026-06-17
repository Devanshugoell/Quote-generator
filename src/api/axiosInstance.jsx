import axios from 'axios';
import { fetchNewToken } from './authApi';

const axiosInstance = axios.create({
  baseURL: '/crm-api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('zoho_access_token');
    const tokenExpiry = localStorage.getItem('zoho_token_expiry');

    const isExpired = !accessToken || !tokenExpiry || Date.now() >= (Number(tokenExpiry) - 60000);

    if (isExpired) {
      try {
        accessToken = await fetchNewToken();
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Zoho-oauthtoken ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {

        localStorage.removeItem('zoho_access_token');
        localStorage.removeItem('zoho_token_expiry');


        const newAccessToken = await fetchNewToken();

        let requestData = originalRequest.data;
        if (requestData && typeof requestData === 'string') {
          try {
            requestData = JSON.parse(requestData);
          } catch (e) {
          }
        }


        const retryConfig = {
          method: originalRequest.method,
          url: originalRequest.url,
          data: requestData,
          params: originalRequest.params,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Zoho-oauthtoken ${newAccessToken}`
          }
        };

        
        return axiosInstance.request(retryConfig);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;