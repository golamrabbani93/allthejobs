import dynamic from 'next/dynamic';
import ShopList from '@/components/shop/shop-list';

export const metadata = {
	title: 'Shop List || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<ShopList />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
