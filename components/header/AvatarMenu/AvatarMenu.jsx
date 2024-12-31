'use Client';

import Image from 'next/image';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from 'next-auth/react';
import {clearUser} from '@/features/user/userSlice';
import LogOutButton from '@/components/common/LogOutButton/LogOutButton';

const AvatarMenu = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const userLogOut = () => {
		signOut();
		dispatch(clearUser());
	};

	return (
		<div className="dropdown dashboard-option">
			<a className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<Image
					alt="avatar"
					className="thumb"
					src={user.image}
					width={70}
					height={70}
					style={{borderRadius: '100%', width: '50px', height: '50px', objectFit: 'contain'}}
				/>
				<span className="name">{user.name}</span>
			</a>

			<ul className="dropdown-menu">
				<li className={` mb-1`}>
					<Link href={`/dashboard/${user?.role}`}>
						<i className={`la la-home`}></i> DashBoard
					</Link>
				</li>
				<LogOutButton />
			</ul>
		</div>
	);
};

export default AvatarMenu;
