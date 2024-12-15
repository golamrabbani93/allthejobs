import Image from 'next/image';

const ImgBox = () => {
	const imgContent = [
		{
			id: 1,
			block: [{img: 'Rectangle 1'}],
		},
		{
			id: 2,
			block: [{img: 'Rectangle 2'}, {img: 'Rectangle 3'}],
		},
		{
			id: 3,
			block: [{img: 'Rectangle 4'}, {img: 'Rectangle 5'}],
		},
		{
			id: 4,
			block: [{img: 'Rectangle 6'}],
		},
	];

	return (
		<div className="images-box">
			<div className="row">
				{imgContent.map((item) => (
					<div className="column col-lg-3 col-md-6 col-sm-6" key={item.id}>
						{item.block.map((itemImg, i) => (
							<figure className="image" key={i}>
								<Image
									src={`/images/about/${itemImg.img}.png`}
									alt="about image"
									width={300}
									height={200}
								/>
							</figure>
						))}
					</div>
				))}
				{/* End .col */}
			</div>
		</div>
	);
};

export default ImgBox;
