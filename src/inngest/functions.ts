import { match } from "assert";
import { inngest } from "./client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { Firecrawlapp } from "@/Firecrawl/client";

const  URL_REGEX = /https?:\/\/[^\s]+/g


export const helloWorld = inngest.createFunction(
  { id: "generateAi" },
  { event: "demo/generate" },
  async ({ event, step }) => {
  

   const {prompt} = await event.data as {prompt:string}

  const urls =  await step.run("extract-urls",async()=> {
 return prompt.match(URL_REGEX) ??[]
   }) as string []

const scrapeContent = await step.run("scrape-urls",async ()=>{
  const results = await Promise.all(
urls.map( async (url)=>{
    const firecrawlContent  = await Firecrawlapp.scrape(url,{formats:['markdown']})
   return firecrawlContent.markdown??null;
     })
  ) 

  return results.filter(Boolean).join("\n\n")
})

const finalPrompt = scrapeContent ? `context:${scrapeContent}\n\n Question:${prompt}`: prompt

console.log(finalPrompt)

const finalResult = await step.run("background-ai",async ()=>{
return await generateText({
  model: google('gemini-2.5-flash'),
  prompt: finalPrompt,
});
})
    return { message: finalResult };
  },
);