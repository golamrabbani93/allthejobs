import InstructionModalContent from './InstructionModalContent';

const InstructionModal = () => {
	return (
		<>
			<button
				className="theme-btn btn-style-one d-none"
				data-bs-toggle="modal"
				data-bs-target="#resumeInstructionModal"
				id="instructionModalButton"
			>
				open
			</button>
			<div className="modal fade" id="resumeInstructionModal" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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

						<InstructionModalContent />
						{/* End PrivateMessageBox */}
					</div>
					{/* End .send-private-message-wrapper */}
				</div>
			</div>
		</>
	);
};

export default InstructionModal;
