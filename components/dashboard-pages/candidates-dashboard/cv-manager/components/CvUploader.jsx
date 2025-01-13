'use client';

import Spinner from '@/components/Sppiner/Spinner';
import {useUpdateTalentMutation} from '@/features/candidate/talent.management.api';
import {setTalentsData} from '@/features/data/dataSlice';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// validation chaching
function checkFileTypes(files) {
	const allowedTypes = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	];
	for (let i = 0; i < files.length; i++) {
		if (!allowedTypes.includes(files[i].type)) {
			return false;
		}
	}
	return true;
}

const CvUploader = () => {
	// get user role based data
	const {userRoleBasedData, Loading} = useSelector((state) => state.data);
	console.log('🚀🚀: CvUploader -> userRoleBasedData', userRoleBasedData);
	const [updateTalentCv, {data, isLoading}] = useUpdateTalentMutation();
	console.log('🚀🚀: CvUploader -> data', data);
	const [getManager, setManager] = useState([]);
	const [getError, setError] = useState('');
	const dispatch = useDispatch();

	const cvManagerHandler = (e) => {
		const data = Array.from(e.target.files);
		const isExist = getManager?.some((file1) => data.some((file2) => file1.name === file2.name));
		if (!isExist) {
			if (checkFileTypes(data)) {
				setManager(getManager.concat(data));
				setError('');
			} else {
				setError('Only accept  (.doc, .docx, .pdf) file');
			}
		} else {
			setError('File already exists');
		}
	};

	//handle cv upload
	const handleCvUpload = () => {
		const formData = new FormData();
		getManager.forEach((file) => {
			formData.append('resume', file);
		});
		formData.append('user_id', userRoleBasedData?.user_id);
		const payload = {
			talentId: userRoleBasedData?.talent_id,
			data: formData,
		};
		updateTalentCv(payload);
	};

	//set resume in talents stored data
	useEffect(() => {
		if (data?.talent_id) {
			dispatch(setTalentsData(data));
		}
	}, [data]);

	// delete image
	const deleteHandler = (name) => {
		const deleted = getManager?.filter((file) => file.name !== name);
		setManager(deleted);
	};

	return (
		<>
			{/* Start Upload resule */}
			<div className="uploading-resume">
				<div className="uploadButton">
					<input
						className="uploadButton-input"
						type="file"
						name="attachments[]"
						accept=".doc,.docx,.xml,application/msword,application/pdf, image/*"
						id="upload"
						multiple
						onChange={cvManagerHandler}
					/>
					<label className="cv-uploadButton" htmlFor="upload">
						<span className="title">Drop files here to upload</span>
						<span className="text">
							To upload file size is (Max 5Mb) and allowed file types are (.doc, .docx, .pdf)
						</span>

						<span className="theme-btn btn-style-one">Select Resume</span>
						{getError !== '' ? <p className="ui-danger mb-0">{getError}</p> : undefined}
					</label>
					<span className="uploadButton-file-name"></span>
				</div>
			</div>
			{/* End upload-resume */}

			{/* Start resume Preview  */}
			<div className="files-outer items-center">
				{getManager.length > 0 &&
					getManager?.map((file, i) => (
						<div key={i} className="file-edit-box">
							<span className="title">{file.name}</span>
							<div className="edit-btns">
								<button>
									<span className="la la-pencil"></span>
								</button>
								<button onClick={() => deleteHandler(file.name)}>
									<span className="la la-trash"></span>
								</button>
							</div>
						</div>
					))}
				{getManager.length > 0 && (
					<button onClick={() => handleCvUpload()} className="theme-btn btn-style-one h-[40px]">
						{isLoading ? <Spinner size="sm" color="white" /> : 'Upload Resume'}
					</button>
				)}
			</div>
			{/* End resume Preview  */}
		</>
	);
};

export default CvUploader;
