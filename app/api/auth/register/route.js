import { NextResponse} from "next/server";

export async function POST(req){
  try {
    const {email,password}=await req.json()
    console.log({email,password});
  } catch (error) {
    console.log(error.message);
    
  }
}