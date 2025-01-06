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

//fetch Talent data
export const fetchTalentData = async (id) => {
	const {token} = await GetToken();
	try {
		const talentResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/talents/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return talentResponse.data;
	} catch (error) {
		console.error('Error fetching talent data:', error);
		throw error;
	}
};

//fetch Consultant data
export const fetchConsultantData = async (id) => {
	const {token} = await GetToken();
	try {
		const consultantResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/consultants/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return consultantResponse.data;
	} catch (error) {
		console.error('Error fetching consultant data:', error);
		throw error;
	}
};

// fetch Employer data
export const fetchEmployerData = async (id) => {
	const {token} = await GetToken();
	try {
		const employerResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/employers/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return employerResponse.data;
	} catch (error) {
		console.error('Error fetching employer data:', error);
		throw error;
	}
};
