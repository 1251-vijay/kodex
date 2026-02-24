"use client";

import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const messages = useQuery(api.messages.get);
  const createMessage = useMutation(api.messages.createMessage);
  console.log("this is upper of useEffect hook")
  const {userId} = useAuth() 


  const handleClientError = ()=>{
    Sentry.logger.info('user attemping failed clicking button',{userId});
    throw new Error("Client Error: something went wrong in the browser")
  }
  const handleApirror = async ()=>{
    await axios.post("api/demo/error")
  }
const handleInngestError = async ()=>{
    await axios.get("api/demo/")
  }

const  demoApi = async()=>{
  await axios.post("api/demo/")
}
  useEffect(()=>{
    demoApi()
  },[])
  
  return (
    <>
     <button onClick={()=> createMessage({
          text:"iam vijay "
        })}>add </button>
        <div>{messages?.map((data)=> <div key={data._id}>the Text is {data.text}</div>)}</div>

        <div className="flex items-center h-screen justify-center gap-2">
          <Button variant={'destructive'} onClick={handleClientError}>client Error</Button>
           <Button variant={'destructive'} onClick={handleApirror}>API Error</Button>
            <Button variant={'destructive'} onClick={handleInngestError}>Inngest Error</Button>
        </div>
    </>
  );
}