'use client';

import Link from 'next/link';
import Image from 'next/image.js';
import {useUpdateJobsMutation} from '@/features/job/job.management.api';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';
import Spinner from '@/components/Sppiner/Spinner';

const SingleJob = ({item}) => {
	const router = useRouter();
	const [updateJob, {isLoading}] = useUpdateJobsMutation();
	//handle update job status
	const handleUpdateJobStatus = (job) => {
		if (job.is_open) {
			const payload = {...job, is_open: false};
			updateJob(payload);
		} else {
			const payload = {...job, is_open: true};
			updateJob(payload);
		}
	};
	//convert date to human readable format
	const startDate = format(new Date(item.created_at), 'dd MMMM yyyy');
	return (
		<tr key={item.job_id}>
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
			<td className="applied">
				<a href="#">
					{item.total_applicats > 0
						? `${item.total_applicats}+ Applied`
						: `${item.total_applicats} Applied`}
				</a>
			</td>
			<td className="text-center">
				{startDate} <br />
				&
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
										router.push(`/dashboard/employer/manage-jobs/update/${item.job_id}`)
									}
									className="la la-pencil"
								></span>
							</button>
						</li>
						<li>
							{isLoading ? (
								<button data-text="Loading...">
									<span className="la la-spinner la-spin"></span>
								</button>
							) : item.is_open ? (
								<button onClick={() => handleUpdateJobStatus(item)} data-text="Deactivate Job">
									<span className="la la-times"></span>
								</button>
							) : (
								<button onClick={() => handleUpdateJobStatus(item)} data-text="Activate Job">
									<span className="la la-check"></span>
								</button>
							)}
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
