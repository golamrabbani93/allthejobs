'use client';

import Link from 'next/link';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import candidatesuData from '../../data/candidatesMenuData';
import {isActiveLink} from '../../utils/linkActiveChecker';

import {useDispatch, useSelector} from 'react-redux';
import {menuToggle} from '../../features/toggle/toggleSlice';
import {usePathname} from 'next/navigation';
import LogOutButton from '../common/LogOutButton/LogOutButton';
import consultantMenuData from '@/data/consultantMenuData';
const DashboardConsultantSidebar = () => {
	const {menu} = useSelector((state) => state.toggle);
	const percentage = 30;
	const dispatch = useDispatch();

	// menu togggle handler
	const menuToggleHandler = () => {
		dispatch(menuToggle());
	};

	return (
		<div className={`user-sidebar ${menu ? 'sidebar_open' : ''}`}>
			{/* Start sidebar close icon */}
			<div className="pro-header text-end pb-0 mb-0 show-1023">
				<div className="fix-icon" onClick={menuToggleHandler}>
					<span className="flaticon-close"></span>
				</div>
			</div>
			{/* End sidebar close icon */}

			<div className="sidebar-inner">
				<ul className="navigation">
					{consultantMenuData.map((item) => (
						<li
							className={`${isActiveLink(item.routePath, usePathname()) ? 'active' : ''} mb-1`}
							key={item.id}
							onClick={menuToggleHandler}
						>
							<Link href={item.routePath}>
								<i className={`la ${item.icon}`}></i> {item.name}
							</Link>
						</li>
					))}
					<LogOutButton />
				</ul>
				{/* End navigation */}
			</div>
		</div>
	);
};

export default DashboardConsultantSidebar;
