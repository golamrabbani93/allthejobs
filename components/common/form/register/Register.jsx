'use client';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import LoginWithSocial from './LoginWithSocial';
import Form from './FormContent';
import Link from 'next/link';
import {useState} from 'react';

const Register = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [userType, setUserType] = useState('jobSeeker');

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
			<h3>Create a Free Allthejobs Account</h3>

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
					<Form userType={userType} />
				</TabPanel>
				{/* End cadidates Form */}

				<TabPanel>
					<Form userType={userType} />
				</TabPanel>
				{/* End Employer Form */}
				<TabPanel>
					<Form userType={userType} />
				</TabPanel>
				{/* End Consultant Form */}
			</Tabs>
			{/* End form-group */}

			<div className="bottom-box">
				<div className="text">
					Already have an account?{' '}
					<Link
						href="#"
						className="call-modal login"
						data-bs-toggle="modal"
						data-bs-dismiss="modal"
						data-bs-target="#loginPopupModal"
					>
						LogIn
					</Link>
				</div>
				{userType === 'jobSeeker' && (
					<div>
						<div className="divider">
							<span>or</span>
						</div>
						<LoginWithSocial />
					</div>
				)}
			</div>
			{/* End bottom-box LoginWithSocial */}
		</div>
	);
};

export default Register;
