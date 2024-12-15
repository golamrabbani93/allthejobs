import dynamic from 'next/dynamic';
import JobList from '@/components/job-listing-pages/job-list-v1';

export const metadata = {
	title: 'Find Jobs || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<JobList />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
