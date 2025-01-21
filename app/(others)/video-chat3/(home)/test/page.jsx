"use client";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import {
  createAvailableSlots,
  fetchAvailableSlots,
} from "@/services/GenerateAllData";
import { useSelector } from "react-redux";
const timeSlots = [
  "12:00AM-01:00AM",
  "01:00AM-02:00AM",
  "02:00AM-03:00AM",
  "03:00AM-04:00AM",
  "04:00AM-05:00AM",
  "05:00AM-06:00AM",
  "06:00AM-07:00AM",
  "07:00AM-08:00AM",
  "08:00AM-09:00AM",
  "09:00AM-10:00AM",
  "10:00AM-11:00AM",
  "11:00AM-12:00PM",
  "12:00PM-01:00PM",
  "01:00PM-02:00PM",
  "02:00PM-03:00PM",
  "03:00PM-04:00PM",
  "04:00PM-05:00PM",
  "05:00PM-06:00PM",
  "06:00PM-07:00PM",
  "07:00PM-08:00PM",
  "08:00PM-09:00PM",
  "09:00PM-10:00PM",
  "10:00PM-11:00PM",
  "11:00PM-12:00AM",
];

export default function SlotManagement() {
  const user_redux = useSelector((state) => state.user);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);
  const consultant_id = user?.role === "consultant" ? user.user_id : undefined;
  const [loading, setLoading] = useState(false);
  const [requestedSlots, setRequestedSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("this is selected date", selectedDate);
  const handleRetrieveSlots = async () => {
    setLoading(true);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, "0");
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
  // useEffect(async()=> await handleRetrieveSlots(),[])

  const hour_minute_converter = (timeslot) => {
    let firstTime = timeslot.split("-")[0];
    // Convert the 12-hour time (e.g., "12:30am") to 24-hour format and extract hours and minutes
    let timeParts = firstTime.match(/(\d+)(:|\s)?(\d*)\s?(am|pm)/i);
    let hours = parseInt(timeParts[1]);
    let minutes = parseInt(timeParts[3] || 0);
    let ampm = timeParts[4].toLowerCase();
    // Adjust hours for AM/PM
    if (ampm === "pm" && hours !== 12) {
      hours += 12; // Convert PM hours to 24-hour format
    } else if (ampm === "am" && hours === 12) {
      hours = 0; // Convert 12 AM to 00:00 hours
    }
    return [hours, minutes];
  };

  const handleSlotClick = (slot) => {
    setSelectedSlots((prevSelectedSlots) =>
      prevSelectedSlots.includes(slot)
        ? prevSelectedSlots.filter((s) => s !== slot)
        : [...prevSelectedSlots, slot]
    );
  };
  const handleButtonClick = async () => {
    const slotsData = [];
    const consultant = "126"; //todo Replace with actual consultant ID
    for (let slot of selectedSlots) {
      const hour_minute = hour_minute_converter(slot);
      let selectedDateCopy = new Date(selectedDate);
      selectedDateCopy.setHours(hour_minute[0]);
      selectedDateCopy.setMinutes(hour_minute[1]);
      selectedDateCopy.setSeconds(0);
      slotsData.push({
        consultant,
        start_time: selectedDateCopy,
        status: "available",
      });
    }

    try {
      const response = await createAvailableSlots(slotsData);
      setSelectedSlots([]);
      handleRetrieveSlots();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleRetrieveSlots();
  }, [selectedDate, consultant_id]);
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedSlots([]);
            setSelectedDate(date);
          }}
          timeFormat='HH:mm'
          timeIntervals={30}
          timeCaption='time'
          dateFormat='MMMM d, yyyy'
          className='rounded p-2  bg-slate-300 mb-4'
          minDate={new Date()}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4'>
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`cursor-pointer border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200  ${
              requestedSlots.includes(slot)
                ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                : selectedSlots.includes(slot)
                ? "bg-blue-400"
                : "bg-white"
            }`}
            disabled={requestedSlots.includes(slot)}
            onClick={() => handleSlotClick(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <button
        className='mt-4 bg-blue-500 text-white p-2 rounded'
        onClick={handleButtonClick}
      >
        Submit
      </button>
      <button
        className='mt-4 bg-green-500 text-white p-2 rounded'
        onClick={handleRetrieveSlots}
      >
        Retrieve Slots
      </button>
    </div>
  );
}
