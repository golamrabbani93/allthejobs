"use client";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const userExample = {
    name: "John Wick",
    email: "jwick@gmail.com",
    image: "https://via.placeholder.com/150",
    user_id: 126,
    role: "consultant",
  };
  const callId = 'KMCnIlYERECA';
  const client = useStreamVideoClient();

  
  return <div>page</div>;
};

export default page;
