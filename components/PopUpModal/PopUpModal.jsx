'use client';

import {useEffect, useState} from 'react';
import LoginPopup from '../common/form/login/LoginPopup';

const PopUpModal = () => {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		// if (!showModal) {
		const timer = setTimeout(() => {
			// Programmatically trigger the modal
			const modalTrigger = document.getElementById('loginPopupButton');
			if (modalTrigger) {
				modalTrigger.click();
			}
			// setShowModal(true);
		}, 10000); // 10 seconds
		return () => clearTimeout(timer); // Cleanup timer on component unmount
		// }
	}, []);
	return (
		<div>
			<LoginPopup />
		</div>
	);
};

export default PopUpModal;
