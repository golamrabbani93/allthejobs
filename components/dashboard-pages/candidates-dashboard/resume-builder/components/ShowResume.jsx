'use client';
import {useSelector} from 'react-redux';

const ShowResume = () => {
	const {userRoleBasedData} = useSelector((state) => state.data);
	console.log('🚀🚀: ShowResume -> userRoleBasedData', userRoleBasedData);
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="bg-white shadow-2xl rounded-lg flex w-[210mm] overflow-hidden">
				{/* Left Sidebar */}
				<div className="w-1/3 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6">
					{/* Profile Section */}
					<div className="text-center mb-6">
						<img
							src={userRoleBasedData?.user?.photo}
							alt="Profile Picture"
							className="w-24 h-24 mx-auto rounded-full border-4 border-white"
						/>
						<h1 className="text-2xl font-bold mt-4">John Doe</h1>
						<p className="text-sm text-gray-300">Software Engineer</p>
					</div>

					{/* Contact Info */}
					<div className="mb-6">
						<h2 className="text-lg font-semibold  pb-1">Contact</h2>
						<p className="mt-2 text-sm text-white">📧 john.doe@example.com</p>
						<p className="text-sm text-white">📞 (123) 456-7890</p>
						<p className="text-sm text-white">📍 123 Main St, Anytown, USA</p>
					</div>

					{/* Skills */}
					<div className="mb-6">
						<h2 className="text-lg font-semibold border-b border-gray-500 pb-1">Skills</h2>
						<ul className="mt-3 text-sm space-y-2">
							<li>✅ JavaScript, React, Node.js</li>
							<li>✅ HTML, CSS, Tailwind CSS</li>
							<li>✅ Git, Docker, Kubernetes</li>
							<li>✅ Agile Development</li>
						</ul>
					</div>

					{/* Awards & Achievements */}
					<div>
						<h2 className="text-lg font-semibold border-b border-gray-500 pb-1">
							Awards & Achievements
						</h2>
						<ul className="mt-3 text-sm space-y-2">
							<li>🏆 Best Developer Award – 2023</li>
							<li>🏅 Top Performer in Web Dev – 2022</li>
							<li>🎖 Hackathon Winner – 2021</li>
						</ul>
					</div>
				</div>

				{/* Right Content */}
				<div className="w-2/3 p-8">
					{/* Summary */}
					<div className="mb-6">
						<h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
							Professional Summary
						</h2>
						<p className="text-gray-600 text-sm mt-2">
							Experienced software engineer with a strong background in developing scalable web
							applications and working with cross-functional teams. Proficient in JavaScript, React,
							and Node.js.
						</p>
					</div>

					{/* Work Experience */}
					<div className="mb-6">
						<h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
							Work Experience
						</h2>
						<div className="mt-3">
							<h3 className="text-lg font-medium text-gray-900">Senior Software Engineer</h3>
							<p className="text-sm text-gray-500 italic">Tech Company, 2018 - Present</p>
							<ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
								<li>Developed and maintained web applications using React and Node.js.</li>
								<li>
									Collaborated with designers and product managers to deliver high-quality products.
								</li>
								<li>Mentored junior developers and conducted code reviews.</li>
							</ul>
						</div>

						<div className="mt-4">
							<h3 className="text-lg font-medium text-gray-900">Software Engineer</h3>
							<p className="text-sm text-gray-500 italic">Another Tech Company, 2015 - 2018</p>
							<ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
								<li>Implemented new features and fixed bugs in a large-scale web application.</li>
								<li>Worked closely with QA engineers to ensure product quality.</li>
								<li>Participated in agile development processes and sprint planning.</li>
							</ul>
						</div>
					</div>

					{/* Education */}
					<div>
						<h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
							Education
						</h2>
						<ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
							<li>
								🎓 Bachelor of Science in Computer Science, University of Somewhere, 2011 - 2015
							</li>
							<li>
								🎓 Bachelor of Science in Computer Science, University of Somewhere, 2011 - 2015
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowResume;
