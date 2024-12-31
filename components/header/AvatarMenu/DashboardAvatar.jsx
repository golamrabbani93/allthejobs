import Image from 'next/image';
import {useSelector} from 'react-redux';

const DashboardAvatar = () => {
	const user = useSelector((state) => state.user);
	return (
		<div className="mx-3">
			<Image
				alt="avatar"
				className="thumb me-2"
				src={user?.image}
				width={50}
				height={50}
				style={{borderRadius: '100%', width: '50px', height: '50px', objectFit: 'contain'}}
			/>
			<span className="name">{user?.name}</span>
		</div>
	);
};

export default DashboardAvatar;
