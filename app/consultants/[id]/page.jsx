import SingleConsultant from '@/components/consultant-single-page';

const page = ({params}) => {
	return (
		<>
			<SingleConsultant id={params?.id} />
		</>
	);
};

export default page;
