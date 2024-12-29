'use client';

import {
	useGetTalentQuery,
	useUpdateTalentMutation,
} from '@/features/candidate/talent.management.api';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const LogoUpload = () => {
	const user = useSelector((state) => state.user);
	const [logImg, setLogoImg] = useState('');
	const [preview, setPreview] = useState('');

	const {data: talentData, isFetching} = useGetTalentQuery(user?.user_id);
	const [updateTalent, {isLoading, data}] = useUpdateTalentMutation();

	const logImgHander = (e) => {
		const file = e.target.files[0];
		setLogoImg(file);
		const formData = new FormData();
		const photos = formData.append('photo', file);
		// formData.append('talentId', talentData.talent_id);
		const payload = {
			photo: photos,
			user_id: user.user_id,
		};

		// updateTalent({talentId: talentData?.talent_id, data: payload});
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setPreview('');
		}
	};

	return (
		<>
			<div className="uploading-outer">
				<div className="uploadButton">
					<input
						className="uploadButton-input"
						type="file"
						name="attachments[]"
						accept="image/*"
						id="upload"
						required
						onChange={logImgHander}
					/>
					<label className="uploadButton-button ripple-effect" htmlFor="upload">
						{logImg !== '' ? logImg.name : 'Upload Your Photo'}
					</label>
					<span className="uploadButton-file-name"></span>
				</div>

				{preview && (
					<div className="image-preview">
						<img src={preview} alt="Preview" style={{maxWidth: '200px', height: 'auto'}} />
					</div>
				)}
				<div className="ms-4 text">
					Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png
				</div>
			</div>
		</>
	);
};

export default LogoUpload;
