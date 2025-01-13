'use client';

import jobs from '@/data/job-featured';
import LoginPopup from '@/components/common/form/login/LoginPopup';
import FooterDefault from '@/components/footer/common-footer';
import MobileMenu from '@/components/header/MobileMenu';
import Image from 'next/image';
import DefaulHeader2 from '@/components/header/DefaulHeader2';
import ApplyJobModalContent from './shared-components/ApplyJobModalContent';
import JobDetailsDescriptions from './shared-components/JobDetailsDescriptions';
import SocialTwo from './social/SocialTwo';
import RelatedJobs from './related-jobs/RelatedJobs';
import JobOverView from './job-overview/JobOverView';
import JobSkills from './shared-components/JobSkills';
import CompanyInfo from './shared-components/CompanyInfo';
import {useDispatch, useSelector} from 'react-redux';
import {timeAgoFromPosting} from '@/utils/timeAgoFromPosting';
import {
	addJobToWishlist,
	removeJobFromWishlist,
} from '@/features/wishlistJobsSlice/wishlistJobsSlice';

export const metadata = {
	title: 'Job Detail || AllTheJobs',
	description: 'AllTheJobs.ca is a job board website',
};

const index = ({id}) => {
	const company = jobs.find((item) => item.id == id) || jobs[0];
	//get all jobs from store and find the job by id
	const {jobs: allJobs, loading} = useSelector((state) => state.data);
	const job = allJobs.find((job) => job.job_id === Number(id));
	const time = timeAgoFromPosting(job?.created_at);
	const wishListJobs = useSelector((state) => state.wishlistJobs.wishlist);
	const dispatch = useDispatch();
	const isWishListJob = wishListJobs.find((wishItem) => wishItem.job_id === job?.job_id);
	if (loading) return <div>Loading...</div>;
	return (
		<>
			{/* <!-- Header Span --> */}
			<span className="header-span"></span>

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DefaulHeader2 />
			{/* <!--End Main Header --> */}

			<MobileMenu />
			{/* End MobileMenu */}

			{/* <!-- Job Detail Section --> */}
			<section className="job-detail-section">
				<div className="upper-box">
					<div className="auto-container">
						<div className="job-block-seven">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<Image width={100} height={98} src={job?.employer?.user?.photo} alt="logo" />
									</span>
									<h4>{job?.title}</h4>

									<ul className="job-info">
										<li>
											<span className="icon flaticon-briefcase"></span>
											{job?.employer?.company_name}
										</li>
										{/* compnay info */}
										<li>
											<span className="icon flaticon-map-locator"></span>
											{job?.employer?.city},
											{job?.employer?.country === 'United States'
												? 'USA'
												: job?.employer?.country
												? job?.employer?.country === 'United Kingdom'
													? 'UK'
													: job?.employer?.country
												: ''}
										</li>
										{/* location info */}
										<li>
											<span className="icon flaticon-clock-3"></span> {time}
										</li>
										{/* time info */}
										<li>
											<span className="icon flaticon-money"></span> $ {job?.salary_range}
										</li>
										{/* salary info */}
									</ul>
									{/* End .job-info */}

									<ul className="job-other-info">
										<li className={`time capitalize`}>{job?.job_type}</li>
										{job?.tags?.map((val, i) => (
											<li key={i} className={`privacy capitalize`}>
												{val}
											</li>
										))}
									</ul>
									{/* End .job-other-info */}
								</div>
								{/* End .content */}

								<div className="btn-box">
									<a
										href="#"
										className="theme-btn btn-style-one"
										data-bs-toggle="modal"
										data-bs-target="#applyJobModal"
									>
										Apply For Job
									</a>
									{isWishListJob ? (
										<button
											onClick={() => dispatch(removeJobFromWishlist(job))}
											className="bookmark-btn "
										>
											<span className="fa fa-bookmark"></span>
										</button>
									) : (
										<button
											onClick={() => dispatch(addJobToWishlist(job))}
											className="bookmark-btn"
										>
											<span className="flaticon-bookmark"></span>
										</button>
									)}
								</div>
								{/* End apply for job btn */}

								{/* <!-- Modal --> */}
								<div className="modal fade" id="applyJobModal" tabIndex="-1" aria-hidden="true">
									<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
										<div className="apply-modal-content modal-content">
											<div className="text-center">
												<h3 className="title">Apply for this job</h3>
												<button
													type="button"
													className="closed-modal"
													data-bs-dismiss="modal"
													aria-label="Close"
												></button>
											</div>
											{/* End modal-header */}

											<ApplyJobModalContent jobId={job?.job_id} />
											{/* End PrivateMessageBox */}
										</div>
										{/* End .send-private-message-wrapper */}
									</div>
								</div>
								{/* End .modal */}
							</div>
						</div>
						{/* <!-- Job Block --> */}
					</div>
				</div>
				{/* <!-- Upper Box --> */}

				<div className="job-detail-outer">
					<div className="auto-container">
						<div className="row">
							<div className="content-column col-lg-8 col-md-12 col-sm-12">
								<JobDetailsDescriptions job={job} />
								{/* End jobdetails content */}

								<div className="other-options">
									<div className="social-share">
										<h5>Share this job</h5>
										<SocialTwo />
									</div>
								</div>
								{/* <!-- Other Options --> */}

								<div className="related-jobs">
									<div className="title-box">
										<h3>Related Jobs</h3>
										<div className="text">2020 jobs live - 293 added today.</div>
									</div>
									{/* End title box */}

									<RelatedJobs />
								</div>
								{/* <!-- Related Jobs --> */}
							</div>
							{/* End .content-column */}

							<div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
								<aside className="sidebar">
									<div className="sidebar-widget">
										{/* <!-- Job Overview --> */}
										<h4 className="widget-title">Job Overview</h4>
										<JobOverView job={job} />

										<h4 className="widget-title mt-5">Job Skills</h4>
										<div className="widget-content">
											<JobSkills job={job} />
										</div>
										{/* <!-- Job Skills --> */}
									</div>
									{/* End .sidebar-widget */}

									<div className="sidebar-widget company-widget">
										<div className="widget-content">
											<div className="company-title">
												<div className="company-logo">
													<Image
														width={54}
														height={53}
														src={job?.employer.user.photo}
														alt={job?.employer.user.name}
													/>
												</div>
												<h5 className="company-name">{job?.employer.company_name}</h5>
												<a href="#" className="profile-link">
													View company profile
												</a>
											</div>
											{/* End company title */}

											<CompanyInfo job={job} />

											<div className="btn-box">
												<a
													href={job?.employer.company_website}
													target="_blank"
													rel="noopener noreferrer"
													className="theme-btn btn-style-three"
												>
													{job?.employer.company_website}
												</a>
											</div>
											{/* End btn-box */}
										</div>
									</div>
									{/* End .company-widget */}
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
