'use client';
import {  setOSInfo, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { tokenProvider } from '@/actions/stream.actions';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider=({children})=> {
  const [videoClient,setVideoClient]=useState()
  const [chatClient,setChatClient]=useState()
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const initializeClient = async () => {
      if (!user?.user_id) return;
      if (!apiKey) throw new Error('Stream API key is missing');
      const userObject={
        id:user.user_id.toString(),
        name:user.name,
        image:user.image
      }
      const fetchedToken = await tokenProvider(userObject);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const videoClient = new StreamVideoClient({
        apiKey,
        user: userObject,
        token: fetchedToken, // Use fetched token directly
      });
      const chatClient= new StreamChat(apiKey);
      await chatClient.connectUser(userObject, fetchedToken);
      setChatClient(chatClient)
      setVideoClient(videoClient);
      console.log(chatClient);
    };
    initializeClient();
  }, [user]);
  if (!videoClient || !chatClient) {
    return <div>Loading...</div>;
  }
  return (
    <Chat client={chatClient}>
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
    </Chat>
  );
}
export default StreamVideoProvider;

