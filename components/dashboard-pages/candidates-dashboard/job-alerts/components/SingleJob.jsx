import Link from 'next/link.js';
import Image from 'next/image.js';
import {useRouter} from 'next/navigation';

const SingleJob = ({item}) => {
	const router = useRouter();
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
							<button onClick={() => router.push(`/jobs/${item.job_id}`)} data-text="View Job">
								<span className="la la-eye"></span>
							</button>
						</li>
						<li>
							<button data-text="Apply Job">
								<span className="la la-check"></span>
							</button>
						</li>
					</ul>
				</div>
			</td>
		</tr>
	);
};

export default SingleJob;
