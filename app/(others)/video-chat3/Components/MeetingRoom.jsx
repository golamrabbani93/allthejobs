import {cn} from '@/lib/utils';
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, {useEffect, useState} from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/data/ui/dropdown-menu';
import {LayoutList, MessageSquare, Users} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {
	Channel,
	ChannelHeader,
	Chat,
	MessageInput,
	VirtualizedMessageList,
	Window,
	useChatContext,
	useCreateChatClient,
} from 'stream-chat-react';
import './layout.css';
import 'stream-chat-react/dist/css/v2/index.css';
const MeetingRoom = ({meeting_id}) => {
	const [layout, setlayout] = useState('speaker-left');
	const [showParticipants, setShowParticipants] = useState(false);
	const CallLayout = () => {
		switch (layout) {
			case 'grid':
				return <PaginatedGridLayout />;

			case 'speaker-right':
				return <SpeakerLayout participantsBarPosition={'left'} />;
			default:
				return <SpeakerLayout participantsBarPosition={'right'} />;
		}
	};
	const {useCallCallingState} = useCallStateHooks();
	const callingState = useCallCallingState();
	const router = useRouter();
	useEffect(() => {
		if (callingState === CallingState.LEFT) {
			router.push('/');
		}
	}, [callingState, router]);
	// chat-part
	const [isChatVisible, setIsChatVisible] = useState(false);
	const {client: chatClient} = useChatContext();
	const [chatChannel, setChatChannel] = useState();
	useEffect(() => {
		const initChannel = async () => {
			if (chatClient.userID && !chatChannel) {
				const channel = chatClient.channel('livestream', meeting_id, {
					name: 'Video Chat',
					members: ['127'],
				});
				await channel.watch();
				setChatChannel(channel);
			}
		};

		initChannel();
	}, [chatClient, chatChannel]);

	return (
		<section className="custom-video relative h-screen w-full overflow-hidden p-4 pb-0 text-white bg-[#161925]">
			<div className="relative flex size-full items-center justify-center ">
				<div className="flex size-full  items-center">
					<CallLayout></CallLayout>
				</div>
				<div
					className={cn('h-[calc(100vh-86px)] w-96 px-4', {
						hidden: !showParticipants,
						block: showParticipants,
					})}
				>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>

				{isChatVisible && (
					<div
						className={cn('h-full  ml-4 z-50 w-96', {
							hidden: !isChatVisible,
							block: isChatVisible,
						})}
					>
						<Chat client={chatClient} theme="str-chat__theme-dark">
							<Channel channel={chatChannel}>
								<Window>
									<ChannelHeader live title="Chat" />
									<VirtualizedMessageList />
									<MessageInput focus />
								</Window>
							</Channel>
						</Chat>
					</div>
				)}
			</div>
			<div className="fixed bottom-0 flex w-full items-center justify-center gap-3">
				<CallControls></CallControls>
				<DropdownMenu>
					<div className="flex items-center">
						<DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-3 py-2 hover:bg-[#4c535b]">
							<LayoutList size={20} className="text-white" />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
						{['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
							<div key={index}>
								<DropdownMenuItem
									onClick={() => {
										setlayout(item.toLowerCase());
									}}
									className="cursor-pointer hover:bg-[#4c535b]"
								>
									{item}
								</DropdownMenuItem>
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				{/* <CallStatsButton></CallStatsButton> */}
				<button
					onClick={() => {
						setIsChatVisible(false);
						setShowParticipants((prev) => !prev);
					}}
				>
					<div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
						<Users size={20} className="text-white" />
					</div>
				</button>
				<button
					onClick={() => {
						setShowParticipants(false);
						setIsChatVisible((prev) => !prev);
					}}
				>
					<div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
						<MessageSquare size={20} className="text-white" />
					</div>
				</button>
			</div>
		</section>
	);
};

export default MeetingRoom;
