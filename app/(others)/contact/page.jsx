import dynamic from 'next/dynamic';

import Contact from '@/components/pages-menu/contact';

export const metadata = {
	title: 'Contact || AllTheJobs',
	description: 'Contact AllTheJobs',
};

const index = () => {
	return (
		<>
			<Contact />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
