'use client';

import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
const sidebarLinks = {
	consultant: [
		{
			label: 'Home',
			route: '/video-chat3',
			imgUrl: '/icons/Home.svg',
		},
		{
			label: 'Upcoming Meetings',
			route: '/video-chat3/upcoming',
			imgUrl: '/icons/upcoming.svg',
		},
		{
			label: 'Meeting Request',
			route: '/video-chat3/meeting-request',
			imgUrl: '/icons/upcoming.svg',
		},
		{
			label: 'Previous',
			route: '/video-chat3/previous',
			imgUrl: '/icons/previous.svg',
		},
		{
			label: 'Recordings',
			route: '/video-chat3/recordings',
			imgUrl: '/icons/Video.svg',
		},
	],
	talent: [
		{
			label: 'Home',
			route: '/video-chat3',
			imgUrl: '/icons/Home.svg',
		},
		{
			label: 'Upcoming Meetings',
			route: '/video-chat3/upcoming',
			imgUrl: '/icons/upcoming.svg',
		},
		{
			label: 'Requested Meeting',
			route: '/video-chat3/meeting-request',
			imgUrl: '/icons/upcoming.svg',
		},
		{
			label: 'Previous',
			route: '/video-chat3/previous',
			imgUrl: '/icons/previous.svg',
		},
		{
			label: 'Recordings',
			route: '/video-chat3/recordings',
			imgUrl: '/icons/Video.svg',
		},
	],
};

const Sidebar = () => {
	const [user, setUser] = useState(undefined);
	const user_redux = useSelector((state) => state.user);
	const pathname = usePathname();
	useEffect(() => {
		setUser(user_redux);
	}, [user_redux]);
	if (!user?.user_id) {
		return <div className="text-black">Loading...</div>; // Or any placeholder
	}
	return (
		<section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  p-6 pt-28  max-sm:hidden lg:w-[264px] bg-blue-500">
			<div className="flex flex-1 flex-col gap-6">
				{sidebarLinks[user.role]?.map((link) => {
					const isActive =
						pathname !== '/'
							? pathname === link.route
							: pathname === link.route || pathname.startsWith(link.route);
					return (
						<Link
							href={link.route}
							key={link.label}
							className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
								'bg-blue-1': isActive,
							})}
						>
							<Image src={link.imgUrl} alt={link.label} width={24} height={24}></Image>
							<p className="text-lg font-semibold max-md:hidden text-white">{link.label}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Sidebar;
