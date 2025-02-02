'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import DashboardEmployerSidebar from '../../../header/DashboardEmployerSidebar';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import DashboardEmployersHeader from '@/components/header/DashboardEmployersHeader';
import {useSelector} from 'react-redux';
import Feedback from '@/components/feedback/Feedback';

const Index = () => {
	const user = useSelector((state) => state.user);
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
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title={`Welcome ${user?.name}`} />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className="col-lg-12">
							{/* <!-- Ls widget --> */}
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Post Job</h4>
									</div>

									<div className="widget-content">
										<Feedback />
										{/* End post box form */}
									</div>
								</div>
							</div>
						</div>
					</div>
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

export default Index;
