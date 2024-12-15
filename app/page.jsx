import Wrapper from '@/layout/Wrapper';
import Home from '@/components/home';

export const metadata = {
	title: 'Home || AllTheJobs',
	description: 'AllTheJobs',
};

export default function page() {
	return (
		<Wrapper>
			<Home />
		</Wrapper>
	);
}
