import dynamic from 'next/dynamic';
import DashboadHome from '@/components/dashboard-pages/admin-dashboard/dashboard';

export const metadata = {
	title: 'Admin Dashboard || AllTheJobs',
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
