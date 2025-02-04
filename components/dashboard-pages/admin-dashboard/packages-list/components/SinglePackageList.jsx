import ViewPackages from '@/components/modal/packages-modal/ViewPackages';

const SinglePackageList = ({pkg}) => {
	const handleShowModal = () => {
		const modalTrigger = document.getElementById('viewPackagesModalButton');
		if (modalTrigger) {
			modalTrigger.click();
		}
	};

	return (
		<tr>
			<td>{pkg.name}</td>
			<td className="capitalize">{pkg.target_role}</td>
			<td>${pkg.price}</td>
			<td>
				<div className="option-box">
					<ul className="option-list">
						<li>
							<button onClick={handleShowModal} data-text="View Package">
								<span className="la la-eye"></span>
							</button>
						</li>
						<li>
							<button data-text="Delete Package">
								<span className="la la-trash"></span>
							</button>
						</li>
					</ul>
				</div>
			</td>
			<ViewPackages pkg={pkg} />
		</tr>
	);
};

export default SinglePackageList;
