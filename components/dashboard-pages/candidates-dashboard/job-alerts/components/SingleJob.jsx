import Link from 'next/link.js';
import Image from 'next/image.js';
import {format} from 'date-fns';

const SingleJob = ({item}) => {
	console.log('🚀🚀: SingleJob -> item', item);
	const startDate = format(new Date(item.created_at), 'dd MMMM yyyy');
	return (
		<tr>
			<td>
				{/* <!-- Job Block --> */}
				<div className="job-block">
					<div className="inner-box">
						<div className="content">
							<span className="company-logo">
								<Image width={50} height={49} src={item.employer.user.photo} alt="logo" />
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
			<td>{item.job_type}</td>
			<td>${item.salary_range}</td>
			<td className="text-center">{item.ap_deadline}</td>
			<td>
				<div className="option-box">
					<ul className="option-list">
						<li>
							<button data-text="View Aplication">
								<span className="la la-eye"></span>
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
};

export default SingleJob;
