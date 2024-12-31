'use client';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css';
import {base64ToFile} from '@/utils/base64ToFile';
import {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
	useUpdateMyProfilePhotoMutation,
} from '@/features/user/user.management';
import Spinner from '@/components/Sppiner/Spinner';

const LogoUpload = () => {
	const user = useSelector((state) => state.user);

	//get my profile data
	const {data: myProfileData, isFetching} = useGetMyProfileQuery(user.email);
	//update the profile data
	const [updateProfile, {data, isLoading}] = useUpdateMyProfilePhotoMutation();
	const [logImg, setLogoImg] = useState(null);
	const [preview, setPreview] = useState('');

	//handle image show
	useEffect(() => {
		if (myProfileData?.photo) {
			setPreview(myProfileData.photo);
			setLogoImg(null);
		}
	}, [myProfileData]);

	const handleImageChange = (newFile) => {
		if (newFile) {
			const file = base64ToFile(newFile, 'logo.png');
			setLogoImg(file);
		}
	};

	const config2 = {
		borderRadius: '8px',
		language: 'en',
		width: '150px',
		height: '150px',
		objectFit: 'contain',
		compressInitial: null,
		darkMode: false,
		rtl: false,
		hideDownloadBtn: true,
		hideEditBtn: true,
	};
	//handle image upload
	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('photo', logImg);
		formData.append('name', myProfileData.name);
		formData.append('username', myProfileData.username);
		formData.append('email', myProfileData.email);
		formData.append('role', myProfileData.role);
		formData.append('password_hash', myProfileData.password_hash);
		updateProfile({email: myProfileData.email, data: formData});
	};
	if (isFetching) return <Spinner />;
	return (
		<>
			<div className="uploading-outer">
				<ImagePickerEditor
					config={config2}
					imageSrcProp={preview}
					imageChanged={handleImageChange}
				/>
				{logImg && (
					<button
						disabled={isLoading || !myProfileData?.name}
						onClick={() => handleUpload()}
						style={{width: '100px'}}
						className=" btn btn-primary ms-3 border border-primary"
					>
						{isLoading ? <Spinner size="sm" color="white" /> : 'Upload'}
					</button>
				)}
			</div>
		</>
	);
};

export default LogoUpload;
