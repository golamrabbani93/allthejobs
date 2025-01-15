"use client";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useGetCalls } from "../hooks/useGetCalls";
import MeetingCard from "./MeetingCard";
const CallList = ({
  type
}) => {
  const { upcomingCalls, previousCalls, recordings,isLoading,meetingRequest,role } = useGetCalls();
  const router = useRouter();
  const [recording, setRecording] = useState([]);
  const getCalls = () => {
    switch (type) {
      case "previous":
        return previousCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recordings;
      case "request":
        return meetingRequest
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "previous":
        return "No previous calls";
      case "upcoming":
        return "No upcoming calls";
      case "recording":
        return "No recording";     
      case "request":
        return "No Meeting Request";
      default:
        return " ";
    }
  };
  useEffect(()=>{
    const fetchRecordings=async()=>{
      const callData=await Promise.all(recordings.map((meeting) => meeting.queryRecordings()) ?? [])
      const fetchedRecording=callData
      .filter(call=>call.recordings.length>0)
      .flatMap(call=>call.recordings)
      setRecording(fetchedRecording)
    }
    if(type==='recording') fetchRecordings()

  },[type,recordings])
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  const updateMeetingRequest=async(call,type)=>{
    try{
      const existingCustomData = call.state.custom || {};
      const startsAt =call.state.startsAt
      await call.update({
        starts_at:startsAt ,
        custom: { ...existingCustomData, isAccepted: true },
      });
    }
    catch(err){
      console.log(err);
    }
    if(type==='accept'){
      console.log('meeting accepted');
    }

  }


  if(isLoading){
    return <div>loading</div>
  }
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 && type!=="recording" ? 
        calls.map((meeting) => (
          <MeetingCard
            key={(meeting)?.id}
            icon={type==='previous'?'/icons/previous.svg':type==="upcoming"?'/icons/upcoming.svg':'/icons/recordings.svg'}
            title={(meeting).state.custom.description.substring(0,20)||"No Description"}
            date={(meeting).state.startsAt?.toLocaleString()}
            isPreviousMeeting={type==='previous'||(type==='request'&&role==="talent")}
            buttonIcon1={type==='recording'?'/icons/play.svg':undefined}
            handleClick={type==='recording'?()=>router.push(`${(meeting ).url}`):type==='request'?()=>updateMeetingRequest(meeting,'accept'):()=>router.push(`/video-chat3/meeting/${(meeting ).id}`)}
            link={type==='recording'?(meeting).url:`${process.env.NEXT_PUBLIC_BASE_URL}/video-chat3/meeting/${(meeting ).id}`}
            buttonText={type==='recording'?'Play':type==='request'?'Accept':'Start'}
          />
        

          
        )
      ) : (
        <h1 className={`${type==='recording'&&"hidden" }`}>{noCallsMessage}</h1>
      )}
      {calls && calls.length > 0 && type==="recording" &&
        recording.map((meeting) => (
          <MeetingCard
            key={(meeting )?.url}
            icon={'/icons/recordings.svg'}
            title={(meeting ).filename.substring(0,20)||"No Name"}
            date={(meeting ).start_time?.toLocaleString()}
            isPreviousMeeting={false}
            buttonIcon1={type==='recording'?'/icons/play.svg':undefined}
            handleClick={type==='recording'?()=>router.push(`${(meeting).url}`):()=>router.push(`meeting/${(meeting).id}`)}
            link={type==='recording'?(meeting ).url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting).id}`}
            buttonText={type==='recording'?'Play':'Start'}
          />
        )
      )}
    </div>
  );
};

export default CallList;
