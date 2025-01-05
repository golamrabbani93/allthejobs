'use client';
import {useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import AgoraRTCProvider to avoid SSR issues
const AgoraRTCProviderPrimitive = dynamic(
	() => import('agora-rtc-react').then(({AgoraRTCProvider}) => AgoraRTCProvider),
	{
		ssr: false,
	},
);

export default function AgoraRTCProvider({children}) {
	const clientConfig = {
		mode: 'rtc', // or 'live'
		codec: 'vp8', // or 'h264'
	};
	const clientConfigRef = useRef(clientConfig);
	const [client, setClient] = useState();

	useEffect(() => {
		const initSdk = async () => {
			const AgoraRTC = (await import('agora-rtc-react')).default;
			const rtcClient = AgoraRTC.createClient(clientConfigRef.current);
			setClient(rtcClient);
		};
		initSdk();
	}, []);

	return (
		client && <AgoraRTCProviderPrimitive client={client}>{children}</AgoraRTCProviderPrimitive>
	);
}
