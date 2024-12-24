'use client';
import {useEffect, useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import FormContent2 from './FormContent2';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import Spinner from '@/components/Sppiner/Spinner';
import {useDispatch} from 'react-redux';
import {setUser} from '@/features/user/userSlice';

const Login = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [userType, setUserType] = useState('talent');
	const router = useRouter();
	const dispatch = useDispatch();
	const {status} = useSession();

	if (status === 'loading') {
		//just keeping like this for the time being
		return <Spinner />;
	}

	const handleSelect = (index) => {
		if (index === 0) {
			setSelectedTab(0);
			setUserType('talent');
		} else if (index === 1) {
			setSelectedTab(1);
			setUserType('employer');
		} else {
			setSelectedTab(2);
			setUserType('consultant');
		}
	};

	return (
		<div className="form-inner">
			<h3>Login to Allthejobs Account</h3>

			<Tabs selectedIndex={selectedTab} onSelect={handleSelect}>
				<div className="form-group register-dual">
					<TabList className="btn-box row">
						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-four btn-style-custom-one">
								<i className="la la-user"></i> Job Seeker
							</button>
						</Tab>

						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-four btn-style-custom-two">
								<i className="la la-briefcase"></i> Employer
							</button>
						</Tab>
						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-four btn-style-custom-three">
								<i className="la la-briefcase"></i> Consultant
							</button>
						</Tab>
					</TabList>
				</div>
				{/* End .form-group */}

				<TabPanel>
					<FormContent2 userType={userType} />
				</TabPanel>
				{/* End cadidates Form */}

				<TabPanel>
					<FormContent2 userType={userType} />
				</TabPanel>
				{/* End Employer Form */}
				<TabPanel>
					<FormContent2 userType={userType} />
				</TabPanel>
				{/* End Consultant Form */}
			</Tabs>
			{/* End form-group */}

			{/* <div className="bottom-box">
				<div className="text">
					Already have an account?{' '}
					<Link href="/register" className="call-modal login">
						Signu
					</Link>
				</div>
				{userType === 'talent' && (
					<div>
						<div className="divider">
							<span>or</span>
						</div>
						<LoginWithSocial />
					</div>
				)}
			</div> */}
			{/* End bottom-box LoginWithSocial */}
		</div>
	);
};

export default Login;
