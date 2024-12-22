import dynamic from 'next/dynamic';
import Cart from '@/components/shop/cart';

export const metadata = {
	title: 'Cart || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<Cart />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
