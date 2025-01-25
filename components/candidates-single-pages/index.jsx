'use client';

import Image from 'next/image';
import DefaulHeader2 from '@/components/header/DefaulHeader2';
import {useSelector} from 'react-redux';
import MobileMenu from '../header/MobileMenu';
import AboutVideo from './shared-components/AboutVideo';
import GalleryBox from './shared-components/GalleryBox';
import Social from './social/Social';
import JobSkills from './shared-components/JobSkills';
import Contact from './shared-components/Contact';
import FooterDefault from '@/components/footer/common-footer';

const index = ({id}) => {
	const {consultants, loading} = useSelector((state) => state.data);
	// console.log('🚀🚀 ~ index ~ consultants:', consultants);
	const consultant = consultants.find((item) => item.consultant_id == id) || consultants[0];
	console.log('🚀🚀 ~ index ~ consultant:', consultant);

	if (loading) return <h1>Loading...</h1>;
	return (
		<>
			{/* <!-- Header Span --> */}
			<span className="header-span"></span>

			{/* End Login Popup Modal */}

			<DefaulHeader2 />
			{/* <!--End Main Header --> */}

			<MobileMenu />
			{/* End MobileMenu */}

			{/* <!-- Job Detail Section --> */}
			<section className="candidate-detail-section">
				<div className="upper-box">
					<div className="auto-container">
						<div className="candidate-block-five">
							<div className="inner-box">
								<div className="content">
									<figure className="image">
										<Image
											width={100}
											height={100}
											src={consultant?.user?.photo || ''}
											alt="avatar"
										/>
									</figure>
									<h4 className="name">{consultant?.user?.name}</h4>

									<ul className="candidate-info">
										<li className="designation">{consultant?.designation}</li>
										<li>
											<span className="icon flaticon-map-locator"></span>
											{consultant?.location}
										</li>
										<li>
											<span className="icon flaticon-money"></span> ${consultant?.hourlyRate} / hour
										</li>
										<li>
											<span className="icon flaticon-clock"></span> Member Since,Aug 19, 2020
										</li>
									</ul>

									<ul className="post-tags">
										{consultant?.tags?.map((val, i) => (
											<li key={i}>{val}</li>
										))}
									</ul>
								</div>

								<div className="btn-box">
									<a className="theme-btn btn-style-one" href="/images/sample.pdf" download>
										Download CV
									</a>
									<button className="bookmark-btn">
										<i className="flaticon-bookmark"></i>
									</button>
								</div>
							</div>
						</div>
						{/*  <!-- Candidate block Five --> */}
					</div>
				</div>
				{/* <!-- Upper Box --> */}

				<div className="candidate-detail-outer">
					<div className="auto-container">
						<div className="row">
							<div className="content-column col-lg-8 col-md-12 col-sm-12">
								<div className="job-detail">
									<div className="video-outer">
										<h4>Candidates About</h4>
										<AboutVideo />
									</div>
									{/* <!-- About Video Box --> */}
									<p>
										Hello my name is Nicole Wells and web developer from Portland. In pharetra orci
										dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit
										nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim.
										Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac
										est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum,
										et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam.
									</p>
									<p>
										Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at
										pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare
										ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum
										lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.
									</p>

									{/* <!-- Portfolio --> */}
									<div className="portfolio-outer">
										<div className="row">
											<GalleryBox />
										</div>
									</div>

									{/* <!-- Candidate Resume Start --> */}
									{/* {candidateResume.map((resume) => (
										<div className={`resume-outer ${resume.themeColor}`} key={resume.id}>
											<div className="upper-title">
												<h4>{resume?.title}</h4>
											</div> */}

									{/* <!-- Start Resume BLock --> */}
									{/* {resume?.blockList?.map((item) => (
												<div className="resume-block" key={item.id}>
													<div className="inner">
														<span className="name">{item.meta}</span>
														<div className="title-box">
															<div className="info-box">
																<h3>{item.name}</h3>
																<span>{item.industry}</span>
															</div>
															<div className="edit-box">
																<span className="year">{item.year}</span>
															</div>
														</div>
														<div className="text">{item.text}</div>
													</div>
												</div>
											))} */}

									{/* <!-- End Resume BLock --> */}
									{/* </div>
									))} */}
									{/* <!-- Candidate Resume End --> */}
								</div>
							</div>
							{/* End .content-column */}

							<div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
								<aside className="sidebar">
									<div className="sidebar-widget">
										<div className="widget-content">
											<ul className="job-overview">
												<li>
													<i className="icon icon-calendar"></i>
													<h5>Experience:</h5>
													<span>0-2 Years</span>
												</li>

												<li>
													<i className="icon icon-expiry"></i>
													<h5>Age:</h5>
													<span>28-33 Years</span>
												</li>

												<li>
													<i className="icon icon-rate"></i>
													<h5>Current Salary:</h5>
													<span>11K - 15K</span>
												</li>

												<li>
													<i className="icon icon-salary"></i>
													<h5>Expected Salary:</h5>
													<span>26K - 30K</span>
												</li>

												<li>
													<i className="icon icon-user-2"></i>
													<h5>Gender:</h5>
													<span>Female</span>
												</li>

												<li>
													<i className="icon icon-language"></i>
													<h5>Language:</h5>
													<span>English, German, Spanish</span>
												</li>

												<li>
													<i className="icon icon-degree"></i>
													<h5>Education Level:</h5>
													<span>Master Degree</span>
												</li>
											</ul>
										</div>
									</div>
									{/* End .sidebar-widget conadidate overview */}

									<div className="sidebar-widget social-media-widget">
										<h4 className="widget-title">Social media</h4>
										<div className="widget-content">
											<div className="social-links">
												<Social />
											</div>
										</div>
									</div>
									{/* End .sidebar-widget social-media-widget */}

									<div className="sidebar-widget">
										<h4 className="widget-title">Professional Skills</h4>
										<div className="widget-content">
											<ul className="job-skills">
												<JobSkills />
											</ul>
										</div>
									</div>
									{/* End .sidebar-widget skill widget */}

									<div className="sidebar-widget contact-widget">
										<h4 className="widget-title">Contact Us</h4>
										<div className="widget-content">
											<div className="default-form">
												<Contact />
											</div>
										</div>
									</div>
									{/* End .sidebar-widget contact-widget */}
								</aside>
								{/* End .sidebar */}
							</div>
							{/* End .sidebar-column */}
						</div>
					</div>
				</div>
				{/* <!-- job-detail-outer--> */}
			</section>
			{/* <!-- End Job Detail Section --> */}

			<FooterDefault footerStyle="alternate5" />
			{/* <!-- End Main Footer --> */}
		</>
	);
};
export default index;
