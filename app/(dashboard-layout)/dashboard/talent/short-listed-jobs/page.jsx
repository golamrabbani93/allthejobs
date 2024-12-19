import dynamic from 'next/dynamic';
import ShortListedJobs from '@/components/dashboard-pages/candidates-dashboard/short-listed-jobs';

export const metadata = {
	title: 'Short ListedJobs || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ShortListedJobs />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
