import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const talentManagementApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		//get all candidates
		getAllTalents: builder.query({
			query: () => {
				return {
					url: `talents/`,
					method: 'GET',
				};
			},
			providesTags: ['talent'],
			transformResponse: (response) => response,
		}),
		// create talent
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
		//update talent
		updateTalent: builder.mutation({
			query: ({talentId, data}) => {
				return {
					url: `talents/${talentId}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['talent'],
			transformResponse: (response) => {
				if (response.talent_id) {
					toast.success('Profile Updated Successfully');
					return response;
				}
				toast.error('Something went wrong');
			},
		}),
	}),
});

export const {useCreateTalentMutation, useGetAllTalentsQuery, useUpdateTalentMutation} =
	talentManagementApi;
