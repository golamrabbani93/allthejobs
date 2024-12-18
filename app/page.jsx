import Wrapper from '@/layout/Wrapper';
import Home from '@/components/home';
import TestAuth from '@/components/SessionWrapper/TestAuth';

export const metadata = {
	title: 'Home || AllTheJobs',
	description: 'AllTheJobs',
};

export default function page() {
	return (
		<Wrapper>
			<Home />
			{/* <TestAuth></TestAuth> */}
		</Wrapper>
	);
}
