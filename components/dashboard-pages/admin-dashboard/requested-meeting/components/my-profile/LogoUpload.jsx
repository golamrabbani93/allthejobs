'use client';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css';
import {base64ToFile} from '@/utils/base64ToFile';
import {useUpdateMyProfilePhotoMutation} from '@/features/user/user.management';
import Spinner from '@/components/Sppiner/Spinner';
import {setUser} from '@/features/user/userSlice';
import {setUserData} from '@/features/data/dataSlice';

const LogoUpload = () => {
	const dispatch = useDispatch();
	//get my profile data
	const {userData, loading} = useSelector((state) => state.data);
	//update the profile data
	const [updateProfile, {data, isLoading}] = useUpdateMyProfilePhotoMutation();
	const [logImg, setLogoImg] = useState(null);
	const [preview, setPreview] = useState('');

	//handle image show
	useEffect(() => {
		if (userData?.photo) {
			setPreview(userData.photo);
			setLogoImg(null);
		}
	}, [userData]);
	useEffect(() => {
		if (data?.photo) {
			dispatch(setUser({...data, image: data.photo}));
			dispatch(setUserData(data));
		}
	}, [userData, data]);

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
		formData.append('name', userData.name);
		formData.append('username', userData.username);
		formData.append('email', userData.email);
		formData.append('role', userData.role);
		formData.append('password_hash', userData.password_hash);
		updateProfile({email: userData.email, data: formData});
	};
	if (loading)
		return (
			<div className="flex mb-4">
				<Spinner />
			</div>
		);
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
						disabled={isLoading || !userData?.name}
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
