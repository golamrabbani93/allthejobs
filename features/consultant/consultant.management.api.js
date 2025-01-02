import {closeModalRegister} from '@/components/common/form/login/FormContent2';
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const consultantManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get all Consultants
		getAllConsultants: builder.query({
			query: () => {
				return {
					url: `consultants/`,
					method: 'GET',
				};
			},
			providesTags: ['consultant'],
			transformResponse: (response) => response,
		}),
		//create Consultant
		createConsultant: builder.mutation({
			query: (data) => {
				return {
					url: `consultants/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['consultant'],
			transformResponse: (response) => {
				closeModalRegister();
				return response;
			},
		}),
		//get single Consultant
		getConsultant: builder.query({
			query: (id) => {
				return {
					url: `consultants/user/${id}/`,
					method: 'GET',
				};
			},
			providesTags: ['consultant'],
			transformResponse: (response) => response,
		}),
		//update Consultant
		updateConsultant: builder.mutation({
			query: ({consultantId, data}) => {
				return {
					url: `consultants/${consultantId}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['consultant'],
			transformResponse: (response) => {
				if (response.consultant_id) {
					toast.success('Profile Updated Successfully');
					return response;
				}
				toast.error('Something went wrong');
			},
		}),
	}),
});

export const {
	useGetAllConsultantsQuery,
	useCreateConsultantMutation,
	useGetConsultantQuery,
	useUpdateConsultantMutation,
} = consultantManagementApi;
