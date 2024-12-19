'use Client';

import Image from 'next/image';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from 'next-auth/react';
import {clearUser} from '@/features/user/userSlice';

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
				<Image alt="avatar" className="thumb" src={user.image} width={70} height={70} />
				<span className="name">{user.name}</span>
			</a>

			<ul className="dropdown-menu">
				<li className={` mb-1`}>
					<Link href={`/dashboard/${user?.role}/dashboard`}>
						<i className={`la la-home`}></i> DashBoard
					</Link>
				</li>
				<li className={` mb-1`}>
					<button onClick={() => userLogOut()} className="avatarButton">
						<i className={`la la-sign-out`}></i> Log Out
					</button>
				</li>
			</ul>
		</div>
	);
};

export default AvatarMenu;
