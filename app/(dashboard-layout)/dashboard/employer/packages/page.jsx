import dynamic from 'next/dynamic';
import Packages from '@/components/dashboard-pages/employers-dashboard/packages';

export const metadata = {
	title: 'Packages || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Packages />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
