import {timeAgoFromPosting} from '@/utils/timeAgoFromPosting';

const JobOverView = ({job}) => {
	return (
		<div className="widget-content">
			<ul className="job-overview">
				<li>
					<i className="icon icon-calendar"></i>
					<h5>Date Posted:</h5>
					<span>{timeAgoFromPosting(job?.created_at)}</span>
				</li>
				<li>
					<i className="icon icon-expiry"></i>
					<h5>Expiration date:</h5>
					<span>{job?.ap_deadline}</span>
				</li>
				<li>
					<i className="icon icon-location"></i>
					<h5>Location:</h5>
					<span>
						{job?.employer?.city},
						{job?.employer?.country === 'United States'
							? 'USA'
							: job?.employer?.country
							? job?.employer?.country === 'United Kingdom'
								? 'UK'
								: job?.employer?.country
							: ''}
					</span>
				</li>
				<li>
					<i className="icon icon-user-2"></i>
					<h5>Job Title:</h5>
					<span>{job.title}</span>
				</li>
				{/* <li>
					<i className="icon icon-clock"></i>
					<h5>Hours:</h5>
					<span>50h / week</span>
				</li> */}
				{/* <li>
					<i className="icon icon-rate"></i>
					<h5>Rate:</h5>
					<span>$15 - $25 / hour</span>
				</li> */}
				<li>
					<i className="icon icon-salary"></i>
					<h5>Salary:</h5>
					<span>$ {job?.salary_range}</span>
				</li>
			</ul>
		</div>
	);
};

export default JobOverView;
