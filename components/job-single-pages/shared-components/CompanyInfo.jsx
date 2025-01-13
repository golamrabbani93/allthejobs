import Social from '../social/Social';

const CompanyInfo = ({job}) => {
	return (
		<ul className="company-info">
			<li>
				Phone: <span>{job?.employer.user.phone}</span>
			</li>
			<li>
				Email: <span>{job?.employer.user.email}</span>
			</li>
			<li>
				Location:{' '}
				<span>
					{job?.employer?.city},
					{job?.employer?.country === 'United States'
						? 'USA'
						: job?.employer?.country
						? job?.employer?.country === 'United Kingdom'
							? 'UK'
							: job?.employer?.country
						: ''}
				</span>
			</li>
			<li>
				Social media:
				<Social />
			</li>
		</ul>
	);
};

export default CompanyInfo;
