'use client';

import {useSelector} from 'react-redux';
import jobs from '../../../../../data/job-featured.js';

import SingleJob from './SingleJob.jsx';
import Spinner from '@/components/Sppiner/Spinner.jsx';

const JobAlertsTable = () => {
	//get all jobs from store
	const {jobs: allJobs, userRoleBasedData, loading} = useSelector((state) => state.data);
	//get matched jobs by user skills
	const matchedJobs = allJobs.filter((job) => {
		const jobSkills = job.skills_required.map((skill) => skill.toLowerCase());
		const userSkills = userRoleBasedData.skills.map((skill) => skill.toLowerCase());
		return userSkills.some((skill) => jobSkills.includes(skill));
	});
	if (loading || !allJobs)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<>
			{matchedJobs.length > 0 ? (
				<div className="tabs-box">
					<div className="widget-title">
						<h4>Matched Jobs</h4>
					</div>
					<div className="widget-content">
						<div className="table-outer">
							<table className="default-table manage-job-table">
								<thead>
									<tr>
										<th>Job Title</th>
										<th>Job Type</th>
										<th>Posted Date</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{matchedJobs.map((job) => (
										<SingleJob key={job.id} item={job} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			) : (
				<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
					<span className="text-black"> No Matched Jobs Found !</span>
				</div>
			)}
		</>
	);
};

export default JobAlertsTable;
