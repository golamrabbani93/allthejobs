import dynamic from 'next/dynamic';
import EmployersList from '@/components/employers-listing-pages/employers-list-v3';

export const metadata = {
	title: 'Employers List V3 || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<EmployersList />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
