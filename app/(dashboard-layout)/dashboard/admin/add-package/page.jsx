import dynamic from 'next/dynamic';
import AddPackage from '@/components/dashboard-pages/admin-dashboard/add-package';

export const metadata = {
	title: 'Add package || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<AddPackage />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
