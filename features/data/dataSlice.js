import {createSlice} from '@reduxjs/toolkit';
import {setUser} from '../user/userSlice';
import {set} from 'date-fns';

//store Talents data and loading state
const dataSlice = createSlice({
	name: 'data',
	initialState: {
		talents: [],
		jobs: [],
		consultants: [],
		userData: {},
		userRoleBasedData: {},
		talentPackages: [],
		employerPackages: [],
		loading: false,
	},
	reducers: {
		setTalentsData: (state, action) => {
			state.talents = action.payload;
		},
		setJobsData: (state, action) => {
			state.jobs = action.payload;
		},
		setConsultantsData: (state, action) => {
			state.consultants = action.payload;
		},
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
		setUserRoleBasedData: (state, action) => {
			state.userRoleBasedData = action.payload;
		},
		setTalentPackages: (state, action) => {
			state.talentPackages = action.payload;
		},
		setEmployerPackages: (state, action) => {
			state.employerPackages = action.payload;
		},
		setGlobalDataLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const {
	setTalentsData,
	setJobsData,
	setConsultantsData,
	setGlobalDataLoading,
	setUserData,
	setEmployerPackages,
	setUserRoleBasedData,
	setTalentPackages,
} = dataSlice.actions;

export default dataSlice.reducer;
