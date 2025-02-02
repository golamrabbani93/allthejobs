'use client';

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useGetCallByID} from '../../hooks/useGetCallsById';
import {StreamCall, StreamTheme} from '@stream-io/video-react-sdk';
import MeetingSetup from '../../Components/MeetingSetup';
import MeetingRoom from '../../Components/MeetingRoom';
import {Card, CardContent} from '@/data/ui/card';
import {Button} from '@/data/ui/button';
import {useRouter} from 'next/navigation';
import './style.css';
const norms = [
	"Respect everyone's time.",
	'Stay on topic.',
	'Listen actively and avoid interruptions.',
	'Encourage constructive feedback.',
	'Keep discussions professional and inclusive.',
	'Be open to different perspectives.',
	'Avoid multitasking during the meeting.',
	'Follow up on action items promptly.',
];
const Meeting = ({params}) => {
	const router = useRouter();
	const [isSetupComplete, setIsSetupComplete] = useState(false);
	const [hasAcceptedMeetingNorm, setHasAcceptedMeetingNorm] = useState(false);
	const {call, isCallLoading} = useGetCallByID(params.id);
	if (isCallLoading) return <div>loading...</div>;
	if (!hasAcceptedMeetingNorm)
		return (
			<>
				<div className="p-6 max-w-lg mx-auto">
					<Card className="p-4 shadow-lg rounded-2xl border">
						<CardContent>
							<h2 className="text-xl font-semibold mb-4">Meeting Norms</h2>
							<ul className=" space-y-2 ">
								{norms.map((norm, index) => (
									<li key={index}>
										{index + 1}
										{'. ' + norm}
									</li>
								))}
							</ul>

							<div className="mt-4 flex gap-2">
								<Button
									className="bg-green-500 hover:bg-green-600 text-white"
									onClick={() => setHasAcceptedMeetingNorm(true)}
								>
									Accept
								</Button>
								<Button
									className="bg-red-500 hover:bg-red-600 text-white"
									onClick={() => router.push('/')}
								>
									Reject
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</>
		);
	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme className="light">
					{!isSetupComplete ? (
						<MeetingSetup setIsSetupComplete={setIsSetupComplete} />
					) : (
						<MeetingRoom meeting_id={params.id}></MeetingRoom>
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	);
	// <div>Meeting Room crated! with id - {params.id}</div>;
};

export default Meeting;
