"use client"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import ChatHeader from "./AIChatHeader";
import ChatInput from "./AIChatInput";
import ChatMessages from "./AIChatMessages";


const Chat= () => {
  return (
    <Accordion
      type='single'
      collapsible
      className='relative bg-white z-40'>
      <AccordionItem value='item-1'>
        <div className='fixed right-8 w-80 bottom-6 bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-zinc-300 hover:no-underline'>
              <ChatHeader></ChatHeader>
            </AccordionTrigger>
            <AccordionContent className="border-top">

              <div className='flex flex-col h-80 '>
                <ChatMessages className='px-2 py-3 flex-1' />
                <ChatInput className="mt-8" /> 
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>


  )
}

export default Chat
