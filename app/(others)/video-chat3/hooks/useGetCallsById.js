import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallByID = (id) => {
  const [call, setCall] = useState();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();
  console.log(id);
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: { id },
      });
      console.log(calls);
      if (calls.length > 0) setCall(calls[0]);
      setIsCallLoading(false);
    };
    loadCall();
  }, [client, id]);
  return { call, isCallLoading };
};
