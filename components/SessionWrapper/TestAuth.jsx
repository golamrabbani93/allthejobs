"use client"
import { signIn, signOut, useSession } from "next-auth/react";

const TestAuth = () => {
  const { data: session } = useSession();
  console.log(session?.user.image);
  return (
    <>
      {session ? (
        <>
          <h1>Welcome back </h1>
          <img src={session.user?.image} alt="" />
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          <button onClick={()=>signOut()} >sign out</button>


        </>
      ) : (
        <>
        <h1>you are not looged in</h1>
        <button onClick={()=>signIn('google')}>sign in with google</button>
        </>
      )}
    </>
  );
};

export default TestAuth;
