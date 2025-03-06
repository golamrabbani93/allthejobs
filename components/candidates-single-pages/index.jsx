'use client';

import Image from 'next/image';
import DefaulHeader2 from '@/components/header/DefaulHeader2';
import {useSelector} from 'react-redux';
import MobileMenu from '../header/MobileMenu';

import Social from './social/Social';
import JobSkills from './shared-components/JobSkills';
import Contact from './shared-components/Contact';
import FooterDefault from '@/components/footer/common-footer';
import Loader from '../Loader/Loader';

const index = ({id}) => {
	const {talents, loading} = useSelector((state) => state.data);
	const talent = talents?.find((item) => item.talent_id == id) || talents[0];
	console.log('🚀🚀 ~ index ~ talent:', talent);

	if (loading || !talent) {
		return (
			<div className="justify-center items-center flex h-screen">
				<Loader />
			</div>
		);
	}
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
											src={talent?.user?.photo || '/images/resource/company-logo/1-1.png'}
											alt="avatar"
										/>
									</figure>
									<h4 className="name">{talent?.user?.name}</h4>

									<ul className="candidate-info">
										<li className="designation">{talent?.headline}</li>
										<li>
											<span className="icon flaticon-map-locator"></span>
											{talent?.province},
											{talent?.country === 'United States'
												? 'USA'
												: talent?.country
												? talent?.country === 'United Kingdom'
													? 'UK'
													: talent?.country
												: ''}
										</li>
										<li>
											<span className="icon flaticon-money"></span> ${talent?.current_salary}/
											Current Salary
										</li>
									</ul>
								</div>

								<div className="btn-box">
									{talent?.resume && (
										<a
											className="theme-btn btn-style-one"
											target="_blank"
											href={talent?.resume}
											download
										>
											Download CV
										</a>
									)}
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
										<h4>Talent About</h4>
									</div>
									{/* <!-- About Video Box --> */}
									<p>{talent?.about}</p>

									<div className={`resume-outer theme-blue`}>
										<div className="upper-title">
											<h4>Experience</h4>
										</div>
										{/* <!-- Start Experience BLock --> */}
										{talent?.experience_details?.map((item, i) => (
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
										{talent?.education_details?.map((item, i) => (
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
										{talent?.awards?.map((item, i) => (
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
										<h4 className="widget-title">Professional Skills</h4>
										<div className="widget-content">
											<ul className="job-skills">
												<JobSkills skills={talent?.skills} />
											</ul>
										</div>
									</div>
									<div className="sidebar-widget">
										<div className="widget-content">
											<ul className="job-overview">
												<li>
													<i className="icon icon-calendar"></i>
													<h5>Experience:</h5>
													<span>{talent?.experience}</span>
												</li>

												<li>
													<i className="icon icon-expiry"></i>
													<h5>Age:</h5>
													<span>{talent?.age}</span>
												</li>

												<li>
													<i className="icon icon-rate"></i>
													<h5>Current Salary:</h5>
													<span>${talent?.current_salary}</span>
												</li>
												<li>
													<i className="icon icon-rate"></i>
													<h5>Expected Salary:</h5>
													<span>${talent?.expected_salary}</span>
												</li>

												<li>
													<i className="icon icon-user-2"></i>
													<h5>Gender:</h5>
													<span>{talent?.gender}</span>
												</li>

												<li>
													<i className="icon icon-language"></i>
													<h5>Language:</h5>
													{talent?.language?.map((lang, i) => (
														<span key={i}>
															{lang}
															{i === talent?.language.length - 1 ? '' : ','}
														</span>
													))}
												</li>

												<li>
													<i className="icon icon-degree"></i>
													<h5>Education Level:</h5>
													<span>{talent?.education_level}</span>
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
