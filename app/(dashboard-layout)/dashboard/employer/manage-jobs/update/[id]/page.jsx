import UpdateJob from '@/components/dashboard-pages/employers-dashboard/update-job';

const page = ({params}) => {
	return (
		<>
			<UpdateJob id={params.id} />
		</>
	);
};

export default page;
