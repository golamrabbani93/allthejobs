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
		//get single Talent
		getTalent: builder.query({
			query: (id) => {
				return {
					url: `talents/user/${id}/`,
					method: 'GET',
				};
			},
			providesTags: ['talent'],
			transformResponse: (response) => response,
		}),
	}),
});

export const {useCreateTalentMutation, useGetTalentQuery} = talentManagementApi;
