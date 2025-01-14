'use client';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Link from 'next/link';
import Image from 'next/image';
import {useGetAllApplicationsQuery} from '@/features/application/application.management.api';
import {useGetAllTalentsQuery} from '@/features/candidate/talent.management.api';
import Spinner from '@/components/Sppiner/Spinner';

const WidgetContentBox = ({selectJob}) => {
	//get all talents
	const {data: talents, isLoading: talentsLoading} = useGetAllTalentsQuery();
	//get all applicants
	const {data: allApplicants, isLoading: applicantLoading} = useGetAllApplicationsQuery();
	const applicants = allApplicants?.filter((applicant) => applicant?.job_id === selectJob?.job_id);
	const getShortListed = applicants?.filter((applicant) => applicant?.status === 'short-listed');
	const getInterviewListed = applicants?.filter(
		(applicant) => applicant?.status === 'interviewing',
	);
	const getHired = applicants?.filter((applicant) => applicant?.status === 'hired');
	const getRejected = applicants?.filter((applicant) => applicant?.status === 'expired');

	//get all talents
	const allAppliedTalents = allApplicants?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);
	//find shortlisted talents by applicants id
	const shortListedTalents = getShortListed?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	//getInterviewListed talents
	const interviewListedTalents = getInterviewListed?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	//get Hired Talents
	const hiredTalents = getHired?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	//get Rejected Talents

	const rejectedTalents = getRejected?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	if (talentsLoading || applicantLoading)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="widget-content">
			<div className="tabs-box">
				<Tabs>
					<div className="aplicants-upper-bar d-block">
						<h6 className="mb-5 text-center ">
							{selectJob?.title || 'Please select a job to view detailed applicant information.'}
						</h6>

						<TabList className="aplicantion-status tab-buttons clearfix">
							<Tab className="tab-btn totals">
								Total(s): {applicants?.length > 0 ? applicants?.length : allAppliedTalents?.length}
							</Tab>
							{selectJob?.job_id && (
								<>
									<Tab className="tab-btn approved"> Short Lists: {getShortListed?.length}</Tab>
									<Tab className="tab-btn approved">Interviewing: {getInterviewListed?.length}</Tab>
									<Tab className="tab-btn approved"> Hired: {getHired?.length}</Tab>
									<Tab className="tab-btn rejected"> Rejected(s): {getRejected?.length}</Tab>
								</>
							)}
						</TabList>
					</div>

					<div className="tabs-content">
						<TabPanel>
							<div className="row">
								{allAppliedTalents && allAppliedTalents?.length > 0 ? (
									allAppliedTalents?.map((candidate) => (
										<div
											className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
											key={candidate?.talent_id}
										>
											<div className="inner-box">
												<div className="content">
													<figure className="image">
														{candidate?.user?.photo && (
															<Image
																width={90}
																height={90}
																src={candidate.user.photo}
																alt="candidates"
															/>
														)}
													</figure>
													<h4 className="name">
														<Link href={`/candidates-single-v1/${candidate?.talent_id}`}>
															{candidate?.user?.name}
														</Link>
													</h4>

													<ul className="candidate-info">
														<li className="designation">{candidate?.headline}</li>
														<li>
															<span className="icon flaticon-map-locator"></span>{' '}
															{candidate?.country}
														</li>
														<li>
															<span className="icon flaticon-money"></span> $
															{candidate?.expected_salary}
														</li>
													</ul>
													{/* End candidate?-info */}

													<ul className="post-tags">
														{candidate?.skills?.map((val, i) => (
															<li key={i}>
																<a href="#">{val}</a>
															</li>
														))}
													</ul>
												</div>
												{/* End content */}

												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="View Aplication">
																<span className="la la-eye"></span>
															</button>
														</li>
														<li>
															<button data-text="Approve Aplication">
																<span className="la la-check"></span>
															</button>
														</li>
														<li>
															<button data-text="Reject Aplication">
																<span className="la la-times-circle"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
												{/* End admin options box */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div className="">No Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End total applicants */}
						<TabPanel>
							<div className="row">
								{shortListedTalents?.length > 0 ? (
									shortListedTalents?.map((candidate) => (
										<div
											className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
											key={candidate?.talent_id}
										>
											<div className="inner-box">
												<div className="content">
													<figure className="image">
														{candidate?.user?.photo && (
															<Image
																width={90}
																height={90}
																src={candidate.user.photo}
																alt="candidates"
															/>
														)}
													</figure>
													<h4 className="name">
														<Link href={`/candidates-single-v1/${candidate?.talent_id}`}>
															{candidate?.user?.name}
														</Link>
													</h4>

													<ul className="candidate-info">
														<li className="designation">{candidate?.headline}</li>
														<li>
															<span className="icon flaticon-map-locator"></span>{' '}
															{candidate?.country}
														</li>
														<li>
															<span className="icon flaticon-money"></span> $
															{candidate?.expected_salary}
														</li>
													</ul>
													{/* End candidate?-info */}

													<ul className="post-tags">
														{candidate?.skills?.map((val, i) => (
															<li key={i}>
																<a href="#">{val}</a>
															</li>
														))}
													</ul>
												</div>
												{/* End content */}

												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="View Aplication">
																<span className="la la-eye"></span>
															</button>
														</li>
														<li>
															<button data-text="Approve Aplication">
																<span className="la la-check"></span>
															</button>
														</li>
														<li>
															<button data-text="Reject Aplication">
																<span className="la la-times-circle"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
												{/* End admin options box */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div className="">No Shortlisted Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End Shortlisted applicants */}
						<TabPanel>
							<div className="row">
								{interviewListedTalents?.length > 0 ? (
									interviewListedTalents?.map((candidate) => (
										<div
											className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
											key={candidate?.talent_id}
										>
											<div className="inner-box">
												<div className="content">
													<figure className="image">
														{candidate?.user?.photo && (
															<Image
																width={90}
																height={90}
																src={candidate.user.photo}
																alt="candidates"
															/>
														)}
													</figure>
													<h4 className="name">
														<Link href={`/candidates-single-v1/${candidate?.talent_id}`}>
															{candidate?.user?.name}
														</Link>
													</h4>

													<ul className="candidate-info">
														<li className="designation">{candidate?.headline}</li>
														<li>
															<span className="icon flaticon-map-locator"></span>{' '}
															{candidate?.country}
														</li>
														<li>
															<span className="icon flaticon-money"></span> $
															{candidate?.expected_salary}
														</li>
													</ul>
													{/* End candidate?-info */}

													<ul className="post-tags">
														{candidate?.skills?.map((val, i) => (
															<li key={i}>
																<a href="#">{val}</a>
															</li>
														))}
													</ul>
												</div>
												{/* End content */}

												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="View Aplication">
																<span className="la la-eye"></span>
															</button>
														</li>
														<li>
															<button data-text="Approve Aplication">
																<span className="la la-check"></span>
															</button>
														</li>
														<li>
															<button data-text="Reject Aplication">
																<span className="la la-times-circle"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
												{/* End admin options box */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div className="">No Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End InterViewing applicants */}
						<TabPanel>
							<div className="row">
								{hiredTalents?.length > 0 ? (
									hiredTalents?.map((candidate) => (
										<div
											className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
											key={candidate?.talent_id}
										>
											<div className="inner-box">
												<div className="content">
													<figure className="image">
														{candidate?.user?.photo && (
															<Image
																width={90}
																height={90}
																src={candidate.user.photo}
																alt="candidates"
															/>
														)}
													</figure>
													<h4 className="name">
														<Link href={`/candidates-single-v1/${candidate?.talent_id}`}>
															{candidate?.user?.name}
														</Link>
													</h4>

													<ul className="candidate-info">
														<li className="designation">{candidate?.headline}</li>
														<li>
															<span className="icon flaticon-map-locator"></span>{' '}
															{candidate?.country}
														</li>
														<li>
															<span className="icon flaticon-money"></span> $
															{candidate?.expected_salary}
														</li>
													</ul>
													{/* End candidate?-info */}

													<ul className="post-tags">
														{candidate?.skills?.map((val, i) => (
															<li key={i}>
																<a href="#">{val}</a>
															</li>
														))}
													</ul>
												</div>
												{/* End content */}

												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="View Aplication">
																<span className="la la-eye"></span>
															</button>
														</li>
														<li>
															<button data-text="Approve Aplication">
																<span className="la la-check"></span>
															</button>
														</li>
														<li>
															<button data-text="Reject Aplication">
																<span className="la la-times-circle"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
												{/* End admin options box */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div className="">No Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End Hired applicants */}
						<TabPanel>
							<div className="row">
								{rejectedTalents?.length > 0 ? (
									rejectedTalents?.map((candidate) => (
										<div
											className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
											key={candidate?.talent_id}
										>
											<div className="inner-box">
												<div className="content">
													<figure className="image">
														{candidate?.user?.photo && (
															<Image
																width={90}
																height={90}
																src={candidate.user.photo}
																alt="candidates"
															/>
														)}
													</figure>
													<h4 className="name">
														<Link href={`/candidates-single-v1/${candidate?.talent_id}`}>
															{candidate?.user?.name}
														</Link>
													</h4>

													<ul className="candidate-info">
														<li className="designation">{candidate?.headline}</li>
														<li>
															<span className="icon flaticon-map-locator"></span>{' '}
															{candidate?.country}
														</li>
														<li>
															<span className="icon flaticon-money"></span> $
															{candidate?.expected_salary}
														</li>
													</ul>
													{/* End candidate?-info */}

													<ul className="post-tags">
														{candidate?.skills?.map((val, i) => (
															<li key={i}>
																<a href="#">{val}</a>
															</li>
														))}
													</ul>
												</div>
												{/* End content */}

												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="View Aplication">
																<span className="la la-eye"></span>
															</button>
														</li>
														<li>
															<button data-text="Approve Aplication">
																<span className="la la-check"></span>
															</button>
														</li>
														<li>
															<button data-text="Reject Aplication">
																<span className="la la-times-circle"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
												{/* End admin options box */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div className="">No Rejected Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End rejected applicants */}
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default WidgetContentBox;
