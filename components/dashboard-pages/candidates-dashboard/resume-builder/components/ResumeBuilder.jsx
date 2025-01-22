'use client';
import {useMutation} from '@tanstack/react-query';
import {nanoid} from 'nanoid';
import {useState} from 'react';
import ShowResume from './ShowResume';
import {useSelector} from 'react-redux';
import ShowResumeTwo from './ShowResumeTwo';

const ResumeBuilder = () => {
	const [aiData, setAiData] = useState([]);
	let aiGeneratedData = {};
	let jsonString = aiData.join('');
	// Step 2: Remove unnecessary parts like ```json and extra whitespace
	jsonString = jsonString.replace(/```json|```/g, '').trim();
	// Step 3: Replace incorrect spacing and concatenate broken keys or values
	jsonString = jsonString.replace(/\s+/g, ' ').replace(/"\s+"/g, '"');

	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const {mutate: sendMessage, isPending} = useMutation({
		mutationFn: async (data) => {
			const response = await fetch('/api/AIChat', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify([data]),
			});
			return response.body;
		},

		onSuccess: async (stream) => {
			if (!stream) {
				throw new Error('No stream found');
			}
			const reader = stream.getReader();
			const decoder = new TextDecoder();
			let done = false;
			while (!done) {
				const {value, done: doneReading} = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value);
				setAiData((prev) => [...prev, chunkValue]);
			}
		},
	});

	if (!isPending && aiData.length > 0) {
		//now perse 	json to object
		const obj = JSON.parse(jsonString);
		aiGeneratedData = obj;
	}
	const handleSendMessage = () => {
		setAiData([]);
		const experience_details = userRoleBasedData?.experience_details
			?.map((exp) => `${exp.role} at ${exp.companyName} (${exp.duration})`)
			.join(', ');

		const aiData = {
			id: nanoid(),
			isUserInput: true,
			text: ` I need a professional summary based on my following details: ${experience_details}. It should include my roles, durations, descriptions, and company names. I don't need any extra explanations—just the final summary just need only answer give me object of experience_details and add description and add companyName for my role also make professional summery and didn't mention company name in the professional summery and make it 450 character long also i need descriptions 400 character long. Make sure to include all the details roles, durations, descriptions,companyName and professional summery.`,
			// text: `make my summery with the following details: ${experience_details} and my experience and i don't need  summery Sure! Here’s a summary based on your experience and Feel free to adjust any part of it to better fit your style! just need only answer give me object of experience_details and add description and add companyName for my role also make professional summery `,
		};
		sendMessage(aiData);
	};
	return (
		<div>
			{/* <!-- Resume Builder --> */}
			<div className="resume-builder flex flex-col justify-center items-center py-5">
				<button onClick={() => handleSendMessage()} className="btn btn-primary">
					{isPending || loading ? <span className="ml-2">Loading...</span> : 'Make Resume'}
				</button>
				<div className="my-8">
					{/* <ShowResume aiGeneratedData={aiGeneratedData || {}} />
					 */}
					<ShowResumeTwo aiGeneratedData={aiGeneratedData || {}} />
				</div>
			</div>
		</div>
	);
};

export default ResumeBuilder;
