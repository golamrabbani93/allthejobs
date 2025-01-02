'use client';

import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';
import {useGetAllConsultantsQuery} from '@/features/consultant/consultant.management.api';
import Loader from '../Loader/Loader';

const ConsultantList = () => {
	// get all Consultants
	const {data, isLoading} = useGetAllConsultantsQuery();
	// reverse the order of the array to show the latest consultant first
	const consultants = data?.map((consultant) => consultant).reverse();
	console.log('🚀🚀: ConsultantList -> consultants', consultants);

	// Settings
	const settings = {
		dots: true,
		speed: 1400,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	if (isLoading) return <Loader />;

	return (
		<>
			<Slider {...settings} arrows={false}>
				{consultants?.slice(0, 12).map((consultant) => (
					<div className="candidate-block" key={consultant.consultant_id}>
						<div className="inner-box">
							<figure className="image">
								<Image
									width={250}
									height={250}
									src={consultant.user.photo || '/images/common-avatar.jpeg'}
									alt="avatar"
								/>
							</figure>
							<h4 className="name">{consultant.user.name}</h4>
							<span className="designation">{consultant.headline}</span>
							<div className="location">
								<i className="flaticon-map-locator"></i> {consultant.country}
							</div>
							<button
								href={`/candidates-single-v1/${consultant.id}`}
								className="theme-btn btn-style-three"
							>
								<span className="btn-title">View Profile</span>
							</button>
						</div>
					</div>
				))}
			</Slider>
		</>
	);
};

export default ConsultantList;
