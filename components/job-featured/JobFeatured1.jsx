'use client';

import Link from 'next/link';
import jobFeatured from '../../data/job-featured';
import Image from 'next/image';

import {timeAgoFromPosting} from '@/utils/timeAgoFromPosting';
import Loader from '../Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
	addJobToWishlist,
	removeJobFromWishlist,
} from '@/features/wishlistJobsSlice/wishlistJobsSlice';

const JobFeatured1 = () => {
	const wishListJobs = useSelector((state) => state.wishlistJobs.wishlist);
	const dispatch = useDispatch();
	//get all jobs from the store
	const {jobs: data, loading} = useSelector((state) => state.data);
	//reverse the order of the array to show the latest job first and get featured jobs
	const jobs = data?.filter((job) => job.featured === true).reverse();
	if (loading) return <Loader />;
	return (
		<>
			{jobs.slice(0, 6).map((item) => {
				const time = timeAgoFromPosting(item.created_at);
				const isWishListJob = wishListJobs.find((wishItem) => wishItem.job_id === item.job_id);
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
									<Link href={`/jobs/${item.job_id}`}>{item.title}</Link>
								</h4>

								<ul className="job-info">
									<li>
										<span className="icon flaticon-briefcase"></span>
										{item.employer.company_name}
									</li>
									{/* compnay info */}
									<li>
										<span className="icon flaticon-map-locator"></span>
										{item.employer.country === 'United Kingdom'
											? 'UK'
											: item.employer.country === 'United States'
											? 'USA'
											: item.employer.country}
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

								{isWishListJob ? (
									<button
										onClick={() => dispatch(removeJobFromWishlist(item))}
										className="bookmark-btn "
									>
										<span className="fa fa-bookmark"></span>
									</button>
								) : (
									<button onClick={() => dispatch(addJobToWishlist(item))} className="bookmark-btn">
										<span className="flaticon-bookmark"></span>
									</button>
								)}
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
