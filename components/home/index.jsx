import LoginPopup from '../common/form/login/LoginPopup';
import FooterDefault from '../footer/common-footer';
import DefaulHeader2 from '../header/DefaulHeader2';
import MobileMenu from '../header/MobileMenu';
import Hero2 from '../hero/hero-2';
import JobFeatured1 from '../job-featured/JobFeatured1';
import Block8 from '../block/Block8';
import Partner2 from '../common/partner/Partner2';
import Testimonial2 from '../testimonial/Testimonial2';
import Image from 'next/image';
import JobCategorie7 from '../job-categories/JobCategorie7';
import RegBanner from '../block/RegBanner';
import StatsBanner from '../stats-banner/StatsBanner';
import Consultants from '../consultants/Consultants';
import Candidates from '../candidates/Candidates';
import Candidates2 from '../candidates/Candidates2';
import CallToAction2 from '../call-to-action/CallToAction2';
import './hero.css';
import Services from '../services/Services';
import ConsultantList from '../consultants/ConsultantList';
const index = () => {
	return (
		<>
			<LoginPopup />
			{/* End Login Popup Modal */}

			<DefaulHeader2 />
			{/* End Header with upload cv btn */}

			<MobileMenu />
			{/* End MobileMenu */}

			<Hero2 />
			{/* End Hero Section */}
			<section className="">
				<div className="auto-container">
					<div className="row" data-aos="fade-up">
						<StatsBanner />
					</div>
				</div>
			</section>
			<section className="layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="row" data-aos="fade-up">
						<Consultants />
					</div>
				</div>
			</section>
			{/* <!-- End About Section --> */}

			<section className="layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="row justify-content-between align-items-end">
						<div className="col-lg-6">
							<div className="sec-title">
								<h2>Jobs by category</h2>
								<div className="text mt-9">2020 jobs live - 293 added today.</div>
							</div>
						</div>
						{/* End sectitle */}
						{/* <div className="col-auto">
							<a href="#" className="button-icon -arrow text-dark-blue">
								Browse All
								<span className="fa fa-angle-right ms-1"></span>
							</a>
						</div> */}
					</div>
					{/* End .row */}

					<div className="row grid-flex pt-50" data-aos="fade-up">
						<JobCategorie7 />
					</div>
					{/* End .row */}
				</div>
			</section>
			{/* End Job Categorie Section */}

			<section className="registeration-banners">
				<div className="auto-container">
					<div className="row" data-aos="fade-up">
						<RegBanner />
					</div>
				</div>
			</section>
			{/* <!-- End Registeration Banners --> */}

			<section className="candidates-section">
				<div className="auto-container">
					<div className="sec-title">
						<h2>Featured Consultants</h2>
						<div className="text">
							Skilled consultants delivering innovative strategies to drive business success.
						</div>
					</div>

					<div className="carousel-outer" data-aos="fade-up">
						<div className="candidates-carousel default-dots">
							<ConsultantList />
						</div>
					</div>
				</div>
			</section>
			{/* <!-- End Consultants Section --> */}

			<section className="job-section">
				<div className="auto-container">
					<div className="sec-title-outer">
						<div className="sec-title">
							<h2>Featured Jobs</h2>
							<div className="text">Know your worth and find the job that qualify your life</div>
						</div>

						{/* <div className="select-box-outer">
							<span className="icon fa fa-angle-down"></span>
							<Filter />
						</div> */}
					</div>
					{/* End sec-title-outer */}

					<div className="row " data-aos="fade-up">
						<JobFeatured1 />
					</div>

					{/* <div className="btn-box">
						<button href="/job-list-v5" className="theme-btn btn-style-one bg-blue">
							<span className="btn-title">Load More Listing</span>
						</button>
					</div> */}
				</div>
			</section>
			{/* End Job Featured Section */}
			<CallToAction2 />
			{/* End CallToAction2 Section */}

			<section className="candidates-section-two">
				<div className="auto-container">
					<div className="sec-title">
						<h2>Featured Job Seekers</h2>
						<div className="text">
							Passionate job seekers ready to bring expertise and drive to your team
						</div>
					</div>

					<div className="row" data-aos="fade-up">
						<Candidates2 />
					</div>
				</div>
			</section>
			{/* <!-- End Candidates Section --> */}

			<section className="layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="sec-title text-center">
						<h2>How It Works</h2>
						<div className="text">Learn how our service works in a few simple steps.</div>
					</div>
					{/* End sec-title */}

					<div className="row grid-base pt-50" data-aos="fade-up">
						<Block8 />
						{/* <!-- Work Block --> */}
					</div>
				</div>
			</section>
			{/* <!-- End Work Section --> */}
			<section className="news-section">
				<div className="auto-container">
					<div className="sec-title text-center">
						<h2>Services</h2>
						<div className="text">We're excited to offer our best to help you become the best</div>
					</div>
					{/* End ."sec-title */}
					<div className="row" data-aos="fade-up">
						<Services />
					</div>
				</div>
			</section>
			{/* <!-- End News Section --> */}
			<section className="clients-section-two alternate layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="sponsors-outer wow fadeInUp">
						<div className="sponsors-carousel">
							<Partner2 />
						</div>
					</div>
				</div>
			</section>

			{/* <!-- End Clients Section --> */}
			<section className="testimonial-section-two">
				<div className="container-fluid">
					<div className="testimonial-left">
						<Image
							width={504}
							height={451}
							src="/images/resource/testimonial-left.png"
							alt="testimonial"
						/>
					</div>
					{/* End left img group */}

					<div className="testimonial-right">
						<Image
							width={504}
							height={451}
							src="/images/resource/testimonial-right.png"
							alt="testimonial"
						/>
					</div>
					{/* End right img group */}

					<div className="sec-title text-center">
						<h2>Testimonials From Our Customers</h2>
						<div className="text">Read what our customers have to say about us!</div>
					</div>
					{/* <!-- Sec Title --> */}

					<div className="carousel-outer" data-aos="fade-up">
						<div className="testimonial-carousel">
							<Testimonial2 />
						</div>
						{/* <!-- Testimonial Carousel --> */}
					</div>
				</div>
			</section>
			{/* <!-- End Testimonial Section --> */}

			{/* <!-- End Clients Section--> */}

			<FooterDefault footerStyle="alternate" />
			{/* <!-- End Main Footer --> */}
		</>
	);
};

export default index;
