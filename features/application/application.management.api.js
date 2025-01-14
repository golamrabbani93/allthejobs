import {closeApplyJobModal} from '@/components/job-single-pages/shared-components/ApplyJobModalContent';
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const applicationManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllApplications: builder.query({
			query: () => {
				return {
					url: `applications/`,
					method: 'GET',
				};
			},
			providesTags: ['application'],
			transformResponse: (response) => response,
		}),

		applyJob: builder.mutation({
			query: (data) => {
				return {
					url: `applications/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['application'],
			transformResponse: (response) => {
				if (response.job_application_id) {
					toast.success('Application Successful');
					closeApplyJobModal();
					return response;
				}
			},
		}),
		//updateApplicationStatus
		updateApplicationStatus: builder.mutation({
			query: (data) => {
				return {
					url: `applications/${data.job_application_id}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['application'],
			transformResponse: (response) => {
				if (response.job_application_id) {
					toast.success('Application Status Updated');
					return response;
				}
			},
		}),
	}),
});

export const {useGetAllApplicationsQuery, useApplyJobMutation, useUpdateApplicationStatusMutation} =
	applicationManagementApi;
