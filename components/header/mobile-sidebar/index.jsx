'use client';

import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import {usePathname, useRouter} from 'next/navigation';
import {menuItems} from '@/data/menuItems';
import AvatarMenu from '../AvatarMenu/AvatarMenu';

const Index = () => {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<div
			className="offcanvas offcanvas-start mobile_menu-contnet"
			tabIndex="-1"
			id="offcanvasMenu"
			data-bs-scroll="true"
		>
			<SidebarHeader />
			{/* End pro-header */}

			<Sidebar>
				<Menu>
					{menuItems.map((menuItem, i) => (
						<MenuItem
							key={menuItem.id}
							onClick={() => router.push(menuItem.path)}
							className={pathname === menuItem.path ? 'menu-active-link' : ''}
						>
							{menuItem.name}
						</MenuItem>
					))}
				</Menu>
			</Sidebar>
			<SidebarFooter />
		</div>
	);
};

export default Index;
