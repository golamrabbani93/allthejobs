import PaymentForm from '@/components/payment/PaymentFormData';
const page = ({params}) => {
	const {packageId} = params;
	return (
		<>
			<PaymentForm packageId={packageId} />
		</>
	);
};

export default page;
