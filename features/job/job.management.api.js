// Desc: Job Management API
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const jobManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get all jobs
		getJobs: builder.query({
			query: () => {
				return {
					url: `jobs/`,
					method: 'GET',
				};
			},
			providesTags: ['jobs'],
			transformResponse: (response) => response,
		}),

		//create job
		postJobs: builder.mutation({
			query: (data) => {
				return {
					url: `jobs/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['jobs'],
			transformResponse: (response) => {
				if (response?.job_id) {
					toast.success('Job posted successfully');
					return response;
				}
			},
		}),
	}),
});

export const {useGetJobsQuery, usePostJobsMutation} = jobManagementApi;
