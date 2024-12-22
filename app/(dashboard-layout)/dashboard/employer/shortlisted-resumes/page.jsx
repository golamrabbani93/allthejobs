import dynamic from 'next/dynamic';
import ShortlistedResumes from '@/components/dashboard-pages/employers-dashboard/shortlisted-resumes';

export const metadata = {
	title: 'Shortlisted Resumes || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ShortlistedResumes />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
