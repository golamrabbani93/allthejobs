import {format} from 'date-fns';

const MeetingTable = ({fullCallListData}) => {
	return (
		<>
			<div className="widget-title">
				<h4>Meeting Details</h4>
			</div>
			<div className="widget-content">
				{fullCallListData?.length > 0 ? (
					<div className="table-outer">
						<div className="table-outer">
							<table className="default-table manage-job-table">
								<thead>
									<tr>
										<th>Talent Name</th>
										<th>Meeting Date</th>
										<th>Meeting Time</th>
										<th>Status</th>
									</tr>
								</thead>

								<tbody>
									{fullCallListData?.map((item) => {
										//get date
										const date = format(new Date(item.startsAt), 'dd MMMM yyyy');
										//get time
										const time = format(new Date(item.startsAt), 'hh:mm a');
										return (
											<tr key={item.id}>
												<td>{item?.custom?.talent_name}</td>
												<td>{date}</td>
												<td>{time}</td>
												<td>{item?.custom?.isAccepted ? 'Accepted' : 'Pending'}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="bg-white rounded-lg h-96 flex justify-center items-center" role="alert">
						<span className="text-black"> No Meetings Data Found!</span>
					</div>
				)}
			</div>
		</>
	);
};

export default MeetingTable;
