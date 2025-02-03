import dynamic from 'next/dynamic';
import FeedBack from '@/components/dashboard-pages/candidates-dashboard/feedback';

export const metadata = {
	title: 'User Feedback || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<FeedBack />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
