'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Create a Talent
export const createTalent = async (talentData) => {
	try {
		const {data} = await axiosInstance.post('talents/create/', talentData);
		return data;
	} catch (error) {
		console.log(error);
	}
};
