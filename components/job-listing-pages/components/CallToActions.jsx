import Link from 'next/link';

const CallToActions = () => {
	return (
		<div className="call-to-action-four ">
			<h5>Recruiting?</h5>
			<p>
				Advertise your jobs to millions of monthly users and search 15.8 million CVs in our
				database.
			</p>
			<Link href="/talents" className="theme-btn btn-style-one bg-blue">
				<span className="btn-title">Start Recruiting Now</span>
			</Link>
			<div className="image" style={{backgroundImage: 'url(/images/resource/ads-bg-4.png)'}}></div>
		</div>
	);
};

export default CallToActions;
