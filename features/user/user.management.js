import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

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
			transformResponse: (response) => {
				if (response?.user_id) {
					toast.success('Profile updated successfully');
					return response;
				}
			},
		}),
		updateMyProfilePhoto: builder.mutation({
			query: ({email, data}) => {
				return {
					url: `users/${email}/update/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['user'],
			transformResponse: (response) => {
				toast.success('Profile photo updated successfully');
				return response;
			},
		}),
	}),
});

export const {useGetMyProfileQuery, useUpdateMyProfileMutation, useUpdateMyProfilePhotoMutation} =
	userManagementApi;
