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
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import jobSlice from '../features/job/jobSlice';
import toggleSlice from '../features/toggle/toggleSlice';
import filterSlice from '../features/filter/filterSlice';
import employerSlice from '../features/employer/employerSlice';
import employerFilterSlice from '../features/filter/employerFilterSlice';
import candidateSlice from '../features/candidate/candidateSlice';
import candidateFilterSlice from '../features/filter/candidateFilterSlice';
import shopSlice from '../features/shop/shopSlice';
import wishlistJobsSlice from '../features/wishlistJobsSlice/wishlistJobsSlice';
import userSlice from '../features/user/userSlice';
import dataSlice from '../features/data/dataSlice';
import {baseApi} from '@/lib/redux/api/baseApi';

// Create a noop storage for non-browser environments
const createNoopStorage = () => {
	return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			return Promise.resolve(value);
		},
		removeItem(_key) {
			return Promise.resolve();
		},
	};
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Combine all reducers
const rootReducer = combineReducers({
	job: jobSlice,
	toggle: toggleSlice,
	filter: filterSlice,
	employer: employerSlice,
	employerFilter: employerFilterSlice,
	candidate: candidateSlice,
	candidateFilter: candidateFilterSlice,
	shop: shopSlice,
	wishlistJobs: wishlistJobsSlice,
	user: userSlice,
	data: dataSlice,
	[baseApi.reducerPath]: baseApi.reducer,
});

// Persist configuration
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['wishlistJobs', 'user'], // Only persist these slices
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware), // Add API middleware
});

// Create the persistor
export const persistor = persistStore(store);
