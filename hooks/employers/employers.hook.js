import {createEmployer} from '@/services/Employers';
import {useMutation} from '@tanstack/react-query';

export const useCreateEmployer = () => {
	return useMutation({
		mutationKey: ['CREATE_EMPLOYER'],
		mutationFn: async (employerData) => {
			const response = await createEmployer(employerData);
			return response;
		},
		onSuccess: (_data) => {},
		onError: (_error) => {
			console.log('Employer Create Failed.... something went wrong');
		},
	});
};
