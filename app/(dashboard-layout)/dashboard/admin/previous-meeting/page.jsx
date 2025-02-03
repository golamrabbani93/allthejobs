import dynamic from 'next/dynamic';
import Previous from '@/components/dashboard-pages/candidates-dashboard/previous-meeting/index';

export const metadata = {
	title: 'My Profile || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Previous />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
