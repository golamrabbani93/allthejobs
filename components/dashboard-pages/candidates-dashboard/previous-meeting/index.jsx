import MobileMenu from '../../../header/MobileMenu';
import DashboardCandidatesSidebar from '../../../header/DashboardCandidatesSidebar';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import DashboardCandidatesHeader from '../../../header/DashboardCandidatesHeader';
import MenuToggler from '../../MenuToggler';
import MyProfile from './components/my-profile/MyProfile';
import MyDetailsProfile from './components/my-profile/MyDetailsProfile';
import EducationDetails from './components/my-profile/EducationDetails';
import ExperienceDetails from './components/my-profile/ExperienceDetails';
import AwardDetails from './components/my-profile/AwardDetails';
import CallList from '@/app/(others)/video-chat3/Components/CallList';

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
					<BreadCrumb title="Your Completed Meetings" />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<CallList type={"previous"}></CallList>
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
