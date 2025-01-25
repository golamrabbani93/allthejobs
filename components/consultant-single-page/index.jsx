'use client';

import Image from 'next/image';
import DefaulHeader2 from '@/components/header/DefaulHeader2';
import {useSelector} from 'react-redux';
import MobileMenu from '../header/MobileMenu';
import Social from './social/Social';
import JobSkills from './shared-components/JobSkills';
import Contact from './shared-components/Contact';
import FooterDefault from '@/components/footer/common-footer';

const index = ({id}) => {
	const {consultants, loading} = useSelector((state) => state.data);
	const consultant = consultants.find((item) => item.consultant_id == id) || consultants[0];
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
											src={consultant?.user?.photo || '/images/resource/company-logo/1-1.png'}
											alt="avatar"
										/>
									</figure>
									<h4 className="name">{consultant?.user?.name}</h4>

									<ul className="candidate-info">
										<li className="designation">{consultant?.headline}</li>
										<li>
											<span className="icon flaticon-map-locator"></span>
											{consultant?.province},
											{consultant?.country === 'United States'
												? 'USA'
												: consultant?.country
												? consultant?.country === 'United Kingdom'
													? 'UK'
													: consultant?.country
												: ''}
										</li>
										<li>
											<span className="icon flaticon-money"></span> ${consultant?.hourly_rate}
											hour
										</li>
									</ul>
								</div>

								<div className="btn-box">
									<a className="theme-btn btn-style-one" href="/images/sample.pdf" download>
										Get Consultant
									</a>
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
									</div>
									{/* <!-- About Video Box --> */}
									<p>{consultant?.about}</p>

									<div className={`resume-outer theme-blue`}>
										<div className="upper-title">
											<h4>Experience</h4>
										</div>
										{/* <!-- Start Experience BLock --> */}
										{consultant?.experience_details?.map((item, i) => (
											<div className="resume-block" key={i}>
												<div className="inner">
													<span className="name">{item.companyName.slice(0, 1)}</span>
													<div className="title-box">
														<div className="info-box">
															<h3>{item.role}</h3>
															<span>{item.companyName}</span>
														</div>
														<div className="edit-box">
															<span className="year">{item.duration}</span>
														</div>
													</div>
													<div className="text">{item.description}</div>
												</div>
											</div>
										))}

										{/* <!-- End Experience BLock --> */}
									</div>

									{/* <!-- Start Education BLock --> */}
									<div className={`resume-outer`}>
										<div className="upper-title">
											<h4>Education</h4>
										</div>
										{consultant?.education_details?.map((item, i) => (
											<div className="resume-block" key={i}>
												<div className="inner">
													<span className="name">{item.institutionName.slice(0, 1)}</span>
													<div className="title-box">
														<div className="info-box">
															<h3>{item.degreeName}</h3>
															<span>{item.institutionName}</span>
														</div>
														<div className="edit-box">
															<span className="year">{item.duration}</span>
														</div>
													</div>
													<div className="text">{item.description}</div>
												</div>
											</div>
										))}
									</div>
									{/* <!-- End Education BLock --> */}

									<div className={`resume-outer theme-yellow`}>
										<div className="upper-title">
											<h4>Awards</h4>
										</div>
										{/* <!-- Start Awards BLock --> */}
										{consultant?.awards?.map((item, i) => (
											<div className="resume-block" key={i}>
												<div className="inner">
													<span className="name">{item.category.slice(0, 1)}</span>
													<div className="title-box">
														<div className="info-box">
															<h3>{item.title}</h3>
															<span>{item.category}</span>
														</div>
														<div className="edit-box">
															<span className="year">{item.duration}</span>
														</div>
													</div>
													<div className="text">{item.description}</div>
												</div>
											</div>
										))}
									</div>
									{/* <!-- End Awards BLock --> */}
								</div>
							</div>
							{/* End .content-column */}

							<div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
								<aside className="sidebar">
									<div className="sidebar-widget">
										<h4 className="widget-title">Services</h4>
										<div className="widget-content">
											<ul className="job-skills">
												<JobSkills skills={consultant?.services} />
											</ul>
										</div>
									</div>
									<div className="sidebar-widget">
										<div className="widget-content">
											<ul className="job-overview">
												<li>
													<i className="icon icon-calendar"></i>
													<h5>Experience:</h5>
													<span>{consultant?.experience}</span>
												</li>

												<li>
													<i className="icon icon-expiry"></i>
													<h5>Age:</h5>
													<span>{consultant?.age}</span>
												</li>

												<li>
													<i className="icon icon-rate"></i>
													<h5>Hour Rate:</h5>
													<span>
														${consultant?.hourly_rate}
														hour
													</span>
												</li>

												<li>
													<i className="icon icon-user-2"></i>
													<h5>Gender:</h5>
													<span>{consultant?.gender}</span>
												</li>

												<li>
													<i className="icon icon-language"></i>
													<h5>Language:</h5>
													{consultant?.language?.map((lang, i) => (
														<span key={i}>
															{lang}
															{i === consultant?.language.length - 1 ? '' : ','}
														</span>
													))}
												</li>

												<li>
													<i className="icon icon-degree"></i>
													<h5>Education Level:</h5>
													<span>{consultant?.education_level}</span>
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
												<JobSkills skills={consultant?.skills} />
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
