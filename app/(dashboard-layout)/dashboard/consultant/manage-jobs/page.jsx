import dynamic from 'next/dynamic';
import ManageJobs from '@/components/dashboard-pages/employers-dashboard/manage-jobs';

export const metadata = {
	title: 'Manage Jobs || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ManageJobs />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
