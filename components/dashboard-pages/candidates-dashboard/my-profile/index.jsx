import MobileMenu from '../../../header/MobileMenu';
import DashboardCandidatesSidebar from '../../../header/DashboardCandidatesSidebar';
import BreadCrumb from '../../BreadCrumb';
import SocialNetworkBox from './components/SocialNetworkBox';
import ContactInfoBox from './components/ContactInfoBox';
import CopyrightFooter from '../../CopyrightFooter';
import DashboardCandidatesHeader from '../../../header/DashboardCandidatesHeader';
import MenuToggler from '../../MenuToggler';
import MyProfile from './components/my-profile/MyProfile';

const index = () => {
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<DashboardCandidatesHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardCandidatesSidebar />
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

							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Social Network</h4>
									</div>
									{/* End widget-title */}

									<div className="widget-content">
										<SocialNetworkBox />
									</div>
								</div>
							</div>
							{/* <!-- Ls widget --> */}

							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Contact Information</h4>
									</div>
									{/* End widget-title */}
									<div className="widget-content">
										<ContactInfoBox />
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
