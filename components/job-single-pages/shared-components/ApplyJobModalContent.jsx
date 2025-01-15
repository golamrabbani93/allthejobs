import ATJForm from '@/components/form/ATJForm';
import ATJTextArea from '@/components/form/ATJTextArea';
import Spinner from '@/components/Sppiner/Spinner';
import {useApplyJobMutation} from '@/features/application/application.management.api';
import {applyJobValidationSchema} from '@/schemas/applyJob.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
export const closeApplyJobModal = () => {
	const modalTrigger = document.getElementById('applyJobModalCloseBtn');
	if (modalTrigger) {
		modalTrigger.click();
	}
};
const ApplyJobModalContent = ({jobId}) => {
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	//apply job mutation
	const [applyJob, {data: applyJobData, isLoading}] = useApplyJobMutation();
	const handleApplyJob = (data) => {
		const payload = {
			job_id: jobId,
			feedback: data.feedback,
			status: 'applied',
			talent_id: userRoleBasedData?.talent_id,
		};
		applyJob(payload);
	};
	return (
		<div className="default-form ">
			<ATJForm onSubmit={handleApplyJob} resolver={zodResolver(applyJobValidationSchema)}>
				<div className="row">
					<div className="form-group col-md-12">
						<label>Write A Message</label>
						<ATJTextArea disabled={loading} name="feedback" />
					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 form-group">
						<button className="theme-btn btn-style-one w-100" type="submit">
							{isLoading ? <Spinner size="sm " color="white" /> : 'Apply Job'}
						</button>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default ApplyJobModalContent;
