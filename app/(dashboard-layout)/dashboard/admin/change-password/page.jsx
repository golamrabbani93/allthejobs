import dynamic from 'next/dynamic';
import ChangePassword from '@/components/dashboard-pages/admin-dashboard/change-password';

export const metadata = {
	title: 'Change Password || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ChangePassword />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
