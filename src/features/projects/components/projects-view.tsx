"use client"


import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import { SparkleIcon } from "lucide-react"
import { Poppins } from "next/font/google"
import {FaGithub} from 'react-icons/fa'
import { ProjectsList } from "./projects-list"
import { userCreateProject } from "../hooks/use-projects"
import {uniqueNamesGenerator,adjectives,animals,colors} from 'unique-names-generator'
import { useEffect, useState } from "react"
import { ProjectsCommandDailog } from "./projects-command-dialog"


const font = Poppins({
    subsets:['latin'],
    weight:['400','500','600','700'],
})


export const ProjectView = ()=>{
    const createProject = userCreateProject();

    const [CommandDialogOpen , setCommandDialogOpen] = useState(false);


useEffect(()=>{
    const handleKeyDown = (e:KeyboardEvent)=> {
        if (e.metaKey || e.ctrlKey){
            if(e.key === "k" || e.key === "K"){
                e.preventDefault();
                setCommandDialogOpen(true)
            }     
        }
    }
    document.addEventListener("keydown", handleKeyDown);
       return ()=> document.removeEventListener('keydown',handleKeyDown)
},[])


    return (
        <>
        <ProjectsCommandDailog open={CommandDialogOpen} onOpenChange={setCommandDialogOpen}/>
      
        <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
            
            <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center  ">
                <div className="flex justify-between gap-4 w-full items-center">
                    <div className="flex items-center gap-2 w-full group/logo">
                    <img src="/vercel.svg" alt="kodex" className="size-[32px] md:size-[46px]" />
                    <h1 className={cn('text-4xl md:text-5xl font-semibold',font.className)}>Kodex</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-2 gap-2">
                    <Button variant={'outline'} onClick={()=>{
                        const projectName = uniqueNamesGenerator({
                            dictionaries:[adjectives,animals,colors],
                            separator:'-',
                            length:3
                        })
                        createProject({
                            name:projectName
                        });
                    }
                
                    } className="h-full items-center  justify-start p-4 bg-background border flex flex-col gap-6 rounded-none "> 
              <div className="flex items-center justify-between w-full">
                <SparkleIcon className="size-4"/>
                <Kbd className="bg-accent border">crtl+J</Kbd>
                </div>
                <div>
                     <span className="text-sm">New</span>

                </div>
               
              </Button>
                <Button variant={'outline'} onClick={()=>()=>{console.log(
                        "hello"
                    )}
                
                    } className="h-full items-center  justify-start p-4 bg-background border flex flex-col gap-6 rounded-none "> 
              <div className="flex items-center justify-between w-full">
                <FaGithub className="size-4"/>
                <Kbd className="bg-accent border">crtl+I</Kbd>
                </div>
                <div>
                     <span className="text-sm text-start">Import</span>

                </div>
               
              </Button>
               </div>

               <ProjectsList onViewAll={()=>setCommandDialogOpen(true)}/>
                </div>

            </div>
            
            </div>
              </>
    )
}