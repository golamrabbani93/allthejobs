'use client';

import Image from 'next/image';
import testimonilaContent from '../../data/testimonial';
import Slider from 'react-slick';

const Testimonial2 = () => {
	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		fade: true,
	};

	return (
		<>
			<Slider {...settings} arrows={false}>
				{testimonilaContent.map((item) => (
					<div className="testimonial-block-two" key={item.id}>
						<div className="inner-box">
							<div className="thumb">
								<Image width={70} height={70} src={item.avatar} alt="testimonial" />
							</div>
							<h4 className="title">{item.feedback}</h4>
							<div className="text">{item.feedbackText}</div>
							<div className="info-box">
								<h4 className="name">{item.name}</h4>
								<span className="designation">{item.designation}</span>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</>
	);
};

export default Testimonial2;
