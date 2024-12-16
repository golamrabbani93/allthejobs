import LoginPopup from '../common/form/login/LoginPopup';
import DefaulHeader2 from '../header/DefaulHeader2';
import MobileMenu from '../header/MobileMenu';
import FooterDefault from '../footer/common-footer';

import candidatesMenuData from '@/data/candidatesMenuData';
import Image from 'next/image';
import Link from 'next/link';
import candidates from '@/data/candidates';
import Breadcrumb from '../common/Breadcrumb';
const ConsultantsList = () => {
	return (
		<>
			{/* <!-- Header Span --> */}
			<span className="header-span"></span>

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DefaulHeader2 />
			{/* End Header with upload cv btn */}

			<MobileMenu />
			{/* End MobileMenu */}

			<Breadcrumb title="Consultants" meta="Consultants" />
			{/* <!--End Breadcrumb Start--> */}
			{/* <!--End Page Title--> */}

			<section className="ls-section">
				<div className="auto-container">
					{/* <div className="row"> */}
					{/* <div className="content-column col-lg-12 col-md-12 col-sm-12"> */}
					<div className="ls-outer">
						<div className="row">
							{candidates.map((candidate) => (
								<div
									className="candidate-block-four col-lg-4 col-md-6 col-sm-12"
									key={candidate.id}
								>
									<div className="inner-box">
										<ul className="job-other-info">
											<li className="green">Featured</li>
										</ul>

										<span className="thumb">
											<Image width={90} height={90} src={candidate.avatar} alt="candidates" />
										</span>
										<h3 className="name">
											<Link href={`/consultants/${candidate.id}`}>{candidate.name}</Link>
										</h3>
										<span className="cat">HR Professional</span>

										<ul className="job-info">
											<li>
												<span className="icon flaticon-map-locator"></span> {candidate.location}
											</li>
											<li>
												<span className="icon flaticon-money"></span> ${candidate.hourlyRate} / hour
											</li>
										</ul>
										{/* End candidate-info */}

										{/* <ul className="post-tags">
												{candidate.tags.map((val, i) => (
													<li key={i}>
														<a href="#">{val}</a>
													</li>
												))}
											</ul> */}
										{/* End tags */}

										<Link
											href={`/consultants/${candidate.id}`}
											className="theme-btn btn-style-three"
										>
											View Profile
										</Link>
									</div>
								</div>
							))}
							{/* <!-- ls Switcher --> */}
						</div>
					</div>
					{/* <!-- End Content Column --> */}
				</div>
				{/* End row */}
				{/* </div> */}
				{/* End container */}
			</section>
			{/* <!--End Listing Page Section --> */}

			<FooterDefault footerStyle="alternate" />
			{/* <!-- End Main Footer --> */}
		</>
	);
};

export default ConsultantsList;
