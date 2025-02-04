'use client';

import Spinner from '@/components/Sppiner/Spinner';
import {useSelector} from 'react-redux';
import SinglePackageList from './SinglePackageList';

const PackageListTable = () => {
	const {packages, loading} = useSelector((state) => state.data);

	if (loading) {
		return (
			<div className="bg-white rounded-lg h-96 flex justify-center items-center">
				<Spinner />
			</div>
		);
	}
	if (!packages || packages.length === 0) {
		return (
			<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
				<span className="text-black">No Packages Available!</span>
			</div>
		);
	}

	return (
		<div className="tabs-box">
			<div className="widget-title">
				<h4>Available Packages</h4>
			</div>

			<div className="widget-content">
				<div className="table-outer">
					<table className="default-table manage-package-table">
						<thead>
							<tr>
								<th>Package Name</th>
								<th>Target Role</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{packages.map((pkg) => (
								<SinglePackageList key={pkg.package_id} pkg={pkg} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PackageListTable;
