'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {menuItems} from '@/data/menuItems';

const HeaderNavContent = () => {
	const pathname = usePathname();

	return (
		<>
			<nav className="nav main-menu">
				<ul className="navigation" id="navbar">
					{/* current dropdown */}
					{/* <li className={`${isActiveParent(homeItems, usePathname()) ? 'current' : ''} dropdown`}>
						<span>Home</span>
						<div className="mega-menu">
							<div className="mega-menu-bar row pt-0">
								{homeItems.map((item) => (
									<div className="column col-lg-3 col-md-3 col-sm-12" key={item.id}>
										<ul>
											{item.items.map((menu, i) => (
												<li
													className={isActiveLink(menu.routePath, usePathname()) ? 'current' : ''}
													key={i}
												>
													<Link href={menu.routePath}>{menu.name}</Link>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</li> */}
					{/* End homepage menu items */}

					{menuItems.map((item) => (
						<li
							key={item.id}
							className={`${pathname?.split('/')[1] === item.path.split('/')[1] ? 'current' : ''}`}
						>
							<Link href={item.path}>{item.name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default HeaderNavContent;
