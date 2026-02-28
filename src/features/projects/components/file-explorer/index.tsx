"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronRightIcon, CloudLightning, CopyMinusIcon, FilePlusCornerIcon, FolderPlusIcon } from "lucide-react"
import { useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { useProject } from "../../hooks/use-projects"
import { Button } from "@/components/ui/button"
import { useCreateFile, useCreateFolder, useFolderContents } from "../../hooks/use-file"
import { create } from "domain"
import { CreateInput } from "./create-input"
import { LoadingRow } from "./loading-row"
import { Tree } from "./tree"

export const FileExplorer = ({projectId} : {projectId:Id<'projects'>})=>{
 const [isOpen ,setisOpen]  = useState(false);
 const [Collapsekey ,setCollapasekey] = useState(0)
 const [creating, setCreating ] = useState<"file" | 'folder' |null>(null)

 const  project = useProject(projectId);
 const createFile = useCreateFile();
 const  createFolder = useCreateFolder();


const rootFiles = useFolderContents({
    projectId,
    enabled:isOpen
})

 const handleCreate = (name:string) => {
    setCreating(null)
    if(creating === 'file'){
        createFile({
            projectId:projectId,
            name:name,
            parentId:undefined,
            content:''

        })
    }else{
        createFolder({
            projectId,
            parentId:undefined,
            name,
            
        })
    }


 }

    return (
        <div className="h-full bg-sidebar">

            <ScrollArea>
                <div role="button" onClick={()=> setisOpen((prev)=>!prev)} className="group/project cursor-pointer w-full text-left flex items-center gap-0.5 h-5.5 bg-accent font-bold">
                <ChevronRightIcon className={cn(
                    'size-4 shrink-0 text-muted-foreground',
                    isOpen && 'rotate-90'
                )}/>
                 <p className="uppercase line-clamp-1 text-xs">{project?.name ?? "Loading..."}</p>
                 <div className="opacity-0 group-hover/project:opacity-100 transition-none duration-0 flex items-center gap-0.5 ml-auto">
                 <Button onClick={(e)=>{
                    e.preventDefault(),
                    e.stopPropagation(),
                    setisOpen(true)
                    setCreating('file')
                 }  
                 
                 } variant='hightlight' size='icon-xs'>
                    <FilePlusCornerIcon className="size-3.5"/>
                 </Button>
                 <Button onClick={(e)=>{
                    e.preventDefault(),
                    e.stopPropagation(),
                    setisOpen(true)
                    setCreating('folder')
                 }  
                 
                 } variant='hightlight' size='icon-xs'>
                    <FolderPlusIcon className="size-3.5"/>
                 </Button>
                 <Button onClick={(e)=>{
                    e.preventDefault(),
                    e.stopPropagation(),
                    setisOpen(true)
                    setCollapasekey((prv) => prv+1)
                 }  
                 
                 } variant='hightlight' size='icon-xs'>
                    <CopyMinusIcon className="size-3.5"/>
                 </Button>
                 </div>

                </div>
                {isOpen && (
                    <>
                    {rootFiles === undefined && <LoadingRow level={0}/>}
                    {creating && (
                        <CreateInput  type = {creating} level={0} onSubmit = {handleCreate} onCancel= {()=>setCreating(null)}/>
                    )}
                    {rootFiles?.map((item)=> {
                        return <Tree key={`${item._id}-${Collapsekey}`} item = {item} level={0} projectId= {projectId}/>
                    })}
                    </>
                )}
               
            </ScrollArea>
        </div>
    )
}