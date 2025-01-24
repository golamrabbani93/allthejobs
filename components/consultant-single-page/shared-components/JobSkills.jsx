const JobSkills = ({skills}) => {
	return (
		<ul className="job-skills">
			{skills?.map((skill, i) => (
				<li key={i}>
					<a href="#">{skill}</a>
				</li>
			))}
		</ul>
	);
};

export default JobSkills;
