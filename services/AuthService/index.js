'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Register A Job Seeker
export const registerJobSeeker = async (userData) => {
	console.log('🚀🚀: registerJobSeeker -> userData', userData);
	try {
		const {data} = await axiosInstance.post('users/create/', userData);
		return data;
	} catch (error) {
		console.log(error);
	}
};
//* Login A user
export const login = async () => {
	try {
		const {data} = await axiosInstance.get('users/');
		return data;
	} catch (error) {
		console.log(error);
	}
};
