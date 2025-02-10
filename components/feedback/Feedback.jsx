import ATJForm from '../form/ATJForm';
import ATJTextArea from '../form/ATJTextArea';
import ATJRating from '../form/ATJRating';
import {
	useGetFeedbacksQuery,
	usePostFeedbackMutation,
} from '@/features/feedback/feedback.management.api';
import {useSelector} from 'react-redux';
import Spinner from '../Sppiner/Spinner';
import {useState} from 'react';
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
	console.log('🚀🚀 ~ Feedback ~ myFeedbacks:', myFeedbacks);
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
	if (isFetching) {
		return (
			<div className="widget-content h-80 flex justify-center items-center">
				<Spinner size="sm" />
			</div>
		);
	}
	return (
		<div className="widget-content">
			<div className="flex justify-end items-center">
				{showFeedback ? (
					<button onClick={() => setShowFeedback(!showFeedback)} className="btn btn-danger">
						Close FeedBack
					</button>
				) : (
					<button onClick={() => setShowFeedback(!showFeedback)} className="btn btn-primary">
						Add FeedBack
					</button>
				)}
			</div>
			{showFeedback ? (
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
			) : (
				<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
					<span className="text-black"> You have no Feedback added !</span>
				</div>
			)}
		</div>
	);
};

export default Feedback;
