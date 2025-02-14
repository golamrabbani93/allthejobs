'use client';
import LoginPopup from '../common/form/login/LoginPopup';
import DefaulHeader2 from '../header/DefaulHeader2';
import MobileMenu from '../header/MobileMenu';
import FooterDefault from '../footer/common-footer';
import Image from 'next/image';
import Link from 'next/link';
import candidates from '@/data/candidates';
import Breadcrumb from '../common/Breadcrumb';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import ScheduleMeeting from '@/app/(others)/video-chat3/Components/ScheduleMeeting';
import { useEffect, useState } from 'react';
const ConsultantsList = () => {
	const { consultants: data, loading } = useSelector((state) => state.data);
		const user_redux = useSelector((state) => state.user);
		const [user, setUser] = useState(undefined)
		useEffect(() => {
			setUser(user_redux)
		}, [user_redux])
		console.log(user);
	//reverse the data to show the latest consultants first
	const consultants = data.map((consultant) => consultant).reverse();
	console.log(consultants[0]);
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

			{loading ? (
				<Loader />
			) : (
				<section className="ls-section">
					<div className="auto-container">
						{/* <div className="row"> */}
						{/* <div className="content-column col-lg-12 col-md-12 col-sm-12"> */}
						<div className="ls-outer">
							<div className="row">
								{consultants.map((consultant) => (
									<div
										className="candidate-block-four col-lg-3 col-md-6 col-sm-12 "
										key={consultant.consultant_id}
									>
										<div className="inner-box shadow-sm">
											<ul className="job-other-info">
												<li className="green">Featured</li>
											</ul>

											<span className="thumb">
												<Image
													width={90}
													height={90}
													src={consultant.user.photo || '/images/resource/company-logo/1-1.png'}
													alt="candidates"
												/>
											</span>
											<h3 className="name">
												{/* <Link href={`/consultants/${consultant.consultant_id}`}> */}
												<Link href={`#`}>{consultant.user.name}</Link>
											</h3>
											<span className="cat">{consultant.role}</span>

											<ul className="job-info">
												<li>
													<span className="icon flaticon-map-locator"></span>{' '}
													{consultant.country === 'United States'
														? 'USA'
														: consultant.country === 'United Kingdom'
															? 'UK'
															: consultant.country}
												</li>
												<li>
													<span className="icon flaticon-money"></span> ${consultant.hourly_rate} /
													hour
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

											<div className='flex items-center gap-2'>
												<Link
													href={`/consultants/${consultant.consultant_id}`}
													className="theme-btn btn-style-three"
												>
													View Profile
												</Link>
												<div className="btn-box">
									<button >{user?.user_id?
										<ScheduleMeeting consultant_id={consultant?.user_id} button_text="Book"
										consultant_name={consultant?.user.name} consultant_real_id={consultant.consultant_id}></ScheduleMeeting>:<Link href="/login"><Button>Schedule Meeting</Button></Link>
									}</button>
									{/* <a className="theme-btn btn-style-one" href="/images/sample.pdf" download>
										Get Consultant
									</a> */}
								</div>
											</div>
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
			)}
			{/* <!--End Listing Page Section --> */}

			<FooterDefault footerStyle="alternate" />
			{/* <!-- End Main Footer --> */}
		</>
	);
};

export default ConsultantsList;
