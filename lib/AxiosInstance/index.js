import envConfig from '@/config/envConfig';
import {GetToken} from '@/services/GenerateToken';
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: envConfig.serverURL, // External API URL
});

// Intercept requests to add token if available
axiosInstance.interceptors.request.use(
	async (config) => {
		try {
			const globalToken = await GetToken();
			// If the token is found, add it to the Authorization header
			if (globalToken.token) {
				config.headers['Authorization'] = `Token ${globalToken.token}`;
			}
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
