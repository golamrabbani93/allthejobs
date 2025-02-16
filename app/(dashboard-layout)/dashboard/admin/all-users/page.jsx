import dynamic from 'next/dynamic';
import AllUsers from '@/components/dashboard-pages/admin-dashboard/all-users';

export const metadata = {
	title: 'All Users || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<AllUsers />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
