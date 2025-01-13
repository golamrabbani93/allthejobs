"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {useStreamVideoClient } from "@stream-io/video-react-sdk";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import MeetingModal from "./MeetingModal";
import HomeCard from "./HomeCard";
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState();
  const user = useSelector((state) => state.user);
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    datetime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();
  
  const { toast } =useToast()
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.datetime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call =client.call("default", id);
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
      if (!call.id) {
        throw new Error('Failed to create meeting ID');
      }
      setCallDetails(call);
      if (!values.description) {
        router.push(`/video-chat3/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      });
    }
  };

  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/video-chat3/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

      <HomeCard
        img='icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState("isInstantMeeting")}
        background='bg-orange-400'
      ></HomeCard>

      <HomeCard
        img='icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState("isScheduledMeeting")}
        background='bg-blue-400'
      ></HomeCard>
      <HomeCard
        img='icons/recordings.svg'
        title='View Recording'
        description='Checkout your recording'
        handleClick={() => router.push("/recordings")}
        background='bg-purple-400'
      ></HomeCard>
      <HomeCard
        img='icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation Link'
        handleClick={() => setMeetingState("isJoiningMeeting")}
        background='bg-yellow-400'
      ></HomeCard>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title='Create Meeting'
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2 5'>
            <label className='text-base text-normal leading-[22px]' htmlFor=''>
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className='bg-dark-2 border-none border border-blue-1'
            ></Textarea>
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px]' htmlFor=''>
              Select Date and Time
            </label>
            <DatePicker
              selected={values.datetime}
              onChange={(date) => setValues({...values,datetime:date})}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
              className="w-full rounded bg-dark-2 p-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title='Meeting Created'
          className='text-center'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy Meeting Link'
        ></MeetingModal>
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title='Start an Instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      ></MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
