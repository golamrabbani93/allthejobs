'use client';
import {  setOSInfo, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { tokenProvider } from '@/actions/stream.actions';
import { useSelector } from 'react-redux';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider=({children})=> {
  const [videoClient,setVideoClient]=useState()
  //! get currently logged in user from clerk
  const user = useSelector((state) => state.user);
  console.log(user);
  const userObject={
    id: "112233",
    name:user?.name||"test user", 
    image:user?.image
  }
  // const [token,setToken]=useState("")
  // const getToken=async()=>{
  //   const fetchedToken=await tokenProvider()
  //   setToken(fetchedToken)
  // }
  // getToken()
  useEffect(() => {
    const initializeClient = async () => {
      if (!user) return;
      if (!apiKey) throw new Error('Stream API key is missing');
      const fetchedToken = await tokenProvider();
      await new Promise(resolve => setTimeout(resolve, 1000));
      const client = new StreamVideoClient({
        apiKey,
        user: userObject,
        token: fetchedToken, // Use fetched token directly
      });
  
      setVideoClient(client);
    };
    initializeClient();
  }, [user]);
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
}
export default StreamVideoProvider;

