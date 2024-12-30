import MobileMenu from '../../../header/MobileMenu';
import DashboardCandidatesSidebar from '../../../header/DashboardCandidatesSidebar';
import BreadCrumb from '../../BreadCrumb';
import SocialNetworkBox from './components/SocialNetworkBox';
import ContactInfoBox from './components/ContactInfoBox';
import CopyrightFooter from '../../CopyrightFooter';
import DashboardCandidatesHeader from '../../../header/DashboardCandidatesHeader';
import MenuToggler from '../../MenuToggler';
import MyProfile from './components/my-profile/MyProfile';
import MyDetailsProfile from './components/my-profile/MyDetailsProfile';
import EducationDetails from './components/my-profile/EducationDetails';
import ExperienceDetails from './components/my-profile/ExperienceDetails';

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
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>My Additional Details</h4>
									</div>
									<MyDetailsProfile />
								</div>
							</div>
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Add Education Details</h4>
									</div>
									<EducationDetails />
								</div>
							</div>
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Add Work & Experience</h4>
									</div>
									<ExperienceDetails />
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
