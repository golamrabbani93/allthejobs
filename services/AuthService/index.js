'use server';

import axiosInstance from '@/lib/AxiosInstance';

//* Register A Job Seeker
export const registerJobSeeker = async (userData) => {
	try {
		const {data} = await axiosInstance.post('jobseekerProfile/new', userData);
		return data;
	} catch (error) {
		console.log(error);
	}
};
//* Login A user
export const login = async () => {
	try {
		const {data} = await axiosInstance.get('jobseekerProfile');
		return data;
	} catch (error) {
		console.log(error);
	}
};
