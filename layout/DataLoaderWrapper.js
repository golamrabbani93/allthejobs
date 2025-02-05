// Desc: Wrapper component to load all data from the server
import {
	setConsultantsData,
	setGlobalDataLoading,
	setJobsData,
	setPackages,
	setTalentPackages,
	setTalentsData,
	setUserData,
	setUserRoleBasedData,
} from '@/features/data/dataSlice';
import {
	fetchConsultantData,
	fetchData,
	fetchEmployerData,
	fetchPackages,
	fetchTalentData,
	fetchUserInformation,
} from '@/services/GenerateAllData';
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
			const packages = await fetchPackages();
			if (userData?.role === 'talent') {
				const talentData = await fetchTalentData(userData.user_id);
				dispatch(setUserRoleBasedData(talentData));
			}
			if (userData?.role === 'consultant') {
				const consultantData = await fetchConsultantData(userData.user_id);
				dispatch(setUserRoleBasedData(consultantData));
			}
			if (userData?.role === 'employer') {
				const employerData = await fetchEmployerData(userData.user_id);
				dispatch(setUserRoleBasedData(employerData));
			}
			if (packages?.length > 0) {
				dispatch(setPackages(packages));
				const talentPackages = packages?.filter((item) => item.target_role === 'talent');
				dispatch(setTalentPackages(talentPackages));
			}
			if (userData?.user_id === user?.user_id) {
				dispatch(setUserData(userData));
			}
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
