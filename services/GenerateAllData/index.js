import axios from 'axios';
import {GetToken} from '../GenerateToken';

// fetch jobs,talent,consultants data
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

// fetch user information
export const fetchUserInformation = async (email) => {
	const {token} = await GetToken();
	try {
		const userResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/users/${email}`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return userResponse.data;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	}
};
