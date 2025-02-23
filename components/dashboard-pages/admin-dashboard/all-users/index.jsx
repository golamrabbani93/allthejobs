'use client';
import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import {useSelector} from 'react-redux';
import DashboardAdminHeader from '@/components/header/DashboardAdminHeader';
import DashboardAdminSidebar from '@/components/header/DashboardAdminSidebar';
import AdminPanel from '@/app/(dashboard-layout)/dashboard/admin/Components/adminPanel';

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
					<MenuToggler />
					{/* End .row top card block */}
					<AdminPanel></AdminPanel>
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
