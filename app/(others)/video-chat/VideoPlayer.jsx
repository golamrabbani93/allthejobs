'use client';

import {
	LocalUser,
	RemoteUser,
	useLocalMicrophoneTrack,
	useLocalCameraTrack,
	usePublish,
	useRemoteUsers,
} from 'agora-rtc-react';
import './style.css';
import hackerImg from './hacker.png';

const VideoPlayer = ({micOn, cameraOn}) => {
	const {localMicrophoneTrack} = useLocalMicrophoneTrack(micOn);
	const {localCameraTrack} = useLocalCameraTrack(cameraOn);
	usePublish([localMicrophoneTrack, localCameraTrack]);
	const remoteUsers = useRemoteUsers();

	return (
		<div className="h-full w-full p-4">
			<div
				className={`grid gap-4 w-full h-full
				${remoteUsers.length === 0 && 'grid-cols-1'}
				${remoteUsers.length === 1 && 'grid-cols-2'}
				${remoteUsers.length === 2 && 'grid-cols-2 grid-rows-2'}
				${remoteUsers.length > 2 && 'grid-cols-3 grid-rows-2'}
				sm:auto-rows-fr
			`}
			>
				{/* Local User */}
				<div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
					<LocalUser
						audioTrack={localMicrophoneTrack}
						cameraOn={cameraOn}
						micOn={micOn}
						videoTrack={localCameraTrack}
						cover={hackerImg.src}
					>
						<span className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-white text-sm">
							You
						</span>
					</LocalUser>
				</div>

				{/* Remote Users */}
				{remoteUsers.map((user) => (
					<div
						key={user.uid}
						className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden"
					>
						<RemoteUser cover={hackerImg.src} user={user}>
							<span className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-white text-sm">
								User {user.uid}
							</span>
						</RemoteUser>
					</div>
				))}
			</div>
		</div>
	);
};

export default VideoPlayer;
