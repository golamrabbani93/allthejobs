import {useSelector} from 'react-redux';

const WidgetTopFilterBox = ({setSelectJob}) => {
	const {jobs, userRoleBasedData, loading} = useSelector((state) => state.data);
	const myJobs = jobs.filter((job) => job.employer_id === userRoleBasedData.employer_id);

	const handleSelectJob = (e) => {
		const jobId = e.target.value;
		const selectedJob = myJobs.find((job) => job.job_id === Number(jobId));
		setSelectJob(selectedJob);
	};
	return (
		<div className="chosen-outer">
			<select
				disabled={loading}
				onClick={(e) => handleSelectJob(e)}
				className="chosen-single form-select chosen-container"
			>
				<option>Select Jobs</option>
				{myJobs.map((job) => (
					<option key={job.employer_id} value={job.job_id}>
						{job.title}
					</option>
				))}
			</select>
			{/* <!--Tabs Box--> */}

			{/* <select className="chosen-single form-select chosen-container">
        <option>All Status</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 year</option>
      </select> */}
			{/* <!--Tabs Box--> */}
		</div>
	);
};

export default WidgetTopFilterBox;
