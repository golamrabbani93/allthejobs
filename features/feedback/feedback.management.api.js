// Desc: Job Management API
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const feedbackManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//create Packages
		postFeedback: builder.mutation({
			query: (data) => {
				return {
					url: `feedbacks/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['feedback'],
			transformResponse: (response) => {
				if (response?.id) {
					toast.success('Feedback posted successfully');
					return response;
				}
			},
		}),
	}),
});

export const {usePostFeedbackMutation} = feedbackManagementApi;
