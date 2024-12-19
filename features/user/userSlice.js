import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	image: 'hhhh',
	role: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.image = action.payload.image;
			state.role = action.payload.role;
		},
		clearUser: (state) => {
			state.name = '';
			state.email = '';
			state.image = 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png';
			state.role = undefined;
		},
	},
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
