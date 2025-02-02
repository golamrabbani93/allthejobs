'use client';
import 'react-datepicker/dist/react-datepicker.css';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import './style.css';
import {createAvailableSlots, fetchAvailableSlots} from '@/services/GenerateAllData';
import {useSelector} from 'react-redux';
import Spinner from '@/components/Sppiner/Spinner';
import {Button} from '@/data/ui/button';
import {Sun, Moon} from 'lucide-react';
const timeSlots = [
	'12:00AM-01:00AM',
	'01:00AM-02:00AM',
	'02:00AM-03:00AM',
	'03:00AM-04:00AM',
	'04:00AM-05:00AM',
	'05:00AM-06:00AM',
	'06:00AM-07:00AM',
	'07:00AM-08:00AM',
	'08:00AM-09:00AM',
	'09:00AM-10:00AM',
	'10:00AM-11:00AM',
	'11:00AM-12:00PM',
	'12:00PM-01:00PM',
	'01:00PM-02:00PM',
	'02:00PM-03:00PM',
	'03:00PM-04:00PM',
	'04:00PM-05:00PM',
	'05:00PM-06:00PM',
	'06:00PM-07:00PM',
	'07:00PM-08:00PM',
	'08:00PM-09:00PM',
	'09:00PM-10:00PM',
	'10:00PM-11:00PM',
	'11:00PM-12:00AM',
];

export default function SlotManagement() {
	const user_redux = useSelector((state) => state.user);
	const [user, setUser] = useState(undefined);
	useEffect(() => {
		setUser(user_redux);
	}, [user_redux]);
	const consultant_id = user?.role === 'consultant' ? user.user_id : undefined;
	const [loading, setLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [requestedSlots, setRequestedSlots] = useState([]);
	const [selectedSlots, setSelectedSlots] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleRetrieveSlots = async () => {
		if (!consultant_id) {
			return;
		}
		setLoading(true);
		const year = selectedDate.getFullYear();
		const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const day = String(selectedDate.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
		try {
			const response = await fetchAvailableSlots(consultant_id, formattedDate);
			setRequestedSlots(response);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const hour_minute_converter = (timeslot) => {
		let firstTime = timeslot.split('-')[0];
		// Convert the 12-hour time (e.g., "12:30am") to 24-hour format and extract hours and minutes
		let timeParts = firstTime.match(/(\d+)(:|\s)?(\d*)\s?(am|pm)/i);
		let hours = parseInt(timeParts[1]);
		let minutes = parseInt(timeParts[3] || 0);
		let ampm = timeParts[4].toLowerCase();
		// Adjust hours for AM/PM
		if (ampm === 'pm' && hours !== 12) {
			hours += 12; // Convert PM hours to 24-hour format
		} else if (ampm === 'am' && hours === 12) {
			hours = 0; // Convert 12 AM to 00:00 hours
		}
		return [hours, minutes];
	};

	const handleSlotClick = (slot) => {
		setSelectedSlots((prevSelectedSlots) =>
			prevSelectedSlots.includes(slot)
				? prevSelectedSlots.filter((s) => s !== slot)
				: [...prevSelectedSlots, slot],
		);
	};
	const handleButtonClick = async () => {
		if (!selectedSlots.length) {
			return;
		}
		setIsSubmitting(true);
		const slotsData = [];
		if (!consultant_id) {
			return;
		}
		const consultant = consultant_id;
		for (let slot of selectedSlots) {
			const hour_minute = hour_minute_converter(slot);
			let selectedDateCopy = new Date(selectedDate);
			selectedDateCopy.setHours(hour_minute[0]);
			selectedDateCopy.setMinutes(hour_minute[1]);
			selectedDateCopy.setSeconds(0);
			slotsData.push({
				consultant,
				start_time: selectedDateCopy,
				status: 'available',
			});
		}

		try {
			const response = await createAvailableSlots(slotsData);
			setSelectedSlots([]);
			handleRetrieveSlots();
		} catch (error) {
			console.error(error);
		}
		setIsSubmitting(false);
	};

	const [isDaySelected, setIsDaySelected] = useState(true);
	useEffect(() => {
		handleRetrieveSlots();
	}, [selectedDate, consultant_id]);
	if (loading) {
		return <Spinner />;
	}
	const maxDate = new Date();
	maxDate.setDate(maxDate.getDate() + 7);

	return (
		<div className="container mx-auto p-4">
			<div className="flex">
				<DatePicker
					selected={selectedDate}
					onChange={(date) => {
						setSelectedSlots([]);
						setSelectedDate(date);
					}}
					timeFormat="HH:mm"
					timeIntervals={60}
					timeCaption="time"
					dateFormat="MMMM d, yyyy"
					className="rounded p-2  bg-slate-300 mb-4"
					minDate={new Date()}
					maxDate={maxDate}
					popperPlacement="bottom-start"
					popperClassName="custom-datepicker-popper"
				/>
				<div className="">
					<button
						className="relative mx-4 mt-1 w-20 h-10 bg-gradient-to-r from-blue-400 to-indigo-600 rounded p-1 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						onClick={() => setIsDaySelected(!isDaySelected)}
					>
						<span
							className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
								isDaySelected ? 'opacity-0' : 'opacity-100'
							}`}
						>
							<Sun className="w-6 h-6 text-yellow-300" />
						</span>
						<span
							className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
								isDaySelected ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<Moon className="w-6 h-6 text-gray-200" />
						</span>
						<span
							className={`bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-500 ease-in-out ${
								isDaySelected ? 'translate-x-10' : ''
							}`}
						/>
					</button>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{timeSlots
					.slice(isDaySelected ? 0 : 12, isDaySelected ? 12 : timeSlots.length + 1)
					.map((slot, index) => (
						<button
							key={index}
							className={`cursor-pointer border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200  ${
								requestedSlots.includes(slot)
									? 'disabled:bg-gray-400 disabled:cursor-not-allowed'
									: selectedSlots.includes(slot)
									? 'bg-blue-400'
									: 'bg-white'
							}`}
							disabled={requestedSlots.includes(slot)}
							onClick={() => handleSlotClick(slot)}
						>
							{slot}
						</button>
					))}
			</div>
			<button
				disabled={isSubmitting}
				className={`mt-4 text-white p-2 rounded ${
					isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
				}`}
				onClick={handleButtonClick}
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
			{/* <button
        className='mt-4 bg-green-500 text-white p-2 rounded'
        onClick={handleRetrieveSlots}
      >
        Retrieve Slots
      </button> */}
		</div>
	);
}
