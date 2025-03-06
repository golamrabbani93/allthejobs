import dynamic from 'next/dynamic';
import SingleConsultant from '@/components/candidates-single-pages';

export const metadata = {
	title: 'Talent Profile || AllTheJobs',
	description: 'AllTheJobs.ca is a job board website',
};

const CandidateSingleDynamicV1 = ({params}) => {
	const id = params.id;

	return (
		<>
			<SingleConsultant id={id} />
		</>
	);
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV1), {
	ssr: false,
});
