import dynamic from 'next/dynamic';

const Basics = dynamic(() => import('./Basics'), {
	ssr: false, // This ensures the component is not SSR'd
});

const Page = () => {
	return <Basics />;
};

export default Page;
