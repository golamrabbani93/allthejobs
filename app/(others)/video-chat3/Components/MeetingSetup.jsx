"use client"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Button } from "@/components/ui/button";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";


const MeetingSetup = ({setIsSetupComplete}) => {
  const [isMicCamToggledOn,setIsMicCamToggledOn]=useState(false)
  const call =useCall()
  console.log(call);
  if(!call){
    throw new Error("useCall must be used withing stream call component")

  }
  useEffect(()=>{
    if(isMicCamToggledOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.microphone.enable()
    }


  },[isMicCamToggledOn,call?.camera,call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview></VideoPreview>
      <div className="flex h-16 items-center justify-center gap-3">
        <label htmlFor="" className="flex items-center justify-center gap-2 font-medium">
          <input type="checkbox" checked={isMicCamToggledOn}
          onChange={(e)=>setIsMicCamToggledOn(e.target.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings></DeviceSettings>
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2" onClick={()=>{
        setIsSetupComplete(true)
        call.join()
        }}>Join Meeting</Button>
    </div>
  );
};

export default MeetingSetup;
