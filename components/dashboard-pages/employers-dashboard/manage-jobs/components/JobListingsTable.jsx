'use client';

import Link from 'next/link';
import Image from 'next/image.js';
import {useSelector} from 'react-redux';
import Spinner from '@/components/Sppiner/Spinner';
import {useGetJobsQuery} from '@/features/job/job.management.api.js';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';

const JobListingsTable = () => {
	const router = useRouter();
	const {data: jobs, isLoading} = useGetJobsQuery();
	const {userRoleBasedData, loading} = useSelector((state) => state.data);

	const myJobs = jobs?.filter((job) => job?.employer_id === userRoleBasedData?.employer_id);
	if (isLoading || loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="tabs-box">
			<div className="widget-title">
				<h4>My Job Listings</h4>

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
					<table className="default-table manage-job-table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Applications</th>
								<th>Created & Expired</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{myJobs?.length > 0 ? (
								myJobs?.map((item) => {
									const startDate = format(new Date(item.created_at), 'dd MMMM yyyy');
									return (
										<tr key={item.job_id}>
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
																<Link href={`/job-single-v3/${item.id}`}>{item.title}</Link>
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
											<td className="applied">
												<a href="#">
													{item.total_applicats > 0
														? `${item.total_applicats}+ Applied`
														: `${item.total_applicats} Applied`}
												</a>
											</td>
											<td>
												{startDate}
												<br />
												{item.ap_deadline}
											</td>
											<td className="status">{item.is_open ? 'Active' : 'Inactive'}</td>
											<td>
												<div className="option-box">
													<ul className="option-list">
														<li>
															<button data-text="Edit Job">
																<span
																	onClick={() =>
																		router.push(
																			`/dashboard/employer/manage-jobs/update/${item.job_id}`,
																		)
																	}
																	className="la la-pencil"
																></span>
															</button>
														</li>
														<li>
															<button data-text="Deactivate Job">
																<span className="la la-times"></span>
															</button>
														</li>
														<li>
															<button data-text="Delete Aplication">
																<span className="la la-trash"></span>
															</button>
														</li>
													</ul>
												</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan="5">No job listings found</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* End table widget content */}
		</div>
	);
};

export default JobListingsTable;
