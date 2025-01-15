import Link from 'next/link';

const SinglePricingTable = ({item}) => {
	return (
		<div className="pricing-table">
			<div className="head">
				{item?.name === 'Premium Package' && <span>Best Deal</span>}
				<h4 className="title">{item?.name}</h4>
			</div>

			<div className="content">
				<div className="price">
					<h1>
						<i className="fa fa-dollar-sign"></i>
						{item?.price}
					</h1>
				</div>

				<ul>
					{item?.features.map((feature, i) => (
						<li key={i}>
							<span>{feature}</span>
						</li>
					))}
				</ul>

				<div className={`buy-now ${item?.name === 'Basic' ? 'mt-[114px]' : ''}`}>
					<Link href={`/payment/${item?.package_id}`} className="btn round">
						Buy Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SinglePricingTable;
