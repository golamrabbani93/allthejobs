'use client';
import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useReactToPrint} from 'react-to-print';

const ShowResumeTwo = ({aiGeneratedData}) => {
	const pdfRef = useRef(null);
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const [canPrint, setCanPrint] = useState(false);

	// Ensure ref is valid before printing
	const handleDownloadPDF = useReactToPrint({
		contentRef: pdfRef,
		documentTitle: 'Resume',
	});

	// Check if the reference is assigned correctly
	useEffect(() => {
		console.log('pdfRef.current:', pdfRef.current);
	}, []);

	// Check if user data is available before allowing printing
	useEffect(() => {
		if (userRoleBasedData && aiGeneratedData?.professional_summary) {
			setCanPrint(true);
		}
	}, [userRoleBasedData, aiGeneratedData]);

	if (loading) {
		return <p className="text-center text-gray-600">Loading resume data...</p>;
	}

	return (
		<>
			<button
				onClick={handleDownloadPDF}
				disabled={!canPrint}
				className={`mb-4 px-4 py-2 ${
					canPrint ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
				} text-white font-semibold rounded shadow`}
			>
				{canPrint ? 'Download PDF' : 'Loading...'}
			</button>

			<div className="flex justify-center items-center min-h-screen bg-gray-200">
				<div
					ref={pdfRef}
					className="bg-white shadow-md border p-8 w-[210mm] h-[297mm] overflow-hidden"
				>
					{/* Full Name & Contact */}
					<div className="text-center border-b pb-1">
						<h1 className="text-2xl font-bold">{userRoleBasedData?.user?.name || 'No Name'}</h1>
						<div className="flex justify-center items-center text-gray-600">
							{userRoleBasedData?.user?.email && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-envelope mr-[2px]"></span>
									<span>{userRoleBasedData.user.email}</span>
								</div>
							)}
							{userRoleBasedData?.user?.phone && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-phone mr-[2px]"></span>
									<span>{userRoleBasedData.user.phone}</span>
								</div>
							)}
							{userRoleBasedData?.city && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-map-marker mr-[2px]"></span>
									<span>
										{userRoleBasedData.city}, {userRoleBasedData.province},{' '}
										{userRoleBasedData.country}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Professional Summary */}
					<div className="mt-2 border-b pb-1">
						<h2 className="text-2xl font-semibold text-gray-800">Professional Summary</h2>
						<p className="text-gray-700 mt-2 text-justify">
							{aiGeneratedData?.professional_summary || 'N/A'}
						</p>
					</div>

					{/* Experience */}
					<div className="mt-2">
						<h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
						{aiGeneratedData?.experience_details?.length > 0 ? (
							aiGeneratedData.experience_details.map((exp, i) => (
								<div className="mt-2" key={i}>
									<h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
									<p className="text-sm text-gray-600 italic">
										{exp.companyName} - {exp.duration}
									</p>
									<ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
										<li className="text-justify">{exp.description}</li>
									</ul>
								</div>
							))
						) : (
							<p className="text-gray-600">No work experience added.</p>
						)}
					</div>

					{/* Skills */}
					<div className="mt-2 border-b pb-1">
						<h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
						<div className="flex flex-wrap mt-2">
							{userRoleBasedData?.skills?.length > 0 ? (
								userRoleBasedData.skills.map((skill, i) => (
									<span key={i} className="text-gray-700 uppercase mx-1 font-medium">
										{skill}
										{i !== userRoleBasedData.skills.length - 1 && ' |'}
									</span>
								))
							) : (
								<p className="text-gray-600">No skills listed.</p>
							)}
						</div>
					</div>

					{/* Education */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Education</h2>
					{userRoleBasedData?.education_details?.length > 0 ? (
						userRoleBasedData.education_details.map((edu, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<div className="flex justify-between">
									<p className="text-gray-700">
										{edu.degreeName}, <i>{edu.institutionName}</i>
									</p>
									<p className="text-gray-600 italic">{edu.duration}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-600">No education details available.</p>
					)}

					{/* Awards */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Awards</h2>
					{userRoleBasedData?.awards?.length > 0 ? (
						userRoleBasedData.awards.map((award, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<div className="flex justify-between">
									<p className="text-gray-700">
										{award.title}, <i>{award.category}</i>
									</p>
									<p className="text-gray-600 italic">{award.duration}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-600">No awards listed.</p>
					)}

					{/* Languages */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Languages</h2>
					{userRoleBasedData?.language?.length > 0 ? (
						userRoleBasedData.language.map((ln, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<p className="text-gray-700">✔️ {ln}</p>
							</div>
						))
					) : (
						<p className="text-gray-600">No languages specified.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default ShowResumeTwo;
