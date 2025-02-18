'use client';

import Spinner from '@/components/Sppiner/Spinner';
import {CheckCircle, XCircle} from 'lucide-react';
import Link from 'next/link';
import {useSelector} from 'react-redux';

const PricingTable = () => {
	const {employerPackages, loading} = useSelector((state) => state.data);
	//make employer to pricePlans
	const newPricePlans = employerPackages.map((item) => {
		return {
			name: item.name,
			previousPrice: item.previous_price,
			price: item.price,
			package_id: item.package_id,
			//features array to object
			features: item.features.reduce((acc, curr) => {
				if (curr?.name && curr?.isEnabled !== undefined) {
					let modifiedIsEnabled = curr.isEnabled;

					if (curr.name.trim() === 'jobPosts' && item.name === 'Basic') {
						modifiedIsEnabled = '5 Job Postings';
					} else if (curr.name.trim() === 'jobPosts' && item.name === 'Standard') {
						modifiedIsEnabled = '120 job Postings';
					} else if (curr.name.trim() === 'jobPosts' && item.name === 'Premium') {
						modifiedIsEnabled = 'Unlimited job Postings';
					} else if (curr.name.trim() === 'featuredListing' && item.name === 'Standard') {
						modifiedIsEnabled = 'Featured for 7 days';
					} else if (curr.name.trim() === 'featuredListing' && item.name === 'Premium') {
						modifiedIsEnabled = 'Featured for 30 days';
					} else if (curr.name.trim() === 'resumeAccess' && item.name === 'Basic') {
						modifiedIsEnabled = '10 profiles';
					} else if (curr.name.trim() === 'resumeAccess' && item.name === 'Standard') {
						modifiedIsEnabled = '50 profiles';
					} else if (curr.name.trim() === 'resumeAccess' && item.name === 'Premium') {
						modifiedIsEnabled = 'Unlimited profiles';
					} else if (curr.name.trim() === 'applicantTracking' && item.name === 'Basic') {
						modifiedIsEnabled = 'Basic tools';
					} else if (curr.name.trim() === 'applicantTracking' && item.name === 'Standard') {
						modifiedIsEnabled = 'Advanced tools';
					} else if (curr.name.trim() === 'applicantTracking' && item.name === 'Premium') {
						modifiedIsEnabled = 'AI-powered screening tools';
					} else if (curr.name.trim() === 'jobPromotion' && item.name === 'Standard') {
						modifiedIsEnabled = 'Social media boost';
					} else if (curr.name.trim() === 'jobPromotion' && item.name === 'Premium') {
						modifiedIsEnabled = 'Social media + email boost';
					} else if (curr.name.trim() === 'consultantSupport' && item.name === 'Premium') {
						modifiedIsEnabled = 'Email support';
					} else if (curr.name.trim() === 'talentMatch' && item.name === 'Standard') {
						modifiedIsEnabled = 'AI-powered recommendations';
					} else if (curr.name.trim() === 'talentMatch' && item.name === 'Premium') {
						modifiedIsEnabled = 'Pre-screened candidate lists';
					}

					acc[curr.name] = modifiedIsEnabled;
				}
				return acc;
			}, {}),
		};
	});
	// re map data first basic standard premium
	const talentPackagesData =
		newPricePlans.sort((a, b) => {
			if (a.name === 'Basic') return -1;
			if (a.name === 'Standard' && b.name === 'Premium') return -1;
			if (a.name === 'Standard' && b.name === 'Basic') return 1;
			if (a.name === 'Premium') return 1;
		}) || {};
	if (loading && employerPackages.length === 0)
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
						{talentPackagesData.map((plan, index) => (
							<th key={index} className="px-6 py-3 border text-lg font-semibold">
								{plan.name} <br />
								<span className="text-white ">
									<span className="text-lg line-through mr-1 text-gray-300">
										{plan.name === 'Basic' ? '$199' : plan.name === 'Standard' ? '$399' : '$999'}
									</span>
									<span className="text-3xl">${plan.price}</span>/Mo
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object?.keys(talentPackagesData[0]?.features).map((feature, index) => (
						<tr key={index} className="border">
							<td className="px-2 py-2 font-medium text-left bg-blue-100 text-blue-900 w-[280px]">
								{feature.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
							</td>
							{talentPackagesData.map((plan, idx) => (
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
						{talentPackagesData.map((plan, index) => (
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
