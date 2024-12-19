'use client';

import {useEffect} from 'react';
import LoginPopup from '../common/form/login/LoginPopup';
import {useSelector} from 'react-redux';

const PopUpModal = () => {
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const hasVisited = sessionStorage.getItem('hasVisited');
		if (!hasVisited && user.role === undefined) {
			const timer = setTimeout(() => {
				const modalTrigger = document.getElementById('loginPopupButton');
				if (modalTrigger) {
					modalTrigger.click();
				}
				sessionStorage.setItem('hasVisited', 'true');
			}, 3000); // 3 seconds
			return () => clearTimeout(timer); // Cleanup timer on component unmount
		}
	}, [user]);

	return (
		<div>
			<LoginPopup />
		</div>
	);
};

export default PopUpModal;
