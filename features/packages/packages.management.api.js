// Desc: Job Management API
import {baseApi} from '@/lib/redux/api/baseApi';
import {toast} from 'react-toastify';

const packagesManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//create Packages
		postPackage: builder.mutation({
			query: (data) => {
				return {
					url: `packages/create/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['packages'],
			transformResponse: (response) => {
				if (response?.package_id) {
					toast.success('Package posted successfully');
					return response;
				}
			},
		}),
	}),
});

export const {usePostPackageMutation} = packagesManagementApi;
