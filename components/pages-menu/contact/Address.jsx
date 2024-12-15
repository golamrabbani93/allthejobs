import Image from 'next/image';

const Address = () => {
	const addressContent = [
		{
			id: 1,
			iconName: 'placeholder',
			title: 'Address',
			text: (
				<>
					27 Longview Court, Saint John,
					<br />
					NB E2J 4N2, Canada
				</>
			),
		},
		{
			id: 2,
			iconName: 'smartphone',
			title: 'Call Us',
			text: (
				<>
					<a href="tel:+1 506 899 3939" className="phone">
						+1 506 899 3939
					</a>
				</>
			),
		},
		{
			id: 3,
			iconName: 'letter',
			title: 'Email',
			text: (
				<>
					{' '}
					<a href="#">hello@allthejobs.ca</a>
				</>
			),
		},
	];
	return (
		<>
			{addressContent.map((item) => (
				<div className="contact-block col-lg-4 col-md-6 col-sm-12" key={item.id}>
					<div className="inner-box">
						<span className="icon">
							<Image width={51} height={51} src={`/images/icons/${item.iconName}.svg`} alt="icon" />
						</span>
						<h4>{item.title}</h4>
						<p>{item.text}</p>
					</div>
				</div>
			))}
		</>
	);
};

export default Address;
