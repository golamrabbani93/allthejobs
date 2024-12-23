import { AIChatContext } from "@/app/context/AIChatContext";
import { cn } from "@/lib/utils";
import { useContext } from "react";

const AIChatMessages = () => {
  const {
    messages
  } = useContext(AIChatContext);
  const inverseMessages = [...messages].reverse()
  return (
    <div className='pt-3 flex-1 flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      {inverseMessages.map((message) => {
        return (
          <div className='chat-message' key={`${message.id}-${message.id}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserInput,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                  {
                    "order-1 items-end": message.isUserInput,
                    "order-2 items-start": !message.isUserInput,
                  }
                )}
              >
                <p
                  className={cn("px-4 py-2 rounded-2xl", {
                    "bg-blue-600 text-white ": message.isUserInput,
                    "bg-gray-200 text-gray-900 ": !message.isUserInput,
                  })}
                >
                  {message.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AIChatMessages;
