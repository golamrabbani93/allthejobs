import dynamic from 'next/dynamic';
import ResumeBuilder from '@/components/dashboard-pages/candidates-dashboard/resume-builder';

export const metadata = {
	title: 'Resume Builder || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ResumeBuilder />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
