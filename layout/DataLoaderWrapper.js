// Desc: Wrapper component to load all data from the server
import {
	setConsultantsData,
	setEmployerPackages,
	setGlobalDataLoading,
	setJobsData,
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
import {use, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const DataLoaderWrapper = ({children}) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	//load all data
	const fetchAllData = async () => {
		try {
			const data = await fetchData();
			const packages = await fetchPackages();
			if (packages?.length > 0) {
				const talentPackages = packages?.filter((item) => item.target_role === 'talent');
				dispatch(setTalentPackages(talentPackages));
				const employerPackages = packages?.filter((item) => item.target_role === 'employer');
				dispatch(setEmployerPackages(employerPackages));
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

	const fetchUserData = async () => {
		try {
			const userData = await fetchUserInformation(user?.email);
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

			if (userData?.user_id === user?.user_id) {
				dispatch(setUserData(userData));
			}
			dispatch(setUserData(userData));
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	useEffect(() => {
		if (user?.user_id) {
			fetchUserData();
		}
	}, [user?.user_id]);
	useEffect(() => {
		dispatch(setGlobalDataLoading(true));
		fetchAllData();
		// fetch all data and revalidate every 8 minutes
		const interval = setInterval(() => {
			dispatch(setGlobalDataLoading(false));
			fetchAllData();
		}, 8 * 60 * 1000);
		return () => clearInterval(interval);
	}, []);
	return <>{children}</>;
};

export default DataLoaderWrapper;
