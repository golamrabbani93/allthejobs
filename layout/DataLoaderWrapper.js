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
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	//load all data
	const fetchAllData = async () => {
		try {
			dispatch(setGlobalDataLoading(true));
			const data = await fetchData();
			dispatch(setTalentsData(data.talents));
			dispatch(setJobsData(data.jobs));
			dispatch(setConsultantsData(data.consultants));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			dispatch(setGlobalDataLoading(false));
			setLoading(false);
		}
	};
	useEffect(() => {
		// fetch all data and revalidate every 8 minutes
		fetchAllData();
		const interval = setInterval(() => {
			fetchAllData();
		}, 480000);
		return () => clearInterval(interval);
	}, []);
	return <>{children}</>;
};

export default DataLoaderWrapper;
