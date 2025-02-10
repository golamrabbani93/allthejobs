'use client';
import Spinner from '@/components/Sppiner/Spinner';
import {useGetFeedbacksQuery} from '@/features/feedback/feedback.management.api';

const Feedback = () => {
	// Query to get all feedbacks
	const {data: allFeedbacks, isFetching} = useGetFeedbacksQuery();
	console.log('🚀🚀 ~ Feedback ~ allFeedbacks:', allFeedbacks);

	if (isFetching) {
		return (
			<div className="widget-content h-96 flex justify-center items-center">
				<Spinner size="sm" />
			</div>
		);
	}
	return (
		<div>
			<div>
				{allFeedbacks?.length > 0 ? (
					<div className="tabs-box">
						<div className="widget-content">
							<div className="table-outer">
								<table className="default-table manage-job-table">
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Rating</th>
											<th>Feedback Message</th>
										</tr>
									</thead>
									<tbody>
										{allFeedbacks.map((feedback) => (
											<tr key={feedback.id}>
												<td>{feedback.user.name}</td>
												<td>{feedback.user.email}</td>
												<td>{feedback.rating}</td>
												<td>{feedback.feedback_message}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				) : (
					<div className="bg-white rounded-lg h-96 flex justify-center items-center">
						<span className="text-primary font-bold"> You have no Feedback added !</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Feedback;
