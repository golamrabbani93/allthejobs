import Link from 'next/link';
import CopyrightFooter from './CopyrightFooter';
import FooterContent from './FooterContent';

const index = ({footerStyle = ''}) => {
	return (
		<footer className={`main-footer ${footerStyle}`}>
			<div className="auto-container">
				{/* <!--Widgets Section--> */}
				<div className="widgets-section" data-aos="fade-up">
					<div className="row">
						<div className="big-column col-xl-4 col-lg-3 col-md-12">
							<div className="footer-column about-widget">
								<Link href="/">
									<div className="logo">allthejobs.ca</div>
								</Link>
								<p className="phone-num">
									<span>Call us </span>
									<a href="thebeehost@support.com">+1 506 899 3939</a>
								</p>
								<p className="address">
									27 Longview Court, Saint John,
									<br /> NB E2J 4N2, Canada <br />
									<a href="mailto:hello@allthejobs.ca" className="email">
										hello@allthejobs.ca
									</a>
								</p>
							</div>
						</div>
						{/* End footer left widget */}

						<div className="big-column col-xl-8 col-lg-9 col-md-12">
							<div className="row">
								<FooterContent />
							</div>
						</div>
						{/* End col-xl-8 */}
					</div>
				</div>
			</div>
			{/* End auto-container */}

			<CopyrightFooter />
			{/* <!--Bottom--> */}
		</footer>
		//   {/* <!-- End Main Footer --> */}
	);
};

export default index;
