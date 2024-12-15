import Image from 'next/image';
import Link from 'next/link';

const RegBanner = () => {
	const regBannerContent = [
		{
			id: 2,
			bgImage: `url("/images/job-seeker.png")`,
			name: 'Job Seeker',
			text: `Driven, adaptable professional eager to contribute skills and grow in a dynamic work environment.`,
			avatar: '/images/resource/candidate.png',
			bannerClass: 'banner-style-one',
			width: '100',
			height: '120',
		},

		{
			id: 1,
			bgImage: `url("/images/employee.png")`,
			name: 'Employer',
			text: `Innovative employer committed to fostering growth, collaboration, and providing opportunities for success.`,
			avatar: '/images/resource/employ.png',
			bannerClass: 'banner-style-one',
			width: '100',
			height: '120',
		},
		{
			id: 3,
			bgImage: `url("/images/consultant.png")`,
			name: 'Consultant',
			text: `Experienced consultant offering strategic solutions to drive growth, efficiency, and business success.`,
			avatar: '/images/consultant-front.png',
			bannerClass: 'banner-style-one',
			width: '100',
			height: '120',
		},
	];
	return (
		<>
			{regBannerContent.map((item) => (
				<div className={`${item.bannerClass} -type-2 col-lg-4 col-md-12 col-sm-12`} key={item.id}>
					<div
						className="inner-box"
						style={{
							backgroundImage: item.bgImage,
						}}
					>
						<div className="content">
							<h3>{item.name}</h3>
							<p className="text-justify">{item.text}</p>
							<Link href="/register" className="theme-btn btn-style-five">
								Register Account
							</Link>
						</div>
						<figure className="image">
							<Image width={item.width} height={item.height} src={item.avatar} alt="resource" />
						</figure>
					</div>
				</div>
			))}
		</>
	);
};

export default RegBanner;
