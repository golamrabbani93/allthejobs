'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Create a Talent
export const getMyProfile = async (userEmail) => {
	try {
		const {data} = await axiosInstance.get(`users/${userEmail}/`);
		return data;
	} catch (error) {
		console.log(error);
	}
};
