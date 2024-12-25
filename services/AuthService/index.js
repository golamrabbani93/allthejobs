'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Login A user
export const login = async () => {
	try {
		const {data} = await axiosInstance.get('users/');
		return data;
	} catch (error) {
		console.log(error);
	}
};
