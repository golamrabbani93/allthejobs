'use client';
import {useSelector} from 'react-redux';
import RIghtRegisterButtons from '../RIghtRegisterButtons';
import AvatarMenu from '../AvatarMenu/AvatarMenu';

const SidebarFooter = () => {
	const user = useSelector((state) => state.user);
	const socialContent = [
		{id: 1, icon: 'fa-facebook-f', link: 'https://www.facebook.com/'},
		{id: 2, icon: 'fa-twitter', link: 'https://www.twitter.com/'},
		{id: 3, icon: 'fa-instagram', link: 'https://www.instagram.com/'},
		{id: 4, icon: 'fa-linkedin-in', link: 'https://www.linkedin.com/'},
	];

	return (
		<>
			{user?.role && <AvatarMenu />}
			{!user?.user_id && (
				<div className="mm-add-listing mm-listitem pro-footer">
					<RIghtRegisterButtons />
				</div>
			)}
		</>
	);
};

export default SidebarFooter;
