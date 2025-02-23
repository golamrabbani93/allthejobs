import dynamic from 'next/dynamic';
import Earnings from '@/components/dashboard-pages/consultant-dashboard/earnings';

export const metadata = {
	title: 'My Earnings || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Earnings />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
