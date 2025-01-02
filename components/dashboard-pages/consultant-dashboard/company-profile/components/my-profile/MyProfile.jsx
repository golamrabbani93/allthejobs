import LogoUpload from './LogoUpload';
import LogoCoverUploader from './LogoUpload';
import MyProfileForm from './MyProfileForm';

const MyProfile = () => {
	return (
		<div className="widget-content">
			<label className="font-semibold mb-2">Upload Your Photo</label>
			<LogoUpload />

			{/* End logo and cover photo components */}

			<MyProfileForm />
			{/* <FormInfoBox /> */}
			{/* compnay info box */}
		</div>
	);
};

export default MyProfile;
