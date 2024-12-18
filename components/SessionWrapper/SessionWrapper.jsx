"use client"
import { SessionProvider } from "next-auth/react"

const SessionWrapper=({Children})=>{
  return <SessionProvider>{Children}</SessionProvider>
}

export default SessionWrapper;