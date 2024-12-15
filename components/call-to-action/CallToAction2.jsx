import Link from 'next/link';

const CallToAction2 = () => {
	return (
		<section
			className="call-to-action-two"
			style={{backgroundImage: 'url(/images/background/1.jpg)'}}
		>
			<div className="auto-container" data-aos="fade-up">
				<div className="sec-title light text-center">
					<h2>Your Dream Jobs Are Waiting</h2>
					<div className="text">
						Over 1 million interactions, 50,000 success stories Make yours now.
					</div>
				</div>

				<div className="btn-box">
					<button href="/register" className="theme-btn btn-style-two">
						Apply Job Now
					</button>
				</div>
			</div>
		</section>
	);
};

export default CallToAction2;
