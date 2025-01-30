import {X} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const AllTalents = ({candidate, selectJob}) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const credits = 0;
	return (
		<div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
			<div className="inner-box">
				<div className="content">
					<figure className="image">
						{candidate?.user?.photo && (
							<Image
								className={`${credits === 0 ? 'blur-md' : ''}`}
								width={200}
								height={200}
								src={candidate.user.photo}
								alt="candidates"
							/>
						)}
					</figure>
					<h4 className="name">
						{credits === 0 ? (
							<span className="blur-sm">{candidate?.user?.name}</span>
						) : (
							<Link href={`/talents/${candidate?.talent_id}`}>{candidate?.user?.name}</Link>
						)}
					</h4>

					<ul className={`candidate-info ${credits === 0 ? 'blur-sm' : ''}`}>
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
								<span>{val}</span>
							</li>
						))}
					</ul>
				</div>
				{/* End content */}

				{selectJob?.job_id && (
					<div className="option-box">
						<ul className="option-list">
							<li>
								{credits === 0 ? (
									<button onClick={() => setIsOpen(true)} data-text="View Talent">
										<span className="la la-eye"></span>
									</button>
								) : (
									<button
										onClick={() => router.push(`/talents/${candidate?.talent_id}`)}
										data-text="View Talent"
									>
										<span className="la la-eye"></span>
									</button>
								)}
							</li>
						</ul>
						{isOpen && (
							<div className="fixed top-0 left-0 z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
								{/* Modal Box */}
								<div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
									{/* Modal Header */}
									<div className="flex justify-between items-center mb-3">
										<h2 className="text-lg font-bold">See Talent</h2>
										<button onClick={() => setIsOpen(false)}>
											<X className="w-6 h-6 font-bold hover:text-red-600 transition-all duration-300" />
										</button>
									</div>

									{/* Modal Content */}
									<p className="text-gray-300 text-sm">
										With Premium Access, you can discover top talents who have viewed your profile
										over the past 365 days. Connect, message, or collaborate with skilled
										professionals to expand your network and unlock new opportunities.
									</p>

									{/* Profile Avatars */}
									<div className="flex items-center gap-2 my-3">
										<div className="flex -space-x-2">
											<img
												className="w-8 h-8 rounded-full border border-[#1e1e1e]"
												src="https://randomuser.me/api/portraits/men/1.jpg"
												alt="User 1"
											/>
											<img
												className="w-8 h-8 rounded-full border border-[#1e1e1e]"
												src="https://randomuser.me/api/portraits/women/2.jpg"
												alt="User 2"
											/>
											<img
												className="w-8 h-8 rounded-full border border-[#1e1e1e]"
												src="https://randomuser.me/api/portraits/men/3.jpg"
												alt="User 3"
											/>
										</div>
										<span className="text-sm text-blue-400">Millions of members use Premium</span>
									</div>

									{/* Trial Info
										<p className="text-gray-400 text-xs">
											1-month free trial. We’ll send you a reminder 7 days before your trial ends.
										</p> */}

									{/* CTA Button */}
									<Link
										href={'/dashboard/employer/#'}
										className="d-block text-center mt-4 w-full bg-[#ffb02e] text-black font-medium py-2 rounded-md hover:bg-[#e69c28]"
									>
										Try Premium
									</Link>
								</div>
							</div>
						)}
					</div>
				)}
				{/* End admin options box */}
			</div>
		</div>
	);
};

export default AllTalents;
