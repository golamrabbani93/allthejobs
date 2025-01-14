import dynamic from 'next/dynamic';
import JobSingle from '@/components/job-single-pages/index';
export const metadata = {
	title: 'Job Detail || AllTheJobs',
	description: 'AllTheJobs.ca is a job board website',
};

const JobSingleDynamicV1 = ({params}) => {
	const id = params.id;

	return (
		<>
			<JobSingle id={id} />
		</>
	);
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
	ssr: false,
});
