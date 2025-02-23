import dynamic from 'next/dynamic';
import Packages from '@/components/dashboard-pages/consultant-dashboard/packages';

export const metadata = {
	title: 'Commission || AllTheJobs',
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
