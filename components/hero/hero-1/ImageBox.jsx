import Image from 'next/image';

const ImageBox = () => {
	return (
		<div className="image-box">
			<figure className="main-image" data-aos="fade-in" data-aos-delay="500">
				<Image
					width={486}
					height={589}
					layout="responsive"
					// src="/images/resource/banner-img-1.webp"
					src="https://mamtaz.com/desFour/images/hero3.png"
					alt="hero image"
				/>
			</figure>
			{/* hero image */}
			{/* <!-- Info BLock One --> */}
			<div className="info_block" data-aos="fade-in" data-aos-delay="1000">
				<span className="icon">
					<Image width={40} height={40} src="/images/video-icon.png" alt="mulit people" />
				</span>
				<p>
					Meet With Our <br />
					HR Professionals.
				</p>
			</div>
			{/* <!-- Info BLock Four --> */}
			<div className="info_block_four" data-aos="fade-in" data-aos-delay="2500">
				<span className="icon flaticon-file"></span>
				<div className="inner">
					<p>Upload Your CV</p>
					<span className="sub-text">It only takes a few seconds</span>
				</div>
			</div>
		</div>
	);
};

export default ImageBox;
