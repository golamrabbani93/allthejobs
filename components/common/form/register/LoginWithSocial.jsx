import {signIn} from 'next-auth/react';

const LoginWithSocial = () => {
	return (
		<div className="btn-box row">
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('facebook')}
					className="theme-btn social-btn-two facebook-btn"
				>
					<i className="fab fa-facebook-f"></i> Facebook
				</button>
			</div>
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('google', {callbackUrl: '/dashboard/talent/dashboard'})}
					className="theme-btn social-btn-two google-btn"
				>
					<i className="fab fa-google"></i> Gmail
				</button>
			</div>
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('facebook')}
					className="theme-btn social-btn-two facebook-btn"
				>
					<i className="fab fa-linkedin-in"></i> Linkedin
				</button>
			</div>
		</div>
	);
};

export default LoginWithSocial;
