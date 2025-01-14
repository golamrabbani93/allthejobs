'use client';

import {useSelector} from 'react-redux';
import Spinner from '@/components/Sppiner/Spinner';
import {useGetJobsQuery} from '@/features/job/job.management.api.js';
import SingleJob from './SingleJob';

const JobListingsTable = () => {
	const {data: jobs, isFetching} = useGetJobsQuery();
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const myJobs = jobs?.filter((job) => job?.employer_id === userRoleBasedData?.employer_id);
	if (isFetching || loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="tabs-box">
			<div className="widget-title">
				<h4>My Job Listings</h4>

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
				<div className="table-outer">
					<table className="default-table manage-job-table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Applications</th>
								<th>Created & Expired</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{myJobs?.length > 0 ? (
								myJobs?.map((item) => <SingleJob key={item.job_id} item={item} />)
							) : (
								<tr>
									<td colSpan="5">No job listings found</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* End table widget content */}
		</div>
	);
};

export default JobListingsTable;
