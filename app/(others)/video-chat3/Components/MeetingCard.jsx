"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from 'axios';
import { talentCVDownloaderByUserId } from "@/services/GenerateAllData";

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];
const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  meetingMembers,
  customData,
  role,
  type=null
}) => {

  const { toast } = useToast();
  const talent_user_id = meetingMembers[1]?.user_id
  const [downloading, setDownloading] = useState(false)
  const handleDownload = async (user_id) => {
    setDownloading(true)
    await talentCVDownloaderByUserId(user_id)
    setDownloading(false)
  }

  return (
    <section className="flex min-h-[200px] w-full flex-col gap-3 justify-between rounded-[14px]  px-5 py-8 xl:max-w-[568px] border drop-shadow-lg bg-white">
      <article className="flex flex-col gap-2">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex ">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-between relative", {})}>
        {!isPreviousMeeting && (
          <div className="flex">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            {/* <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-1 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button> */}
          </div>
        )}
        {role === "talent" && <div className="flex justify-center items-center">
          <svg className="w-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          <Link href={`/consultants/${customData.consultant_real_id}`} target="_blank" rel="noopener noreferrer">
            <span className="font-bold cursor-pointer">
              {customData.consultant_name}</span>
          </Link>

        </div>}
        {role === "consultant" && <div className="flex justify-center items-center">
          <svg className="w-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          <span className="font-bold">
            {customData.talent_name}</span>
{  type==='upcoming'&&       <button disabled={downloading}
            onClick={() => handleDownload(talent_user_id)}
            className={`ml-2 text-white p-2 rounded ${downloading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
          >
            {downloading ? "Downloading..." : "Download CV"}
          </button>}
        </div>}
      </article>
    </section>
  );
};

export default MeetingCard;