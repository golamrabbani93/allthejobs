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

export default function AgoraRTCProvider({clientConfig, children}) {
	const clientConfigRef = useRef(clientConfig);
	const [client, setClient] = useState();

	useEffect(() => {
		const initSdk = async () => {
			const AgoraRTC = (await import('agora-rtc-react')).default;
			setClient(AgoraRTC.createClient(clientConfigRef.current));
		};
		initSdk();
	}, []);

	return (
		client && <AgoraRTCProviderPrimitive client={client}>{children}</AgoraRTCProviderPrimitive>
	);
}
