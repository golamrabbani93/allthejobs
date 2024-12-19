'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import candidatesMenuData from '../../data/candidatesMenuData';
import HeaderNavContent from './HeaderNavContent';
import {isActiveLink} from '../../utils/linkActiveChecker';

import {usePathname} from 'next/navigation';
import {useSelector} from 'react-redux';
import DashboardAvatar from './AvatarMenu/DashboardAvatar';
const DashboardCandidatesHeader = () => {
	const [navbar, setNavbar] = useState(false);
	const user = useSelector((state) => state.user);
	const wishListJobs = useSelector((state) => state.wishlistJobs.wishlist);
	const changeBackground = () => {
		if (window.scrollY >= 0) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', changeBackground);
	}, []);

	return (
		// <!-- Main Header-->
		<header className={`main-header header-shaddow  ${navbar ? 'fixed-header ' : ''}`}>
			<div className="container-fluid">
				{/* <!-- Main box --> */}
				<div className="main-box">
					{/* <!--Nav Outer --> */}
					<div className="nav-outer">
						<div className="logo-box">
							<Link href="/">
								<div className="logo">allthejobs.ca</div>
							</Link>
						</div>
						{/* End .logo-box */}

						<HeaderNavContent />
						{/* <!-- Main Menu End--> */}
					</div>
					{/* End .nav-outer */}

					<div className="outer-box">
						<div
							className="d-inline-flex align-items-center"
							style={{
								background: 'linear-gradient(135deg, #e5f8e7, #d6f2d9)',
								borderRadius: '2rem',
								padding: '0.4rem 1rem',
								fontWeight: 'bold',
								fontSize: '1rem',
								color: '#2e7d32',
							}}
						>
							<Image
								src="/images/coin.png"
								alt="coins"
								width={300}
								height={20}
								style={{width: '30px'}}
							/>
							<span>347</span>
						</div>
						<button className="menu-btn">
							<span className="count">{wishListJobs.length}</span>
							<span className="icon la la-heart-o"></span>
						</button>
						{/* wishlisted menu */}

						<button className="menu-btn">
							<span className="icon la la-bell"></span>
						</button>
						{/* End notification-icon */}

						{/* End dropdown */}
						<DashboardAvatar />
					</div>
					{/* End outer-box */}
				</div>
			</div>
		</header>
	);
};

export default DashboardCandidatesHeader;
