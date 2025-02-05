const DeleteModal = ({pkg}) => {
	const handleDelete = () => {
		// Delete the package
		console.log(`Deleting ${pkg.name}...`);
		// Close the modal
		const modalTrigger = document.getElementById(`deleteModalButton${pkg.package_id}`);
		if (modalTrigger) {
			modalTrigger.click();
		}
	};
	return (
		<>
			<button
				data-text="Delete"
				data-bs-toggle="modal"
				data-bs-target={`#deleteModal${pkg.package_id}`}
				id={`deleteModalButton${pkg.package_id}`}
			>
				<span className="la la-trash"></span>
			</button>

			<div className="modal fade" id={`deleteModal${pkg.package_id}`} style={{display: 'none'}}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="apply-modal-content modal-content p-4">
						<div className="text-center">
							<label
								type="button"
								className="closed-modal"
								id="deleteModalCloseBtn"
								data-bs-dismiss="modal"
								aria-label="Close"
							></label>
						</div>
						{/* Modal Header */}
						<h3 className="text-center text-danger">Confirm Deletion</h3>
						<p className="text-center mt-2 text-black">
							Are you sure you want to delete the <strong>{pkg.name}</strong> package? This action
							cannot be undone.
						</p>
						{/* Action Buttons */}
						<div className="d-flex justify-end gap-3">
							<label onClick={handleDelete} className="btn btn-danger">
								Yes, Delete
							</label>
							<label className="btn btn-primary" data-bs-dismiss="modal">
								Cancel
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteModal;
