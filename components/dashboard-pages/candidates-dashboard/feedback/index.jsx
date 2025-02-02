'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import {useSelector} from 'react-redux';
import Feedback from '@/components/feedback/Feedback';
import DashboardCandidatesSidebar from '@/components/header/DashboardCandidatesSidebar';
import DashboardCandidatesHeader from '@/components/header/DashboardCandidatesHeader';

const Index = () => {
	const user = useSelector((state) => state.user);
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DashboardCandidatesHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardCandidatesSidebar />
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title={`Feedback Us`} />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className="col-lg-12">
							{/* <!-- Ls widget --> */}
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title">
										<h4>Write A feedback</h4>
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
