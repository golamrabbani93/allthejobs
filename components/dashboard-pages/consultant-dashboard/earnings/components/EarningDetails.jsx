import {useGetCalls} from '@/app/(others)/video-chat3/hooks/useGetCalls';
import Spinner from '@/components/Sppiner/Spinner';
import {useSelector} from 'react-redux';
import MeetingTable from './MeetingTable';
import {useEffect, useState} from 'react';

const EarningDetails = () => {
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const [totalPrice, setTotalPrice] = useState(0);
	const {upcomingCalls, previousCalls, recordings, isLoading, meetingRequest, role} = useGetCalls();
	const data = previousCalls?.map((item) => item.state.custom);

	// make new array of data from previousCalls
	const fullCallListData = previousCalls.map((item) => {
		return {
			id: item.id,
			custom: item.state.custom,
			startsAt: item.state.startsAt,
		};
	});

	useEffect(() => {
		setTotalPrice(data?.length * userRoleBasedData?.hourly_rate);
	}, [data, userRoleBasedData]);
	// Calculate Consultant's Share and Platform's Commission using ternary operator
	const consultantShare =
		totalPrice <= 50
			? 0.7
			: totalPrice <= 100
			? 0.75
			: totalPrice <= 200
			? 0.8
			: totalPrice <= 300
			? 0.85
			: 0.9;

	const consultantAmount = data?.length * userRoleBasedData?.hourly_rate * consultantShare || 0;
	// const platformCommission = totalPrice - consultantAmount;
	const cardContent = [
		{
			id: 0,
			metaName: 'Total Earnings',
			icon: 'la-money',
			countNumber: `$${consultantAmount || 0}`,
			uiClass: 'ui-purple',
		},
		{
			id: 1,
			icon: 'flaticon-briefcase',
			countNumber: data?.length || 0,
			metaName: 'Total Consulted',
			uiClass: 'ui-blue',
		},
		{
			id: 2,
			icon: 'la-file-invoice',
			//get hourly rate from userRoleBasedData and cut percent by $0 - $50, $51 - $100, $101 - $200, $201 - $300, Above $300
			countNumber: data?.length * 60,
			metaName: 'Total video Minutes',
			uiClass: 'ui-red',
		},
		{
			id: 4,
			icon: 'la-bookmark-o',
			countNumber: upcomingCalls?.length || 0,
			metaName: 'Upcoming Meetings',
			uiClass: 'ui-green',
		},
	];

	if (loading || isLoading) {
		return (
			<div className="widget-content h-96 flex justify-center items-center bg-white shadow-sm rounded-lg">
				<Spinner size="sm" />
			</div>
		);
	}

	return (
		<>
			{cardContent.map((item) => (
				<div className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12" key={item.id}>
					<div className={`ui-item ${item.uiClass}`}>
						<div className="left">
							<i className={`icon la ${item.icon}`}></i>
						</div>
						<div className="right">
							<h4>{item.countNumber}</h4>
							<p>{item.metaName}</p>
						</div>
					</div>
				</div>
			))}
			<div className="row">
				<div className="col-lg-12">
					{/* <!-- Ls widget --> */}
					<div className="ls-widget">
						<div className="tabs-box">
							<div className="widget-content">
								{/* <Feedback /> */}
								{/* End post box form */}
								<MeetingTable fullCallListData={fullCallListData} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EarningDetails;
