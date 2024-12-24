import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {createEmployer} from '@/services/Employers';
import {useMutation} from '@tanstack/react-query';

export const useCreateEmployer = () => {
	return useMutation({
		mutationKey: ['CREATE_EMPLOYER'],
		mutationFn: async (employerData) => {
			const response = await createEmployer(employerData);
			return response;
		},
		onSuccess: (data) => {
			console.log('🚀🚀: useCreateEmployer -> data', data);
			// if (data?.talent_id) {
			// 	closeModalRegister();
			// }
		},
		onError: (_error) => {
			console.log('Employer Create Failed.... something went wrong');
		},
	});
};
