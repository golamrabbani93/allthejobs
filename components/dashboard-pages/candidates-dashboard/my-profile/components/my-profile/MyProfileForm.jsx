'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';

const MyProfileForm = () => {
	const handelProfileData = (data) => {
		console.log('Profile Data', data);
	};
	return (
		<ATJForm onSubmit={handelProfileData}>
			<div className="default-form">
				<div className="row">
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Full Name</label>
						<ATJInput type={'text'} label="Jerome Arnold" name="name" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>User Name</label>
						<ATJInput type={'text'} label="JeromeArnold" name="username" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Email address</label>

						<ATJInput type={'email'} label="jeromearnold@gmail.com" name="email" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Phone</label>
						<ATJInput type={'text'} label="0 123 456 7890" name="phone" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<button type="submit" className="theme-btn btn-style-one">
							Save
						</button>
					</div>
				</div>
			</div>
		</ATJForm>
	);
};

export default MyProfileForm;
