import MobileMenu from '../../../header/MobileMenu';
import DashboardHeader from '../../../header/DashboardHeader';
import LoginPopup from '../../../common/form/login/LoginPopup';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import DashboardEmployersHeader from '@/components/header/DashboardEmployersHeader';
import MyProfile from './components/my-profile/MyProfile';
import DashboardConsultantSidebar from '@/components/header/DashboardConsultantSidebar';
import MyDetailsProfile from './components/my-profile/MyDetailsProfile';
import ExperienceDetails from './components/my-profile/ExperienceDetails';
import EducationDetails from './components/my-profile/EducationDetails';
import AwardDetails from './components/my-profile/AwardDetails';

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

			<DashboardConsultantSidebar />
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title="Company Profile!" />
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

							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>My Additional details</h4>
									</div>
									{/* End .widget-title */}
									<div className="widget-content">
										<MyDetailsProfile />
									</div>
								</div>
							</div>
							{/* <!-- Ls widget --> */}

							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Experience Information</h4>
									</div>
									{/* End .widget-title */}

									<div className="widget-content">
										<ExperienceDetails />
									</div>
								</div>
							</div>
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Education Information</h4>
									</div>
									{/* End .widget-title */}
									<div className="widget-content">
										<EducationDetails />
									</div>
								</div>
							</div>
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Award Information</h4>
									</div>
									{/* End .widget-title */}
									<div className="widget-content">
										<AwardDetails />
									</div>
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
