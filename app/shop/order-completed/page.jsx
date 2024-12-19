import dynamic from 'next/dynamic';
import OrderCompleted from '@/components/shop/order-completed';

export const metadata = {
	title: 'Order Completed || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<OrderCompleted />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
