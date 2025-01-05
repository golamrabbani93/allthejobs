import {createSlice} from '@reduxjs/toolkit';

//store Talents data and loading state
const dataSlice = createSlice({
	name: 'data',
	initialState: {
		talents: [],
		jobs: [],
		consultants: [],
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
		setGlobalDataLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const {setTalentsData, setJobsData, setConsultantsData, setGlobalDataLoading} =
	dataSlice.actions;

export default dataSlice.reducer;
