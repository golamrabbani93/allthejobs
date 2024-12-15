import Image from 'next/image';
import Link from 'next/link';

const SidebarHeader = () => {
	return (
		<div className="pro-header">
			<Link href="/">
				<div className="logo-sidebar">allthejobs.ca</div>
			</Link>
			{/* End logo */}

			<div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
				<span className="flaticon-close"></span>
			</div>
			{/* icon close */}
		</div>
	);
};

export default SidebarHeader;
