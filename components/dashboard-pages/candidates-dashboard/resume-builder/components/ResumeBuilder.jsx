'use client';
import {useMutation} from '@tanstack/react-query';
import {nanoid} from 'nanoid';
import {useState} from 'react';
import ShowResume from './ShowResume';
import {useSelector} from 'react-redux';

const ResumeBuilder = () => {
	const [aiData, setAiData] = useState([]);
	const summery = aiData.join('').trim();
	console.log('🚀🚀: ResumeBuilder -> summery', summery);
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
			const id = nanoid();
			const responseMessage = {
				id,
				isUserMessage: false,
				text: '',
			};

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

	const handleSendMessage = () => {
		setAiData([]);
		const experience_details = userRoleBasedData?.experience_details
			?.map((exp) => `${exp.role} at ${exp.companyName} (${exp.duration})`)
			.join(', ');

		const aiData = {
			id: nanoid(),
			isUserInput: true,
			text: `make my summery with the following details: ${experience_details} and do not mention my company names and just make summarize my experience and i don't need  summery Sure! Here’s a summary based on your experience and Feel free to adjust any part of it to better fit your style! just need only answer`,
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
					<ShowResume summery={summery} />
				</div>
			</div>
		</div>
	);
};

export default ResumeBuilder;
