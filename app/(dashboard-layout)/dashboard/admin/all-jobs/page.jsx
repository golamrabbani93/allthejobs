import dynamic from 'next/dynamic';
import AllJobs from '@/components/dashboard-pages/admin-dashboard/all-jobs';

export const metadata = {
	title: 'All Jobs || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<AllJobs />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
