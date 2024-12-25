import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';

const consultantManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createConsultant: builder.mutation({
			query: (data) => {
				return {
					url: `consultants/create/`,
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

export const {useCreateConsultantMutation} = consultantManagementApi;
