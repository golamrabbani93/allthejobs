"use server"
import { StreamClient } from "@stream-io/node-sdk";
import { useSelector } from "react-redux";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY
const user = {
  id: "112233", 
  image: 'https://via.placeholder.com/150', 
  name: 'John Wick',
  role: 'user',
  custom: {
    email: 'jwick@gmail.com',
  }
}

export const tokenProvider = async () => {
  if (!user) throw new Error("User is not logged in")
  if (!apiKey) throw new Error("No apiKey")
  if (!apiSecret) throw new Error("No apiSecret")
  const client = new StreamClient(apiKey, apiSecret)
  await client.upsertUsers([user]);
  const validity = 60 * 60;
  const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: validity })
  return token
}