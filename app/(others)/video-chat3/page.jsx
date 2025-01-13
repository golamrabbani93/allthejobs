"use client"

import React, { useEffect, useState } from 'react'
import MeetingTypeList from './Components/MeetingTypeList';
import './style.css'
const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" }));
    setDate(new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(now));
  }, []);

  return (
    <section className='flex size-full flex-col gap10 text-white'>
      <div className='h-[200px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at 12:30 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className='text-4xl font-extrabold'>{time||"..."}</h1>
            <p className='text-lg font-medium text-black'>
             {date||"..."}
            </p>
          </div>
        </div>
      </div>
      <div className=''>
      <MeetingTypeList></MeetingTypeList>
      </div>
    </section>
  )
}

export default Home