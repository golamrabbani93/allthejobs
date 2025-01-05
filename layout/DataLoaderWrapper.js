import {
	setConsultantsData,
	setGlobalDataLoading,
	setJobsData,
	setTalentsData,
} from '@/features/data/dataSlice';
import {fetchData} from '@/services/GenerateAllData';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const DataLoaderWrapper = ({children}) => {
	const dispatch = useDispatch();
	//load all data
	const fetchAllData = async () => {
		try {
			const data = await fetchData();
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
	}, []);
	return <>{children}</>;
};

export default DataLoaderWrapper;
