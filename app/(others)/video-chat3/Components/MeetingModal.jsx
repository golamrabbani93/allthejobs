import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger></DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none  bg-dark-1 px-5 py-9 text-white '>
        <div className='flex flex-col gap-6'>
          {image && (
            <div className='flex justify-center'>
              <Image src={image} alt='image' width={72} height={72}></Image>
            </div>
          )}
          <h1 className={cn("text-2xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button className=' ' onClick={handleClick}>
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt='buttonIcon'
                width={13}
                height={13}
              ></Image>
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
