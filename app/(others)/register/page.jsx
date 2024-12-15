import dynamic from 'next/dynamic';

import RegisterForm from '@/components/pages-menu/register';

export const metadata = {
	title: 'Register || AllTheJobs',
	description: 'AllTheJob - Find Jobs',
};

const index = () => {
	return (
		<>
			<RegisterForm />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
