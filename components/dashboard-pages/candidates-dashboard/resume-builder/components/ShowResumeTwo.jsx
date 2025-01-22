'use client';
import {useSelector} from 'react-redux';

const ShowResumeTwo = ({aiGeneratedData}) => {
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	console.log('🚀🚀: ShowResumeTwo -> userRoleBasedData', userRoleBasedData);
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200">
			<div className="bg-white shadow-md border p-8 w-[210mm] h-[280mm] overflow-hidden">
				{/* Full Name & Contact */}
				<div className="text-center border-b pb-1">
					<h1 className="text-2xl font-bold">{userRoleBasedData?.user?.name}</h1>
					<div className="flex justify-center items-center text-gray-600">
						<div className="flex items-center justify-center">
							<span className="la la-envelope mr-[2px]"> </span>
							<span>{userRoleBasedData?.user?.email}</span>
						</div>

						<div className="flex items-center justify-center mx-2">
							<span className="la la-phone mr-[2px]"> </span>
							<span>{userRoleBasedData?.user?.phone}</span>
						</div>
						<div className="flex items-center justify-center mx-2">
							<span className="la la-map-marker mr-[2px]"> </span>
							<span>
								{userRoleBasedData?.city},{userRoleBasedData?.province},{userRoleBasedData?.country}
							</span>
						</div>
					</div>
				</div>

				{/* Professional Summary */}
				<div className="mt-2 border-b pb-1">
					<h2 className="text-2xl font-semibold text-gray-800">Professional Summary</h2>
					<p className="text-gray-700 mt-2 text-justify">{aiGeneratedData?.professional_summary}</p>
				</div>

				{/* Experience */}
				<div className="mt-2">
					<h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>

					{/* Job 2 */}
					{aiGeneratedData?.experience_details?.map((exp, i) => (
						<div className="mt-2" key={i}>
							<h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
							<p className="text-sm text-gray-600 italic">
								{exp.companyName} - {exp.duration}
							</p>

							<ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
								<li className="text-justify">{exp.description}</li>
							</ul>
						</div>
					))}

					{/* Job 3 */}
				</div>

				{/* Skills */}
				<div className="mt-2 border-b pb-1">
					<h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
					{/* <div className="grid grid-cols-2 gap-2 mt-2">
						<p>✔️ Effective written and verbal communication</p>
						<p>✔️ Teamwork</p>
						<p>✔️ Analytical thinking</p>
						<p>✔️ Microsoft Office Suite</p>
					</div> */}
					<div className="flex justify-start items-center mt-2 ">
						{userRoleBasedData?.skills?.map((skill, i) => (
							<span key={i} className="text-gray-700 uppercase mx-1 font-medium">
								{skill} {i !== userRoleBasedData?.skills?.length - 1 && ' |'}
							</span>
						))}
					</div>
				</div>
				{/* Education */}
				<h2 className="mt-2 text-2xl font-semibold text-gray-800">Educations</h2>
				{userRoleBasedData?.education_details?.map((edu, i) => (
					<div className="mt-[2px] border-b pb-1 " key={i}>
						<div className="flex justify-between ">
							<p className="text-gray-700">
								{edu?.degreeName},<i>{edu?.institutionName}</i>
							</p>
							<p className="text-gray-600 italic">{edu?.duration}</p>
						</div>
					</div>
				))}

				{/* Award  */}
				<h2 className="mt-2 text-2xl font-semibold text-gray-800">Awards</h2>
				{userRoleBasedData?.awards?.map((edu, i) => (
					<div className="mt-[2px] border-b pb-1 " key={i}>
						<div className="flex justify-between ">
							<p className="text-gray-700">
								{edu?.title},<i>{edu?.category}</i>
							</p>
							<p className="text-gray-600 italic">{edu?.duration}</p>
						</div>
					</div>
				))}
				{/* languages */}
				<h2 className="mt-2 text-2xl font-semibold text-gray-800">Languages</h2>
				{userRoleBasedData?.language?.map((ln, i) => (
					<div className="mt-[2px] border-b pb-1 " key={i}>
						<div className="flex justify-between ">
							<p className="text-gray-700">✔️{ln}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ShowResumeTwo;
