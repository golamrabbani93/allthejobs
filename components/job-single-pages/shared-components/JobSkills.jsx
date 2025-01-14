const JobSkills = ({job}) => {
	return (
		<ul className="job-skills">
			{job?.skills_required.map((skill, i) => (
				<li key={i}>
					<a href="#">{skill}</a>
				</li>
			))}
		</ul>
	);
};

export default JobSkills;
