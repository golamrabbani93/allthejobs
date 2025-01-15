import './PricingTable.css';

const PricingTable = () => {
	return (
		<div class="wrapper-pricing-table">
			<div class="pricing-table">
				<div class="head">
					<h4 class="title">Basic</h4>
				</div>
				<div class="content">
					<div class="price">
						<h1>
							<i class="fa fa-dollar-sign"></i>15
						</h1>
					</div>

					<ul>
						<li>One Selected Template</li>
						<li>100% Responsive Design</li>
						<li>Free Cancelation</li>
						<li>10 accounts</li>
						<li>24/7 Support</li>
						<li>Lifetime Template Updates</li>
					</ul>

					<div class="buy-now">
						<a href="#" class="btn round">
							Buy Now
						</a>
					</div>
				</div>
			</div>

			<div class="pricing-table">
				<div class="head">
					<h4 class="title">Standard</h4>
				</div>
				<div class="content">
					<div class="price">
						<h1>
							<i class="fa fa-dollar-sign"></i>30
						</h1>
					</div>

					<ul>
						<li>One Selected Template</li>
						<li>100% Responsive Design</li>
						<li>Free Cancelation</li>
						<li>10 accounts</li>
						<li>24/7 Support</li>
						<li>Lifetime Template Updates</li>
					</ul>

					<div class="buy-now">
						<a href="#" class="btn round">
							Buy Now
						</a>
					</div>
				</div>
			</div>

			<div class="pricing-table">
				<div class="head">
					<span>Popular</span>
					<h4 class="title">Premium</h4>
				</div>
				<div class="content">
					<div class="price">
						<h1>
							<i class="fa fa-dollar-sign"></i>50
						</h1>
					</div>

					<ul>
						<li>Template</li>
						<li>100% Responsive Design</li>
						<li>Free Cancelation</li>
						<li>10 accounts</li>
						<li>24/7 Support</li>
						<li>Lifetime Template Updates</li>
					</ul>

					<div class="buy-now">
						<a href="#" class="btn round">
							Buy Now
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricingTable;
