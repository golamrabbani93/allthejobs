import {getMyProfile} from '@/services/Users';
import {useQuery} from '@tanstack/react-query';

export const useGetMyProfile = (userEmail) => {
	return useQuery({
		queryKey: ['GET_MY_PROFILE', userEmail], // Include parameter in the query key
		queryFn: async ({queryKey}) => {
			const [, email] = queryKey; // Destructure email from queryKey

			// Call your API or data fetching logic here
			const res = await getMyProfile(email);
			return res;
		},
		enabled: !!userEmail, // Enable query only if userEmail is provided
	});
};
