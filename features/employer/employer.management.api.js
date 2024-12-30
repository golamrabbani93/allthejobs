import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

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
		//get a single employer
		getEmployer: builder.query({
			query: (id) => {
				return {
					url: `employers/user/${id}/`,
					method: 'GET',
				};
			},
			providesTags: ['employer'],
			transformResponse: (response) => response,
		}),
		//update Employer
		updateEmployer: builder.mutation({
			query: ({employerId, data}) => {
				return {
					url: `employers/${employerId}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['employer'],
			transformResponse: (response) => {
				if (response.employer_id) {
					toast.success('Profile Updated Successfully');
					return response;
				}
				toast.error('Something went wrong');
			},
		}),
	}),
});

export const {useCreateEmployerMutation, useGetEmployerQuery, useUpdateEmployerMutation} =
	employerManagementApi;
