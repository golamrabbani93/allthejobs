'use client';

import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {
	addCandidateGender,
	addCategory,
	addDatePost,
	addDestination,
	addKeyword,
	addLocation,
	addPerPage,
	addSort,
	clearExperienceF,
	clearQualificationF,
} from '../../../features/filter/candidateFilterSlice';
import {
	clearDatePost,
	clearExperience,
	clearQualification,
} from '../../../features/candidate/candidateSlice';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import {useState} from 'react';
import Loader from '@/components/Loader/Loader';

const FilterTopBox = () => {
	const {
		keyword,
		location,
		destination,
		category,
		candidateGender,
		datePost,
		experiences,
		qualifications,
		sort,
		perPage,
	} = useSelector((state) => state.candidateFilter) || {};
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const {talents, loading} = useSelector((state) => state.data);

	if (loading || talents?.length == 0) return <Loader />;

	// keyword filter
	const keywordFilter = (item) =>
		keyword !== ''
			? item?.user?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
			: item;

	// location filter
	const locationFilter = (item) =>
		location !== '' ? item?.country?.toLowerCase().includes(location?.toLowerCase()) : item;

	// gender filter
	const genderFilter = (item) =>
		candidateGender !== ''
			? item?.gender?.toLocaleLowerCase() === candidateGender?.toLocaleLowerCase() && item
			: item;

	// date-posted filter
	const datePostedFilter = (item) =>
		datePost !== 'all' && datePost !== ''
			? item?.created_at?.toLocaleLowerCase().split(' ').join('-').includes(datePost)
			: item;

	// experience filter
	const experienceFilter = (item) =>
		experiences?.length !== 0
			? experiences[0]?.toLocaleLowerCase() === item.experience?.toLocaleLowerCase()
			: item;

	// qualification filter
	const qualificationFilter = (item) =>
		qualifications?.length !== 0
			? qualifications[0]?.toLocaleLowerCase() === item.education_level?.toLocaleLowerCase()
			: item;

	// sort filter
	const sortFilter = (a, b) => (sort === 'des' ? a.id > b.id && -1 : a.id < b.id && -1);

	// Pagination logic
	const itemsPerPage = perPage.end === 0 ? 10 : perPage.end; // Items to display per page
	const totalPages = Math.ceil(
		// Total number of pages
		talents
			?.filter(keywordFilter)
			?.filter(locationFilter)
			?.filter(genderFilter)
			?.filter(experienceFilter)
			?.filter(qualificationFilter)
			?.sort(sortFilter)?.length / itemsPerPage,
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Calculate the start and end index for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Filter and slice the data for the current page
	let content = talents
		?.filter(keywordFilter)
		?.filter(locationFilter)
		?.filter(genderFilter)
		?.filter(experienceFilter)
		?.filter(qualificationFilter)
		?.sort(sortFilter)
		?.slice(startIndex, endIndex)
		?.map((candidate) => (
			<div className="candidate-block-three" key={candidate?.talent_id}>
				<div className="inner-box">
					<div className="content">
						<figure className="image">
							<Image
								width={90}
								height={90}
								src={
									candidate?.user?.photo ||
									'https://res.cloudinary.com/dolttvkme/image/upload/v1739084572/custom-avatar_llfgxl.png'
								}
								alt="candidates"
							/>
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
								<span className="icon flaticon-target"></span>${candidate.experience}
							</li>
						</ul>
						{/* End candidate-info */}

						<ul className="post-tags">
							{candidate?.tags?.map((val, i) => (
								<li key={i}>
									<a href="#">{val}</a>
								</li>
							))}
						</ul>
					</div>
					{/* End content */}

					<div className="btn-box">
						<Link href={`/talents/${candidate?.talent_id}`} className="theme-btn btn-style-three">
							<span className="btn-title">View Profile</span>
						</Link>
					</div>
					{/* End btn-box */}
				</div>
			</div>
		));

	// sort handler
	const sortHandler = (e) => {
		dispatch(addSort(e.target.value));
	};

	// per page handler
	const perPageHandler = (e) => {
		const pageData = JSON.parse(e.target.value);
		dispatch(addPerPage(pageData));
	};

	// clear handler
	const clearHandler = () => {
		dispatch(addKeyword(''));
		dispatch(addLocation(''));
		dispatch(addDestination({min: 0, max: 100}));
		dispatch(addCategory(''));
		dispatch(addCandidateGender(''));
		dispatch(addDatePost(''));
		dispatch(clearDatePost());
		dispatch(clearExperienceF());
		dispatch(clearExperience());
		dispatch(clearQualification());
		dispatch(clearQualificationF());
		dispatch(addSort(''));
		dispatch(addPerPage({start: 0, end: 0}));
	};

	return (
		<>
			<div className="ls-switcher">
				<div className="showing-result">
					<div className="show-1023">
						<button
							type="button"
							className="theme-btn toggle-filters "
							data-bs-toggle="offcanvas"
							data-bs-target="#filter-sidebar"
						>
							<span className="icon icon-filter"></span> Filter
						</button>
					</div>
					{/* Collapsible sidebar button */}

					<div className="text">
						Total: <strong>{content?.length} Talents</strong>
					</div>
				</div>
				{/* End showing-result */}

				<div className="sort-by">
					{keyword !== '' ||
					location !== '' ||
					destination.min !== 0 ||
					destination.max !== 100 ||
					category !== '' ||
					candidateGender !== '' ||
					datePost !== '' ||
					experiences?.length !== 0 ||
					qualifications?.length !== 0 ||
					sort !== '' ||
					perPage?.start !== 0 ||
					perPage?.end !== 0 ? (
						<button
							className="btn btn-danger text-nowrap me-2"
							style={{minHeight: '45px', marginBottom: '15px'}}
							onClick={clearHandler}
						>
							Clear All
						</button>
					) : undefined}

					{/* <select onChange={sortHandler} className="chosen-single form-select" value={sort}>
						<option value="">Sort by (default)</option>
						<option value="asc">Newest</option>
						<option value="des">Oldest</option>
					</select> */}
					{/* End select */}

					<select
						className="chosen-single form-select ms-3 "
						onChange={perPageHandler}
						value={JSON.stringify(perPage)}
					>
						<option
							value={JSON.stringify({
								start: 0,
								end: 0,
							})}
						>
							All
						</option>
						<option
							value={JSON.stringify({
								start: 0,
								end: 15,
							})}
						>
							15 per page
						</option>
						<option
							value={JSON.stringify({
								start: 0,
								end: 20,
							})}
						>
							20 per page
						</option>
						<option
							value={JSON.stringify({
								start: 0,
								end: 25,
							})}
						>
							25 per page
						</option>
					</select>
					{/* End select */}
				</div>
			</div>
			{/* End top filter bar box */}

			{content}

			<Pagination
				totalPages={totalPages}
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				content={content}
			/>
			{/* <!-- Listing Show More --> */}
		</>
	);
};

export default FilterTopBox;
