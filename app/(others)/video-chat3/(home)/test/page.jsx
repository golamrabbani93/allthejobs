"use client";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
const timeSlots = [
  "12:00am-12:30am",
  "12:30am-01:00am",
  "01:00am-01:30am",
  "01:30am-02:00am",
  "02:00am-02:30am",
  "02:30am-03:00am",
  "03:00am-03:30am",
  "03:30am-04:00am",
  "04:00am-04:30am",
  "04:30am-05:00am",
  "05:00am-05:30am",
  "05:30am-06:00am",
  "06:00am-06:30am",
  "06:30am-07:00am",
  "07:00am-07:30am",
  "07:30am-08:00am",
  "08:00am-08:30am",
  "08:30am-09:00am",
  "09:00am-09:30am",
  "09:30am-10:00am",
  "10:00am-10:30am",
  "10:30am-11:00am",
  "11:00am-11:30am",
  "11:30am-12:00pm",
  "12:00pm-12:30pm",
  "12:30pm-01:00pm",
  "01:00pm-01:30pm",
  "01:30pm-02:00pm",
  "02:00pm-02:30pm",
  "02:30pm-03:00pm",
  "03:00pm-03:30pm",
  "03:30pm-04:00pm",
  "04:00pm-04:30pm",
  "04:30pm-05:00pm",
  "05:00pm-05:30pm",
  "05:30pm-06:00pm",
  "06:00pm-06:30pm",
  "06:30pm-07:00pm",
  "07:00pm-07:30pm",
  "07:30pm-08:00pm",
  "08:00pm-08:30pm",
  "08:30pm-09:00pm",
  "09:00pm-09:30pm",
  "09:30pm-10:00pm",
  "10:00pm-10:30pm",
  "10:30pm-11:00pm",
  "11:00pm-11:30pm",
  "11:30pm-12:00am",
];

export default function page() {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate,setSelectedDate]=useState(new Date())
  const handleSlotClick = (slot) => {
    setSelectedSlots((prevSelectedSlots) =>
      prevSelectedSlots.includes(slot)
        ? prevSelectedSlots.filter((s) => s !== slot)
        : [...prevSelectedSlots, slot]
    );
  };
  const handleButtonClick = () => {
    console.log(selectedSlots);
  };
  return (
    <div className='container mx-auto p-4'>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedSlots([])
            setSelectedDate( date )}}
          timeFormat='HH:mm'
          timeIntervals={30}
          timeCaption='time'
          dateFormat='MMMM d, yyyy'
          className='rounded p-2  bg-slate-300 mb-4'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`cursor-pointer border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200  ${
              selectedSlots.includes(slot) ? "bg-green-300" : "bg-white"
            }`}
            onClick={() => handleSlotClick(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
      <button
        className='mt-4 bg-blue-500 text-white p-2 rounded'
        onClick={handleButtonClick}
      >
        Log Selected Slots
      </button>
    </div>
  );
}
