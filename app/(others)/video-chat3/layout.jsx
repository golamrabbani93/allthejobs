'use client';
import Sidebar from './Components/Sidebar';
import {usePathname} from 'next/navigation';
const HomeLayout = ({children}) => {
	const pathname = usePathname();
	const isMeetingPath = pathname.includes('/meeting/');
	return (
		<main className="relative meeting-layout">
			<div className="flex ">
				{!isMeetingPath && <Sidebar />}
				<section
					className={`min-h-screen flex flex-1 flex-col ${
						!isMeetingPath && 'px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'
					}`}
				>
					<div className="w-full">{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
