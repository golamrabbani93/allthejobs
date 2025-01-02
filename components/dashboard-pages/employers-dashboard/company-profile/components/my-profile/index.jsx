import FormInfoBox from './FormInfoBox';
import LogoCoverUploader from './LogoCoverUploader';
import MyProfileForm from './MyProfileForm';

const index = () => {
	return (
		<div className="widget-content">
			<label className="font-semibold mb-2">Upload Company Logo</label>
			<LogoCoverUploader />
			{/* End logo and cover photo components */}

			<MyProfileForm />
			{/* <FormInfoBox /> */}
			{/* compnay info box */}
		</div>
	);
};

export default index;
