'use client';
import {
	LocalUser,
	RemoteUser,
	useIsConnected,
	useJoin,
	useLocalMicrophoneTrack,
	useLocalCameraTrack,
	usePublish,
	useRemoteUsers,
} from 'agora-rtc-react';
import {useState} from 'react';
import './style.css';
import {
	Mic,
	MicOff,
	Video,
	VideoOff,
	MessageCircleMore,
	Share,
	Users,
	Ellipsis,
	User,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {ssr: false});
const Sidebar = dynamic(() => import('./Sidebar'), {ssr: false});

const Basics = () => {
	const [calling, setCalling] = useState(false);
	const isConnected = useIsConnected();
	const [channel, setChannel] = useState('');
	const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
	const token = process.env.NEXT_PUBLIC_AGORA_TOKEN;

	const joinConfig = {appid: appId, channel: channel, token: token ? token : null};
	useJoin(joinConfig, calling);

	// local user
	const [micOn, setMic] = useState(false);
	const [cameraOn, setCamera] = useState(false);
	const [sharingScreen, setSharingScreen] = useState(false);

	// Handle leaving the call
	const handleLeave = async () => {
		setCalling((prev) => !prev);
	};

	return (
		<div className="h-screen flex flex-col">
			<div className="flex-grow overflow-hidden">
				{isConnected ? (
					<div className="flex h-full">
						<div className="w-full">
							<VideoPlayer micOn={micOn} cameraOn={cameraOn}></VideoPlayer>
						</div>
						{/* <div className="w-1/5 bg-gray-300">
							<Sidebar />
						</div> */}
					</div>
				) : (
					<div className="join-room">
						<input
							onChange={(e) => setChannel(e.target.value)}
							placeholder="<Your channel Name>"
							value={channel}
						/>
						<button className="join-channel" disabled={!channel} onClick={() => setCalling(true)}>
							<span>Join Channel</span>
						</button>
					</div>
				)}
			</div>

			{/* Control section */}
			{isConnected && (
				<div className="bottom-0 w-full border flex justify-between h-20 p-2">
					<div className="mx-auto">
						<button className="btn" onClick={() => setMic((prev) => !prev)}>
							{micOn ? (
								<Mic className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
							) : (
								<MicOff className="bg-[#EB5757] rounded-full text-white p-3" size={54} />
							)}
						</button>

						<button className="btn outline-none" onClick={() => setCamera((prev) => !prev)}>
							{cameraOn ? (
								<Video className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
							) : (
								<VideoOff className="bg-[#EB5757] rounded-full text-white p-3" size={54} />
							)}
						</button>

						<button className="btn outline-none" onClick={() => setSharingScreen((prev) => !prev)}>
							{sharingScreen ? (
								<Share className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
							) : (
								<Share className="bg-[#EB5757] rounded-full text-white p-3" size={54} />
							)}
						</button>

						<button className="btn outline-none">
							<MessageCircleMore className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
						</button>

						<button className="btn outline-none">
							<User className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
						</button>

						<button className="btn outline-none">
							<Ellipsis className="bg-[#0060FF] rounded-full text-white p-3" size={54} />
						</button>
					</div>

					<button
						className="bg-[#EB5757] mr-4 px-10 py-3 rounded-3xl text-white text-sm self-center"
						onClick={handleLeave}
					>
						End Call
					</button>
				</div>
			)}
		</div>
	);
};

export default Basics;
