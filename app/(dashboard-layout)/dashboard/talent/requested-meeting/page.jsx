import dynamic from 'next/dynamic';
import Requested from '@/components/dashboard-pages/candidates-dashboard/requested-meeting/index';

export const metadata = {
	title: 'My Profile || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Requested />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
