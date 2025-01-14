import {useUpdateApplicationStatusMutation} from '@/features/application/application.management.api';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const InterviewingTalents = ({candidate, applicants, selectJob}) => {
	const router = useRouter();
	//update applicant status
	const [updateApplicantStatus, {data, isLoading: updateAppLoading}] =
		useUpdateApplicationStatusMutation();
	//handel make shortlist
	const handleMakeShortList = (candidate) => {
		const getApplication = applicants.find(
			(applicant) => applicant.talent_id === candidate.talent_id,
		);
		const payload = {
			job_application_id: getApplication?.job_application_id,
			job_id: getApplication?.job_id,
			status: 'short-listed',
			talent_id: getApplication?.talent_id,
		};

		updateApplicantStatus(payload);
	};
	return (
		<div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
			<div className="inner-box">
				<div className="content">
					<figure className="image">
						{candidate?.user?.photo && (
							<Image width={90} height={90} src={candidate.user.photo} alt="candidates" />
						)}
					</figure>
					<h4 className="name">
						<Link href={`/talents/${candidate?.talent_id}`}>{candidate?.user?.name}</Link>
					</h4>

					<ul className="candidate-info">
						<li className="designation">{candidate?.headline}</li>
						<li>
							<span className="icon flaticon-map-locator"></span> {candidate?.country}
						</li>
						<li>
							<span className="icon flaticon-money"></span> ${candidate?.expected_salary}
						</li>
					</ul>
					{/* End candidate?-info */}

					<ul className="post-tags">
						{candidate?.skills?.map((val, i) => (
							<li key={i}>
								<a href="#">{val}</a>
							</li>
						))}
					</ul>
				</div>
				{/* End content */}

				{selectJob?.job_id && (
					<div className="option-box">
						<ul className="option-list">
							<li>
								<button
									onClick={() => router.push(`/talents/${candidate?.talent_id}`)}
									data-text="View Talent"
								>
									<span className="la la-eye"></span>
								</button>
							</li>
							<li>
								{updateAppLoading ? (
									<button data-text="Loading...">
										<span className="la la-spinner la-spin"></span>
									</button>
								) : (
									<button onClick={() => handleMakeShortList(candidate)} data-text="Make Shortlist">
										<span className="la la-check"></span>
									</button>
								)}
							</li>
							<li>
								<button data-text="Reject Application">
									<span className="la la-times-circle"></span>
								</button>
							</li>
						</ul>
					</div>
				)}
				{/* End admin options box */}
			</div>
		</div>
	);
};

export default InterviewingTalents;
