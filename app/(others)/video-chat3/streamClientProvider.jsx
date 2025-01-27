'use client';
import {setOSInfo, StreamVideo, StreamVideoClient} from '@stream-io/video-react-sdk';
import {useEffect, useState} from 'react';
import {tokenProvider} from '@/actions/stream.actions';
import {useSelector} from 'react-redux';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({children}) => {
	const [videoClient, setVideoClient] = useState(null);
	const [chatClient, setChatClient] = useState(null);
	const [isClient, setIsClient] = useState(false); // New state to detect client-side rendering
	const user = useSelector((state) => state.user);

	useEffect(() => {
		setIsClient(true); // Set client-side flag when component mounts

		const initializeClient = async () => {
			if (!user?.user_id) {
				console.warn('User is not logged in. Skipping client initialization.');
				return;
			}

			if (!apiKey) {
				console.error('Stream API key is missing.');
				return;
			}

			const userObject = {
				id: user.user_id.toString(),
				name: user.name,
				image: user.image,
			};

			try {
				const fetchedToken = await tokenProvider(userObject);

				// Initialize video client
				const videoClient = new StreamVideoClient({
					apiKey,
					user: userObject,
					token: fetchedToken,
				});
				setVideoClient(videoClient);

				// Initialize chat client
				const chatClient = new StreamChat(apiKey);
				await chatClient.connectUser(userObject, fetchedToken);
				setChatClient(chatClient);
			} catch (error) {
				console.error('Error initializing clients:', error);
			}
		};

		initializeClient();

		return () => {
			if (chatClient) {
				chatClient.disconnectUser();
				setChatClient(null);
			}
			setVideoClient(null);
		};
	}, [user]);

	if (!isClient) {
		return null; // Prevent rendering on the server
	}

	if (user?.user_id && videoClient && chatClient) {
		return (
			<Chat client={chatClient}>
				<StreamVideo client={videoClient}>{children}</StreamVideo>
			</Chat>
		);
	}

	return <>{children}</>;
};

export default StreamVideoProvider;
