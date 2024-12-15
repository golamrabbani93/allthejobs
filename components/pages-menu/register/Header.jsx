'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const Header = () => {
	const [navbar, setNavbar] = useState(false);
	const changeBackground = () => {
		if (window.scrollY >= 10) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', changeBackground);
	}, []);

	return (
		<header className={`main-header ${navbar ? 'fixed-header animated slideInDown' : ''}`}>
			<div className="container-fluid">
				{/* <!-- Main box --> */}
				<div className="main-box">
					{/* <!--Nav Outer --> */}
					<div className="nav-outer">
						<div className="logo-box">
							<div className="logo">{/* hello */}</div>
						</div>
					</div>
					{/* End nav-outer */}

					<div className="outer-box">
						{/* <!-- Login/Register --> */}
						<Link href="/" className="noSticky">
							<div className="logo">allthejobs.ca</div>
						</Link>
						<Link href="/" className="isSticky">
							<div className="logo">allthejobs.ca</div>
						</Link>
					</div>
					{/* End outer-box */}
				</div>
			</div>
		</header>
	);
};

export default Header;
