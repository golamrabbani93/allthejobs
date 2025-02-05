import DeleteModal from '@/components/modal/packages-modal/delete-modal/DeleteModal';
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
							<ViewPackages pkg={pkg} />
						</li>
						<li>
							<DeleteModal pkg={pkg} />
							{/* <button data-text="Delete Package">
								<span className="la la-trash"></span>
							</button> */}
						</li>
					</ul>
				</div>
			</td>
		</tr>
	);
};

export default SinglePackageList;
