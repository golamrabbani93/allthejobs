import dynamic from 'next/dynamic';
import ResumeAlerts from '@/components/dashboard-pages/employers-dashboard/resume-alerts';

export const metadata = {
	title: 'Resume Alerts || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ResumeAlerts />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
