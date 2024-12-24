import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {createConsultant} from '@/services/Consultants';
import {useMutation} from '@tanstack/react-query';

export const useCreateConsultant = () => {
	return useMutation({
		mutationKey: ['CREATE_CONSULTANT'],
		mutationFn: async (consultantData) => {
			const response = await createConsultant(consultantData);
			return response;
		},
		onSuccess: (_data) => {},
		onError: (_error) => {
			console.log('Consultants Create Failed.... something went wrong');
		},
	});
};
