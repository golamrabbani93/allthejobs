import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';

const talentManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTalent: builder.mutation({
			query: (data) => {
				return {
					url: `talents/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['talent'],
			transformResponse: (response) => {
				closeModalRegister();
				return response;
			},
		}),
	}),
});

export const {useCreateTalentMutation} = talentManagementApi;
