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
import storage from 'redux-persist/lib/storage';
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
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['wishlistJobs', 'user'], // Only persist wishlistJobs slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
