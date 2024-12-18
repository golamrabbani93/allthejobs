import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const RIghtRegisterButtons = () => {
	const {data:session}=useSession()
	return (<>
	{session?<>
		<div className="d-flex flex-column flex-xl-row align-items-center text-center text-xl-start">
			<h6 >Welcome</h6>
			<h6 className='m-4'>{session?.user.name}</h6>
			<button onClick={()=>signOut()}  className="btn btn-custom btn-consultant mx-2 my-1 my-xl-0" >Sign Out</button>
		</div>
	
	

	</>:
	<>
		<div className="d-flex flex-column flex-xl-row align-items-center text-center text-xl-start">
			<span className="custom-text mb-3 mb-xl-0 me-xl-3">I'm a</span>

			<Link href="/register" className="btn btn-custom btn-job-seeker mx-2 my-1 my-xl-0">
				Job Seeker
			</Link>

			<Link href="/register" className="btn btn-custom btn-employer mx-2 my-1 my-xl-0">
				Employer
			</Link>
			<Link href="/register" className="btn btn-custom btn-consultant mx-2 my-1 my-xl-0">
				Consultant
			</Link>
		</div>

	</>}
		</>
	);
};

export default RIghtRegisterButtons;
