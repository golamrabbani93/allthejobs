import {useState} from 'react';
import ATJForm from '../form/ATJForm';
import ATJTextArea from '../form/ATJTextArea';
import ATJRating from '../form/ATJRating';

const Feedback = () => {
	const loading = false;
	const isLoading = false;
	const handleFeedBack = (data) => {
		// console.log(data);
	};

	return (
		<div className="widget-content">
			<ATJForm onSubmit={handleFeedBack}>
				<div className="default-form justify-center items-center flex flex-col">
					<div className="row w-3/5 ">
						<div className="form-group  col-md-12">
							<label>Rate Us</label>
							<ATJRating name="rating" />
						</div>
						<div className="form-group  col-md-12">
							<label>Feedback Message</label>
							<ATJTextArea disabled={loading} name="Feedback" />
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
		</div>
	);
};

export default Feedback;
