const ViewPackages = ({pkg}) => {
	return (
		<>
			<button
				className="theme-btn btn-style-one d-none"
				data-bs-toggle="modal"
				data-bs-target="#viewPackagesModal"
				id="viewPackagesModalButton"
			>
				open
			</button>
			<div className="modal fade" id="viewPackagesModal" style={{display: 'none'}}>
				<div className="modal-dialog modal-dialog-centered ">
					<div className="apply-modal-content modal-content">
						<div className="text-center">
							<button
								type="button"
								className="closed-modal"
								id="resumeInstructionModalCloseBtn"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						{/* End modal-header */}
						<h2 className="mb-3">{pkg.name} Packages Feature</h2>
						<table className="features-table">
							<thead>
								<tr>
									<th>Feature Name</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{pkg.features.map((feature, index) => (
									<tr key={index}>
										<td>
											{feature.name
												.replace(/([A-Z])/g, ' $1')
												.replace(/^./, (str) => str.toUpperCase())}
										</td>
										<td>{feature.isEnabled ? 'Enabled' : 'Disabled'}</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* End PrivateMessageBox */}
					</div>
					{/* End .send-private-message-wrapper */}
				</div>
			</div>
		</>
	);
};

export default ViewPackages;
