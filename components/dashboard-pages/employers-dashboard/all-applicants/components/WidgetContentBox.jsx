'use client';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import {useGetAllApplicationsQuery} from '@/features/application/application.management.api';
import {useGetAllTalentsQuery} from '@/features/candidate/talent.management.api';
import Spinner from '@/components/Sppiner/Spinner';
import AllTalents from './talents/AllTalents';
import ShortListTalents from './talents/ShortListTalents';
import InterviewingTalents from './talents/InterviewingTalents';
import HiredTalents from './talents/HiredTalents';
import RejectedTalents from './talents/RejectedTalents';
import {useSelector} from 'react-redux';

const WidgetContentBox = ({selectJob}) => {
	const {jobs, userRoleBasedData, loading} = useSelector((state) => state.data);

	const credits = Number(userRoleBasedData?.credits);
	//get all talents
	const {data: talents, isLoading: talentsLoading} = useGetAllTalentsQuery();
	//get all applicants
	const {data: allApplicants, isLoading: applicantLoading} = useGetAllApplicationsQuery();
	const applicants = allApplicants?.filter((applicant) => applicant?.job_id === selectJob?.job_id);
	const appliedTalents = applicants?.map((applicant) =>
		talents.find((talent) => talent?.talent_id === applicant?.talent_id),
	);
	const getShortListed = applicants?.filter((applicant) => applicant?.status === 'short-listed');
	const getInterviewListed = applicants?.filter(
		(applicant) => applicant?.status === 'interviewing',
	);
	const getHired = applicants?.filter((applicant) => applicant?.status === 'hired');
	const getRejected = applicants?.filter((applicant) => applicant?.status === 'expired');

	//get all talents
	const allAppliedTalents = allApplicants
		?.map((applicant) => {
			const job = jobs.find(
				(job) =>
					job.job_id === applicant.job_id && job.employer_id === userRoleBasedData.employer_id,
			);

			if (!job) {
				return undefined; // Skip if no matching job is found
			}

			return talents.find((talent) => talent?.talent_id === applicant?.talent_id);
		})
		.filter(
			(talent, index, self) =>
				talent !== undefined && self.findIndex((t) => t?.talent_id === talent?.talent_id) === index,
		);

	//find shortlisted talents by applicants id
	const shortListedTalents = getShortListed?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	//getInterviewListed talents
	// const interviewListedTalents = getInterviewListed?.map((applicant) =>
	// 	talents.find((talent) => talent.talent_id === applicant.talent_id),
	// );

	//get Hired Talents
	// const hiredTalents = getHired?.map((applicant) =>
	// 	talents.find((talent) => talent.talent_id === applicant.talent_id),
	// );

	//get Rejected Talents

	const rejectedTalents = getRejected?.map((applicant) =>
		talents.find((talent) => talent.talent_id === applicant.talent_id),
	);

	if (talentsLoading || applicantLoading || loading)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="widget-content">
			<div className="tabs-box">
				<Tabs>
					<div className="aplicants-upper-bar d-block">
						<h6 className="mb-5 text-center ">
							{selectJob?.title || 'Please select a job to view detailed applicant information.'}
						</h6>

						<TabList className="aplicantion-status tab-buttons clearfix">
							<Tab className="tab-btn totals">
								Total(s): {applicants?.length > 0 ? applicants?.length : allAppliedTalents?.length}
							</Tab>
							{selectJob?.job_id && (
								<>
									<Tab className="tab-btn approved"> Short Lists: {getShortListed?.length}</Tab>
									{/* <Tab className="tab-btn approved">Interviewing: {getInterviewListed?.length}</Tab>
									<Tab className="tab-btn approved"> Hired: {getHired?.length}</Tab> */}
									<Tab className="tab-btn rejected"> Rejected(s): {getRejected?.length}</Tab>
								</>
							)}
						</TabList>
					</div>

					<div className="tabs-content">
						<TabPanel>
							<div className="row">
								{appliedTalents?.length > 0 ? (
									appliedTalents.map((candidate) => (
										<AllTalents
											key={candidate.talent_id}
											candidate={candidate}
											applicants={applicants}
											selectJob={selectJob}
											credits={credits}
										/>
									))
								) : allAppliedTalents?.length > 0 ? (
									allAppliedTalents.map((candidate) => (
										<AllTalents
											key={candidate.talent_id}
											candidate={candidate}
											applicants={applicants}
											selectJob={selectJob}
											credits={credits}
										/>
									))
								) : (
									<div className="flex justify-center items-center h-40">
										<div>No Applicants</div>
									</div>
								)}
							</div>
						</TabPanel>
						{/* End total applicants */}
						{selectJob?.job_id && (
							<>
								<TabPanel>
									<div className="row">
										{shortListedTalents?.length > 0 ? (
											shortListedTalents?.map((candidate) => (
												<ShortListTalents
													key={candidate?.talent_id}
													candidate={candidate}
													applicants={applicants}
													selectJob={selectJob}
													credits={credits}
												/>
											))
										) : (
											<div className="flex justify-center items-center h-40">
												<div className="">No Shortlisted Applicants</div>
											</div>
										)}
									</div>
								</TabPanel>
								{/* End Shortlisted applicants */}
								{/* <TabPanel>
									<div className="row">
										{interviewListedTalents?.length > 0 ? (
											interviewListedTalents?.map((candidate) => (
												<InterviewingTalents
													key={candidate?.talent_id}
													candidate={candidate}
													applicants={applicants}
													selectJob={selectJob}
												/>
											))
										) : (
											<div className="flex justify-center items-center h-40">
												<div className="">No Applicants</div>
											</div>
										)}
									</div>
								</TabPanel> */}
								{/* End InterViewing applicants */}
								{/* <TabPanel>
									<div className="row">
										{hiredTalents?.length > 0 ? (
											hiredTalents?.map((candidate) => (
												<HiredTalents
													key={candidate?.talent_id}
													candidate={candidate}
													applicants={applicants}
													selectJob={selectJob}
												/>
											))
										) : (
											<div className="flex justify-center items-center h-40">
												<div className="">No Applicants</div>
											</div>
										)}
									</div>
								</TabPanel> */}
								{/* End Hired applicants */}
								<TabPanel>
									<div className="row">
										{rejectedTalents?.length > 0 ? (
											rejectedTalents?.map((candidate) => (
												<RejectedTalents
													key={candidate?.talent_id}
													candidate={candidate}
													applicants={applicants}
													selectJob={selectJob}
													credits={credits}
												/>
											))
										) : (
											<div className="flex justify-center items-center h-40">
												<div className="">No Rejected Applicants</div>
											</div>
										)}
									</div>
								</TabPanel>
								{/* End rejected applicants */}
							</>
						)}
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default WidgetContentBox;
