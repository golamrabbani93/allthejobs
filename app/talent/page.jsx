import dynamic from 'next/dynamic';

import CandidatesList from '@/components/candidates-listing-pages/candidates-list-v1';

export const metadata = {
	title: 'Talent Search || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<CandidatesList />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
