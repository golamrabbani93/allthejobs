import dynamic from 'next/dynamic';
import MeetingRecording from '@/components/dashboard-pages/candidates-dashboard/meeting-recording/index';

export const metadata = {
	title: 'My Profile || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<MeetingRecording />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
