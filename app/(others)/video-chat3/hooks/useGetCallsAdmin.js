import {Call, useStreamVideoClient} from '@stream-io/video-react-sdk';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const useGetCallsAdmin = () => {
	const [calls, setCalls] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const client = useStreamVideoClient();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		const loadCalls = async () => {
			if (!client || !user?.user_id) return;
			setIsLoading(true);
			const userObject = {
				id: user.user_id.toString(),
				name: user.name,
				image: user.image,
			};
			try {
				const {calls} = await client.queryCalls({
					sort: [{field: 'starts_at', direction: -1}],
					filter_conditions: {
						// starts_at:{$exists:true},
						$or: [{created_by_user_id: userObject.id}, {members: {$in: [userObject.id]}}],
					},
				});
				setCalls(calls);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		loadCalls();
	}, [client, user?.user_id]);
	const now = new Date();
	const previousCalls = calls.filter(({state: {startsAt, endedAt}}) => {
		return (startsAt && new Date(startsAt) < now) || !!endedAt;
	});

	// const upcomingCalls=calls.filter(({state:{startsAt}})=>{
	//   return (startsAt&& new Date(startsAt)>now)
	// })
	const upcomingCalls = calls.filter(({state: {startsAt, custom}}) => {
		return startsAt && new Date(startsAt) > now && custom?.isAccepted === true;
	});

	const meetingRequest = calls.filter(({state: {startsAt, custom}}) => {
		return startsAt && new Date(startsAt) > now && custom?.isAccepted === false;
	});
	return {
		previousCalls,
		upcomingCalls,
		recordings: calls,
		isLoading,
		meetingRequest,
		role: user.role,
	};
};
