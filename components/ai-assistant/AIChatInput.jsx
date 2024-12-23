"use client";
import { AIChatContext } from "@/app/context/AIChatContext";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
const ChatInput = () => {
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(AIChatContext);
  const [input, setInput] = useState("");
  const textAreaRef=useRef(null)
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message) => {
      const response = await fetch("api/AIChat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify([message]),
      });
      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error("No stream found");
      }
      const id = nanoid();
      const responseMessage = {
        id,
        isUserMessage: false,
        text: "",
      };
      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
        console.log(chunkValue);
      }
      setIsMessageUpdating(false);
      setInput("");
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 10);
      console.log("success");
    },

  });



  return ( <div  className="border-t border-zinc-300 px-4">
  <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
    <TextareaAutosize
      ref={textAreaRef}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          const message = {
            id: nanoid(),
            isUserInput: true,
            text: input,
          };

          sendMessage(message);
        }
      }}
      rows={2}
      maxRows={4}
      value={input}
      autoFocus
      disabled={isPending}
      onChange={(e) => setInput(e.target.value)}
      placeholder='Write a message...'
      className='p-2 peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
    />

    <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
      <kbd className='inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400'>
        {isPending ? (
          <Loader2 className='w-3 h-3 animate-spin' />
        ) : (
          // <CornerDownLeft className='w-3 h-3' />
          <CornerDownLeft className='w-3 h-3' />
        )}
      </kbd>
    </div>

    <div
      className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
      aria-hidden='true'
    />
  </div>
</div> );
}
 
export default ChatInput;