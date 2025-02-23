const PackageDataTable = () => {
	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse text-white text-left">
				<thead>
					<tr className="bg-blue-900">
						<th className="py-3 px-4 border-b border-blue-800">Total Amount</th>
						<th className="py-3 px-4 border-b border-blue-800">Consultant's Share</th>
						<th className="py-3 px-4 border-b border-blue-800">Platform's Commission</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-blue-800 hover:bg-blue-700">
						<td className="py-3 px-4 border-b border-blue-700">$0 - $50</td>
						<td className="py-3 px-4 border-b border-blue-700">70%</td>
						<td className="py-3 px-4 border-b border-blue-700">30%</td>
					</tr>
					<tr className="bg-blue-700 hover:bg-blue-600">
						<td className="py-3 px-4 border-b border-blue-600">$51 - $100</td>
						<td className="py-3 px-4 border-b border-blue-600">75%</td>
						<td className="py-3 px-4 border-b border-blue-600">25%</td>
					</tr>
					<tr className="bg-blue-800 hover:bg-blue-700">
						<td className="py-3 px-4 border-b border-blue-700">$101 - $200</td>
						<td className="py-3 px-4 border-b border-blue-700">80%</td>
						<td className="py-3 px-4 border-b border-blue-700">20%</td>
					</tr>
					<tr className="bg-blue-700 hover:bg-blue-600">
						<td className="py-3 px-4 border-b border-blue-600">$201 - $300</td>
						<td className="py-3 px-4 border-b border-blue-600">85%</td>
						<td className="py-3 px-4 border-b border-blue-600">15%</td>
					</tr>
					<tr className="bg-blue-800 hover:bg-blue-700">
						<td className="py-3 px-4">Above $300</td>
						<td className="py-3 px-4">90%</td>
						<td className="py-3 px-4">10%</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PackageDataTable;
