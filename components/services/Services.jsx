import blogContent from '../../data/blogs';
import Image from 'next/image';

const Services = () => {
	return (
		<>
			{blogContent.slice(0, 4).map((item) => (
				<div className="news-block col-lg-3 col-md-6 col-sm-12" key={item.id}>
					<div className="inner-box">
						<div className="image-box">
							<figure className="image">
								<Image
									width={391}
									height={258}
									layout="responsive"
									src={item.img}
									alt="blog post"
								/>
							</figure>
						</div>
						<div className="lower-content">
							<h3>{item.title}</h3>
							<button
								// href={`/candidates-single-v1/${candidate.id}`}
								className="theme-btn btn-style-one mt-2"
								style={{
									width: '100%',
								}}
							>
								<span className="btn-title">COMING SOON</span>
							</button>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Services;
