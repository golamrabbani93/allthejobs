'use client';

import Link from 'next/link.js';

import Image from 'next/image.js';
import {useGetAllApplicationsQuery} from '@/features/application/application.management.api.js';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import Spinner from '@/components/Sppiner/Spinner.jsx';
import {format} from 'date-fns';

const JobListingsTable = () => {
	const [appliedJobs, setAppliedJobs] = useState([]);
	const {jobs, userRoleBasedData, loading} = useSelector((state) => state.data);
	const {data: allApplication, isFetching} = useGetAllApplicationsQuery();

	useEffect(() => {
		if (allApplication && userRoleBasedData && jobs) {
			//get my applications
			const myaApplication = allApplication?.filter(
				(job) => job.talent_id === userRoleBasedData.talent_id,
			);
			//get the jobs that the user has applied for
			const myAppliedJobs = myaApplication?.map((application) => {
				const jobDetails = jobs.find((j) => j.job_id === application.job_id);
				return {
					...jobDetails,
					application_status: application.status,
					application_date: application.application_date,
				};
			});
			setAppliedJobs(myAppliedJobs);
		}
	}, [allApplication, userRoleBasedData, loading, jobs]);
	if (loading || isFetching)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="tabs-box">
			<div className="widget-title">
				<h4>My Applied Jobs</h4>

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
				{appliedJobs?.length > 0 ? (
					<div className="table-outer">
						<div className="table-outer">
							<table className="default-table manage-job-table">
								<thead>
									<tr>
										<th>Job Title</th>
										<th>Date Applied</th>
										<th>Application Deadline</th>
										<th>Application Status</th>
										<th>Salary Range</th>
									</tr>
								</thead>

								<tbody>
									{appliedJobs?.map((item) => {
										const apply_date = format(new Date(item.application_date), 'dd MMMM yyyy');
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
																		src={item?.employer.user.photo}
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
																		{item.employer.city},
																		{item.employer.country === 'United Kingdom'
																			? 'UK'
																			: item.employer.country === 'United States'
																			? 'USA'
																			: item.employer.country}
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</td>
												<td>{apply_date}</td>
												<td className="text-center">{item.ap_deadline}</td>
												<td
													className={`capitalize text-center ${
														item.application_status === 'expired' ? '!text-red-500' : 'status'
													}`}
												>
													{item.application_status === 'expired'
														? 'Rejected'
														: item.application_status}
												</td>
												<td>$ {item.salary_range}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
						<span className="text-black"> No Applied Jobs Found!</span>
					</div>
				)}
			</div>
			{/* End table widget content */}
		</div>
	);
};

export default JobListingsTable;
