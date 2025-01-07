import Image from 'next/image';

const Consultants = () => {
	const features = [
		{
			id: 1,
			icon: 'https://mamtaz.com/desFour/images/appointment.svg', // Replace with your icon path
			title: 'Book Appointment',
		},
		{
			id: 2,
			icon: 'https://mamtaz.com/desFour/images/development.svg', // Replace with your icon path
			title: 'Skill Development',
		},
		{
			id: 3,
			icon: 'https://mamtaz.com/desFour/images/assistance.svg', // Replace with your icon path
			title: 'Hiring Assistance',
		},
	];

	return (
		<section className="container py-5 ">
			<div className="row align-items-center">
				{/* Text Section */}
				<div className="col-lg-8 mb-4 mb-lg-0">
					<div className="consultant-content">
						<h3 className="mb-4 career-text">
							Excited to start your{' '}
							<span className="text-warning" style={{color: 'orange ', fontWeight: 'bold'}}>
								Career?
							</span>{' '}
							Let our
							<br />
							<img
								src="https://mamtaz.com/desFour/images/pic2.svg"
								alt="Consultants"
								style={{marginTop: '10px', verticalAlign: 'middle'}}
							/>
							<span style={{display: 'inline-block', marginTop: '10px', marginLeft: '10px'}}>
								guide you to your first job.
							</span>
						</h3>
						<p className="text-muted mt-3 text-lg-start text-justify">
							By just clicking a button, you can connect with thousands of job opportunities
							tailored to your skills and preferences. Our expert consultants will provide you with
							the training you need to secure your ideal job.
						</p>
					</div>

					{/* Features Section */}
					<div className="row mt-5 ">
						{features.map((feature) => (
							<div className="col-lg-4 col-md-6 mb-4 consult" key={feature.id}>
								<div className="d-flex align-items-center p-3 rounded shadow bg-white">
									<div className="me-3">
										<Image
											src={feature.icon}
											alt={feature.title}
											width={60}
											height={60}
											className="img-fluid"
										/>
									</div>
									<h5 className="mb-0">
										{feature.title === 'Hiring Assistance' ? (
											<span>
												Hiring
												<br />
												Assistance
											</span>
										) : (
											feature.title
										)}
									</h5>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Image Section */}
				<div className="col-lg-4 text-center">
					<Image
						src="/images/consultants/consultant-5.png" // Replace with your image path
						alt="Consultants Illustration"
						width={700}
						height={400}
						className="img-fluid"
					/>
				</div>
			</div>
		</section>
	);
};

export default Consultants;
