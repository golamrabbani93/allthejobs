'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Create a Employer
export const createEmployer = async (employerData) => {
	try {
		const {data} = await axiosInstance.post('employers/create/', employerData);
		return data;
	} catch (error) {
		console.log(error);
	}
};
