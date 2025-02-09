'use client';

import Spinner from '@/components/Sppiner/Spinner';
import {CheckCircle, XCircle} from 'lucide-react';
import Link from 'next/link';
import {useSelector} from 'react-redux';

const PricingTable = () => {
	const {talentPackages, loading} = useSelector((state) => state.data);
	//make talentPackages to pricePlans
	const newPricePlans = talentPackages.map((item) => {
		return {
			name: item.name,
			previousPrice: item.previous_price,
			price: item.price,
			package_id: item.package_id,
			//features array to object
			features: item.features.reduce((acc, curr) => {
				if (curr?.name && curr?.isEnabled !== undefined) {
					let modifiedIsEnabled = curr.isEnabled;

					if (curr.name.trim() === 'askAI' && item.name === 'Standard') {
						modifiedIsEnabled = 'Limited';
					} else if (curr.name.trim() === 'resumeCoverLetter' && item.name === 'Standard') {
						modifiedIsEnabled = 'AI-assisted';
					} else if (curr.name.trim() === 'jobApplyAutopilot' && item.name === 'Standard') {
						modifiedIsEnabled = 'Up to 100/Month';
					} else if (curr.name.trim() === 'featuredProfile' && item.name === 'Standard') {
						modifiedIsEnabled = '2 Weeks';
					}

					if (curr.name.trim() === 'askAI' && item.name === 'Premium') {
						modifiedIsEnabled = 'Full';
					} else if (curr.name.trim() === 'resumeCoverLetter' && item.name === 'Premium') {
						modifiedIsEnabled = 'AI-assisted';
					} else if (curr.name.trim() === 'jobApplyAutopilot' && item.name === 'Premium') {
						modifiedIsEnabled = 'Up to 250/Month';
					} else if (curr.name.trim() === 'featuredProfile' && item.name === 'Premium') {
						modifiedIsEnabled = '1 Month';
					}

					acc[curr.name] = modifiedIsEnabled;
				}
				return acc;
			}, {}),
		};
	});

	if (loading && talentPackages.length === 0)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="overflow-x-auto p-6">
			<table className="min-w-full border border-blue-600 text-center bg-white rounded-lg shadow-md">
				<thead className="bg-blue-600 text-white">
					<tr>
						<th className="px-4 py-3 border text-center text-3xl">Features</th>
						{newPricePlans.map((plan, index) => (
							<th key={index} className="px-6 py-3 border text-lg font-semibold">
								{plan.name} <br />
								<span className="text-white ">
									<span className="text-lg line-through mr-1 text-gray-300">
										{plan.name === 'Basic' ? '$25' : plan.name === 'Standard' ? '$75' : '$100'}
									</span>
									<span className="text-3xl">${plan.price}</span>
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object?.keys(newPricePlans[0]?.features).map((feature, index) => (
						<tr key={index} className="border">
							<td className="px-2 py-2 font-medium text-left bg-blue-100 text-blue-900 w-[300px]">
								{feature.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
							</td>
							{newPricePlans.map((plan, idx) => (
								<td key={idx} className="px-6 py-2 border w-[300px]">
									{typeof plan.features[feature] === 'boolean' ? (
										plan.features[feature] ? (
											<CheckCircle className="text-blue-500 mx-auto" size={20} />
										) : (
											<XCircle className="text-red-500 mx-auto" size={20} />
										)
									) : (
										<span className="text-blue-700 font-medium">{plan.features[feature]}</span>
									)}
								</td>
							))}
						</tr>
					))}
					{/* Buy Now Button Row */}
					<tr className="bg-blue-100">
						<td className="px-4 py-3 font-medium text-left">
							<span className="hidden">h</span>
						</td>
						{newPricePlans.map((plan, index) => (
							<td key={index} className="px-6 py-3">
								{plan.name !== 'Free' ? (
									<Link
										href={`/payment/${plan?.package_id}`}
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"
									>
										Buy Now
									</Link>
								) : (
									<span className="text-gray-500">Free</span>
								)}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PricingTable;
