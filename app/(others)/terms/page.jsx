import dynamic from 'next/dynamic';

import Terms from '@/components/pages-menu/terms';

export const metadata = {
	title: 'Terms || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Terms />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
