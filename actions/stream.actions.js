"use server"
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY
// const user = {
//   id: "hamim", 
//   image: 'https://via.placeholder.com/150', 
//   name: 'John Wick',
//   role: 'user',
//   custom: {
//     email: 'jwick@gmail.com',
//   }
// }

export const tokenProvider = async (userObject) => {
  if (!userObject) throw new Error("User is not logged in")
  if (!apiKey) throw new Error("No apiKey")
  if (!apiSecret) throw new Error("No apiSecret")
  const client = new StreamClient(apiKey, apiSecret)
  await client.upsertUsers([userObject]);
  const validity = 60 * 60;
  const iat = Math.floor(Date.now() / 1000) - 30; 
  const token = client.generateUserToken({ user_id: userObject.id, validity_in_seconds: validity,iat })
  return token
}