import Link from 'next/link.js';
import Image from 'next/image.js';

const SingleJob = ({item}) => {
	return (
		<tr>
			<td>
				{/* <!-- Job Block --> */}
				<div className="job-block">
					<div className="inner-box">
						<div className="content">
							<span className="company-logo">
								<Image width={50} height={49} src={item.logo} alt="logo" />
							</span>
							<h4>
								<Link href={`/job-single-v3/${item.id}`}>{item.jobTitle}</Link>
							</h4>
							<ul className="job-info">
								<li>
									<span className="icon flaticon-briefcase"></span>
									Segment
								</li>
								<li>
									<span className="icon flaticon-map-locator"></span>
									London, UK
								</li>
							</ul>
						</div>
					</div>
				</div>
			</td>
			<td>Human Resources, Junior</td>
			<td>Nov 12, 2021 </td>
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
