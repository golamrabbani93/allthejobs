"use server"
import { StreamClient } from "@stream-io/node-sdk";
import { useSelector } from "react-redux";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret=process.env.STREAM_SECRET_KEY
const user={name: 'John Wick', email: 'jwick@gmail.com', image: 'https://via.placeholder.com/150', user_id: 126, role: 'consultant'}

export const tokenProvider=async()=>{
  // const user = useSelector((state) => state.user);
  console.log(user);
  if(!user) throw new Error("User is not logged in")
  if(!apiKey) throw new Error("No apiKey")
  if(!apiSecret) throw new Error("No apiSecret")
  //? create new user
  const client=new StreamClient(apiKey,apiSecret)
  const validity = 60 * 60;
  const token=client.generateUserToken({user_id:user.user_id,validity_in_seconds:validity})
  return token
}