const JobDetailsDescriptions = ({job}) => {
	return (
		<div className="job-detail">
			<h4>Job Description</h4>
			<p>{job?.description}</p>
			<h4>Key Responsibilities</h4>
			<ul className="list-style-three">
				{job?.responsibilities.map((item, index) => (
					<li key={index}>{item}.</li>
				))}
			</ul>
			<h4>Education Requirement</h4>
			<p>{job?.education_requirements}.</p>
			<h4>Skill Required</h4>
			<ul className="d-flex flex-wrap">
				{job?.skills_required.map((item, index) => (
					<li className="mx-2 capitalize" key={index}>
						*{item}*
					</li>
				))}{' '}
			</ul>
			<ul className="list-style-three"></ul>
			<h4>Benefits</h4>
			<ul className="list-style-three">
				{job?.benefits.map((item, index) => (
					<li key={index}>{item}.</li>
				))}
			</ul>
			<h4>Application Instruction</h4>
			<p>**{job?.application_instruction}**</p>
		</div>
	);
};

export default JobDetailsDescriptions;
