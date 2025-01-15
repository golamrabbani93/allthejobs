'use client';

import Link from 'next/link.js';
import jobs from '../../../../../data/job-featured.js';
import Image from 'next/image.js';
import {useDispatch, useSelector} from 'react-redux';
import {removeJobFromWishlist} from '@/features/wishlistJobsSlice/wishlistJobsSlice.js';
import {useRouter} from 'next/navigation.js';

const JobFavouriteTable = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const wishListJobs = useSelector((state) => state.wishlistJobs.wishlist);

	return (
		<>
			{wishListJobs.length > 0 ? (
				<div className="tabs-box">
					<div className="widget-title">
						<h4>My Favorite Jobs</h4>

						<div className="chosen-outer">
							{/* <!--Tabs Box--> */}
							<select className="chosen-single form-select">
								<option>Last 6 Months</option>
								<option>Last 12 Months</option>
								<option>Last 16 Months</option>
								<option>Last 24 Months</option>
								<option>Last 5 year</option>
							</select>
						</div>
					</div>
					{/* End filter top bar */}

					{/* Start table widget content */}
					<div className="widget-content">
						<div className="table-outer">
							<div className="table-outer">
								<table className="default-table manage-job-table">
									<thead>
										<tr>
											<th>Job Title</th>
											<th>Job Type</th>
											<th>Salary</th>
											<th>Application Deadline</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>
										{wishListJobs.map((item) => (
											<tr>
												<td>
													{/* <!-- Job Block --> */}
													<div className="job-block">
														<div className="inner-box">
															<div className="content">
																<span className="company-logo">
																	<Image
																		width={50}
																		height={49}
																		src={item.employer.user.photo}
																		alt="logo"
																	/>
																</span>
																<h4>
																	<Link href={`/jobs/${item.job_id}`}>{item.title}</Link>
																</h4>
																<ul className="job-info">
																	<li>
																		<span className="icon flaticon-briefcase"></span>
																		{item.employer.company_name}
																	</li>
																	<li>
																		<span className="icon flaticon-map-locator"></span>
																		{item.employer.country}
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</td>
												<td>{item.job_type}</td>
												<td>${item.salary_range}</td>
												<td className="text-center">{item.ap_deadline}</td>
												<td>
													<div className="option-box">
														<ul className="option-list">
															<li>
																<button
																	onClick={() => router.push(`/jobs/${item.job_id}`)}
																	data-text="View Job"
																>
																	<span className="la la-eye"></span>
																</button>
															</li>
															<li>
																<button
																	onClick={() => dispatch(removeJobFromWishlist(item))}
																	data-text="Delete Aplication"
																>
																	<span className="la la-trash"></span>
																</button>
															</li>
														</ul>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					{/* End table widget content */}
				</div>
			) : (
				<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
					<span className="text-black"> No Shortlisted Jobs !</span>
				</div>
			)}
		</>
	);
};

export default JobFavouriteTable;
