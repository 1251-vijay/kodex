import { inngest } from "@/inngest/client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// export async function GET(){
    
//     await inngest.send({
//         name: "demo/generate",
//         data:{
//             email:"vijay@gmail.com"
//         }
//     })
//     return Response.json({status:true})
    
// }

export async function POST(){


const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
console.log(text)
return Response.json({status:true})
}