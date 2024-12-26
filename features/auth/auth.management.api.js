import {closeModal, closeModalRegister} from '@/components/common/form/login/FormContent2';
import comparePassword from '@/hooks/comparePassword/comparePassword.hook';
import {baseApi} from '@/lib/redux/api/baseApi';

import {toast} from 'react-toastify';

const authManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		userRegister: builder.mutation({
			query: (data) => {
				return {
					url: `users/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['auth', 'user'],
			transformResponse: (response) => {
				if (response?.user_id) {
					toast.success('Registration Successful');
					closeModalRegister();
					return response;
				}
			},
		}),
		// userLogin: builder.mutation({
		// 	query: (data) => {
		// 		return {
		// 			url: `users/${data.email}/`,
		// 			method: 'GET',
		// 		};
		// 	},
		// 	providesTags: ['auth'],
		// 	transformResponse: async (response) => {
		// 		if (response?.user_id) {
		// 			const isPasswordMatch = await comparePassword(data.password, response.password_hash);
		// 			if (!isPasswordMatch) {
		// 				toast.error('Invalid Password');
		// 				return;
		// 			}
		// 			toast.success('Login Successful');
		// 			return response;
		// 		}
		// 	},
		// }),
		userLogin: builder.mutation({
			providesTags: ['auth'],
			queryFn: async (data, _queryApi, _extraOptions, baseQuery) => {
				// Make the API call
				const response = await baseQuery({
					url: `users/${data.email}/`,
					method: 'GET',
				});

				if (response.error) {
					if ((response.error.status = 400)) {
						toast.error('User not found');
					}
					return {error: 'User not found'};
				}

				if (response.data?.user_id) {
					// Perform password comparison
					const isPasswordMatch = await comparePassword(data.password, response.data.password_hash);
					if (!isPasswordMatch) {
						toast.error('Invalid Password');
						return {error: 'Invalid Password'}; // Return error if passwords don't match
					}

					closeModal();
					toast.success('Login Successful');
					return {data: response.data}; // Return the valid user data
				}

				return {error: 'User not found'}; // Handle cases where the user doesn't exist
			},
		}),
	}),
});

export const {useUserRegisterMutation, useUserLoginMutation} = authManagementApi;
