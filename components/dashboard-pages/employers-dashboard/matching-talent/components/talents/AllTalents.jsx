import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const AllTalents = ({candidate, selectJob}) => {
	const router = useRouter();

	return (
		<div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
			<div className="inner-box">
				<div className="content">
					<figure className="image">
						{candidate?.user?.photo && (
							<Image width={200} height={200} src={candidate.user.photo} alt="candidates" />
						)}
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
							<span className="icon flaticon-money"></span> ${candidate?.expected_salary}
						</li>
					</ul>
					{/* End candidate?-info */}

					<ul className="post-tags">
						{candidate?.skills?.map((val, i) => (
							<li className=" my-1" key={i}>
								<a href="#">{val}</a>
							</li>
						))}
					</ul>
				</div>
				{/* End content */}

				{selectJob?.job_id && (
					<div className="option-box">
						<ul className="option-list">
							<li>
								<button
									onClick={() => router.push(`/talents/${candidate?.talent_id}`)}
									data-text="View Talent"
								>
									<span className="la la-eye"></span>
								</button>
							</li>
						</ul>
					</div>
				)}
				{/* End admin options box */}
			</div>
		</div>
	);
};

export default AllTalents;
