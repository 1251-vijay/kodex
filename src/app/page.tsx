"use client";

import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const messages = useQuery(api.messages.get);
  const createMessage = useMutation(api.messages.createMessage);
  console.log("this is upper of useEffect hook")

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
    </>
  );
}