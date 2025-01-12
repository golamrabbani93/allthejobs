"use client";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
    datetime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();
  const userExample = {
    name: "John Wick",
    email: "jwick@gmail.com",
    image: "https://via.placeholder.com/150",
    user_id: 126,
    role: "consultant",
  };
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.datetime) {
        console.log('not datetiem');
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to crate call");

      const startsAt =
        values.datetime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        console.log('call crated',call.id);
      }
     console.log('meeting created');
    } catch (error) {
      console.log(error);
      console.log('failed to create meeting');
    }
  };
  return <div>
    <button onClick={createMeeting}>call</button>
  </div>;
};

export default page;
