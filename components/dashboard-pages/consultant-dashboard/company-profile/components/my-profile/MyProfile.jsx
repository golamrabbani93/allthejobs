import LogoUpload from './LogoUpload';
import LogoCoverUploader from './LogoUpload';
import MyProfileForm from './MyProfileForm';

const MyProfile = () => {
	return (
		<div className="widget-content">
			<LogoUpload />

			{/* End logo and cover photo components */}

			<MyProfileForm />
			{/* <FormInfoBox /> */}
			{/* compnay info box */}
		</div>
	);
};

export default MyProfile;
