import MobileMenu from '../../../header/MobileMenu';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import MyProfile from './components/my-profile/MyProfile';
import DashboardAdminHeader from '@/components/header/DashboardAdminHeader';
import DashboardAdminSidebar from '@/components/header/DashboardAdminSidebar';

const index = () => {
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<DashboardAdminHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardAdminSidebar />
			{/* <!-- End Candidates Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title="My Profile!" />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className="col-lg-12">
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>My Profile</h4>
									</div>
									<MyProfile />
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
