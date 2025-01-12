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
  const userObject={
    id: user?.user_id ,
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
      // setToken(fetchedToken);
  
      const client = new StreamVideoClient({
        apiKey,
        user: userObject,
        token: fetchedToken, // Use fetched token directly
      });
  
      setVideoClient(client);
    };
  
    initializeClient();
  }, [user]);
  if(!videoClient){
    return <div>loading....</div>
  }
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
}
export default StreamVideoProvider;

