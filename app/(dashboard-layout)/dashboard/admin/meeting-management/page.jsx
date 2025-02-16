import dynamic from 'next/dynamic';
import PackagesList from '@/components/dashboard-pages/admin-dashboard/packages-list';

export const metadata = {
	title: 'Meeting Management || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<PackagesList />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
