import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import {GetToken} from '@/services/GenerateToken';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://allthejobsca.pythonanywhere.com/',
	prepareHeaders: async (headers, {getState}) => {
		const {token} = await GetToken();
		if (token) {
			headers.set('Authorization', `Token ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery,
	tagTypes: ['user', 'talent'],
	endpoints: (builder) => ({}),
});
