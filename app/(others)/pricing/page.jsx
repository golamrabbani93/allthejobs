import dynamic from 'next/dynamic';

import Pricing from '@/components/pages-menu/pricing';

export const metadata = {
	title: 'Pricing || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Pricing />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
