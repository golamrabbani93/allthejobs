import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	user_id: '',
	name: '',
	email: '',
	image: '',
	role: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user_id = action.payload.user_id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.image = action.payload.image;
			state.role = action.payload.role;
		},
		clearUser: (state) => {
			state.user_id = '';
			state.name = '';
			state.email = '';
			state.image =
				'https://res.cloudinary.com/dolttvkme/image/upload/v1739084572/custom-avatar_llfgxl.png';
			state.role = undefined;
		},
	},
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
