import axios from 'axios';
import {GetToken} from '../GenerateToken';

export const fetchData = async () => {
	const {token} = await GetToken();
	try {
		const jobsResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/jobs/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const talentsResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/talents/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		const consultantsResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/consultants/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return {
			jobs: jobsResponse.data,
			talents: talentsResponse.data,
			consultants: consultantsResponse.data,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
