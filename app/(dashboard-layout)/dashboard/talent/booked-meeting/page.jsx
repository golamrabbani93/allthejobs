import dynamic from 'next/dynamic';
import BookedMeeting from '@/components/dashboard-pages/candidates-dashboard/booked-meeting/index';

export const metadata = {
	title: 'My Profile || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<BookedMeeting />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
