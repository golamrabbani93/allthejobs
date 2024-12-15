import dynamic from 'next/dynamic';

import Faq from '@/components/pages-menu/faq';

export const metadata = {
	title: 'Faq || AllTheJobs',
	description: 'AllTheJob - Find Jobs',
};

const index = () => {
	return (
		<>
			<Faq />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
