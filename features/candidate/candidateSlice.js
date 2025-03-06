import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	category: [
		{
			id: 1,
			name: 'Residential',
			value: 'residential',
		},
		{
			id: 2,
			name: 'Commercial',
			value: 'commercial',
		},
		{
			id: 3,
			name: 'Industrial',
			value: 'industrial',
		},
		{
			id: 4,
			name: 'Apartments',
			value: 'apartments',
		},
	],
	datePost: [
		{id: 1, name: 'All', value: 'all', isChecked: false},
		{id: 2, name: 'Last Hour', value: 'last-hour', isChecked: false},
		{
			id: 3,
			name: 'Last 24 Hour',
			value: 'last-24-hour',
			isChecked: false,
		},
		{
			id: 4,
			name: 'Last 7 Days',
			value: 'last-7-days',
			isChecked: false,
		},
		{
			id: 5,
			name: 'Last 14 Days',
			value: 'last-14-days',
			isChecked: false,
		},
		{
			id: 6,
			name: 'Last 30 Days',
			value: 'last-30-days',
			isChecked: false,
		},
	],
	experience: [
		{id: 1, value: 'No Experience', label: 'No Experience', isChecked: false},
		{id: 2, value: 'Less than 1 Year', label: 'Less than 1 Year', isChecked: false},
		{id: 3, value: '1-2 Years', label: '1-2 Years', isChecked: false},
		{id: 4, value: '3-5 Years', label: '3-5 Years', isChecked: false},
		{id: 5, value: '6-9 Years', label: '6-9 Years', isChecked: false},
		{id: 6, value: '10-14 Years', label: '10-14 Years', isChecked: false},
		{id: 7, value: '15-19 Years', label: '15-19 Years', isChecked: false},
		{id: 8, value: '20+ Years', label: '20+ Years', isChecked: false},
	],
	qualification: [
		{id: 1, value: 'No Formal Education', label: 'No Formal Education'},
		{id: 2, value: 'High School', label: 'High School'},
		{id: 3, value: 'GED', label: 'GED'},
		{id: 4, value: 'Vocational Training', label: 'Vocational Training'},
		{id: 5, value: 'Associate', label: 'Associate'},
		{id: 6, value: 'Bachelor', label: 'Bachelor'},
		{id: 7, value: 'Graduate Certificate', label: 'Graduate Certificate'},
		{id: 8, value: 'Postgraduate Diploma', label: 'Postgraduate Diploma'},
		{id: 9, value: 'Master', label: 'Master'},
		{id: 10, value: 'Professional Degree', label: 'Professional Degree'},
		{id: 11, value: 'PhD', label: 'PhD'},
		{id: 12, value: 'Post-Doc', label: 'Post-Doc'},
		{id: 13, value: 'Trade School', label: 'Trade School'},
		{id: 14, value: 'Certificate Program', label: 'Certificate Program'},
		{id: 15, value: 'Technical Certification', label: 'Technical Certification'},
		{id: 16, value: 'Diploma', label: 'Diploma'},
		{id: 17, value: 'Other', label: 'Other'},
	],
};

export const candidateSlice = createSlice({
	name: 'candidate',
	initialState,
	reducers: {
		addDatePostCheck: (state, {payload}) => {
			state?.datePost?.map((item) => {
				item.isChecked = false;
				if (item.id === payload) {
					item.isChecked = true;
				}
				return {
					...item,
				};
			});
		},
		clearDatePost: (state, {payload}) => {
			state?.datePost?.map((item) => {
				item.isChecked = false;
				return {
					...item,
				};
			});
		},
		addExperienceCheck: (state, {payload}) => {
			state?.experience?.map((item) => {
				if (item.id === payload) {
					if (item.isChecked) {
						item.isChecked = false;
					} else {
						item.isChecked = true;
					}
				}
				return {
					...item,
				};
			});
		},
		clearExperience: (state, {payload}) => {
			state?.experience?.map((item) => {
				item.isChecked = false;
				return {
					...item,
				};
			});
		},
		addQualificationCheck: (state, {payload}) => {
			state?.qualification?.map((item) => {
				if (item.id === payload) {
					if (item.isChecked) {
						item.isChecked = false;
					} else {
						item.isChecked = true;
					}
				}
				return {
					...item,
				};
			});
		},
		clearQualification: (state, {payload}) => {
			state?.qualification?.map((item) => {
				item.isChecked = false;
				return {
					...item,
				};
			});
		},
	},
});

export const {
	addDatePostCheck,
	addExperienceCheck,
	addQualificationCheck,
	clearDatePost,
	clearExperience,
	clearQualification,
} = candidateSlice.actions;
export default candidateSlice.reducer;
