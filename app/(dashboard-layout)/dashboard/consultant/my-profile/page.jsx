import dynamic from 'next/dynamic';
import MyProfile from '@/components/dashboard-pages/consultant-dashboard/company-profile';

export const metadata = {
	title: 'MY Profile || AllTheJobs',
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
