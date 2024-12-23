'use client';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {useState} from 'react';
import FormContent2 from './FormContent2';

const LoginPopUpForm = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [userType, setUserType] = useState('talent');

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
			<h3>Login To Allthejobs Account</h3>
			<Tabs selectedIndex={selectedTab} onSelect={handleSelect}>
				<div className="form-group register-dual">
					<TabList className="btn-box row">
						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-custom-four btn-style-custom-one">
								<i className="la la-user"></i> Job Seeker
							</button>
						</Tab>

						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-custom-four btn-style-custom-two">
								<i className="la la-briefcase"></i> Employer
							</button>
						</Tab>
						<Tab className="col-lg-4 col-md-12">
							<button className="theme-btn btn-style-custom-four btn-style-custom-three">
								<i className="la la-briefcase"></i> Consultant
							</button>
						</Tab>
					</TabList>
				</div>
				{/* End .form-group */}

				<TabPanel>
					<FormContent2 modal={true} userType={userType} />
				</TabPanel>
				{/* End cadidates Form */}

				<TabPanel>
					<FormContent2 modal={true} userType={userType} />
				</TabPanel>
				{/* End Employer Form */}
				<TabPanel>
					<FormContent2 modal={true} userType={userType} />
				</TabPanel>
				{/* End Consultant Form */}
			</Tabs>
			{/* End form-group */}

			{/* <div className="bottom-box">
				<div className="text">
					Already have an account?{' '}
					<Link
						href="#"
						className="call-modal login"
						data-bs-toggle="modal"
						data-bs-dismiss="modal"
						data-bs-target="#registerModal"
					>
						Signup
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

export default LoginPopUpForm;
