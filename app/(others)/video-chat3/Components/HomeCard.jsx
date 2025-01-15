import Image from 'next/image'
import React from 'react'

const HomeCard = ({img,title,description,handleClick,background}) => {
  return (
    <div onClick={handleClick} className={`${background} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[12px] cursor-pointer`}>
    <div className="flex-center glassmorphism size-12 rounded-lg">
      <Image src={img} alt='add-meeting-icon' width={27} height={27}/>
    </div>
      <div className="flex flex-col gap-2">
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-lg font-normal text-white'>{description}</p>
      </div>
  </div>
  )
}

export default HomeCard