import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';

const employerManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createEmployer: builder.mutation({
			query: (data) => {
				return {
					url: `employers/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['employer'],
			transformResponse: (response) => {
				closeModalRegister();
				return response;
			},
		}),
	}),
});

export const {useCreateEmployerMutation} = employerManagementApi;
