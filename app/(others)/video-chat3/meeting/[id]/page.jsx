"use client"

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCallByID } from "../../hooks/useGetCallsById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "../../Components/MeetingSetup";
import MeetingRoom from "../../Components/MeetingRoom";

const Meeting =  ({ params }) => {
  console.log(params);
  const user = useSelector((state) => state.user);
  const [isSetupComplete,setIsSetupComplete]=useState(false)
  // todo 
  const {call,isCallLoading}=useGetCallByID(params.id)
  if(isCallLoading) return <div>loading...</div>
  return <main className="h-screen w-full">
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete?(<MeetingSetup setIsSetupComplete={setIsSetupComplete}/>):(<MeetingRoom meeting_id={params.id}></MeetingRoom>)}
      </StreamTheme>
    </StreamCall>
    </main>
    // <div>Meeting Room crated! with id - {params.id}</div>;
  
  
};

export default Meeting;
