"use client";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  
  
} from "agora-rtc-react";
import { useState } from "react";
import "./style.css";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageCircleMore,
  Share,
  Users,
  Ellipsis,
  User,
} from "lucide-react";

import VideoPlayer from "./VideoPlayer";
import Sidebar from "./Sidebar";
export const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [channel, setChannel] = useState("");
  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
  const token = process.env.NEXT_PUBLIC_AGORA_TOKEN;

  useJoin(
    { appid: appId, channel: channel, token: token ? token : null },
    calling
  );
  //local user
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  //remote users

  const handleLeave=async()=>{
    setCalling((a) => !a)
  }

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-grow overflow-hidden'>
        {isConnected ? (
          <div className="flex h-full ">
            <div className="w-4/5">
            <VideoPlayer  micOn={micOn} cameraOn={cameraOn}></VideoPlayer>
            </div>
            <div className="w-1/5 bg-gray-300">
            <Sidebar></Sidebar>
            </div>
          </div>
        ) : (
          <div className='join-room'>
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder='<Your channel Name>'
              value={channel}
            />

            <button
              className={`join-channel`}
              disabled={!channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {/* // control  */}
      {isConnected && (
        <div className='bottom-0 w-full border flex justify-between h-20 p-2 '>
          <div className='mx-auto '>
            <button className='btn' onClick={() => setMic((a) => !a)}>
              {micOn ? (
                <Mic
                  className='bg-[#0060FF] rounded-full text-white p-3  '
                  size={54}
                ></Mic>
              ) : (
                <MicOff
                  className='bg-[#EB5757] rounded-full text-white p-3  '
                  size={54}
                ></MicOff>
              )}
            </button>
            <button
              className='btn outline-none'
              onClick={() => setCamera((a) => !a)}
            >
              {cameraOn ? (
                <Video
                  className='bg-[#0060FF] rounded-full text-white p-3  '
                  size={54}
                ></Video>
              ) : (
                <VideoOff
                  className='bg-[#EB5757] rounded-full text-white p-3  '
                  size={54}
                ></VideoOff>
              )}
            </button>
            <button
              className='btn outline-none'
              onClick={() => setSharingScreen((a) => !a)}
            >
              {sharingScreen ? (
                <Share
                  className='bg-[#0060FF] rounded-full text-white p-3  '
                  size={54}
                ></Share>
              ) : (
                <Share
                  className='bg-[#EB5757] rounded-full text-white p-3  '
                  size={54}
                ></Share>
              )}
            </button>
            <button className='btn outline-none'>
              <MessageCircleMore
                className='bg-[#0060FF] rounded-full text-white p-3  '
                size={54}
              ></MessageCircleMore>
            </button>
            <button className='btn outline-none'>
              <User
                className='bg-[#0060FF] rounded-full text-white p-3  '
                size={54}
              ></User>
            </button>
            <button className='btn outline-none'>
              <Ellipsis
                className='bg-[#0060FF] rounded-full text-white p-3  '
                size={54}
              ></Ellipsis>
            </button>
          </div>
          <button
            className='bg-[#EB5757] mr-4 px-10 py-3 rounded-3xl text-white text-sm self-center '
            onClick={() => handleLeave()}
          >
            End Call
            {/* {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />} */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Basics;
