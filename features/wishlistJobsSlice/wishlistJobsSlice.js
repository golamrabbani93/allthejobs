import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	wishlist: [],
};

const wishlistJobsSlice = createSlice({
	name: 'wishlistJobs',
	initialState,
	reducers: {
		addJobToWishlist: (state, action) => {
			state.wishlist.push(action.payload);
		},
		removeJobFromWishlist: (state, action) => {
			state.wishlist = state.wishlist.filter((job) => job.id !== action.payload.id);
		},
		clearWishlist: (state) => {
			state.wishlist = [];
		},
	},
});

export const {addJobToWishlist, removeJobFromWishlist, clearWishlist} = wishlistJobsSlice.actions;
export default wishlistJobsSlice.reducer;
