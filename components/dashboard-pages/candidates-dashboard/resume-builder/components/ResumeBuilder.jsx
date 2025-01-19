'use client';
import {useMutation} from '@tanstack/react-query';
import {nanoid} from 'nanoid';
import {useState} from 'react';
import ShowResume from './ShowResume';

const ResumeBuilder = () => {
	const [message, setMessage] = useState('Make a resume for me');
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
			console.log('🚀🚀: ResumeBuilder -> stream', stream);
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
				console.log(chunkValue);
			}
		},
	});

	const handleSendMessage = () => {
		const ResumeUserData =
			'Make a resume for me here is my information..John Doe is a software engineer with 5 years of experience. He holds a Bachelor of Science degree in Computer Science from Stanford University, where he studied from January 2013 to January 2017. Throughout his career, he has developed expertise in Python, JavaScript, and React. He worked as a Software Engineer at Google in Mountain View, CA, from January 2017 to January 2022, where he contributed to the development of the Google search engine. Residing at 123 Main St, Anytown, USA, John can be reached via email at john@gmail.com or phone at 1234567890.';

		const aiData = {
			id: nanoid(),
			isUserInput: true,
			text: ResumeUserData,
		};
		sendMessage(aiData);
	};
	return (
		<div>
			{/* <!-- Resume Builder --> */}
			<div className="resume-builder flex flex-col justify-center items-center py-5">
				<button onClick={() => handleSendMessage()} className="btn btn-primary">
					{isPending ? <span className="ml-2">Loading...</span> : 'Make Resume'}
				</button>
				<div className="my-8">
					<ShowResume />
				</div>
			</div>
		</div>
	);
};

export default ResumeBuilder;
