"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const sidebarLinks=[
  {
    label:"Home",
    route:'/video-chat3',
    imgUrl:'/icons/Home.svg',
  },
  {
    label:"Upcoming Meetings",
    route:'/video-chat3/upcoming',
    imgUrl:'/icons/upcoming.svg',
  },
  {
    label:"Previous",
    route:'/video-chat3/previous',
    imgUrl:'/icons/previous.svg',
  },
  {
    label:"Recordings",
    route:'/video-chat3/recordings',
    imgUrl:'/icons/Video.svg',
  },
  {
    label:"Personal Room",
    route:'/video-chat3/personal-room',
    imgUrl:'/icons/add-personal.svg',
  }

]

const Sidebar = () => {
  const pathname=usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  p-6 pt-28  max-sm:hidden lg:w-[264px] bg-blue-500'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link)=>{
          const isActive= pathname!=='/'?pathname===link.route:(pathname===link.route||pathname.startsWith(link.route))
          return <Link href={link.route}
          key={link.label}
          className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{'bg-blue-1':isActive})}
          >
            <Image src={link.imgUrl} alt={link.label} width={24} height={24}></Image>
            <p className='text-lg font-semibold max-md:hidden text-white'>{link.label}</p>
          </Link>
        })}
        

      </div>

    </section>
    
  )
}

export default Sidebar