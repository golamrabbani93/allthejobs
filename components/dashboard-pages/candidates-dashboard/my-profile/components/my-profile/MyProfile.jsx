import LogoUpload from './LogoUpload';
import MyProfileForm from './MyProfileForm';

const MyProfile = () => {
	return (
		<div className="widget-content">
			<LogoUpload />
			{/* End logo and cover photo components */}

			<MyProfileForm />
		</div>
	);
};

export default MyProfile;
