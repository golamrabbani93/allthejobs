import {
	FaUser,
	FaBriefcase,
	FaGraduationCap,
	FaTools,
	FaTrophy,
	FaLanguage,
	FaCheckCircle,
} from 'react-icons/fa';

const InstructionModalContent = () => {
	return (
		<div className=" mx-auto mt-4">
			<h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
				<FaCheckCircle className="text-green-500 mr-2" /> Resume Completion Guide
			</h1>

			{/* Personal Information */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaUser className="text-blue-500 mr-2" /> Personal Information (Mandatory)
				</h2>
			</section>

			{/* Professional Summary */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaBriefcase className="text-purple-500 mr-2" /> Professional Summary (Optional)
				</h2>
			</section>
			{/* Professional Skills */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaTools className="text-gray-500 mr-2" />
					Skills (Mandatory)
				</h2>
				<p className="text-gray-600 mt-2">Ensure at least 5+ skills are listed:</p>
			</section>
			{/* Work Experience */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaBriefcase className="text-orange-500 mr-2" /> Work Experience (If Available)
				</h2>
			</section>

			{/* Education */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaGraduationCap className="text-indigo-500 mr-2" /> Education (Mandatory)
				</h2>
			</section>

			{/* Professional Skills */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaTools className="text-gray-500 mr-2" /> Professional Skills (Mandatory If No
					Experience)
				</h2>
				<p className="text-gray-600 mt-2">
					If no work experience is available, ensure at least 2 Professional skills are listed:
				</p>
			</section>

			{/* Awards & Achievements */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaTrophy className="text-yellow-500 mr-2" /> Awards & Achievements (Optional)
				</h2>
			</section>

			{/* Languages */}
			<section className="mb-4">
				<h2 className="text-xl font-semibold text-gray-700 flex items-center">
					<FaLanguage className="text-red-500 mr-2" /> Languages (Mandatory)
				</h2>
				<p className="text-gray-600 mt-2">
					List of languages spoken (e.g., English, Bengali, Hindi)
				</p>
			</section>
		</div>
	);
};

export default InstructionModalContent;
