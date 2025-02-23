'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import BreadCrumb from '../../BreadCrumb';
import TopCardBlock from './components/TopCardBlock';
import CopyrightFooter from '../../CopyrightFooter';
import JobApplied from './components/JobApplied';
import MenuToggler from '../../MenuToggler';
import {useSelector} from 'react-redux';
import DashboardAdminHeader from '@/components/header/DashboardAdminHeader';
import DashboardAdminSidebar from '@/components/header/DashboardAdminSidebar';

const Index = () => {
	const user = useSelector((state) => state.user);
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
					<BreadCrumb title={`Howdy, ${user.name}`} />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<TopCardBlock />
					</div>
					{/* End .row top card block */}
					{/* <AdminPanel></AdminPanel> */}

					<div className="col-lg-12">
						{/* <!-- applicants Widget --> */}
						<div className="applicants-widget ls-widget">
							<div className="widget-title">
								<h4>Jobs Applied Recently</h4>
							</div>
							<div className="widget-content">
								<div className="row">
									{/* <!-- Candidate block three --> */}

									<JobApplied />
								</div>
							</div>
						</div>
					</div>
					{/* End .row profile and notificatins */}
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
