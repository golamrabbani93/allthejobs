'use client';
import {useDispatch, useSelector} from 'react-redux';
import {addExperienceCheck} from '../../../features/candidate/candidateSlice';
import {addExperience} from '../../../features/filter/candidateFilterSlice';
import {experienceOptions} from '@/data/formSelectData';

const Experience = () => {
	const {experience} = useSelector((state) => state.candidate) || {};
	const dispatch = useDispatch();

	// experience handler
	const experienceHandler = (e, id) => {
		dispatch(addExperienceCheck(id));
		dispatch(addExperience(e.target.value));
	};
	return (
		<ul className="switchbox">
			{experience?.map((item) => (
				<li key={item.id}>
					<label className="switch">
						<input
							type="checkbox"
							checked={item.isChecked}
							value={item.value}
							onChange={(e) => experienceHandler(e, item.id)}
						/>
						<span className="slider round"></span>
						<span className="title">{item.label}</span>
					</label>
				</li>
			))}
		</ul>
	);
};

export default Experience;
