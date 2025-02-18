import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import PricingTable from './components/PricingTable';
import DashboardEmployersHeader from '@/components/header/DashboardEmployersHeader';
import DashboardEmployerSidebar from '@/components/header/DashboardEmployerSidebar';

const index = () => {
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DashboardEmployersHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardEmployerSidebar />
			{/* <!-- End Candidates Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title="Packages!" />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className="col-lg-12">
							<div className="ls-widget">
								<div className="tabs-box">
									{/* End widget-title */}

									<div className="widget-content">
										<div className="table-outer">
											<PricingTable />
										</div>
									</div>
									{/* End widget-content */}
								</div>
							</div>
							{/* <!-- Ls widget --> */}
						</div>
					</div>
					{/* End .row */}
				</div>
				{/* End dashboard-outer */}
			</section>
			{/* <!-- End Dashboard --> */}

			<CopyrightFooter />
			{/* <!-- End Copyright --> */}
		</div>
		// End page-wrapper
	);
};

export default index;
