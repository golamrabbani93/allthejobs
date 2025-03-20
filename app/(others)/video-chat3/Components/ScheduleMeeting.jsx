'use client';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useStreamVideoClient} from '@stream-io/video-react-sdk';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useToast} from '@/hooks/use-toast';
import {Textarea} from '@/components/ui/textarea';
import {useSelector} from 'react-redux';
import MeetingModal from './MeetingModal';
import HomeCard from './HomeCard';
import {getRawDate, handleRetrieveSlots, handleUpdateSlots} from '../sharedFunction';
import {fetchAvailableSlots, updateAvailableSlots} from '@/services/GenerateAllData';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import Spinner from '@/components/Sppiner/Spinner';
import {sendEmail} from '@/lib/resend';
const ScheduleMeeting = ({
	button_text = 'Schedule Meeting',
	consultant_id,
	consultant_name = 'default',
	consultant_real_id = 0,
	consultant_email,
}) => {
	const [meetingState, setMeetingState] = useState();
	const user_redux = useSelector((state) => state.user);
	const [user, setUser] = useState(undefined);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [slotLoading, setSlotLoading] = useState(false);
	const [scheduling, setScheduling] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setUser(user_redux);
	}, [user_redux]);
	const client = useStreamVideoClient();
	const [values, setValues] = useState({
		datetime: new Date(),
		description: '',
		link: '',
		consultant_id: consultant_id,
	});
	const [callDetails, setCallDetails] = useState();
	const {toast} = useToast();
	const today = new Date();
	const createMeeting = async () => {
		if (!client || !user || !selectedSlot) return;
		try {
			if (!values.datetime) {
				toast({
					title: 'Please select a date and time',
				});
				return;
			}
			setScheduling(true);
			const id = crypto.randomUUID();
			const call = client.call('default', id);
			if (!call) throw new Error('Failed to crate call');

			const startsAt = values.datetime.toISOString();
			const description = values.description;
			const consultant_id = values.consultant_id.toString();

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					members: [
						...(description !== 'Instant Meeting' ? [{user_id: consultant_id, role: 'admin'}] : []),
						{user_id: user.user_id.toString(), role: 'guest'},
					],
					custom: {
						description,
						isAccepted: true,
						consultant_name,
						talent_name: user.name,
						consultant_real_id,
					},
				},
			});
			if (!call.id) {
				throw new Error('Failed to create meeting ID');
			}
			await sendEmail(
				user?.email,
				user?.name,
				consultant_email,
				consultant_name,
				startsAt,
				description,
			);
			setCallDetails(call);
			setScheduling(false);
			toast({
				title: 'Meeting Created',
			});
			await updateAvailableSlots(
				values.consultant_id,
				getRawDate(values.datetime),
				values.datetime,
				'requested',
			);
		} catch (error) {
			console.log(error);
			toast({
				title: 'Failed to create Meeting',
			});
		}
	};

	const convertToTime = (timeString) => {
		const [time, modifier] = timeString.split(/(AM|PM)/i);
		let [hours, minutes] = time.split(':');
		if (modifier.toLowerCase() === 'pm' && hours !== '12') {
			hours = parseInt(hours, 10) + 12;
		}
		if (modifier.toLowerCase() === 'am' && hours === '12') {
			hours = 0;
		}
		return {hours: parseInt(hours, 10), minutes: parseInt(minutes, 10)};
	};

	const [timeSlots, setTimeSlots] = useState([]);
	useEffect(() => {
		const fetchTimeSlots = async () => {
			setSlotLoading(true);
			setTimeSlots([]);
			setSelectedSlot(null);
			const formattedDate = getRawDate(values.datetime);
			const slots = await fetchAvailableSlots(consultant_id, formattedDate, 'available');
			console.log(slots);
			setSlotLoading(false);
			setTimeSlots(slots);
		};
		if (values.datetime) {
			console.log(values.datetime);
			fetchTimeSlots();
		}
	}, [values.datetime]);

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/video-chat3/meeting/${callDetails?.id}`;
	if (!user?.user_id) {
		return <div className="text-black">Loading...</div>; // Or any placeholder
	}

	const handleSlotSelection = (slot) => {
		console.log(slot);
		setSelectedSlot(slot);
		console.log(selectedSlot);
		const {hours, minutes} = convertToTime(slot.split('-')[0]);
		const date = values.datetime;
		date.setHours(hours);
		date.setMinutes(minutes);
		date.setSeconds(0);
		setValues({...values, datetime: date});
	};
	return (
		<section className="">
			<Button onClick={() => setMeetingState('isScheduledMeeting')}>{button_text}</Button>

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === 'isScheduledMeeting'}
					onClose={() => setMeetingState(undefined)}
					title={`Available Slots For ${consultant_name}`}
					handleClick={createMeeting}
					selectedSlot={selectedSlot}
					scheduling={scheduling}
				>
					<div className="flex w-full flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px] " htmlFor="">
							Select Date
						</label>
						<div className="flex-grow mx-auto">
							<Calendar
								mode="single"
								selected={values.datetime}
								onSelect={(date) => setValues({...values, datetime: date})}
								className="rounded-md border w-full md:p-3 p-1"
								disabled={{before: today}}
							/>
						</div>

						<div className="mt-6">
							<h2 className="text-sm font-semibold mb-3">Available Slots</h2>
							{slotLoading ? (
								<Spinner></Spinner>
							) : timeSlots.length ? (
								''
							) : (
								<span className="text-sm text-red-800">No Available Slots!</span>
							)}
							<div className="grid grid-cols-3 gap-2">
								{timeSlots.map((slot, index) => (
									<span
										key={index}
										onClick={() => handleSlotSelection(slot)}
										className={cn(
											'p-2 text-xs text-center rounded-md bg-green-100 hover:bg-green-200 transition-colors cursor-pointer',
											selectedSlot === `${slot}` && 'ring-2 ring-primary bg-green-300',
										)}
									>
										{slot}
									</span>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 5">
							<label className="text-base text-normal leading-[22px]" htmlFor="">
								Add a description (Optional)
							</label>
							<Textarea
								onChange={(e) => {
									setValues({...values, description: e.target.value});
								}}
								className=" border-none border border-blue-1"
							></Textarea>
						</div>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === 'isScheduledMeeting'}
					onClose={() => {
						setMeetingState(undefined);
						router.push('dashboard/talent/booked-meeting');
					}}
					title="Meeting Created"
					className="text-center"
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({title: 'Link copied'});
					}}
					image="/icons/checked.svg"
					buttonIcon="/icons/copy.svg"
				></MeetingModal>
			)}
		</section>
	);
};

export default ScheduleMeeting;
