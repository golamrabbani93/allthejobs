'use client';

import Link from 'next/link';
import jobFeatured from '../../data/job-featured';
import Image from 'next/image';
import {useGetJobsQuery} from '@/features/job/job.management.api';
import Loader from '../Loader/Loader';
import {timeAgoFromPosting} from '@/utils/timeAgoFromPosting';

const JobFeatured1 = () => {
	const {data, isLoading} = useGetJobsQuery();
	//reverse the order of the array to show the latest job first and get featured jobs
	const jobs = data?.filter((job) => job.featured === true).reverse();
	if (isLoading) return <Loader />;
	return (
		<>
			{jobs.slice(0, 6).map((item) => {
				const time = timeAgoFromPosting(item.created_at);
				return (
					<div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.job_id}>
						<div className="inner-box">
							<div className="content">
								<span className="company-logo">
									<Image
										width={50}
										height={49}
										src={item.employer.user.photo || '/images/resource/company-logo/1-1.png'}
										alt="item brand"
										className="rounded-md"
									/>
								</span>
								<h4>
									<a href="#">{item.title}</a>
								</h4>

								<ul className="job-info">
									<li>
										<span className="icon flaticon-briefcase"></span>
										{item.employer.company_name}
									</li>
									{/* compnay info */}
									<li>
										<span className="icon flaticon-map-locator"></span>
										{item.country === 'United Kingdom'
											? 'UK'
											: item.country === 'United States'
											? 'USA'
											: item.country}
									</li>
									{/* location info */}
									<li>
										<span className="icon flaticon-clock-3"></span> {time}
									</li>
									{/* time info */}
									<li>
										<span className="icon flaticon-money"></span> $ {item.salary_range}
									</li>
									{/* salary info */}
								</ul>
								{/* End .job-info */}

								<ul className="job-other-info">
									<li className={`time capitalize`}>{item.job_type}</li>
									{item?.tags?.slice(0, 3)?.map((val, i) => (
										<li key={i} className={`privacy capitalize`}>
											{val}
										</li>
									))}
								</ul>
								{/* End .job-other-info */}

								<button className="bookmark-btn">
									<span className="flaticon-bookmark"></span>
								</button>
							</div>
						</div>
					</div>
				);
				// End job-block
			})}
		</>
	);
};

export default JobFeatured1;
