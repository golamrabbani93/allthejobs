import {CheckCircle, XCircle} from 'lucide-react';
import Link from 'next/link';

const PricingTable = () => {
	const pricingPlans = [
		{
			name: 'Free',
			price: '$0',
			package_id: 1,
			features: {
				registration: true,
				profileUpdate: true,
				jobSearchApply: true,
				jobMatchSuggestion: false,
				idVerification: false,
				profileReview: false,
				resumeCoverLetter: false,
				jobApplyAutopilot: false,
				featuredProfile: false,
				askAI: false,
				earlyAccessJobListings: false,
				interviewPreparation: false,
				skillImprovementResources: false,
				careerWebinars: false,
			},
		},
		{
			name: 'Standard',
			price: '$55',
			package_id: 2,
			features: {
				registration: true,
				profileUpdate: true,
				jobSearchApply: true,
				jobMatchSuggestion: true,
				idVerification: true,
				profileReview: true,
				resumeCoverLetter: 'AI-assisted',
				jobApplyAutopilot: 'Up to 100/Month',
				featuredProfile: '2 Weeks',
				askAI: 'Limited',
				earlyAccessJobListings: false,
				interviewPreparation: false,
				skillImprovementResources: true,
				careerWebinars: true,
			},
		},
		{
			name: 'Premium',
			price: '$85',
			package_id: 3,
			features: {
				registration: true,
				profileUpdate: true,
				jobSearchApply: true,
				jobMatchSuggestion: true,
				idVerification: true,
				profileReview: true,
				resumeCoverLetter: 'AI-assisted',
				jobApplyAutopilot: 'Up to 250/Month',
				featuredProfile: '1 Month',
				askAI: 'Full',
				earlyAccessJobListings: true,
				interviewPreparation: true,
				skillImprovementResources: true,
				careerWebinars: true,
			},
		},
	];

	const handleBuyNow = (planName) => {
		alert(`Buying ${planName} plan...`);
	};

	return (
		<div className="overflow-x-auto p-6">
			<table className="min-w-full border border-blue-600 text-center bg-white rounded-lg shadow-md">
				<thead className="bg-blue-600 text-white">
					<tr>
						<th className="px-4 py-3 border text-left">Feature</th>
						{pricingPlans.map((plan, index) => (
							<th key={index} className="px-6 py-3 border text-lg font-semibold">
								{plan.name} <br />
								<span className="text-white text-3xl">{plan.price}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.keys(pricingPlans[0].features).map((feature, index) => (
						<tr key={index} className="border">
							<td className="px-4 py-2 font-medium text-left bg-blue-100 text-blue-900">
								{feature.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
							</td>
							{pricingPlans.map((plan, idx) => (
								<td key={idx} className="px-6 py-2">
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
						<td className="px-4 py-3 font-medium text-left">Action</td>
						{pricingPlans.map((plan, index) => (
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
