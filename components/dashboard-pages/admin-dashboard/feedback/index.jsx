'use client';

import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import {useSelector} from 'react-redux';
import DashboardAdminSidebar from '@/components/header/DashboardAdminSidebar';
import DashboardAdminHeader from '@/components/header/DashboardAdminHeader';
import Feedback from './components/Feedback';

const Index = () => {
	const {chatSidebar} = useSelector((state) => state.toggle);

	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DashboardAdminHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardAdminSidebar />
			{/* <!-- End Candidates Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title="All Feedbacks!" />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className={`col-lg-12 ${chatSidebar ? 'active-chat-contacts' : ''}`}>
							<div className="chat-widget">
								<div className="widget-content">
									<Feedback />
								</div>
							</div>
							{/* <!-- Chat Widget --> */}
						</div>
					</div>
					{/* End row */}
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
