import {closeModalRegister} from '@/components/common/form/login/FormContent2';
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
				console.log('🚀🚀: response', response);
				if (response?.user_id) {
					toast.success('Registration Successful');
					closeModalRegister();
					return response;
				}
			},
		}),
	}),
});

export const {useUserRegisterMutation} = authManagementApi;
