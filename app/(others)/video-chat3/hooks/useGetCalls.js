import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
  const [calls,setCalls]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const client=useStreamVideoClient()
  //todo get real user here
  // const user = useSelector((state) => state.user);
  const user={
    id: "112233",
    name:"John Wick", 
    image:"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  }

  useEffect(()=>{
    const loadCalls=async()=>{
      if(!client||!user?.id) return;
      setIsLoading(true)
      try {
        const {calls}=await client.queryCalls({
          sort:[{field:'starts_at',direction:-1}],
          filter_conditions:{
            starts_at:{$exists:true},
            $or:[
              {created_by_user_id:user.id},
              {member:{$in:[user.id]}}
            ]
          }
        })
        setCalls(calls)
        
      } catch (error) {
        console.log(error);
        
      }finally{
        setIsLoading(false)
      }
    }
    loadCalls()

  },[client,user?.id])
  const now=new Date()
  const previousCalls=calls.filter(({state:{startsAt,endedAt}}:Call)=>{
    return (startsAt&& new Date(startsAt)<now || !!endedAt)
  })

  const upcomingCalls=calls.filter(({state:{startsAt}}:Call)=>{
    return (startsAt&& new Date(startsAt)>now)
  })


  return {previousCalls,upcomingCalls,recordings:calls,isLoading}

}