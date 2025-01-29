'use client';
import Spinner from '@/components/Sppiner/Spinner';
import AllTalents from './talents/AllTalents';
import {useSelector} from 'react-redux';

const WidgetContentBox = ({selectJob}) => {
	//get all talents
	const {talents, loading: talentsLoading} = useSelector((state) => state.data);

	//find matched talent by job skills and talent skills
	const matchedTalents = talents?.filter((talent) => {
		const jobSkills = selectJob?.skills_required;
		const talentSkills = talent?.skills;
		const matchedSkills = jobSkills?.filter((skill) => talentSkills?.includes(skill));
		return matchedSkills?.length > 0;
	});
	if (talentsLoading)
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	return (
		<div className="widget-content">
			<div className="tabs-box">
				<div className="aplicants-upper-bar d-block">
					{selectJob?.title ? (
						<h6 className="mb-5 text-center   flex justify-center items-center">
							{selectJob?.title ||
								'Please select a job to view detailed matched talent information.'}
						</h6>
					) : (
						<h6 className="mb-5 text-center h-40 flex justify-center items-center">
							{selectJob?.title ||
								'Please select a job to view detailed matched talent information.'}
						</h6>
					)}
				</div>
				<div className="row">
					{matchedTalents?.length > 0 ? (
						matchedTalents.map((candidate) => (
							<AllTalents key={candidate.talent_id} candidate={candidate} selectJob={selectJob} />
						))
					) : (
						<div className="flex justify-center items-center h-40">
							{selectJob?.title && <div>No Talents Found</div>}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WidgetContentBox;
