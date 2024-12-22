import Register from '../register/Register';
import FormContent2 from './FormContent2';

const LoginPopup = () => {
	return (
		<>
			<a
				href="#"
				className="theme-btn btn-style-three call-modal d-none"
				data-bs-toggle="modal"
				data-bs-target="#loginPopupModal"
				id="loginPopupButton"
			>
				Login
			</a>
			<div className="modal fade" id="loginPopupModal">
				<div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
					<div className="modal-content">
						<button
							type="button"
							className="closed-modal"
							id="modalClose"
							data-bs-dismiss="modal"
						></button>
						{/* End close modal btn */}

						<div className="modal-body">
							{/* <!-- Login modal --> */}
							<div id="login-modal">
								{/* <!-- Login Form --> */}
								<div className="login-form default-form">
									<FormContent2 modal={true} />
								</div>
								{/* <!--End Login Form --> */}
							</div>
							{/* <!-- End Login Module --> */}
						</div>
						{/* En modal-body */}
					</div>
					{/* End modal-content */}
				</div>
			</div>
			{/* <!-- Login Popup Modal --> */}

			<div className="modal fade" id="registerModal">
				<div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
					<div className="modal-content">
						<button
							type="button"
							className="closed-modal"
							id="modalClose2"
							data-bs-dismiss="modal"
						></button>
						{/* End close modal btn */}

						<div className="modal-body">
							{/* <!-- Login modal --> */}
							<div id="login-modal">
								{/* <!-- Login Form --> */}
								<div className="login-form default-form">
									<Register />
								</div>
								{/* <!--End Login Form --> */}
							</div>
							{/* <!-- End Login Module --> */}
						</div>
						{/* En modal-body */}
					</div>
					{/* End modal-content */}
				</div>
			</div>
			{/* <!-- Login Popup Modal --> */}
		</>
	);
};

export default LoginPopup;
