'use server';

import envConfig from '@/config/envConfig';
import axios from 'axios';
export const GetToken = async () => {
	try {
		const response = await axios.post(`${envConfig.serverURL}/api-token-auth/`, {
			username: envConfig.tokenUser,
			password: envConfig.tokenPassword,
		});
		const data = response.data;
		return data;
	} catch (error) {
		return Promise.reject(error);
	}
};
