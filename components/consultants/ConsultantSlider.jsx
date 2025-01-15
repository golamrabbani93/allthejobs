'use client';

import Slider from 'react-slick';
import Image from 'next/image';
const ConsultantSlider = () => {
	const images = [
		{src: '/images/consultants/consultant-1.png', alt: 'consultant-1'},
		{src: '/images/consultants/consultant-2.png', alt: 'consultant-2'},
		{src: '/images/consultants/consultant-3.png', alt: 'consultant-3'},
		{src: '/images/consultants/consultant-4.png', alt: 'consultant-4'},
		{src: '/images/consultants/consultant-5.png', alt: 'consultant-5'},
		{src: '/images/consultants/consultant-6.png', alt: 'consultant-6'},
		{src: '/images/consultants/consultant-7.png', alt: 'consultant-7'},
		{src: '/images/consultants/consultant-8.png', alt: 'consultant-8'},
	];

	// Settings
	const settings = {
		dots: false,
		speed: 1200,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		cssEase: 'linear',
		pauseOnHover: false,
		pauseOnFocus: false,
		pauseOnDotsHover: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 4000,
	};

	return (
		<>
			<Slider {...settings} arrows={false}>
				{images.map((img, i) => (
					<Image
						key={i}
						src={img.src} // Replace with your image path
						alt={img.alt}
						width={700}
						height={400}
						className="img-fluid"
					/>
				))}
			</Slider>
		</>
	);
};

export default ConsultantSlider;
