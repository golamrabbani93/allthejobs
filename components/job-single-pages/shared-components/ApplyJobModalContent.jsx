import Spinner from '@/components/Sppiner/Spinner';
import {useApplyJobMutation} from '@/features/application/application.management.api';
import {useSelector} from 'react-redux';
export const closeApplyJobModal = () => {
	const modalTrigger = document.getElementById('applyJobModalCloseBtn');
	if (modalTrigger) {
		modalTrigger.click();
	}
};
const ApplyJobModalContent = ({jobId}) => {
	const {userRoleBasedData} = useSelector((state) => state.data);
	//apply job mutation
	const [applyJob, {isLoading}] = useApplyJobMutation();
	const handleApplyJob = () => {
		const payload = {
			job_id: jobId,
			status: 'applied',
			talent_id: userRoleBasedData?.talent_id,
		};
		applyJob(payload);
	};
	return (
		<div className="default-form mt-10">
			<div className="row">
				<div className="col-6 form-group">
					<button
						onClick={() => handleApplyJob()}
						className="btn btn-primary w-10 h-10"
						type="submit"
					>
						{isLoading ? <Spinner size="sm " color="white" /> : 'Apply Job'}
					</button>
				</div>
				<div className="col-6 form-group">
					<button
						onClick={() => closeApplyJobModal()}
						className="btn w-10 btn-danger  h-10"
						type="submit"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApplyJobModalContent;
