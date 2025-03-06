'use client';

import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {
	addCategory,
	addDatePosted,
	addDestination,
	addKeyword,
	addLocation,
	addPerPage,
	addSalary,
	addSort,
	addTag,
	clearExperience,
	clearJobType,
} from '../../../features/filter/filterSlice';
import {
	clearDatePostToggle,
	clearExperienceToggle,
	clearJobTypeToggle,
} from '../../../features/job/jobSlice';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import {
	addJobToWishlist,
	removeJobFromWishlist,
} from '@/features/wishlistJobsSlice/wishlistJobsSlice';
import Loader from '@/components/Loader/Loader';
import {timeCategory} from '@/utils/timeCategory';
import {useState} from 'react';

const FilterJobsBox = () => {
	//get jobs data in redux
	const {jobs, loading} = useSelector((state) => state.data);

	const {jobList, jobSort} = useSelector((state) => state.filter);
	const [currentPage, setCurrentPage] = useState(1);
	const {keyword, location, destination, category, jobType, datePosted, experience, salary, tag} =
		jobList || {};
	console.log('🚀🚀 ~ FilterJobsBox ~ location:', location);

	const {sort, perPage} = jobSort;

	const dispatch = useDispatch();

	const wishListJobs = useSelector((state) => state.wishlistJobs.wishlist);

	// keyword filter on title
	const keywordFilter = (item) =>
		keyword !== '' ? item.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) : item;

	// location filter
	const locationFilter = (item) =>
		location !== ''
			? item?.employer?.country?.toLowerCase().includes(location?.toLowerCase())
			: item;

	// location filter
	const destinationFilter = (item) =>
		item?.destination?.min >= destination?.min && item?.destination?.max <= destination?.max;

	// category filter
	const categoryFilter = (item) =>
		category !== '' ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase() : item;

	// job-type filter
	const jobTypeFilter = (item) =>
		jobType?.length !== 0 && item?.job_type !== undefined
			? jobType?.includes(item?.job_type.toLocaleLowerCase().split(' ').join('-'))
			: item;

	// date-posted filter
	const datePostedFilter = (item) => {
		if (datePosted !== 'all' && datePosted !== '') {
			const times = timeCategory(item.created_at).toLocaleLowerCase().split(' ').join('-');
			return times.includes(datePosted);
		}
		return item;
	};

	// experience level filter
	const experienceFilter = (item) =>
		experience?.length !== 0
			? experience?.includes(item?.experience_level?.split(' ').join('-').toLocaleLowerCase())
			: item;

	// salary filter
	// 4500-7000 get first salary
	const salaryFilter = (item) => {
		const salaryRange = item?.salary_range?.split('-');
		if (salaryRange?.length > 1) {
			const min = Number(salaryRange[0]);
			const max = Number(salaryRange[1]);
			return salary.min <= min && salary && max <= salary.max;
		}
	};

	// tag filter
	const tagFilter = (item) => (tag !== '' ? item?.tag === tag : item);

	// sort filter
	const sortFilter = (a, b) => (sort === 'des' ? a.id > b.id && -1 : a.id < b.id && -1);

	// Pagination logic
	const itemsPerPage = perPage.end === 0 ? 10 : perPage.end; // Items to display per page
	const totalPages = Math.ceil(
		// Total number of pages
		jobs
			?.filter(keywordFilter)
			?.filter(locationFilter)
			?.filter(jobTypeFilter)
			?.filter(datePostedFilter)
			?.filter(experienceFilter)
			?.filter(salaryFilter)?.length / itemsPerPage,
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Calculate the start and end index for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	if (loading) return <Loader />;
	let content = jobs
		?.filter(keywordFilter)
		?.filter(locationFilter)
		?.filter(jobTypeFilter)
		?.filter(datePostedFilter)
		?.filter(experienceFilter)
		?.filter(salaryFilter)
		?.slice(startIndex, endIndex)
		?.map((item) => {
			// check wish list item
			const isWishListJob = wishListJobs.find((wishItem) => wishItem.job_id === item.job_id);
			return (
				<div className="job-block" key={item.job_id}>
					<div className="inner-box">
						<div className="content">
							<span className="company-logo">
								<Image width={50} height={49} src={item.employer.user.photo} alt="item brand" />
							</span>
							<h4>
								<Link href={`/jobs/${item.job_id}`}>{item.title}</Link>
							</h4>

							<ul className="job-info">
								<li>
									<span className="icon flaticon-briefcase"></span>
									{item.employer.company_name}
								</li>
								{/* compnay info */}
								<li>
									<span className="icon flaticon-map-locator"></span>
									{item.employer.country}
								</li>
								{/* location info */}
								<li>
									<span className="icon flaticon-clock-3"></span> {item.job_type}
								</li>
								{/* time info */}
								<li>
									<span className="icon flaticon-money"></span> $ {item.salary_range}
								</li>
								{/* salary info */}
							</ul>
							{/* End .job-info */}

							<ul className="job-other-info">
								{item?.jobType?.map((val, i) => (
									<li key={i} className={`${val.styleClass}`}>
										{val.type}
									</li>
								))}
							</ul>
							{/* End .job-other-info */}

							{isWishListJob ? (
								<button
									onClick={() => dispatch(removeJobFromWishlist(item))}
									className="bookmark-btn d-flex align-items-center justify-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										version="1.1"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										width="15"
										height="36"
										x="0"
										y="0"
										viewBox="0 0 212.045 212.045"
										style={{enableBackground: 'new 0 0 512 512'}}
										xmlSpace="preserve"
										className=""
									>
										<g>
											<path
												d="M167.871 0H44.84C34.82 0 26.022 8.243 26.022 18v182c0 3.266.909 5.988 2.374 8.091a9.204 9.204 0 0 0 7.598 3.954c2.86 0 5.905-1.273 8.717-3.675l55.044-46.735c1.7-1.452 4.142-2.284 6.681-2.284 2.538 0 4.975.832 6.68 2.288l54.86 46.724c2.822 2.409 5.657 3.683 8.512 3.683 4.828 0 9.534-3.724 9.534-12.045V18c0-9.757-8.131-18-18.151-18z"
												fill="#000000"
												opacity="1"
												data-original="#000000"
											></path>
										</g>
									</svg>
								</button>
							) : (
								<button onClick={() => dispatch(addJobToWishlist(item))} className="bookmark-btn">
									<span className="flaticon-bookmark"></span>
								</button>
							)}
						</div>
					</div>
				</div>
				// End all jobs
			);
		});

	// sort handler
	const sortHandler = (e) => {
		dispatch(addSort(e.target.value));
	};

	// per page handler
	const perPageHandler = (e) => {
		const pageData = JSON.parse(e.target.value);
		dispatch(addPerPage(pageData));
	};

	// clear all filters
	const clearAll = () => {
		dispatch(addKeyword(''));
		dispatch(addLocation(''));
		dispatch(addDestination({min: 0, max: 100}));
		dispatch(addCategory(''));
		dispatch(clearJobType());
		dispatch(clearJobTypeToggle());
		dispatch(addDatePosted(''));
		dispatch(clearDatePostToggle());
		dispatch(clearExperience());
		dispatch(clearExperienceToggle());
		dispatch(addSalary({min: 0, max: 20000}));
		dispatch(addTag(''));
		dispatch(addSort(''));
		dispatch(addPerPage({start: 0, end: 0}));
	};

	return (
		<>
			<div className="ls-switcher">
				<div className="show-result">
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
						Show <strong>{content?.length}</strong> jobs
					</div>
				</div>
				{/* End show-result */}

				<div className="sort-by">
					{keyword !== '' ||
					location !== '' ||
					destination?.min !== 0 ||
					destination?.max !== 100 ||
					category !== '' ||
					jobType?.length !== 0 ||
					datePosted !== '' ||
					experience?.length !== 0 ||
					salary?.min !== 0 ||
					salary?.max !== 20000 ||
					tag !== '' ||
					sort !== '' ||
					perPage.start !== 0 ||
					perPage.end !== 0 ? (
						<button
							onClick={clearAll}
							className="btn btn-danger text-nowrap me-2"
							style={{minHeight: '45px', marginBottom: '15px'}}
						>
							Clear All
						</button>
					) : undefined}

					{/* End select */}

					<select
						onChange={perPageHandler}
						className="chosen-single form-select ms-3 "
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
								end: 10,
							})}
						>
							10 per page
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
								end: 30,
							})}
						>
							30 per page
						</option>
					</select>
					{/* End select */}
				</div>
			</div>
			{/* End top filter bar box */}
			{content}
			{/* <!-- List Show More --> */}

			<Pagination
				totalPages={totalPages}
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				content={content}
			/>
		</>
	);
};

export default FilterJobsBox;
