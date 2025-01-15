'use client';

import {useSelector} from 'react-redux';
import './PricingTable.css';
import SinglePricingTable from './SinglePricingTable';
import Spinner from '@/components/Sppiner/Spinner';

const PricingTable = () => {
	const {talentPackages, loading} = useSelector((state) => state.data);
	if (loading)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div class="wrapper-pricing-table grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{talentPackages?.map((item) => (
				<SinglePricingTable key={item.package_id} item={item} />
			))}
		</div>
	);
};

export default PricingTable;
