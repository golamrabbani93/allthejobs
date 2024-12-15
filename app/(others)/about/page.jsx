import dynamic from 'next/dynamic';

import About from '@/components/pages-menu/about';

export const metadata = {
	title: 'About || AllTheJobs',
	description: 'AllTheJob - Find Jobs',
};

const index = () => {
	return (
		<>
			<About />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
