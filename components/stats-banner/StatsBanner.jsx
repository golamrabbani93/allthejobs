import Image from 'next/image';

const StatsBanner = () => {
	const statsContent = [
		{
			id: 1,
			icon: '/images/icons/liveJob.svg',
			value: '1,75,324',
			label: 'Live Jobs',
			bannerClass: '',
		},
		{
			id: 2,
			icon: '/images/icons/companies.svg',
			value: '97,354',
			label: 'Companies',
		},
		{
			id: 3,
			icon: '/images/icons/candidates.svg',
			value: '38,47,154',
			label: 'Candidates',
		},
		{
			id: 4,
			icon: '	/images/icons/companies.svg',
			value: '7,532',
			label: 'New Jobs',
		},
	];

	return (
		<div className="row gy-4 pt-4 m-auto  d-flex justify-content-center">
			{statsContent.map((stat) => (
				<div
					className={`col-lg-3 col-md-6 col-sm-12 stats mx-3`}
					key={stat.id}
					style={{
						width: '250px',
					}}
				>
					<div className={`d-flex align-items-center p-2 rounded shadow-lg ${stat.bannerClass}`}>
						<div
							className="rounded-circle d-flex justify-content-center align-items-center p-1"
							style={{
								width: '55px',
								height: '50px',
							}}
						>
							<Image width={55} height={50} src={stat.icon} alt={`${stat.label} Icon`} />
						</div>
						<div className="ms-3">
							<h5 className="mb-0">{stat.value}</h5>
							<small>{stat.label}</small>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default StatsBanner;
