import {closeModalRegister} from '@/components/common/form/login/FormContent2';
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
	}),
});

export const {useGetJobsQuery} = jobManagementApi;
