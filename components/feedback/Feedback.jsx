import ATJForm from '../form/ATJForm';
import ATJTextArea from '../form/ATJTextArea';
import ATJRating from '../form/ATJRating';
import {
	useGetFeedbacksQuery,
	usePostFeedbackMutation,
} from '@/features/feedback/feedback.management.api';
import {useSelector} from 'react-redux';
import Spinner from '../Sppiner/Spinner';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

const Feedback = () => {
	// State to toggle feedback form
	const [showFeedback, setShowFeedback] = useState(false);
	// Get user from redux store
	const user = useSelector((state) => state.user);
	// Mutation to post feedback
	const [postFeedback, {data, isLoading}] = usePostFeedbackMutation();
	// Query to get all feedbacks
	const {data: allFeedbacks, isFetching} = useGetFeedbacksQuery();
	//get my feedbacks
	const myFeedbacks = allFeedbacks?.filter((feedback) => feedback.user_id === user.user_id);
	const loading = false;

	const handleFeedBack = (data) => {
		if (data.rating === 0) {
			return toast.error('Please rate us');
		}
		if (data.feedback_message === '') {
			return toast.error('Please add feedback message');
		}

		const payload = {...data, user_id: user.user_id};
		postFeedback(payload);
	};

	useEffect(() => {
		if (data?.id) {
			setShowFeedback(false);
		}
	}, [data]);
	if (isFetching) {
		return (
			<div className="widget-content h-96 flex justify-center items-center">
				<Spinner size="sm" />
			</div>
		);
	}
	return (
		<div>
			<div className="flex justify-end items-center ">
				{showFeedback ? (
					<button onClick={() => setShowFeedback(!showFeedback)} className="btn btn-danger mt-5">
						Close FeedBack
					</button>
				) : (
					<button onClick={() => setShowFeedback(!showFeedback)} className="btn btn-primary mt-5">
						Add FeedBack
					</button>
				)}
			</div>
			{showFeedback ? (
				<>
					<div className="widget-title">
						<h4>Write A feedback</h4>
					</div>
					<ATJForm onSubmit={handleFeedBack}>
						<div className="default-form justify-center items-center flex flex-col">
							<div className="row w-3/5">
								<div className="form-group  col-md-12">
									<label>Rate Us</label>
									<ATJRating name="rating" />
								</div>
								<div className="form-group  col-md-12">
									<label>Feedback Message</label>
									<ATJTextArea disabled={loading} name="feedback_message" />
								</div>

								<div></div>

								<div className="form-group col-lg-6 col-md-12">
									<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
										{isLoading ? <Spinner size="sm" color="white" /> : 'Post Feedback'}
									</button>
								</div>
							</div>
						</div>
					</ATJForm>
				</>
			) : (
				<div>
					{myFeedbacks.length > 0 ? (
						<div className="tabs-box">
							<div className="widget-title">
								<h4>My Feedbacks</h4>
							</div>
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
											{myFeedbacks.map((feedback) => (
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
			)}
		</div>
	);
};

export default Feedback;
