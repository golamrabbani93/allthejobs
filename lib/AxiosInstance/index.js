import axios from 'axios';
import {cookies} from 'next/headers';

const axiosInstance = axios.create({
	baseURL: 'https://allthejobsca.pythonanywhere.com/',
});

axiosInstance.interceptors.request.use(
	function (config) {
		const cookieStore = cookies();
		const accessToken = cookieStore.get('accessToken')?.value;

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default axiosInstance;
