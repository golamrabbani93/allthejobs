<<<<<<< HEAD
import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/consultant-dashboard/dashboard";
=======
import dynamic from 'next/dynamic';
import DashboadHome from '@/components/dashboard-pages/consultant-dashboard/dashboard/index';
>>>>>>> 9983a1e036940d2c9574ccb7cadcb6415df10d84

export const metadata = {
	title: 'Consultant  Dashboard || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<DashboadHome />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
