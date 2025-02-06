'use client';

import Link from 'next/link.js';
import Image from 'next/image.js';
import {useEffect, useState} from 'react';
import Spinner from '@/components/Sppiner/Spinner.jsx';
import {format} from 'date-fns';
import {useGetJobsQuery} from '@/features/job/job.management.api';
import {useRouter} from 'next/navigation';

const JobListingsTable = () => {
	const [allJobs, setAllJobs] = useState([]);
	const {data: appliedJobs, isFetching} = useGetJobsQuery();
	const router = useRouter();

	//search job by job id
	const prefix = 'ATJ2025-';
	const [suffix, setSuffix] = useState('');
	const handleChange = (e) => {
		const inputText = e.target.value;
		// Ensure user input remains after the prefix
		if (inputText.startsWith(prefix)) {
			setSuffix(inputText.slice(prefix.length));
		}
	};
	useEffect(() => {
		if (suffix) {
			const filteredJobs = appliedJobs.filter((job) => job.job_id === Number(suffix));
			setAllJobs(filteredJobs);
		} else {
			setAllJobs(appliedJobs);
		}
	}, [suffix, appliedJobs]);
	if (isFetching)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="tabs-box">
			<div className="widget-title">
				<h4>All Jobs</h4>

				<div className="chosen-outer">
					<span className="text-primary mr-1 font-semibold">Search job by Job ID: </span>
					{/* <!--Tabs Box--> */}
					<input
						value={prefix + suffix}
						onChange={handleChange}
						className="border py-2 pl-1 rounded-lg "
						type="text"
						placeholder="Search Jobs"
					/>
				</div>
			</div>
			{/* End filter top bar */}

			{/* Start table widget content */}
			<div className="widget-content">
				{allJobs?.length > 0 ? (
					<div className="table-outer">
						<div className="table-outer">
							<table className="default-table manage-job-table">
								<thead>
									<tr>
										<th>Job Title</th>
										<th>Posted Date</th>
										<th>Application Deadline</th>
										<th>Job Status</th>
										<th>Salary Range</th>
									</tr>
								</thead>

								<tbody>
									{allJobs?.map((item) => {
										const posted_date = format(new Date(item.created_at), 'dd MMMM yyyy');
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
												<td>{posted_date}</td>
												<td className="text-center">{item.ap_deadline}</td>
												<td
													className={`capitalize text-center ${
														item.status === 'Draft' ? '!text-red-500' : 'status'
													}`}
												>
													{item.status === 'Published'
														? 'Active'
														: item.status === 'Draft'
														? 'Inactive'
														: item.status}
												</td>
												<td>${item.salary_range}</td>
												{/* Action Buttons */}
												{/* <td>
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

															{item.status === 'Published' ? (
																<li>
																	<button data-text="Inactive Job">
																		<span className="la la-times"></span>
																	</button>
																</li>
															) : (
																<li>
																	<button
																		disabled={item.status === 'Archived'}
																		data-text="Active Job"
																		className={
																			item.status === 'Archived' ? '!cursor-not-allowed' : ''
																		}
																	>
																		<span className="la la-check"></span>
																	</button>
																</li>
															)}

															<li>
																<button data-text="Delete Job">
																	<span className="la la-trash"></span>
																</button>
															</li>
														</ul>
													</div>
												</td> */}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
						<span className="text-black"> No Jobs Found!</span>
					</div>
				)}
			</div>
			{/* End table widget content */}
		</div>
	);
};

export default JobListingsTable;
