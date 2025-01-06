import {
	setConsultantsData,
	setGlobalDataLoading,
	setJobsData,
	setTalentsData,
	setUserData,
} from '@/features/data/dataSlice';
import {fetchData, fetchUserInformation} from '@/services/GenerateAllData';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const DataLoaderWrapper = ({children}) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	//load all data
	const fetchAllData = async () => {
		try {
			const data = await fetchData();
			const userData = await fetchUserInformation(user?.email);
			dispatch(setUserData(userData));
			dispatch(setTalentsData(data.talents));
			dispatch(setJobsData(data.jobs));
			dispatch(setConsultantsData(data.consultants));

			dispatch(setGlobalDataLoading(false));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			dispatch(setGlobalDataLoading(false));
		}
	};
	useEffect(() => {
		// fetch all data and revalidate every 8 minutes
		dispatch(setGlobalDataLoading(true));
		fetchAllData();
		const interval = setInterval(() => {
			dispatch(setGlobalDataLoading(false));
			fetchAllData();
		}, 48000);
		return () => clearInterval(interval);
	}, [user]);
	return <>{children}</>;
};

export default DataLoaderWrapper;
