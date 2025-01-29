'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import DashboardEmployerSidebar from '../../../header/DashboardEmployerSidebar';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import DashboardConsultantSidebar from '@/components/header/DashboardConsultantSidebar';
import SlotManagement from '@/app/(others)/video-chat3/(home)/test/page';
import DashboardConsultantHeader from '@/components/header/DashboardConsultantHeader';

const Index = () => {
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DashboardConsultantHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardConsultantSidebar />
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title={`Select Your Availability`} />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="h-screen">
						<SlotManagement></SlotManagement>
						{/* <section className='flex size-full flex-col'>
              <CallList type='upcoming'></CallList>
            </section> */}
						{/* <div className="row">
							<TopCardBlock />
						</div> */}
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
