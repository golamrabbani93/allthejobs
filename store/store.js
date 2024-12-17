import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Default localStorage is replaced with custom storage

// Import slices
import jobSlice from '../features/job/jobSlice';
import toggleSlice from '../features/toggle/toggleSlice';
import filterSlice from '../features/filter/filterSlice';
import employerSlice from '../features/employer/employerSlice';
import employerFilterSlice from '../features/filter/employerFilterSlice';
import candidateSlice from '../features/candidate/candidateSlice';
import candidateFilterSlice from '../features/filter/candidateFilterSlice';
import shopSlice from '../features/shop/shopSlice';
import wishlistJobsSlice from '../features/wishlistJobsSlice/wishlistJobsSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Create a noop storage for environments where `localStorage` is unavailable
const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem() {
			return Promise.resolve();
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

// Use localStorage in the browser, otherwise use noop storage
const storage =
	typeof window !== 'undefined'
		? createWebStorage('local') // Use localStorage in the browser
		: createNoopStorage();

// Persist configuration for wishlistJobs slice
const wishlistJobsPersistConfig = {
	key: 'root', // Key for the wishlistJobs slice
	storage, // Use custom storage (localStorage or noopStorage)
};

// Persisted reducer for wishlistJobs
const persistedWishlistJobsReducer = persistReducer(wishlistJobsPersistConfig, wishlistJobsSlice);

// Combine reducers
const rootReducer = combineReducers({
	job: jobSlice,
	toggle: toggleSlice,
	filter: filterSlice,
	employer: employerSlice,
	employerFilter: employerFilterSlice,
	candidate: candidateSlice,
	candidateFilter: candidateFilterSlice,
	shop: shopSlice,
	wishListJobs: persistedWishlistJobsReducer, // Only wishlistJobs is persisted
});

// Configure the store with middleware
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
			},
		}),
});

// Persistor for the store
export const persistor = persistStore(store);
