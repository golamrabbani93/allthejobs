'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import DashboardEmployerSidebar from '../../../header/DashboardEmployerSidebar';
import BreadCrumb from '../../BreadCrumb';
import TopCardBlock from './components/TopCardBlock';
import ProfileChart from './components/ProfileChart';
import Notification from './components/Notification';
import Applicants from './components/Applicants';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import DashboardEmployersHeader from '@/components/header/DashboardEmployersHeader';
import {useSelector} from 'react-redux';
import DashboardConsultantSidebar from '@/components/header/DashboardConsultantSidebar';

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

			<DashboardConsultantSidebar />
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title={`Welcome ${user?.name}`} />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="h-screen">
						<div className="row">
							<TopCardBlock />
						</div>
					</div>
					{/* End .row top card block */}
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
