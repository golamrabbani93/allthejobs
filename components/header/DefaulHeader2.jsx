'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import HeaderNavContent from './HeaderNavContent';
import Image from 'next/image';
import RIghtRegisterButtons from './RIghtRegisterButtons';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import {useSelector} from 'react-redux';

const DefaulHeader2 = () => {
	const [navbar, setNavbar] = useState(false);
	const user = useSelector((state) => state.user);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		window.addEventListener('scroll', changeBackground);
		return () => window.removeEventListener('scroll', changeBackground);
	}, []);

	const changeBackground = () => {
		if (window.scrollY >= 10) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	return (
		// <!-- Main Header-->
		<header className={`main-header  ${navbar ? 'fixed-header animated slideInDown' : ''}`}>
			{/* <!-- Main box --> */}
			<div className="main-box auto-container">
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
					{isClient && (user?.role === undefined ? <RIghtRegisterButtons /> : <AvatarMenu />)}
				</div>
			</div>
		</header>
	);
};

export default DefaulHeader2;
