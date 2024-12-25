import {baseApi} from '@/lib/redux/api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMyProfile: builder.query({
			query: (email) => {
				return {
					url: `users/${email}/`,
					method: 'GET',
				};
			},
			providesTags: ['user'],
			transformResponse: (response) => response,
		}),
		updateMyProfile: builder.mutation({
			query: (data) => {
				return {
					url: `users/${data.email}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['user'],
			transformResponse: (response) => response,
		}),
	}),
});

export const {useGetMyProfileQuery, useUpdateMyProfileMutation} = userManagementApi;
