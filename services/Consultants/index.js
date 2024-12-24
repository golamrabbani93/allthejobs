'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Create a Consultant
export const createConsultant = async (consultantData) => {
	try {
		const {data} = await axiosInstance.post('consultants/create/', consultantData);
		return data;
	} catch (error) {
		console.log(error);
	}
};
