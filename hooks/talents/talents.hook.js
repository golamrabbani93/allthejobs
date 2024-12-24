import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {createTalent} from '@/services/Talents';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

export const useCreateTalent = () => {
	const router = useRouter();
	return useMutation({
		mutationKey: ['CREATE_TALENT'],
		mutationFn: async (talentData) => {
			const response = await createTalent(talentData);
			return response;
		},
		onSuccess: (data) => {
			if (data?.talent_id) {
				closeModalRegister();
				// router.push('/login');
			}
		},
		onError: (_error) => {
			console.log('Talent Create Failed.... something went wrong');
		},
	});
};
