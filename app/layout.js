'use client';
import "./globals.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/index.scss';
import {useEffect} from 'react';
import ScrollToTop from '../components/common/ScrollTop';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SessionProvider} from 'next-auth/react';
import PopUpModal from '@/components/PopUpModal/PopUpModal';
import Chat from '@/components/ai-assistant/AIChat';
import { AIChatContextProvider } from "./context/AIChatContext";


if (typeof window !== 'undefined') {
	require('bootstrap/dist/js/bootstrap');
}
const queryClient = new QueryClient();
export default function RootLayout({children}) {
	useEffect(() => {
		Aos.init({
			duration: 1400,
			once: true,
		});
	}, []);
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="keywords"
					content="	candidates, career, employment, indeed, job board, job listing, job portal, job postings, job search, job seeker, jobs, recruiters, recruiting, recruitment, resume, staffing, work , AllTheJob, AllTheJob - Find Jobs"
				/>
				<meta name="description" content="AllTheJob - Find Jobs" />

				<link rel="icon" href="./favicon.ico" />
			</head>
			<body>
				<SessionProvider>
					<QueryClientProvider QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<AIChatContextProvider>
							<div className="page-wrapper">
								<PopUpModal />
								<Chat></Chat>
								{children}
								{/* Toastify */}
								<ToastContainer
									position="bottom-right"
									autoClose={500}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
									theme="colored"
								/>
								{/* <!-- Scroll To Top --> */}
								<ScrollToTop />
							</div>
							</AIChatContextProvider>
						</Provider>
					</QueryClientProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
