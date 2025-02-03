import dynamic from 'next/dynamic';
import MyProfile from '@/components/dashboard-pages/admin-dashboard/my-profile';

export const metadata = {
	title: 'My Profile || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<MyProfile />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
